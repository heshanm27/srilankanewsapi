import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();

import FeatureNews from "./routes/featureNews.route";
import News from "./routes/news.route";

app.get("/", (req: Request, res: Response) => {
  res.send("Welome to Sri Lankan News API");
});

app.use("/news/feature", FeatureNews);
app.use("/news", News);

const PORT = 8000;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});
