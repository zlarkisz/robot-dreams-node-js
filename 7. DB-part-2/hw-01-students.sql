CREATE TABLE Students (
  StudentID INT PRIMARY KEY,
  StudentName VARCHAR(100)
);

CREATE TABLE Courses (
  CourseID INT PRIMARY KEY,
  CourseName VARCHAR(255)
);

CREATE TABLE Enrollments (
  EnrollmentID INT PRIMARY KEY,
  StudentID INT,
  CourseID INT,
  FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
  FOREIGN KEY (CourseID) REFERENCES Courses(CourseID)
);

INSERT INTO Students (StudentID, StudentName)
VALUES
  (1, 'Alice'),
  (2, 'Bob'),
  (3, 'Charlie');

INSERT INTO Courses (CourseID, CourseName)
VALUES
  (101, 'Math'),
  (102, 'Physics'),
  (103, 'Chemistry');

INSERT INTO Enrollments (EnrollmentID, StudentID, CourseID)
VALUES
  (1, 1, 101),
  (2, 2, 102),
  (3, 3, 103),
  (4, 1, 102);

SELECT Students.StudentName, Courses.CourseName
  FROM Enrollments
    INNER JOIN Students ON Enrollments.StudentID = Students.StudentID
    INNER JOIN Courses ON Enrollments.CourseID = Courses.CourseID
