DELETE FROM
  features_customers
WHERE
  feature_id = :feature_id
  AND customer_id = :customer_id;
  