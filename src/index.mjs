import { createServer } from "http";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import the server handler from the Nitro build
const { default: server } = await import("./server.js");

const port = process.env.PORT || 3000;

// Create Node.js HTTP server that delegates to the fetch handler
const httpServer = createServer(async (req, res) => {
  try {
    // Convert Node.js request to Web Request
    const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);

    // Handle request body
    let body = null;
    if (req.method !== "GET" && req.method !== "HEAD") {
      body = await new Promise((resolve) => {
        let chunks = [];
        req.on("data", (chunk) => chunks.push(chunk));
        req.on("end", () => resolve(Buffer.concat(chunks)));
      });
    }

    // Create fetch Request
    const request = new Request(url, {
      method: req.method,
      headers: req.headers,
      body,
    });

    // Call the fetch handler
    const response = await server.fetch(request, {}, {});

    // Send response
    res.writeHead(response.status, Object.fromEntries(response.headers));
    res.end(await response.arrayBuffer());
  } catch (error) {
    console.error("Server error:", error);
    res.writeHead(500, { "content-type": "text/plain" });
    res.end("Internal Server Error");
  }
});

httpServer.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
