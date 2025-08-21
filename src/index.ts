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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/products', productRoutes);
app.use('/api/v1/auth', AuthRoutes);
app.use('/api/v1/users', UserRoutes);

app.get('/', (_, res) => {
  res.send('Hello, Ekele! Your API is running.');
});

// Swagger JSON
app.get('/swagger.json', (_, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app; // Required for Vercel

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Docs: http://localhost:${PORT}/api-docs`);
  });
}
