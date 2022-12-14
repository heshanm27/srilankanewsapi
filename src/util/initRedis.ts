import Redis from "ioredis";

const client = new Redis({
  host: process.env.REDIS_HOST!,
  port: parseInt(process.env.REDIS_PORT!),
  password: process.env.REDIS_PASSWORD!,
});

client.on("connect", () => {
  console.log("Redis client connected");
});

client.on("error", (err) => {
  console.log(`Something went wrong ${err}`);
});

export default client;
