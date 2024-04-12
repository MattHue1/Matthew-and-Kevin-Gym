/*Construct all the tables*/

-- Members Table
CREATE TABLE Members (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    goal VARCHAR(255) NOT NULL,
    health_metrics VARCHAR(255) NOT NULL,
    fee FLOAT NOT NULL
);

-- Trainer Table
CREATE TABLE Trainer (
    trainer_id SERIAL PRIMARY KEY,
    trainer_name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    trainer_specialty VARCHAR(255) NOT NULL
);
-- Staff Table
CREATE TABLE Staff (
    staff_id SERIAL PRIMARY KEY,
    staff_name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Equipment Table
CREATE TABLE Equipment (
    equipment_id SERIAL PRIMARY KEY,
    equipment_name VARCHAR(255) NOT NULL,
    broken BOOLEAN NOT NULL
);

-- Room Table
CREATE TABLE Room (
    room_id SERIAL PRIMARY KEY,
    equipment_id INTEGER REFERENCES Equipment(equipment_id)
);

-- Class Table
CREATE TABLE Class(
    class_id SERIAL PRIMARY KEY,
    class_name VARCHAR(255) NOT NULL,
    class_trainer INTEGER REFERENCES Trainer(trainer_id),
    class_room INTEGER REFERENCES Room(room_id),
    class_fee FLOAT NOT NULL,
    time TIME NOT NULL,
    date DATE NOT NULL
);

-- Schdule Table
CREATE TABLE Schdule (
    schdule_id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES Members(user_id),
    class_id INTEGER REFERENCES Class(class_id) ON DELETE CASCADE,
    time TIME NOT NULL
);
