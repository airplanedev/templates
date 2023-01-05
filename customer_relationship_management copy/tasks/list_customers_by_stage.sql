SELECT
  cus.customer_id,
  cus.company_name,
  cus.contact_name,
  cus.contact_title,
  cus.country,
  cus.phone,
  cus.fax,
  cus.address,
  cus.city,
  cus.opportunity_stage,
  cus.postal_code,
  (
    SELECT
      Count(*)
    FROM
      touch_points
    WHERE
      customer_id = cus.customer_id
  ) as touch_points
FROM
  customers as cus
WHERE
  opportunity_stage = :opportunity_stage
ORDER BY
  customer_id;