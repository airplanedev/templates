INSERT INTO users("id", "account_id", "email", "name", "title", "role") 
VALUES(:user_id, :account_id, :email, :name, :title,  :role) 
RETURNING "id", "account_id", "email", "name", "title", "role";
