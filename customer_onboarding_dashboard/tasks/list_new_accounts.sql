SELECT
    a.id,
    a.company_name,
    a.country,
    a.signup_date,
    users.id AS user_id
FROM
    accounts a
    LEFT JOIN users ON a.id = users.account_id
WHERE
    users.account_id IS NULL
    OR a.country = 'unknown'
ORDER BY
    a.id;

