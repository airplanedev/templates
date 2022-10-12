INSERT INTO users ("id", "account_id", "email", "name", "title", "role")
    VALUES ((
            SELECT
                count(1)
            FROM
                users),
            :account_id,
            :email,
            :name,
            :title,
            :role)
RETURNING
    "id",
    "account_id",
    "email",
    "name",
    "title",
    "role";

