import { Request, Response } from "express";
import { GetNewsData, News, GetNewsBySourceData } from "../service/source";

import { NewsSources } from "../util/dataOrigins";
import client from "../util/initRedis";

const GetNews = async (req: Request, res: Response) => {
  const news: News[] = [];

  client.get("news", async (err, data) => {
    if (err) throw err;
    if (data !== null) {
      res.status(200).json(JSON.parse(data!));
    } else {
      for await (const newsPaper of NewsSources) {
        const receviedNews = await GetNewsData(newsPaper);
        news.push(...receviedNews);
      }
      client.setex("news", 900, JSON.stringify(news));
      res.status(200).json(news);
    }
  });
};

const GetNewsByDynamic = async (req: Request<{ source: string; page: string }, {}, {}>, res: Response) => {
  const { source } = req.params;

  const page = parseInt(req.params.page) ? parseInt(req.params.page) : 1;
  const news: News[] = [];

  const newsSource = NewsSources.find((newsPaper) => newsPaper.sourceName.toLowerCase() === source.toLowerCase());
  console.log(typeof page);
  console.log(page);
  if (!newsSource) return res.status(404).json({ message: "Source not found" });

  if (page === 1) {
    news.push(...(await GetNewsBySourceData(newsSource, newsSource.defaultPage ?? page)));

    return res.status(200).json({ msg: "News source default page information   ", news });
  }

  news.push(...(await GetNewsBySourceData(newsSource, page)));
  return res.status(200).json(news);
};

export { GetNews, GetNewsByDynamic };
