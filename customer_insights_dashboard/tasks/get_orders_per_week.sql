SELECT
  date_trunc(
    'week',
    CAST(orders.order_date AS timestamp)
  ):: date AS week,
  count(order_id) AS cnt
FROM
  orders {{ params.customer_id ? "WHERE customer_id = :customer_id" : "" }}
GROUP BY
  week
ORDER BY
  week DESC;
