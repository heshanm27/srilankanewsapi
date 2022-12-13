import express from "express";
import { GetNewsFeature, GetNewsFeatureDinamina, GetNewsFeatureLankadipa } from "../contollers/featureNews.controller";
const router = express.Router();

router.route("/features").get(GetNewsFeature);
router.route("/features/lankadipa").get(GetNewsFeatureLankadipa);
router.route("/features/dinamina").get(GetNewsFeatureDinamina);
export default router;
