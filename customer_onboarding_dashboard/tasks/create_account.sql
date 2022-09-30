INSERT INTO accounts ("id", "company_name", "signup_date", "country") 
    VALUES((select count(1) from accounts), 
    :company_name, now(), 'unknown') returning id, company_name, signup_date, country;