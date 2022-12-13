export interface INewsPaper {
  name: string;
  url: string;
  baseUrl?: string;
  elementSelector: string;
}

const FeatureNews: INewsPaper[] = [
  {
    name: "Divaina",
    url: "https://divaina.lk/category/visheshanga/",
    baseUrl: "https://divaina.lk",
    elementSelector: "#tdi_76 > div",
  },
  //   {
  //     name: "Dinamina",
  //     url: "https://www.dinamina.lk/feature",
  //     baseUrl: "https://www.dinamina.lk",
  //     elementSelector: ".views-row",
  //   },
  //   {
  //     name: "Lankadeepa",
  //     url: "https://www.lankadeepa.lk/feature/1",
  //     baseUrl: "https://www.lankadeepa.lk/",
  //     elementSelector: ".post-content pright .row",
  //   },
  //   {
  //     name: "Deshaya",
  //     url: "https://www.deshaya.lk/43/features",
  //     baseUrl: "https://www.deshaya.lk",
  //     elementSelector: ".sec-1-items",
  //   },
];

export { FeatureNews };
