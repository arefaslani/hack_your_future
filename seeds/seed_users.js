/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    { id: 1, first_name: 'Uzziel', last_name: 'Zerach' },
    { id: 2, first_name: 'Arthur', last_name: 'Adelma' },
    { id: 3, first_name: 'Ilka', last_name: 'Olamilekan' }
  ]);
};
