/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("sightwords").del();
  await knex("sightwords").insert([
    { id: 1, word: "all", gradelevel: 0 },
    { id: 2, word: "am", gradelevel: 0 },
    { id: 3, word: "are", gradelevel: 0 },
    { id: 4, word: "after", gradelevel: 1 },
    { id: 5, word: "again", gradelevel: 1 },
    { id: 6, word: "from", gradelevel: 1 },
  ]);
};
