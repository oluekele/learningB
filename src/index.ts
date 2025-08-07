import express, { Request, Response } from 'express';
import cors from 'cors';
import productRoutes from './routes/product.router.js';
import AuthRoutes from './routes/auth.route.js';
import UserRoutes from './routes/user.route.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger/swagger.config.js';

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


app.use('/api/v1/products', productRoutes);
app.use('/api/v1/auth', AuthRoutes);
app.use('/api/v1/users', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Ekele! Welcome to your Express server with TypeScript and Prisma!');
});

// Swagger documentation setup
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Serve swagger.json (raw spec)
app.get('/swagger.json', (_req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.get('/api-docs', (_req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Swagger UI</title>
        <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist/swagger-ui.css">
      </head>
      <body>
        <div id="swagger-ui"></div>
        <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script>
        <script>
          window.onload = () => {
            SwaggerUIBundle({
              url: '/swagger.json', // or wherever your OpenAPI spec is exposed
              dom_id: '#swagger-ui',
            });
          };
        </script>
      </body>
    </html>
  `);
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
   console.log(`Docs at http://localhost:${PORT}/api-docs`);
});
