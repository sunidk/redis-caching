const express = require("express");
const axios = require("axios");
const redis = require("redis");
const app = express();

const PORT = process.env.PORT || 4000;
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_HOST = process.env.REDIS_HOST || "127.0.0.1";

// Create Redis client
const client = redis.createClient({
  host: REDIS_HOST,
  port: REDIS_PORT,
});

// Connect to Redis
client
  .connect()
  .then(() => console.log("Connected to Redis"))
  .catch((err) => {
    console.error("Error connecting to Redis:", err);
  });

function cache(req, res, next) {
  console.log("Fetching Data from Redis....");
  const { username } = req.params;

  // Fetch the stored data in Redis using the username as the key
  client
    .get(username)
    .then((data) => {
      if (data !== null) {
        return res.send(JSON.parse(data));
      } else {
        console.log("Cache miss..!");
        next(); // Proceed to fetch data from the database
      }
    })
    .catch((err) => {
      console.error("Redis get error:", err);
      next();
    });
}

async function getRepos(req, res, next) {
  try {
    console.log("Fetching Data from Database....");
    const { username } = req.params;

    // Fetch data from GitHub API
    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );
    const data = response.data;

    // Store the fetched data in Redis, using the username as the key
    await client.setEx(username, 30, JSON.stringify(data));
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
}

app.get("/repos/:username", cache, getRepos);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
