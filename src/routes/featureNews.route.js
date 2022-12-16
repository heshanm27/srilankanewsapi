"use strict";
exports.__esModule = true;
var express_1 = require("express");
var featureNews_controller_1 = require("../contollers/featureNews.controller");
var router = express_1["default"].Router();
router.route("/features").get(featureNews_controller_1.GetNewsFeature);
router.route("/features/lankadipa").get(featureNews_controller_1.GetNewsFeatureLankadipa);
router.route("/features/dinamina").get(featureNews_controller_1.GetNewsFeatureDinamina);
exports["default"] = router;
