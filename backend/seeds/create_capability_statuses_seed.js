/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("capability_statuses").del();
  await knex("capability_statuses").insert([
    {
      id: 1,
      capability: "GPS/PNT",
      status: "Normal",
      area: "AO-Wide",
      operational_impact: "None",
      recommended_action: "None",
    },
    {
      id: 2,
      capability: "GPS/PNT",
      status: "Degraded",
      area: "Training Area Alpha",
      operational_impact: "Navigation uncertainty",
      recommended_action: "Validate Alternate PNT",
    },
    {
      id: 3,
      capability: "SATCOM",
      status: "Denied",
      area: "Sector Bravo",
      operational_impact: "C2 unavailable",
      recommended_action: "Execute PACE",
    },
    {
      id: 4,
      capability: "Missile Warning",
      status: "Available",
      area: "AO-Wide",
      operational_impact: "Normal",
      recommended_action: "-",
    },
  ]);
};
