import { Router, Request, Response, request } from 'express';
import knex from '../database/connection';

const productsRoutes = Router();

productsRoutes.get('/', async (request: Request, response: Response) => {
  const products = await knex('products').select('*');
  return response.json(products);
});

productsRoutes.post('/insert', async (request: Request, response: Response) => {
  interface Product {
    name: string;
    price: number;
  }

  const { name, price } = request.body;

  const product: Product = {
    name,
    price,
  };

  const newProducts = await knex('products').insert(product);

  return response.json({
    msg: 'item criado com sucesso com id' + newProducts[0],
  });
});

export default productsRoutes;
