import express from 'express';
import productRouter from './routes/product.router.js';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 6500;
app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/product', productRouter);
app.get('/', (req, res) => {
    res.send('Hello, Ekele! Welcome to your Express server with TypeScript and Prisma!');
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
