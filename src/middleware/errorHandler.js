"use strict";
exports.__esModule = true;
var customError_1 = require("../util/error/customError");
var ErrorHandlerMiddleware = function (err, req, res, next) {
    console.log("errror");
    if (err instanceof customError_1["default"]) {
        return res.status(err.statusCode).json({
            succes: false,
            err: err.message
        });
    }
    return res.status(500).json({ succes: false, err: err.message });
};
exports["default"] = ErrorHandlerMiddleware;
