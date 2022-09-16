-- See SQL documentation: https://docs.airplane.dev/creating-tasks/sql
SELECT
  *
FROM
  orders
WHERE
  customer_id = :customer_id;

