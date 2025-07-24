# Redis Caching Example

A Node.js application demonstrating how to use Redis for caching API responses.

## Features

- Express server with a `/repos/:username` endpoint
- Fetches user data from the GitHub API
- Caches responses in Redis for 30 seconds to reduce API calls
- Uses `axios` for HTTP requests and `redis` for caching

## How to Use

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Start Redis server** (if not already running):
   ```sh
   redis-server
   ```

3. **Run the app:**
   ```sh
   node index.js
   ```

4. **Test the endpoint:**
   Visit [http://localhost:4000/repos/{username}](http://localhost:4000/repos/{username})  
   Replace `{username}` with any GitHub username.

## Files

- `index.js` – Main server file

## Environment Variables

- `PORT` – Port for the Express server (default: 4000)
- `REDIS_PORT` – Redis server port (default: 6379)
- `REDIS_HOST` – Redis server host (default: 127.0.0.1)

## License

This project is open source and available under the [MIT License](LICENSE).