import axios from "axios";
import { load } from "cheerio";
import puppeteer from "puppeteer";
import { INewsPaper } from "../util/dataOrigins";
import CustomError from "../util/error/customError";

export interface News {
  title: string;
  url?: string;
  img?: string;
  timestamp: string;
  description: string;
  source: string;
}

const GetNewsData = async (source: INewsPaper): Promise<News[]> => {
  const page = source.defaultPage ?? 1;
  console.log(page, +4);
  //http request fro get data
  const { data } = await axios.get(source.url + page, {
    headers: {
      "Accept-Encoding": "application/json",
    },
  });

  const newsList: News[] = [];

  //load data to cheerio
  const $ = load(data);

  //elemet selector
  const elementSelector = source.elementSelector;

  //loop through each element that matches the selector
  $(elementSelector).each((index, parentElement) => {
    const html = $(parentElement).html();

    const url = $(parentElement).find("a").attr("href");

    const title = $(parentElement)
      .find("a")
      .text()
      .replace(source.selectors?.titleRegx ? source.selectors?.titleRegx : /(\r\n|\n|\r|\t)/gm, "")
      .trim();

    const timestamp = $(parentElement).find(source.selectors?.timestamp).text();

    const description = $(parentElement).find(source.selectors?.discription).text();

    const img = $(parentElement).find("img").attr("src");

    newsList.push({
      title,
      url,
      timestamp,
      img,
      description,
      source: source.sourceName,
    });
  });
  return newsList;
};

const GetNewsBySourceData = async (source: INewsPaper, page: number): Promise<News[]> => {
  try {
    //http request for get data
    const { data } = await axios.get(source.url + page * (source.pageMultiplier ? source.pageMultiplier : page), {
      headers: {
        "Accept-Encoding": "application/json",
      },
    });

    const newsList: News[] = [];

    const $ = load(data);

    //elemet selector
    const elementSelector = source.elementSelector;

    //loop through each element that matches the selector
    $(elementSelector).each((index, parentElement) => {
      const html = $(parentElement).html();

      const url = $(parentElement).find("a").attr("href");

      const title = $(parentElement)
        .find("a")
        .text()
        .replace(source.selectors?.titleRegx ? source.selectors?.titleRegx : /(\r\n|\n|\r|\t)/gm, "")
        .trim();

      const timestamp = $(parentElement).find(source.selectors?.timestamp).text();

      const description = $(parentElement).find(source.selectors?.discription).text();

      const img = $(parentElement).find("img").attr("src");

      newsList.push({
        title,
        url,
        timestamp,
        img,
        description,
        source: source.sourceName,
      });
    });
    return newsList;
  } catch (err) {
    throw new Error("Error Occured Can't Retrive Data From News Source ");
  }
};

const GetAdaDeranaNews = async (page: number = 1): Promise<News[]> => {
  const data = await run(`https://sinhala.adaderana.lk/sinhala-hot-news.php?pageno=${page}`);
  const newsList: News[] = [];
  const $ = load(data);
  const elementSelector = ".story-text";
  $(elementSelector).each((index, parentElement) => {
    const url = $(parentElement).find("a").attr("href");
    const title = $(parentElement)
      .find("a")
      .text()
      .replace(/(\r\n|\n|\r|\t|[(0)Comments])/gim, "")
      .trim();
    const timestamp = $(parentElement).find("span").text();
    const description = $(parentElement).find("p").text();
    const img = $(parentElement).find("img").attr("src");

    newsList.push({
      title,
      url,
      timestamp,
      img,
      description,
      source: "adaderana.lk",
    });
  });
  return newsList;
};

async function run(url: string) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url);

  return await page.content();
}
export { GetNewsData, GetAdaDeranaNews, GetNewsBySourceData };
