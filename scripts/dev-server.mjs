import { createServer } from "node:http";
import { createReadStream, existsSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL("..", import.meta.url)));
const host = process.env.HOST || "127.0.0.1";
const preferredPort = Number(process.env.PORT || 3000);
const maxPort = preferredPort + 10;

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

function resolvePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const cleanPath = normalize(decoded).replace(/^(\.\.[/\\])+/, "");
  const path = join(root, cleanPath === "/" ? "index.html" : cleanPath);

  if (existsSync(path)) return path;
  if (existsSync(`${path}.html`)) return `${path}.html`;

  return join(root, "404.html");
}

const server = createServer((request, response) => {
  const filePath = resolvePath(request.url || "/");
  const ext = extname(filePath);

  response.setHeader("Content-Type", contentTypes[ext] || "application/octet-stream");
  createReadStream(filePath)
    .on("error", () => {
      response.writeHead(500);
      response.end("Internal server error");
    })
    .pipe(response);
});

function listen(port) {
  server.once("error", (error) => {
    if (error.code === "EADDRINUSE" && !process.env.PORT && port < maxPort) {
      listen(port + 1);
      return;
    }

    if (error.code === "EADDRINUSE") {
      console.error(`Port ${port} is already in use. Try PORT=${port + 1} npm run dev`);
      process.exit(1);
    }

    throw error;
  });

  server.listen(port, host, () => {
    console.log(`Local site running at http://${host}:${port}`);
  });
}

listen(preferredPort);
