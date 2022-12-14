import Redis from "ioredis";

const client = new Redis({
  host: "redis-14464.c10.us-east-1-4.ec2.cloud.redislabs.com",
  port: 14464,
  password: "vcMl1FtQ2SN39IxsYeuk9eKi0YWOtSH0",
});

client.on("connect", () => {
  console.log("Redis client connected");
});

client.on("error", (err) => {
  console.log(`Something went wrong ${err}`);
});

export default client;
