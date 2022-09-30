INSERT INTO users("id", "account_id", "email", "name", "title", "role") 
VALUES((select count(1) from users), :account_id, :email, :name, :title,  :role) 
RETURNING "id", "account_id", "email", "name", "title", "role";
