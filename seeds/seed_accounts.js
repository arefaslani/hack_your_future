/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('accounts').del()
  await knex('accounts').insert([
    { owner_id: 1, balance: 1000 },
    { owner_id: 2, balance: 1200 },
    { owner_id: 3, balance: 1800 }
  ]);
};
