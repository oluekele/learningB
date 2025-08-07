// src/swagger/swagger.config.ts
import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TypeScript API',
      version: '1.0.0',
      description: 'A simple API using Express, TypeScript, and Swagger',
    },
    servers: [
      {
        url:  process.env.BASE_URL || 'https://learning-b-pi.vercel.app' || 'http://localhost:6500',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Swagger comments live here
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
