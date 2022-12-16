"use strict";
exports.__esModule = true;
var ioredis_1 = require("ioredis");
var client = new ioredis_1["default"]({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD
});
client.on("connect", function () {
    console.log("Redis client connected");
});
client.on("error", function (err) {
    console.log("Something went wrong ".concat(err));
});
exports["default"] = client;
