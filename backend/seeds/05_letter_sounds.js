/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  //Deletes ALL existing entries
  await knex("letter_sounds").del();

  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const lowercase = "abcdefghijklmnopqrstuvwxyz".split("");

  const letters = [...uppercase, ...lowercase];

  const letterData = letters.map((letter, index) => ({
    id: index + 1,
    letter: letter,
  }));

  await knex("letter_sounds").insert(letterData);
};
