SELECT
  order_details.product_id,
  product_name,
  count(order_details.order_id) AS cnt
FROM
  order_details
  INNER JOIN products ON order_details.product_id = products.product_id {{ params.customer_id ? "INNER JOIN orders ON order_details.order_id = orders.order_id WHERE customer_id = :customer_id" : "" }}
GROUP BY
  order_details.product_id,
  product_name
ORDER BY
  cnt DESC;
