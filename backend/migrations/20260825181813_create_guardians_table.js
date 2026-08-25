/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("guardians", (table) => {
    table.increments("id").primary();
    table.string("first_name", 100).notNullable();
    table.string("last_name", 100);
    table.string("email", 255);
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("guardians");
};
