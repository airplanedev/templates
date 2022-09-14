-- Add your SQL queries here.
-- See SQL documentation: https://docs.airplane.dev/creating-tasks/sql
UPDATE
  customers
SET
  contact_name = :contact_name
WHERE
  customer_id = :customer_id;
