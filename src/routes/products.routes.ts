import { Router, Request, Response } from 'express';
import knex from '../database/connection';

const productsRoutes = Router();

interface Product {
  name: string;
  price: number;
  quantities: number;
}

productsRoutes.get('/', async (request: Request, response: Response) => {
  const products = await knex('products').select('*');
  return response.json(products);
});

productsRoutes.get('/:id', async (request: Request, response: Response) => {
  const { id } = request.params;

  const products = await knex('products').select('*').where('id', id);

  if (products.length == 0) {
    return response.status(400).json({ msg: 'Product not found' }).status(400);
  }
  return response.json(products);
});

productsRoutes.post('/', async (request: Request, response: Response) => {
  const { name, price, quantities } = request.body;

  const product: Product = {
    name: name.toUpperCase(),
    price: price.toFixed(2).replace('.', ','),
    quantities,
  };

  const existProduct = await knex('products')
    .select('*')
    .where('name', name.toUpperCase());

  if (existProduct.length > 0) {
    return response.status(406).json({ msg: 'product already registered' });
  }
  const newProducts = await knex('products').insert(product);

  return response.json({
    msg: 'created item ',
  });
});

productsRoutes.put('/:id', async (request: Request, response: Response) => {
  const { id } = request.params;

  const { name, price, quantities } = request.body;

  const product: Product = {
    name: name.toUpperCase(),
    price: price.toFixed(2).replace('.', ','),
    quantities,
  };

  if (!name) {
    return response.json({ msg: 'enter the product name' });
  }

  const newProduct = await knex('products').where({ id }).update({
    name: product.name,
    price: product.price,
    quantities: product.quantities,
  });

  if (newProduct == 0) {
    return response.status(400).json({ msg: 'id doesnt exist' });
  }

  return response.json(product);
});

productsRoutes.delete('/:id', async (request: Request, response: Response) => {
  const { id } = request.params;
  const deletedProduct = await knex('products').delete('*').where('id', id);
  if (!deletedProduct) {
    return response.status(404).json({ msg: 'product not found' });
  }
  return response.json({ msg: 'deleted product' });
});

export default productsRoutes;
