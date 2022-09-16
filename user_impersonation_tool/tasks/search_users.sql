SELECT
    users.id,
    users.name,
    users.email,
    users.role
FROM
    users
WHERE
    users.name ILIKE :search
    OR users.email ILIKE :search
    OR users.role ILIKE :search
ORDER BY
    users.email ASC
LIMIT 10
