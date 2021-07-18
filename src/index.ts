import * as express from 'express';

const PORT = process.env.PORT || 3333;

const app = express();

app.listen(3333, () => {
  console.log(`servidor rodando na porta ${PORT}`);
});
