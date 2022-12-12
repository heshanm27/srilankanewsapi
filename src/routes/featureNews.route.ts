import express from "express";
import { GetNewsFeatures } from "../contollers/featureNews.controller";
const router = express.Router();

router.route("/features").get(GetNewsFeatures);

export default router;
