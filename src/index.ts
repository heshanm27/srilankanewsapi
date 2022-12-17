import express, { Request, Response } from "express";
import "express-async-errors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

import FeatureNews from "./routes/featureNews.route";
import News from "./routes/news.route";
import errorHandler from "./middleware/errorHandler";

app.get("/", (req: Request, res: Response) => {
  res.send("Welome to Sri Lankan News API");
});

app.use("/news/sinhala/feature", FeatureNews);
app.use("/news/sinhala", News);
app.use(errorHandler);
const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});
