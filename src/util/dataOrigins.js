"use strict";
exports.__esModule = true;
exports.NewsSources = void 0;
exports.NewsSources = [
    {
        sourceName: "Mawbima.lk",
        url: "https://mawbima.lk/category/%E0%B6%AF%E0%B7%9A%E0%B7%81%E0%B7%93%E0%B6%BA/page/",
        baseUrl: "https://mawbima.lk",
        elementSelector: ".td-category-pos-",
        selectors: {
            discription: ".entry-date",
            timestamp: ".td-post-date"
        }
    },
    {
        sourceName: "Lankadeepa.lk",
        url: "https://www.lankadeepa.lk/latest_news/",
        baseUrl: "https://www.lankadeepa.lk/",
        elementSelector: ".simple-thumb",
        selectors: {
            discription: ".catexcerpt",
            timestamp: ".timeandauthor"
        }
    },
    {
        sourceName: "Deshaya.lk",
        url: "https://www.deshaya.lk/40/news/",
        baseUrl: "https://www.deshaya.lk",
        elementSelector: ".sec-1-items",
        defaultPage: 0,
        pageMultiplier: 20,
        selectors: {
            discription: ".sec-1-ite-tex",
            timestamp: ".sec-1-ite-com"
        }
    },
    {
        sourceName: "Ada.lk",
        url: "https://www.ada.lk/latest-news/11/",
        baseUrl: "https://www.ada.lk",
        elementSelector: ".mt-3",
        defaultPage: 0,
        pageMultiplier: 30,
        selectors: {
            titleRegx: "/(\r\n|\n|\r|\t|[read more])/gim",
            discription: ".cat-b-text",
            timestamp: "h6"
        }
    },
    {
        sourceName: "BBCSinhala.com",
        url: "https://www.bbc.com/sinhala/topics/cg7267dz901t?page=",
        baseUrl: "https://www.bbc.com/sinhala/topics/",
        elementSelector: ".bbc-v8cf3q",
        selectors: {
            discription: ".cat-b-text",
            timestamp: "time"
        }
    },
];
// {
//   sourceName: "Adaderana.lk",
//   url: "https://sinhala.adaderana.lk/sinhala-hot-news.php?pageno=",
//   baseUrl: "https://sinhala.adaderana.lk",
//   elementSelector: ".story-text",
//   selectors: {
//     titleRegx: "/(\r\n|\n|\r|\t|[(0)Comments])/gim",
//     discription: "p",
//     timestamp: "span",
//   },
// },
