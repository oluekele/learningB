import express from 'express';
const app = express();
const PORT = process.env.PORT || 6500;
app.get('/', (req, res) => {
    res.send('Hello, Ekele! Welcome to your Express server with TypeScript and Prisma!');
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
