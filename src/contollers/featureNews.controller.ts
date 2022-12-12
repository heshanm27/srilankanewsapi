import { Request, Response } from "express";
import axios from "axios";
import { load } from "cheerio";

interface News {
  title: string;
  url?: string;
  img?: string;
  timestamp: string;
  description: string;
}
const GetNewsFeatures = async (req: Request, res: Response) => {
  const { data } = await axios.get("https://www.deshaya.lk/43/features");
  const newsList: News[] = [];
  const $ = load(data);

  const elementSelector = ".sec-1-items";

  const keys = ["title", "description", "image", "url"];

  $(elementSelector).each((index, parentElement) => {
    const url = $(parentElement).find("a").attr("href");
    const title = $(parentElement).find("a").text();
    const timestamp = $(parentElement).find(".sec-1-ite-com").text();
    const description = $(parentElement).find(".sec-1-ite-tex").text();
    const img = $(parentElement).find("img").attr("src");

    newsList.push({
      title,
      url,
      timestamp,
      img,
      description,
    });
  });

  res.status(200).json(newsList);
};

export { GetNewsFeatures };
