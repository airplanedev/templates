DELETE FROM
  features_customers
WHERE
  feature_id = :feature_id;

DELETE FROM
  features
WHERE
  feature_id = :feature_id;
  