SELECT
  fc.feature_id,
  c.customer_id,
  c.contact_name,
  c.address,
  c.country
FROM
  features_customers AS fc
  INNER JOIN customers AS c ON fc.customer_id = c.customer_id
WHERE
  feature_id = :feature_id
ORDER BY
  feature_id;
  