/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    { id: 1, name: "Phillip" },
    { id: 2, name: "Clifford" },
    { id: 3, name: "Arlene" },
  ]);
};
