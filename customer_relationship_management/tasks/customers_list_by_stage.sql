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
  opportunity_stage,
  postal_code
FROM
  customers
WHERE
  opportunity_stage = :stage
ORDER BY
  customer_id;

