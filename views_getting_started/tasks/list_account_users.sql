SELECT
    id,
    name,
    email,
    role
FROM
    users
WHERE
    account_id = :account_id
ORDER BY
    id;
