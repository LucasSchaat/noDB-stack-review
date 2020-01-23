INSERT INTO employees (first, last, email, gender)
VALUES ($1, $2, $3, $4);

SELECT *
FROM employees
ORDER BY id ASC;