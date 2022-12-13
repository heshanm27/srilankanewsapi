import { Request, Response } from "express";
import { GetLankaDeepaNews, News, GetDeshayaNews, GetMawubimaNews, GetAdaNews, GetAdaDeranaNews } from "../service/source";

const GetNews = async (req: Request, res: Response) => {
  const news = await GetLankaDeepaNews();
  res.status(200).json(news);
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
    default:
      break;
  }

  res.status(200).json(news);
};

export { GetNews, GetNewsBySource };
