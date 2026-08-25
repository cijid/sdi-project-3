/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("guardians").del();
  await knex("guardians").insert([
    {
      id: 1,
      first_name: "Cliff",
      last_name: "Drew",
      email: "parent1@example.com",
    },
    {
      id: 2,
      first_name: "Margaret",
      last_name: "Snuffy",
      email: "parent2@example.com",
    },
  ]);
};
