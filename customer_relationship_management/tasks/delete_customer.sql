DELETE FROM
  touch_points
WHERE
  customer_id = :customer_id;

DELETE FROM
  order_details
WHERE
  order_id IN(
    SELECT
      order_id
    FROM
      orders
    WHERE
      customer_id = :customer_id
  );

DELETE FROM
  orders
WHERE
  customer_id = :customer_id;

DELETE FROM
  customers
WHERE
  customer_id = :customer_id;

