"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.GetNewsBySourceData = exports.GetAdaDeranaNews = exports.GetNewsData = void 0;
var axios_1 = require("axios");
var cheerio_1 = require("cheerio");
var puppeteer_1 = require("puppeteer");
var GetNewsData = function (source) { return __awaiter(void 0, void 0, void 0, function () {
    var page, data, newsList, $, elementSelector;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                page = (_a = source.defaultPage) !== null && _a !== void 0 ? _a : 1;
                console.log(page, +4);
                return [4 /*yield*/, axios_1["default"].get(source.url + page, {
                        headers: {
                            "Accept-Encoding": "application/json"
                        }
                    })];
            case 1:
                data = (_b.sent()).data;
                newsList = [];
                $ = (0, cheerio_1.load)(data);
                elementSelector = source.elementSelector;
                //loop through each element that matches the selector
                $(elementSelector).each(function (index, parentElement) {
                    var _a, _b, _c, _d;
                    var html = $(parentElement).html();
                    var url = $(parentElement).find("a").attr("href");
                    var title = $(parentElement)
                        .find("a")
                        .text()
                        .replace(((_a = source.selectors) === null || _a === void 0 ? void 0 : _a.titleRegx) ? (_b = source.selectors) === null || _b === void 0 ? void 0 : _b.titleRegx : /(\r\n|\n|\r|\t)/gm, "")
                        .trim();
                    var timestamp = $(parentElement).find((_c = source.selectors) === null || _c === void 0 ? void 0 : _c.timestamp).text();
                    var description = $(parentElement).find((_d = source.selectors) === null || _d === void 0 ? void 0 : _d.discription).text();
                    var img = $(parentElement).find("img").attr("src");
                    newsList.push({
                        title: title,
                        url: url,
                        timestamp: timestamp,
                        img: img,
                        description: description,
                        source: source.sourceName
                    });
                });
                return [2 /*return*/, newsList];
        }
    });
}); };
exports.GetNewsData = GetNewsData;
var GetNewsBySourceData = function (source, page) { return __awaiter(void 0, void 0, void 0, function () {
    var data, newsList_1, $_1, elementSelector, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1["default"].get(source.url + page * (source.pageMultiplier ? source.pageMultiplier : page), {
                        headers: {
                            "Accept-Encoding": "application/json"
                        }
                    })];
            case 1:
                data = (_a.sent()).data;
                newsList_1 = [];
                $_1 = (0, cheerio_1.load)(data);
                elementSelector = source.elementSelector;
                //loop through each element that matches the selector
                $_1(elementSelector).each(function (index, parentElement) {
                    var _a, _b, _c, _d;
                    var html = $_1(parentElement).html();
                    var url = $_1(parentElement).find("a").attr("href");
                    var title = $_1(parentElement)
                        .find("a")
                        .text()
                        .replace(((_a = source.selectors) === null || _a === void 0 ? void 0 : _a.titleRegx) ? (_b = source.selectors) === null || _b === void 0 ? void 0 : _b.titleRegx : /(\r\n|\n|\r|\t)/gm, "")
                        .trim();
                    var timestamp = $_1(parentElement).find((_c = source.selectors) === null || _c === void 0 ? void 0 : _c.timestamp).text();
                    var description = $_1(parentElement).find((_d = source.selectors) === null || _d === void 0 ? void 0 : _d.discription).text();
                    var img = $_1(parentElement).find("img").attr("src");
                    newsList_1.push({
                        title: title,
                        url: url,
                        timestamp: timestamp,
                        img: img,
                        description: description,
                        source: source.sourceName
                    });
                });
                return [2 /*return*/, newsList_1];
            case 2:
                err_1 = _a.sent();
                throw new Error("Error Occured Can't Retrive Data From News Source ");
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.GetNewsBySourceData = GetNewsBySourceData;
var GetAdaDeranaNews = function (page) {
    if (page === void 0) { page = 1; }
    return __awaiter(void 0, void 0, void 0, function () {
        var data, newsList, $, elementSelector;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, run("https://sinhala.adaderana.lk/sinhala-hot-news.php?pageno=".concat(page))];
                case 1:
                    data = _a.sent();
                    newsList = [];
                    $ = (0, cheerio_1.load)(data);
                    elementSelector = ".story-text";
                    $(elementSelector).each(function (index, parentElement) {
                        var url = $(parentElement).find("a").attr("href");
                        var title = $(parentElement)
                            .find("a")
                            .text()
                            .replace(/(\r\n|\n|\r|\t|[(0)Comments])/gim, "")
                            .trim();
                        var timestamp = $(parentElement).find("span").text();
                        var description = $(parentElement).find("p").text();
                        var img = $(parentElement).find("img").attr("src");
                        newsList.push({
                            title: title,
                            url: url,
                            timestamp: timestamp,
                            img: img,
                            description: description,
                            source: "adaderana.lk"
                        });
                    });
                    return [2 /*return*/, newsList];
            }
        });
    });
};
exports.GetAdaDeranaNews = GetAdaDeranaNews;
function run(url) {
    return __awaiter(this, void 0, void 0, function () {
        var browser, page;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, puppeteer_1["default"].launch({ headless: true })];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _a.sent();
                    return [4 /*yield*/, page.goto(url)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, page.content()];
                case 4: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
