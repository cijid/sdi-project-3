/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("practice_attempts", (table) => {
    table.increments("id").primary();

    table
      .integer("session_id")
      .references("id")
      .inTable("practice_sessions")
      .onDelete("CASCADE");

    table
      .integer("sight_word_id")
      .references("id")
      .inTable("sightwords")
      .onDelete("SET NULL");

    table
      .integer("letter_sound_id")
      .references("id")
      .inTable("letter_sounds")
      .onDelete("SET NULL");

    table.boolean("is_correct").notNullable();

    table.timestamp("attempted_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("practice_attempts");
};
