import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('products').insert([
    { name: 'lápis', price: 1.0 },
    { name: 'Papel A4 Sulfite', price: 25.0 },
  ]);
}
