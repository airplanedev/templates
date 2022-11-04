UPDATE
  features
SET
  feature_name = :feature_name,
  is_enabled = :is_enabled,
  feature_description = :feature_description,
  updated_at = NOW()
WHERE
  feature_id = :feature_id;
  