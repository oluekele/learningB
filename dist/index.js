import express from 'express';
import cors from 'cors';
import productRoutes from './routes/product.router.js';
import AuthRoutes from './routes/auth.route.js';
import UserRoutes from './routes/user.route.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger/swagger.config.js';
const app = express();
const PORT = process.env.PORT || 6500;
app.use(cors({ origin: '*' }));
const middleware = (req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
};
app.use(middleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/auth', AuthRoutes);
app.use('/api/v1/users', UserRoutes);
app.get('/', (req, res) => {
    res.send('Hello, Ekele! Welcome to your Express server with TypeScript and Prisma!');
});
// Swagger documentation setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Docs at http://localhost:${PORT}/api-docs`);
});
