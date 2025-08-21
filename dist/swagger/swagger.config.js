import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import swaggerJSDoc from 'swagger-jsdoc';
// Fix for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'TypeScript API',
            version: '1.0.0',
            description: 'A simple API using Express, TypeScript, and Swagger',
        },
        servers: [
            {
                url: 'http://localhost:6500',
            },
            {
                url: 'https://learningb-jteb.onrender.com'
            },
        ],
    },
    apis: [
        path.join(__dirname, '../routes/*.ts'),
        path.join(__dirname, '../routes/*.js'),
    ],
};
const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
