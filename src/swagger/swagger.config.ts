// import swaggerJSDoc from 'swagger-jsdoc';

// const port = process.env.PORT || 6500;

// // Build the server URL for Swagger
// const serverUrl = process.env.VERCEL_URL
//   ? `https://${process.env.VERCEL_URL}` // Vercel production/staging
//   : `http://localhost:${port}`;         // Local dev

// const swaggerOptions = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'TypeScript API',
//       version: '1.0.0',
//       description: 'A simple API using Express, TypeScript, and Swagger',
//     },
//     servers: [
//       {
//         url: serverUrl,
//         description: process.env.VERCEL_URL ? 'Vercel server' : 'Local server',
//       },
//     ],
//   },
//   apis: [
//     './src/routes/*.ts',  // Local development files
//     './dist/routes/*.js', // Compiled files in Vercel
//   ],
// };


// export default swaggerJSDoc(swaggerOptions);



import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';

const port = process.env.PORT || 6500;
const serverUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:${port}`;

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
        url: serverUrl,
        description: process.env.VERCEL_URL ? 'Vercel server' : 'Local server',
      },
    ],
  },
  apis: [
    path.join(process.cwd(), 'src/routes/*.ts'),   // local dev
    path.join(process.cwd(), 'dist/routes/*.js'), // production
  ],
};

export default swaggerJSDoc(swaggerOptions);
