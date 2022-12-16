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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
exports.__esModule = true;
exports.GetNewsByDynamic = exports.GetNews = void 0;
var source_1 = require("../service/source");
var dataOrigins_1 = require("../util/dataOrigins");
var initRedis_1 = require("../service/initRedis");
var customError_1 = require("../util/error/customError");
var GetNews = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var news;
    return __generator(this, function (_a) {
        news = [];
        initRedis_1["default"].del("news");
        //get data from redis
        initRedis_1["default"].get("news", function (err, data) { return __awaiter(void 0, void 0, void 0, function () {
            var _a, NewsSources_1, NewsSources_1_1, newsPaper, receviedNews, e_1_1, err_1;
            var _b, e_1, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        //if error occured return error
                        if (err)
                            return [2 /*return*/, new Error("Some thing went wrong from our side")];
                        //if data is available return data from redis
                        if (data !== null)
                            return [2 /*return*/, res.status(200).json(JSON.parse(data))];
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 17, , 18]);
                        _e.label = 2;
                    case 2:
                        _e.trys.push([2, 10, 11, 16]);
                        _a = true, NewsSources_1 = __asyncValues(dataOrigins_1.NewsSources);
                        _e.label = 3;
                    case 3: return [4 /*yield*/, NewsSources_1.next()];
                    case 4:
                        if (!(NewsSources_1_1 = _e.sent(), _b = NewsSources_1_1.done, !_b)) return [3 /*break*/, 9];
                        _d = NewsSources_1_1.value;
                        _a = false;
                        _e.label = 5;
                    case 5:
                        _e.trys.push([5, , 7, 8]);
                        newsPaper = _d;
                        return [4 /*yield*/, (0, source_1.GetNewsData)(newsPaper)];
                    case 6:
                        receviedNews = _e.sent();
                        news.push.apply(news, receviedNews);
                        return [3 /*break*/, 8];
                    case 7:
                        _a = true;
                        return [7 /*endfinally*/];
                    case 8: return [3 /*break*/, 3];
                    case 9: return [3 /*break*/, 16];
                    case 10:
                        e_1_1 = _e.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 16];
                    case 11:
                        _e.trys.push([11, , 14, 15]);
                        if (!(!_a && !_b && (_c = NewsSources_1["return"]))) return [3 /*break*/, 13];
                        return [4 /*yield*/, _c.call(NewsSources_1)];
                    case 12:
                        _e.sent();
                        _e.label = 13;
                    case 13: return [3 /*break*/, 15];
                    case 14:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 15: return [7 /*endfinally*/];
                    case 16:
                        //set data to redis
                        initRedis_1["default"].setex("news", 900, JSON.stringify(news));
                        res.status(200).json({ data: news });
                        return [3 /*break*/, 18];
                    case 17:
                        err_1 = _e.sent();
                        return [2 /*return*/, res.status(500).json({ succes: false, err: "Error Occured Can't Retrive Data From News Source " })];
                    case 18: return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); };
exports.GetNews = GetNews;
var GetNewsByDynamic = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var source, page, news, newsSource, _a, _b, _c, _d, _e, _f;
    var _g;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                source = req.params.source;
                page = parseInt(req.params.page) ? parseInt(req.params.page) : 1;
                news = [];
                newsSource = dataOrigins_1.NewsSources.find(function (newsPaper) { return newsPaper.sourceName.toLowerCase() === source.toLowerCase(); });
                if (!newsSource)
                    throw new customError_1["default"]("News source not found", 404);
                if (!(page === 1)) return [3 /*break*/, 2];
                _b = (_a = news.push).apply;
                _c = [news];
                return [4 /*yield*/, (0, source_1.GetNewsBySourceData)(newsSource, (_g = newsSource.defaultPage) !== null && _g !== void 0 ? _g : page)];
            case 1:
                _b.apply(_a, _c.concat([(_h.sent())]));
                return [2 /*return*/, res.status(200).json({ data: news })];
            case 2:
                _e = 
                //return data from given page
                (_d = news.push).apply;
                _f = [
                    //return data from given page
                    news];
                return [4 /*yield*/, (0, source_1.GetNewsBySourceData)(newsSource, page)];
            case 3:
                //return data from given page
                _e.apply(_d, _f.concat([(_h.sent())]));
                return [2 /*return*/, res.status(200).json({ data: news })];
        }
    });
}); };
exports.GetNewsByDynamic = GetNewsByDynamic;
