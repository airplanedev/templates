SELECT
  date_trunc(
    'week',
    CAST(orders.order_date AS timestamp)
  ):: date AS week,
  count(DISTINCT order_details.product_id) as cnt
FROM
  orders
  INNER JOIN order_details ON order_details.order_id = orders.order_id
GROUP BY
  week
ORDER BY
  week DESC;
