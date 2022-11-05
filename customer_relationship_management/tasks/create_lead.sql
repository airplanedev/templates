INSERT INTO
  customers (
    "customer_id",
    "company_name",
    "contact_name",
    "contact_title",
    "country",
    "phone",
    "opportunity_stage"
  )
VALUES
  (
    :customer_id,
    :company_name,
    :contact_name,
    :contact_title,
    :country,
    :phone,
    'lead'
  );