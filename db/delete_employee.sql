DELETE FROM employees
WHERE id = $1;

SELECT *
FROM employees
ORDER BY id ASC;