-- Add your SQL queries here.
-- See SQL documentation: https://docs.airplane.dev/creating-tasks/sql
SELECT
  *
FROM
  customers
WHERE
  company_name ILIKE CONCAT('%', cast(:keyword as varchar), '%')
  OR contact_name ILIKE CONCAT('%', cast(:keyword as varchar), '%');
