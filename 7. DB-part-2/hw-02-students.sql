CREATE TABLE Students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100)
);

CREATE OR REPLACE PROCEDURE add_student (
  student_name VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO Students (name)
  VALUES (student_name)
END;
$$;