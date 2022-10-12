INSERT INTO accounts ("id", "company_name", "signup_date", "country")
    VALUES ((
            SELECT
                count(1)
            FROM
                accounts),
            :company_name,
            NOW(),
            'unknown')
RETURNING
    id,
    company_name,
    signup_date,
    country;

