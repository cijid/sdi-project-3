/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const sightWords = require("../data/sightWordList.json");
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("sightwords").del();

  await knex("sightwords").insert(sightWords);

  await knex.raw(`
    SELECT setval(
      pg_get_serial_sequence('sightwords', 'id'),
      (SELECT MAX(id) FROM sightwords)
    )
  `);
};
