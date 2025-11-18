const fs = require("fs");
const path = require("path");
const swaggerSpec = require("./swagger"); // your swagger-jsdoc config
const swaggerUiDist = require("swagger-ui-dist");
const { exec } = require("child_process");

// 1️⃣ Define docs folder
const outputDir = path.join(__dirname, "../docs");

// 2️⃣ Delete old docs folder if exists
if (fs.existsSync(outputDir)) {
  fs.rmSync(outputDir, { recursive: true, force: true });
  console.log("Old docs folder deleted.");
}

// 3️⃣ Create fresh docs folder
fs.mkdirSync(outputDir);
console.log("Docs folder created.");

// 4️⃣ Write swagger.json
fs.writeFileSync(path.join(outputDir, "swagger.json"), JSON.stringify(swaggerSpec, null, 2));
console.log("swagger.json generated successfully!");

// 5️⃣ Copy Swagger UI dist files locally
const swaggerDistPath = swaggerUiDist.getAbsoluteFSPath();
fs.cpSync(swaggerDistPath, outputDir, { recursive: true });
console.log("Swagger UI static files copied locally.");

// 6️⃣ Create minimal index.html pointing to local files
const indexHtmlContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>CRUDD API Swagger UI</title>
    <link rel="stylesheet" href="swagger-ui.css" />
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="swagger-ui-bundle.js"></script>
    <script src="swagger-ui-standalone-preset.js"></script>
    <script>
      window.onload = function() {
        SwaggerUIBundle({
          url: "./swagger.json",
          dom_id: '#swagger-ui',
          deepLinking: true,
          presets: [
            SwaggerUIBundle.presets.apis,
            SwaggerUIStandalonePreset
          ],
          layout: "BaseLayout"
        });
      }
    </script>
  </body>
</html>`;

// Write index.html
fs.writeFileSync(path.join(outputDir, "index.html"), indexHtmlContent);
console.log("index.html created successfully!");

// 7️⃣ Start live server automatically
console.log("Starting live server at http://localhost:3000 ...");
exec(`npx serve ${outputDir}`, (error, stdout, stderr) => {
  if (error) console.error(`Error: ${error.message}`);
  if (stderr) console.error(`Stderr: ${stderr}`);
  console.log(stdout);
});
