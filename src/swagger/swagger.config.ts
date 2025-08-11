import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TypeScript API',
      version: '1.0.0',
      description: 'A simple API using Express, TypeScript, and Swagger',
    },
    servers: [
      {
        url: process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : `http://localhost:${process.env.PORT || 6500}`,
      },
    ],
  },
  apis: [
    './src/routes/*.ts', // local dev
    './dist/routes/*.js', // deployed build on Vercel
  ],
};

export default swaggerJSDoc(swaggerOptions);
