UPDATE employees
SET first = $2,
    last = $3,
    email = $4,
    gender = $5
WHERE id = $1;

SELECT *
FROM employees
ORDER BY id ASC;