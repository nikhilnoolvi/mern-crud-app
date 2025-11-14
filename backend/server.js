
const app = require("./app");

const PORT = process.env.PORT;
//app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📘 Swagger Docs available at http://localhost:${PORT}/api-docs`);
});
