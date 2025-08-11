import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
const port = process.env.PORT || 6500;
const serverUrl = process.env.VERCEL_URL
    ? `${process.env.VERCEL_URL}`
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
        path.resolve(process.cwd(), 'src/routes/*.ts'), // Dev
        path.resolve(process.cwd(), 'dist/routes/*.js'), // Prod
    ],
};
export default swaggerJSDoc(swaggerOptions);
