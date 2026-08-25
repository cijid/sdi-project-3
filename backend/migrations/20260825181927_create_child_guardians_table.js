/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

//Many to Many Join Table to handle child/guardian relationships
exports.up = function (knex) {
  return knex.schema.createTable("child_guardians", (table) => {
    table
      .integer("child_id")
      .references("id")
      .inTable("children")
      .onDelete("CASCADE");

    table
      .integer("guardian_id")
      .references("id")
      .inTable("guardians")
      .onDelete("CASCADE");

    table.string("relationship", 50);

    table.primary(["child_id", "guardian_id"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("child_guardians");
};
