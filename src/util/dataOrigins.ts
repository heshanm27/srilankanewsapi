export interface INewsPaper {
  name: string;
  url: string;
  baseUrl?: string;
}

const FeatureNews: INewsPaper[] = [
  {
    name: "Divaina",
    url: "https://divaina.lk/category/visheshanga/",
    baseUrl: "https://divaina.lk",
  },
  {
    name: "Dinamina",
    url: "https://www.dinamina.lk/feature",
    baseUrl: "https://www.dinamina.lk",
  },
  {
    name: "Lankadeepa",
    url: "https://www.lankadeepa.lk/feature/1",
    baseUrl: "https://www.lankadeepa.lk/",
  },
  {
    name: "Deshaya",
    url: "https://www.deshaya.lk/43/features",
    baseUrl: "https://www.deshaya.lk",
  },
];

export { FeatureNews };
