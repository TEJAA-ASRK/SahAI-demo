import serverModule from "../../dist/server/server.js";

const server = serverModule.default || serverModule;

export default async function handler(req, res) {
  try {
    const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);

    // Handle request body
    let body = null;
    if (req.method !== "GET" && req.method !== "HEAD") {
      body = req.body || null;
    }

    // Create Web Request
    const request = new Request(url, {
      method: req.method,
      headers: req.headers,
      body,
    });

    // Call the fetch handler
    const response = await server.fetch(request, {}, {});

    // Send response
    res.status(response.status);

    // Copy headers
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    res.send(await response.text());
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
