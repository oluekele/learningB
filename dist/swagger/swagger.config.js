import path from "path";
import swaggerJSDoc from "swagger-jsdoc";
const port = process.env.PORT || 6500;
// Works on both local and deployed environments
const serverUrl = process.env.RENDER_EXTERNAL_URL
    ? process.env.RENDER_EXTERNAL_URL
    : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : `http://localhost:${port}`;
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "TypeScript API",
            version: "1.0.0",
            description: "A simple API using Express, TypeScript, and Swagger",
        },
        servers: [
            {
                url: serverUrl,
                description: process.env.RENDER_EXTERNAL_URL
                    ? "Render server"
                    : process.env.VERCEL_URL
                        ? "Vercel server"
                        : "Local server",
            },
        ],
    },
    apis: [
        // Always resolve from project root, not from dist folder
        path.join(process.cwd(), "src/routes/*.ts"), // Local dev
        path.join(process.cwd(), "dist/routes/*.js"), // After build
    ],
};
export default swaggerJSDoc(swaggerOptions);
