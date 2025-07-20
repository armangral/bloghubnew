import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BLOG APP",
      version: "1.0.0",
    },
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
            },
            name: {
              type: "string",
            },
            email: {
              type: "string",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"], // or adjust path
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
