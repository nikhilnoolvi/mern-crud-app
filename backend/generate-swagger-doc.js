const fs = require("fs");
const path = require("path");
const swaggerUiDist = require("swagger-ui-dist");
const swaggerSpec = require("./swagger"); // your swagger-jsdoc

const outputDir = path.join(__dirname, "../docs");

// 1. Create /docs folder
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// 2. Copy Swagger UI static files
const swaggerDistPath = swaggerUiDist.getAbsoluteFSPath();
fs.cpSync(swaggerDistPath, outputDir, { recursive: true });

// 3. Save swagger.json
const swaggerJsonPath = path.join(outputDir, "swagger.json");
fs.writeFileSync(swaggerJsonPath, JSON.stringify(swaggerSpec, null, 2));

// 4. Replace index.html to load our swagger.json
const indexHtmlPath = path.join(outputDir, "index.html");
let indexHtml = fs.readFileSync(indexHtmlPath, "utf8");
indexHtml = indexHtml.replace("https://petstore.swagger.io/v2/swagger.json", "swagger.json");
fs.writeFileSync(indexHtmlPath, indexHtml);

console.log("Swagger documentation generated successfully!");
