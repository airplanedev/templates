-- See SQL documentation: https://docs.airplane.dev/creating-tasks/sql
SELECT
  *
FROM
  customers
WHERE
  company_name ILIKE CONCAT('%', cast(:keyword AS varchar), '%')
  OR contact_name ILIKE CONCAT('%', cast(:keyword AS varchar), '%')
ORDER BY
  customer_id;
