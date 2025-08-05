import express, { Request, Response} from 'express';

const app = express();
const PORT = process.env.PORT || 6500;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});