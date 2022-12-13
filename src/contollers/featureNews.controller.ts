import { Request, Response } from "express";
import axios from "axios";
import { load } from "cheerio";
import { FeatureNews } from "../util/dataOrigins";
interface News {
  title: string;
  url?: string;
  img?: string;
  timestamp: string;
  description: string;
  newspaper: string;
}

const GetNewsFeatures = async (req: Request, res: Response) => {
  const value: Promise<string[]> = new Promise(function (myResolve, myReject) {
    const urls: string[] = [];
    FeatureNews.forEach((newsPaper) => {
      console.log(newsPaper.url);
      axios.get(newsPaper.url).then((res) => {
        const $ = load(res.data);
        const elementSelector = newsPaper.elementSelector;
        $(elementSelector).each((index, parentElement) => {
          const url = $(parentElement).find("a").attr("href");
          urls.push(url!);
          myResolve(urls);
        });
      });
    });
  });
  value.then((url) => {
    console.log(url);
    res.status(200).json(url);
  });
};

const GetNewsFeature = async (req: Request, res: Response) => {
  const { data } = await axios.get("https://www.deshaya.lk/43/features");
  const newsList: News[] = [];
  const $ = load(data);

  const elementSelector = ".sec-1-items";

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
      newspaper: "Deshaya",
    });
  });

  res.status(200).json(newsList);
};

const GetNewsFeatureLankadipa = async (req: Request, res: Response) => {
  const { data } = await axios.get("https://www.lankadeepa.lk/feature/1");

  const newsList: News[] = [];
  const $ = load(data);

  const elementSelector = ".row .simple-thumb";

  $(elementSelector).each((index, parentElement) => {
    const url = $(parentElement).find("a").attr("href");
    const title = $(parentElement)
      .find("a")
      .text()
      .replace(/(\r\n|\n|\r|\t)/gm, "")
      .trim();
    const timestamp = $(parentElement).find(".timeandauthor").text();
    const description = $(parentElement).find(".catexcerpt").text();
    const img = $(parentElement).find("img").attr("src");

    newsList.push({
      title,
      url,
      timestamp,
      img,
      description,
      newspaper: "Lankadeepa",
    });
  });

  res.status(200).json(newsList);
};

const GetNewsFeatureDinamina = async (req: Request, res: Response) => {
  const { data } = await axios.get("https://www.deshaya.lk/40/news", {
    headers: {
      "Accept-Encoding": "application/json",
    },
  });

  const newsList: News[] = [];

  const $ = load(data);

  const elementSelector = ".sec-1-items";

  $(elementSelector).each((index, parentElement) => {
    // const url = $(parentElement).html();
    // console.log(url);
    // console.log(index);
    const url = $(parentElement).find("a").attr("href");
    const title = $(parentElement)
      .find("a")
      .text()
      .replace(/(\r\n|\n|\r|\t)/gm, "")
      .trim();
    const timestamp = $(parentElement).find(".sec-1-ite-com").text();
    const description = $(parentElement).find(".sec-1-ite-tex").text();
    const img = $(parentElement).find("span").attr("src");
    newsList.push({
      title,
      url,
      timestamp,
      img,
      description,
      newspaper: "Dinamina",
    });
  });

  res.status(200).json(newsList);
};

export { GetNewsFeatures, GetNewsFeature, GetNewsFeatureDinamina, GetNewsFeatureLankadipa };
