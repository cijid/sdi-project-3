/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("trouble_tickets", (table) => {
    table.increments("id");
    table.string("unit", 250).index();
    table.string("operation_name", 250).index();
    table.string("problem", 250).index();
    table.string("observed", 250).index();
    table.string("location", 250).index();
    table.string("operational_impact", 250).index();
    table.string("priority", 250).index();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("trouble_tickets");
};
