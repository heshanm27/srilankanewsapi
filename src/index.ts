import express, { Request, Response } from "express";
import FeatureNews from "./routes/featureNews.route";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Welome to Sri Lankan News API");
});
app.use("/news", FeatureNews);
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
