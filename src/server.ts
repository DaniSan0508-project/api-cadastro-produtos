import express from 'express';
import routes from './routes/index';

const PORT = process.env.PORT || 3333;

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log(`servidor rodando na porta ${PORT}`);
});
