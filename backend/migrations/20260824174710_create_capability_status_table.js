/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("capability_statuses", (table) => {
    table.increments("id");
    table.string("capability", 250).index();
    table.string("status", 250).index();
    table.string("area", 250).index();
    table.string("operational_impact", 250).index();
    table.string("recommended_action", 250).index();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("capability_statuses");
};
