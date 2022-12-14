export interface INewsPaper {
  sourceName: string;
  url: string;
  baseUrl?: string;
  elementSelector: string;
  selectors?: {
    titleRegx?: string;
    discription: string;
    timestamp?: string;
  };
}

export const FeatureNews: INewsPaper[] = [
  {
    sourceName: "Mawbima.lk",
    url: `https://mawbima.lk/category/%E0%B6%AF%E0%B7%9A%E0%B7%81%E0%B7%93%E0%B6%BA/page/1/`,
    baseUrl: "https://mawbima.lk",
    elementSelector: ".td-category-pos-",
    selectors: {
      discription: ".entry-date",
      timestamp: ".td-post-date",
    },
  },
  {
    sourceName: "Lankadeepa.lk",
    url: `https://www.lankadeepa.lk/latest_news/1`,
    baseUrl: "https://www.lankadeepa.lk/",
    elementSelector: ".simple-thumb",
    selectors: {
      discription: ".catexcerpt",
      timestamp: ".timeandauthor",
    },
  },
  {
    sourceName: "Deshaya.lk",
    url: "https://www.deshaya.lk/40/news/",
    baseUrl: "https://www.deshaya.lk",
    elementSelector: ".sec-1-items",
    selectors: {
      discription: ".sec-1-ite-tex",
      timestamp: ".sec-1-ite-com",
    },
  },

  {
    sourceName: "Ada.lk",
    url: "https://www.ada.lk/latest-news/11/",
    baseUrl: "https://www.ada.lk",
    elementSelector: ".mt-3",
    selectors: {
      titleRegx: "/(\r\n|\n|\r|\t|[read more])/gim",
      discription: ".cat-b-text",
      timestamp: "h6",
    },
  },
  {
    sourceName: "BBCSinhala.lk",
    url: "https://www.bbc.com/sinhala/topics/cg7267dz901t?page=1",
    baseUrl: "https://sinhala.adaderana.lk",
    elementSelector: ".bbc-v8cf3q",
    selectors: {
      discription: ".cat-b-text",
      timestamp: "time",
    },
  },
  {
    sourceName: "Adaderana.lk",
    url: "https://sinhala.adaderana.lk/sinhala-hot-news.php?pageno=1",
    baseUrl: "https://sinhala.adaderana.lk",
    elementSelector: ".story-text",
    selectors: {
      titleRegx: "/(\r\n|\n|\r|\t|[(0)Comments])/gim",
      discription: "p",
      timestamp: "span",
    },
  },
];
