DROP TABLE IF EXISTS photo;
DROP TABLE IF EXISTS albumphoto;
DROP TABLE IF EXISTS album;
DROP TABLE IF EXISTS admin;

CREATE  TABLE album (
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    image VARCHAR(100) NULL,
    description VARCHAR(100) NULL
);

CREATE  TABLE sousalbum (
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    lieu VARCHAR(100) NULL,
    nombrePhoto INT NULL,
    image VARCHAR(100) NULL,
    album_id INT NOT NULL
);

CREATE TABLE photo (
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    image VARCHAR(100) NOT NULL,
    description VARCHAR(100) NULL,
    sousalbum_id INT NOT NULL
)

CREATE TABLE admin (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL

)
