import axios from "axios";
import { load } from "cheerio";
import puppeteer from "puppeteer";
import { INewsPaper } from "../util/dataOrigins";
export interface News {
  title: string;
  url?: string;
  img?: string;
  timestamp: string;
  description: string;
  source: string;
}

const GetNewsData = async (source: INewsPaper, page: number = 0): Promise<News[]> => {
  console.log(source.url);
  const { data } = await axios.get(source.url, {
    headers: {
      "Accept-Encoding": "application/json",
    },
  });

  const newsList: News[] = [];

  const $ = load(data);

  const elementSelector = source.elementSelector!;

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

const GetLankaDeepaNews = async (page: number = 0): Promise<News[]> => {
  const { data } = await axios.get(`https://www.lankadeepa.lk/latest_news/1/${page * 30}`, {
    headers: {
      "Accept-Encoding": "application/json",
    },
  });

  const newsList: News[] = [];

  const $ = load(data);

  const elementSelector = ".simple-thumb";

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
      source: "lankadeepa.lk",
    });
  });
  return newsList;
};

const GetDeshayaNews = async (page: number = 0): Promise<News[]> => {
  console.log(page * 20);
  const { data } = await axios.get(`https://www.deshaya.lk/40/news/${page * 20}`, {
    headers: {
      "Accept-Encoding": "application/json",
    },
  });

  const newsList: News[] = [];
  const $ = load(data);
  const elementSelector = ".sec-1-items";

  $(elementSelector).each((index, parentElement) => {
    const url = $(parentElement).find("a").attr("href");
    const title = $(parentElement)
      .find("a")
      .text()
      .replace(/(\r\n|\n|\r|\t)/gm, "")
      .trim();
    const timestamp = $(parentElement).find(".sec-1-ite-com").text();
    const description = $(parentElement).find(".sec-1-ite-tex").text();
    const img = $(parentElement).find("img").attr("src");

    newsList.push({
      title,
      url,
      timestamp,
      img,
      description,
      source: "deshaya.lk",
    });
  });
  return newsList;
};

const GetMawubimaNews = async (page: number = 0): Promise<News[]> => {
  console.log(page);
  const { data } = await axios.get(`https://mawbima.lk/category/%E0%B6%AF%E0%B7%9A%E0%B7%81%E0%B7%93%E0%B6%BA/page/${page}/`, {
    headers: {
      "Accept-Encoding": "application/json",
    },
  });

  const newsList: News[] = [];
  const $ = load(data);
  const elementSelector = ".td-category-pos-";

  $(elementSelector).each((index, parentElement) => {
    const url = $(parentElement).find("a").attr("href");
    const title = $(parentElement)
      .find("a")
      .text()
      .replace(/(\r\n|\n|\r|\t)/gm, "")
      .trim();
    const timestamp = $(parentElement).find(".entry-date").text();
    const description = $(parentElement).find(".td-post-date").text();
    const img = $(parentElement).find("img").attr("src");

    newsList.push({
      title,
      url,
      timestamp,
      img,
      description,
      source: "mawbima.lk",
    });
  });
  return newsList;
};

const GetAdaNews = async (page: number = 0): Promise<News[]> => {
  console.log(page);
  const { data } = await axios.get(`https://www.ada.lk/latest-news/11/${page * 30}`, {
    headers: {
      "Accept-Encoding": "application/json",
    },
  });

  const newsList: News[] = [];
  const $ = load(data);
  const elementSelector = ".mt-3";

  $(elementSelector).each((index, parentElement) => {
    const url = $(parentElement).find("a").attr("href");
    const title = $(parentElement)
      .find("a")
      .text()
      .replace(/(\r\n|\n|\r|\t|[read more])/gim, "")
      .trim();
    const timestamp = $(parentElement).find("h6").text();
    const description = $(parentElement).find(".cat-b-text").text();
    const img = $(parentElement).find("img").attr("src");

    newsList.push({
      title,
      url,
      timestamp,
      img,
      description,
      source: "ada.lk",
    });
  });
  return newsList;
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

const GetBBCNews = async (page: number = 0): Promise<News[]> => {
  console.log(page);
  const { data } = await axios.get(`https://www.bbc.com/sinhala/topics/cg7267dz901t?page=${page}`, {
    headers: {
      "Accept-Encoding": "application/json",
    },
  });

  const newsList: News[] = [];
  const $ = load(data);
  const elementSelector = ".bbc-v8cf3q";

  $(elementSelector).each((index, parentElement) => {
    const url = $(parentElement).find("a").attr("href");
    const title = $(parentElement)
      .find("a")
      .text()
      .replace(/(\r\n|\n|\r|\t)/gim, "")
      .trim();
    const timestamp = $(parentElement).find("time").text();
    const description = $(parentElement).find(".cat-b-text").text();
    const img = $(parentElement).find("img").attr("src");

    newsList.push({
      title,
      url,
      timestamp,
      img,
      description,
      source: "bbcsinhala.com",
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
export { GetNewsData, GetLankaDeepaNews, GetDeshayaNews, GetMawubimaNews, GetAdaNews, GetAdaDeranaNews, GetBBCNews };
