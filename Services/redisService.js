const redis = require("redis");
const client = redis.createClient();

client.on("error", (err) => console.error("Redis Client Error", err));

client.connect();

exports.setCache = async (key, value) => {
  await client.set(key, value);
};

exports.getCache = async (key) => {
  return client.get(key);
};

exports.invalidateCache = async (key) => {
  await client.del(key);
};
