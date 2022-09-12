SELECT
    users.id,
    users.name,
    users.email,
    users.created_at
FROM
    users
    JOIN users_teams ut ON ut.user_id = users.id
    JOIN teams ON ut.team_id = teams.id
WHERE
    users.id ILIKE :search
    OR users.name ILIKE :search
    OR users.email ILIKE :search
    OR teams.id ILIKE :search
    OR teams.slug ILIKE :search
    OR teams.name ILIKE :search
ORDER BY
    users.email ASC
LIMIT 10
