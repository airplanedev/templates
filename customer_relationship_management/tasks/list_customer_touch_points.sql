SELECT
  customer_id,
  touch_point_type,
  created_at
FROM
  touch_points
WHERE
  customer_id = :customer_id
ORDER BY
  customer_id;
