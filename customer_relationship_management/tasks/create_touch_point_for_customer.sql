INSERT INTO
  touch_points ("customer_id", "touch_point_type", "created_at")
VALUES
  (
    :customer_id,
    :touch_point_type,
    :created_at
  ) RETURNING customer_id,
  touch_point_type,
  created_at;