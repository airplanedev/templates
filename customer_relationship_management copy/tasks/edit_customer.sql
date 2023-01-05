UPDATE
  customers
SET
  phone = :phone,
  contact_name = :contact_name,
  country = :country,
  contact_title = :contact_title
WHERE
  customer_id = :customer_id;
  