/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("children").del();
  await knex("children").insert([
    {
      id: 1,
      first_name: "Flip",
      last_name: "Drew",
      date_of_birth: "2020-01-01",
    },
    {
      id: 2,
      first_name: "John",
      last_name: "Snuffy",
      date_of_birth: "2019-06-15",
    },
  ]);
};
