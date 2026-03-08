INSERT INTO book (title, author, isbn, publication_date, created_at, updated_at) VALUES
('Test Project Management Vol. 1', 'Developer A', 'ISBN-0001', '2024-01-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Test Project Management Vol. 2', 'Developer A', 'ISBN-0002', '2024-02-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Learning Java Spring Boot', 'Developer B', 'ISBN-0003', '2024-03-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Database Design Patterns', 'Developer C', 'ISBN-0004', '2024-04-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Web Security Essentials', 'Developer D', 'ISBN-0005', '2024-05-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Clean Code Practice 01', 'Developer E', 'ISBN-0006', '2024-06-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Clean Code Practice 02', 'Developer E', 'ISBN-0007', '2024-07-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Microservices Architecture', 'Developer F', 'ISBN-0008', '2024-08-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('DevOps Handbook Test Edition', 'Developer G', 'ISBN-0009', '2024-09-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Cloud Infrastructure Guide', 'Developer H', 'ISBN-0010', '2024-10-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO review (book_id, reviewer, rating, comment, created_at, updated_at) VALUES
(1, 'Tester 01', 5, 'Perfect documentation for testing purposes.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Tester 02', 4, 'Reliable test data for project management.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Reviewer X', 5, 'The code examples are very clear and helpful.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'Reviewer Y', 3, 'Average content, but good for UI layout testing.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 'SecAdmin', 5, 'Crucial topics covered for modern web apps.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 'CleanCoder', 4, 'Standard practices are well-defined here.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, 'CleanCoder', 5, 'Excellent follow-up to the first volume.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, 'Architect_Z', 4, 'Good overview of system scalability.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(9, 'OpsTeam', 5, 'Automation workflows are described perfectly.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(10, 'CloudSpecialist', 2, 'Needs more details on specific providers.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);