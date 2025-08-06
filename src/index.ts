import express, { Request, Response } from 'express';
import cors from 'cors';
import productRoutes from './routes/product.router.js';
import AuthRoutes from './routes/auth.route.js';
import UserRoutes from './routes/user.route.js';

const app = express();
const PORT = process.env.PORT || 6500;

app.use(cors({ origin: '*' }));

const middleware = (req: Request, res: Response, next: Function) => {
  console.log(`${req.method} request for '${req.url}'`);
  next(); 
};

app.use(middleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/v1/product', productRoutes);
app.use('/api/v1/auth', AuthRoutes);
app.use('/api/v1/user', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Ekele! Welcome to your Express server with TypeScript and Prisma!');
});

console.log('DATABASE_URL: ', process.env.DATABASE_URL || process.env.DATABASE_URL1);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
