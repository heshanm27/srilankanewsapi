import express from "express";
import { GetNews, GetNewsByDynamic } from "../contollers/news.controller";
const router = express.Router();

router.route("/").get(GetNews);
router.route("/:source/data/:page").get(GetNewsByDynamic);

export default router;
