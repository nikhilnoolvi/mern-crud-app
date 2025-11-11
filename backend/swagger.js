const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MERN CRUD API",
      version: "1.0.0",
      description: "API documentation for the MERN CRUD App",
      contact: {
        name: "Nikhil",
        email: "noolvi@example.com",
      },
    },
    servers: [
      {
        url: "http://localhost:8005", // Backend base URL
        description: "Development server",
      },
    ],
  },
  apis: ["./routes/*.js"], // path where your route files are
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;