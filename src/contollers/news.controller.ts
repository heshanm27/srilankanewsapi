import { Request, Response } from "express";
import { GetNewsData, News, GetNewsBySourceData } from "../service/source";
import { NewsSources } from "../util/dataOrigins";
import client from "../service/initRedis";
import CustomError from "../util/error/customError";

type MyResponse<T> = { err: string; succes: boolean } | { data: T; succes: boolean };

const GetNews = async (req: Request, res: Response<MyResponse<News[]>>) => {
  const news: News[] = [];

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
      res.status(200).json({ data: news, succes: true });
    } catch (err: any) {
      return res.status(500).json({ succes: false, err: "Error Occured Can't Retrive Data From News Source " });
    }
  });
};

const GetNewsByDynamic = async (req: Request<{ source: string; page: string }, {}, {}>, res: Response<MyResponse<News[]>>) => {
  const { source, page } = req.params;

  const news: News[] = [];

  //find what is the news source
  const newsSource = NewsSources.find((newsPaper) => newsPaper.sourceName.toLowerCase() === source.toLowerCase());

  if (!newsSource) throw new CustomError("News source not found", 404);

  const key = `${newsSource.sourceName}${page}`;
  //return news source page 1 if page is not specified

  client.get(key, async (err, data) => {
    //if error occured return error
    if (err) return new Error("Some thing went wrong from our side");

    //if data is available return data from redis
    if (data !== null) return res.status(200).json(JSON.parse(data!));

    try {
      news.push(...(await GetNewsBySourceData(newsSource, parseInt(page))));
      client.setex(key, 300, JSON.stringify(news));
      return res.status(200).json({ data: news, succes: true });
    } catch (err) {
      return res.status(500).json({ succes: false, err: "Error Occured Can't Retrive Data From News Source " });
    }
  });
};

export { GetNews, GetNewsByDynamic };
