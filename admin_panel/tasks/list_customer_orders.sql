-- See SQL documentation: https://docs.airplane.dev/creating-tasks/sql
SELECT
  order_id,
  order_date,
  shipped_date,
  freight,
  ship_address,
  ship_postal_code
FROM
  orders
WHERE
  customer_id = :customer_id
ORDER BY
  order_id;

