INSERT INTO
  features (
    "feature_id",
    "feature_name",
    "feature_description",
    "is_enabled",
    "updated_at"
  )
VALUES
  (
    (
      SELECT
        count("feature_id")
      FROM
        features
    ) + 1,
    :feature_name,
    :feature_description,
    :is_enabled,
    NOW()
  ) RETURNING feature_id,
  feature_name,
  is_enabled,
  updated_at;
  