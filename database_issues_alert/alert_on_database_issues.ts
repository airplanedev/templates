import airplane from "airplane";

type Params = {
  slack_channel?: string;
};

export default async function(params: Params) {
  const wraparoundThresholdPercent = 60;
  const transactionIDWraparound = await airplane.sql.query("db", `
    WITH max_age AS (
        SELECT 2000000000 as max_old_xid
            , setting AS autovacuum_freeze_max_age
            FROM pg_catalog.pg_settings
            WHERE name = 'autovacuum_freeze_max_age' )
    , per_database_stats AS (
        SELECT datname
            , m.max_old_xid::int
            , m.autovacuum_freeze_max_age::int
            , age(d.datfrozenxid) AS oldest_current_xid
        FROM pg_catalog.pg_database d
        JOIN max_age m ON (true)
        WHERE d.datallowconn )
    SELECT max(oldest_current_xid) AS oldest_current_xid
        , max(ROUND(100*(oldest_current_xid/max_old_xid::float))) AS percent_towards_wraparound
        , max(ROUND(100*(oldest_current_xid/autovacuum_freeze_max_age::float))) AS percent_towards_emergency_autovac
    FROM per_database_stats;
  `);
  const percentTowardsWraparound = transactionIDWraparound.output.Q1.percent_towards_wraparound;
  if (percentTowardsWraparound > wraparoundThresholdPercent) {
    const warningMessage = `Warning: we are ${percentTowardsWraparound}% on the way to transaction ID wraparound!`;
    if (params.slack_channel != null) {
      await airplane.slack.message(params.slack_channel, warningMessage)
    } else {
      console.log(warningMessage);
    }
  }

  return {
    transactionIDWraparound: transactionIDWraparound.output.Q1,
  };
}
