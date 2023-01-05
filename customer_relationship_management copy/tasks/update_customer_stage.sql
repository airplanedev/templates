UPDATE
  customers
SET
  opportunity_stage = :opportunity_stage
WHERE
  customer_id = :customer_id;