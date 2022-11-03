-- See SQL documentation: https://docs.airplane.dev/creating-tasks/sql
SELECT
  customer_id,
  company_name,
  contact_name,
  contact_title,
  country,
  phone,
  fax,
  address,
  city,
  postal_code
FROM
  customers
WHERE
  company_name ILIKE CONCAT('%', cast(:keyword AS varchar), '%')
  OR contact_name ILIKE CONCAT('%', cast(:keyword AS varchar), '%')
ORDER BY
  customer_id;

