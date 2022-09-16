SELECT
    users.id,
    users.name,
    users.email,
    users.role,
    users.title
FROM
    users
WHERE
    users.name ILIKE :search
    OR users.email ILIKE :search
ORDER BY
    users.email ASC
LIMIT 10
