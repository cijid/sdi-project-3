/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      id: 1,
      service_branch: "Army",
      rank: "Sgt",
      name: "John Soldier",
      base: "Ft. Carson",
      is_admin: 0,
    },
    {
      id: 2,
      service_branch: "Space Force",
      rank: "TSgt",
      name: "Clifford Drew",
      base: "Schreiver SFB",
      is_admin: 1,
    },
    {
      id: 3,
      service_branch: "Space Force",
      rank: "Spc 3",
      name: "Snuffy",
      base: "Peterson SFB",
      is_admin: 0,
    },
  ]);
};
