/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("practice_sessions", (table) => {
    table.increments("id").primary();

    table
      .integer("child_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("children")
      .onDelete("CASCADE");

    table
      .integer("guardian_id")
      .unsigned()
      .references("id")
      .inTable("guardians")
      .onDelete("SET NULL");

    table.string("activity_type", 50).notNullable();
    table.string("mode", 20).notNullable();

    table.integer("gradelevel");

    table.integer("score").defaultTo(0);

    table.timestamp("started_at").defaultTo(knex.fn.now());
    table.timestamp("ended_at");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("practice_sessions");
};
