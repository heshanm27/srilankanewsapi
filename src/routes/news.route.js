"use strict";
exports.__esModule = true;
var express_1 = require("express");
var news_controller_1 = require("../contollers/news.controller");
var router = express_1["default"].Router();
router.route("/").get(news_controller_1.GetNews);
router.route("/:source/data/:page").get(news_controller_1.GetNewsByDynamic);
exports["default"] = router;
