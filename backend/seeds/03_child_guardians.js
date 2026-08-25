/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("child_guardians").del();
  await knex("child_guardians").insert([
    {
      child_id: 1,
      guardian_id: 1,
      relationship: "Parent",
    },
    {
      child_id: 1,
      guardian_id: 2,
      relationship: "Guardian",
    },
    {
      child_id: 2,
      guardian_id: 1,
      relationship: "Parent",
    },
  ]);
};
