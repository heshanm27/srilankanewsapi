import express from "express";
import { GetNews, GetNewsByDynamic } from "../contollers/news.controller";
import { runInContext } from "vm";
const router = express.Router();

router.route("/").get(GetNews);
router.route("/:source/data/:page").get(GetNewsByDynamic);
router.route("/test").get((req, res) => {
  res.send("test working");
});
export default router;
