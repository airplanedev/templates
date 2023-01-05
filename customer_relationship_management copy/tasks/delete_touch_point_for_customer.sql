DELETE FROM
  touch_points
WHERE
  customer_id = :customer_id
  AND touch_point_type = :touch_point_type;

  