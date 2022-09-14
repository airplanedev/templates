SELECT
  date_trunc(
    'week',
    CAST(orders.order_date AS timestamp)
  ):: date AS week,
  count(DISTINCT customer_id) AS cnt
FROM
  orders
GROUP BY
  week
ORDER BY
  week DESC;
