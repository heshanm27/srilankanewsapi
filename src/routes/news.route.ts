import express from "express";
import { GetNews, GetNewsBySource } from "../contollers/news.controller";
const router = express.Router();

router.route("/").get(GetNews);
router.route("/:source/data/:page").get(GetNewsBySource);

export default router;
