UPDATE
    users
SET
    role = CONCAT('Sr. ', users.role)
WHERE
    id = :id;
