CREATE DATABASE IF NOT EXISTS eventossostenibles;
USE eventossostenibles;

-- User Table
CREATE TABLE IF NOT EXISTS User (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('organizer', 'user', 'admin') NOT NULL DEFAULT 'user'
);

-- Organizer Table
CREATE TABLE IF NOT EXISTS Organizer (
    user_id BIGINT UNSIGNED PRIMARY KEY,
    phone CHAR(9) NOT NULL,
    company VARCHAR(255) NOT NULL,
    website VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);

-- Location Table
CREATE TABLE IF NOT EXISTS Location (
    location_id SERIAL PRIMARY KEY,
    type ENUM('onsite', 'virtual', 'hybrid') NOT NULL,
    address VARCHAR(255),
    url VARCHAR(255)
);

-- Category Table
CREATE TABLE IF NOT EXISTS Category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255)
);

-- Event Table with image and price
CREATE TABLE IF NOT EXISTS Event (
    event_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    date DATETIME NOT NULL,
    duration INT NOT NULL,
    capacity INT,
    image VARCHAR(255),
    price DECIMAL(10,2) DEFAULT 0.00,
    location_id BIGINT UNSIGNED NOT NULL,
    category_id BIGINT UNSIGNED NOT NULL,
    status ENUM('active', 'finished', 'cancelled') DEFAULT 'active',
    FOREIGN KEY (location_id) REFERENCES Location(location_id),
    FOREIGN KEY (category_id) REFERENCES Category(category_id)
);

-- Event_Organizer intermediate table for many-to-many relationship
CREATE TABLE IF NOT EXISTS Event_Organizer (
    event_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (event_id, user_id),
    FOREIGN KEY (event_id) REFERENCES Event(event_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);

-- Registration Table
CREATE TABLE IF NOT EXISTS Registration (
    registration_id SERIAL PRIMARY KEY,
    event_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    UNIQUE (event_id, user_id),
    FOREIGN KEY (event_id) REFERENCES Event(event_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);
