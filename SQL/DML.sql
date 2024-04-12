/*Fill tables with data*/
-- Populate Member Table
INSERT INTO Members (user_id, user_name, password, goal, health_metrics, fee)
VALUES 
(111,'member', 'sql', 'Yoga', 'healthy', 100),
(112,'George Orwell', 'sql', 'Swimming', 'healthy', 50),
(113,'Jane Austen', 'sql', 'Yoga', 'not healthy', 99),
(114,'Mark Twain', 'sql', 'Strength training', 'healthy', 40),
(115,'F. Scott Fitzgerald', 'sql', 'Cardio', 'not healthy', 25),
(116,'Agatha Christie', 'sql', 'Cyling', 'healthy', 30),
(117,'Ernest Hemingway', 'sql', 'Swimming', 'kind of healthy', 21),
(118,'Isaac Asimov', 'sql', 'Cardio', 'healthy', 1000);

/*Fill tables with data*/

-- Populate Trainer Table
INSERT INTO Trainer (trainer_id, trainer_name, password, trainer_specialty)
VALUES 
(111,'Bloomsbury', 'sql', 'Yoga'),
(112,'Penguin', 'sql', 'Swimming'),
(113,'HarperCollins', 'sql', 'Strength Training'),
(114,'Random', 'sql', 'Cardio'),
(115,'Simon Schuster', 'sql', 'Cycling'),
(116,'Macmillan', 'sql', 'Strength Training'),
(117,'Hachette', 'sql', 'Swimming'),
(118,'Wiley', 'sql', 'Yoga');

-- Populate Staff Table
INSERT INTO  Staff (staff_id, staff_name, password)
VALUES 
(111,'Harry Potter', 'sql'),
(112,'1984', 'sql'),
(113,'Pride and Prejudice', 'sql'),
(114,'Adventures of Huckleberry Finn', 'sql'),
(115,'The Great Gatsby', 'sql'),
(116,'Murder on the Orient Express', 'sql'),
(117,'The Old Man and the Sea', 'sql'),
(118,'Foundation', 'sql');


-- Populate Equipment Table
INSERT INTO Equipment (equipment_id, equipment_name, broken)
VALUES 
(111,'Yoga mat', FALSE),
(112,'Swimming pool', TRUE),
(113,'Dumbbells', FALSE),
(114,'Treadmill', TRUE),
(115,'Stationary bike', FALSE);

-- Populate Room Table
INSERT INTO Room (room_id, equipment_id)
VALUES 
(111,111),
(112,112),
(113,113),
(114,114),
(115,115);

-- Populate Class Table
INSERT INTO Class (class_id, class_name, class_trainer, class_room, class_fee, time, date)
VALUES 
(111,'Yoga', 111, 111, 100, '10:30:00', '2023-09-20'),
(112,'Swimming', 112, 112,200, '11:30:00','2023-09-21'),
(113,'Strength training', 113, 113, 300, '12:30:00', '2023-09-22'),
(114,'Cardio', 114, 114, 400, '13:30:00', '2023-09-23'),
(115,'Cycling', 115, 115, 500, '14:30:00','2023-09-24');

-- Populate Schdule Table
INSERT INTO Schdule (schdule_id, student_id, class_id, time)
VALUES 
(111,111, 111, '10:30:00'),
(112,112, 111, '10:30:00'),
(113,113, 111, '10:30:00'),
(114,114, 112, '11:30:00'),
(115,115, 112, '11:30:00'),
(116,116, 113, '12:30:00'),
(117,117, 113, '12:30:00'),
(118,118, 114, '13:30:00');
