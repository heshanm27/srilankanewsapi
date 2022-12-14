import { Request, Response } from "express";
import { GetNewsData, GetLankaDeepaNews, News, GetDeshayaNews, GetMawubimaNews, GetAdaNews, GetAdaDeranaNews, GetBBCNews } from "../service/source";
import { FeatureNews } from "../util/dataOrigins";
import client from "../util/initRedis";

const GetNews = async (req: Request, res: Response) => {
  const news: News[] = [];
  client.get("news", async (err, data) => {
    if (err) throw err;
    if (data !== null) {
      res.status(200).json(JSON.parse(data!));
    } else {
      for await (const newsPaper of FeatureNews) {
        const receviedNews = await GetNewsData(newsPaper, 1);

        news.push(...receviedNews);
      }
      client.setex("news", 900, JSON.stringify(news));
      res.status(200).json(news);
    }
  });
};

const GetNewsBySource = async (req: Request, res: Response) => {
  const { source, page } = req.params;
  console.log(source, page);
  const news: News[] = [];

  switch (source) {
    case "lankadeepa.lk":
      const receviedNews = await GetLankaDeepaNews(parseInt(page ? page : "0"));
      console.log(receviedNews);
      news.push(...receviedNews);
      break;
    case "deshaya.lk":
      const recevieDeshaydNews = await GetDeshayaNews(parseInt(page));
      news.push(...recevieDeshaydNews);
      break;
    case "mawbima.lk":
      const recevieMawbimaNews = await GetMawubimaNews(parseInt(page));
      news.push(...recevieMawbimaNews);
      break;
    case "ada.lk":
      const recevieAdaNews = await GetAdaNews(parseInt(page));
      news.push(...recevieAdaNews);
      break;
    case "adaderana.lk":
      const recevieAdaderanaNews = await GetAdaDeranaNews(parseInt(page));
      news.push(...recevieAdaderanaNews);
      break;
    case "bbcsinhala.com":
      const recevieBbcSinhalaNews = await GetBBCNews(parseInt(page));
      news.push(...recevieBbcSinhalaNews);
      break;
    default:
      break;
  }

  res.status(200).json(news);
};

export { GetNews, GetNewsBySource };
