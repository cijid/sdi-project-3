/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  //Deletes ALL existing entries
  await knex("practice_attempts").del();
  await knex("practice_sessions").del();

  const sessions = [
    {
      child_id: 1,
      guardian_id: null,
      activity_type: "lettersounds",
      mode: "parent",
      gradelevel: null,
      score: 5,
      started_at: "2026-08-10 10:00:00",
      ended_at: "2026-08-10 10:01:00",
    },
    {
      child_id: 1,
      guardian_id: null,
      activity_type: "sightwords",
      mode: "parent",
      gradelevel: -1,
      score: 4,
      started_at: "2026-08-11 10:00:00",
      ended_at: "2026-08-11 10:01:00",
    },
    {
      child_id: 1,
      guardian_id: null,
      activity_type: "lettersounds",
      mode: "parent",
      gradelevel: null,
      score: 7,
      started_at: "2026-08-12 10:00:00",
      ended_at: "2026-08-12 10:01:00",
    },
    {
      child_id: 1,
      guardian_id: null,
      activity_type: "sightwords",
      mode: "parent",
      gradelevel: -1,
      score: 6,
      started_at: "2026-08-13 10:00:00",
      ended_at: "2026-08-13 10:01:00",
    },
    {
      child_id: 1,
      guardian_id: null,
      activity_type: "lettersounds",
      mode: "parent",
      gradelevel: null,
      score: 8,
      started_at: "2026-08-14 10:00:00",
      ended_at: "2026-08-14 10:01:00",
    },

    {
      child_id: 2,
      guardian_id: null,
      activity_type: "lettersounds",
      mode: "parent",
      gradelevel: null,
      score: 8,
      started_at: "2026-08-10 11:00:00",
      ended_at: "2026-08-10 11:01:00",
    },
    {
      child_id: 2,
      guardian_id: null,
      activity_type: "sightwords",
      mode: "parent",
      gradelevel: 0,
      score: 6,
      started_at: "2026-08-11 11:00:00",
      ended_at: "2026-08-11 11:01:00",
    },
    {
      child_id: 2,
      guardian_id: null,
      activity_type: "lettersounds",
      mode: "parent",
      gradelevel: null,
      score: 7,
      started_at: "2026-08-12 11:00:00",
      ended_at: "2026-08-12 11:01:00",
    },
    {
      child_id: 2,
      guardian_id: null,
      activity_type: "sightwords",
      mode: "parent",
      gradelevel: 0,
      score: 8,
      started_at: "2026-08-13 11:00:00",
      ended_at: "2026-08-13 11:01:00",
    },
    {
      child_id: 2,
      guardian_id: null,
      activity_type: "lettersounds",
      mode: "parent",
      gradelevel: null,
      score: 10,
      started_at: "2026-08-14 11:00:00",
      ended_at: "2026-08-14 11:01:00",
    },
  ];

  await knex("practice_sessions").insert(sessions);
};
