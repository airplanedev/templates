-- Add your SQL queries here.
-- See SQL documentation: https://docs.airplane.dev/creating-tasks/sql
UPDATE
  orders
SET
  ship_address = :ship_address
WHERE
  order_id = :order_id;
