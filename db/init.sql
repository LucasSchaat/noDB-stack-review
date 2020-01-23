CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first VARCHAR(150),
    last VARCHAR(150),
    email VARCHAR(1000),
    gender VARCHAR(50)
);

SELECT * FROM employees;