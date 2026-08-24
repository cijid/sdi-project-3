/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("trouble_tickets").del();
  await knex("trouble_tickets").insert([
    {
      id: 1,
      unit: "1-10 CAV",
      operation_name: "OEF",
      problem: "GPS/PNT",
      observed: "GPS unavailable",
      location: "Coordinates",
      operational_impact: "Navigation degraded",
      priority: "HIGH",
    },
    {
      id: 2,
      unit: "3 SES",
      operation_name: "SPACE-EX",
      problem: "SATCOM",
      observed: "Suspected Jamming",
      location: "Coordinates",
      operational_impact: "EX High",
      priority: "EX High",
    },
    {
      id: 3,
      unit: "2 ISR Tanks",
      operation_name: "Let Freedom Ring",
      problem: "ISR",
      observed: "Position Jumping",
      location: "Coordinates",
      operational_impact: "Bad guys hopping around",
      priority: "Medium",
    },
  ]);
};
