import { Request, Response } from "express";
import { GetNewsData, News, GetNewsBySourceData } from "../service/source";
import { NewsSources } from "../util/dataOrigins";
import client from "../service/initRedis";
import CustomError from "../util/error/customError";

type MyResponse<T> = { err: string; succes: boolean } | { data: T };

const GetNews = async (req: Request, res: Response<MyResponse<News[]>>) => {
  const news: News[] = [];

  client.del("news");
  //get data from redis
  client.get("news", async (err, data) => {
    //if error occured return error
    if (err) return new Error("Some thing went wrong from our side");

    //if data is available return data from redis
    if (data !== null) return res.status(200).json(JSON.parse(data!));

    //if data is not available in redis get data from news sources
    try {
      for await (const newsPaper of NewsSources) {
        const receviedNews = await GetNewsData(newsPaper);
        news.push(...receviedNews);
      }

      //set data to redis
      client.setex("news", 900, JSON.stringify(news));

      res.status(200).json({ data: news });
    } catch (err: any) {
      return res.status(500).json({ succes: false, err: "Error Occured Can't Retrive Data From News Source " });
    }
  });
};

const GetNewsByDynamic = async (req: Request<{ source: string; page: string }, {}, {}>, res: Response<MyResponse<News[]>>) => {
  const { source } = req.params;

  const page = parseInt(req.params.page) ? parseInt(req.params.page) : 1;

  const news: News[] = [];

  //find what is the news source
  const newsSource = NewsSources.find((newsPaper) => newsPaper.sourceName.toLowerCase() === source.toLowerCase());

  if (!newsSource) throw new CustomError("News source not found", 404);

  //return news source page 1 if page is not specified
  if (page === 1) {
    news.push(...(await GetNewsBySourceData(newsSource, newsSource.defaultPage ?? page)));
    return res.status(200).json({ data: news });
  }

  //return data from given page
  news.push(...(await GetNewsBySourceData(newsSource, page)));
  return res.status(200).json({ data: news });
};

export { GetNews, GetNewsByDynamic };
