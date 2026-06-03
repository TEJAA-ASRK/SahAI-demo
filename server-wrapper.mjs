import { createServer } from "http";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import the Nitro server handler
const serverModule = await import("./dist/server/server.js");
const server = serverModule.default || serverModule;

const port = process.env.PORT || 3000;
const host = process.env.HOST || "0.0.0.0";

// Create Node.js HTTP server
const httpServer = createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", `http://${req.headers.host || `${host}:${port}`}`);

    // Handle request body
    let bodyBuffer = null;
    if (req.method !== "GET" && req.method !== "HEAD") {
      bodyBuffer = await new Promise((resolve) => {
        const chunks = [];
        req.on("data", (chunk) => chunks.push(chunk));
        req.on("end", () => resolve(Buffer.concat(chunks)));
      });
    }

    // Create Web Request
    const webRequest = new Request(url, {
      method: req.method,
      headers: req.headers,
      body: bodyBuffer && bodyBuffer.length > 0 ? bodyBuffer : undefined,
    });

    // Call the fetch handler
    const webResponse = await server.fetch(webRequest, {}, {});

    // Send response
    res.writeHead(webResponse.status, {
      ...Object.fromEntries(webResponse.headers),
      "Content-Length": webResponse.headers.get("content-length") || undefined,
    });
    res.end(await webResponse.arrayBuffer());
  } catch (error) {
    console.error("Server error:", error);
    res.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    res.end("Internal Server Error");
  }
});

httpServer.listen(port, host, () => {
  console.log(`🚀 Server running at http://${host}:${port}`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  httpServer.close(() => {
    console.log("HTTP server closed");
  });
});
