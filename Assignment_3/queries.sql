CREATE TABLE Product (
  id INT NOT NULL AUTO_INCREMENT,  
  name VARCHAR(50),  
  price INT,  
  PRIMARY KEY (id)  
);

CREATE TABLE Category (
  id INT NOT NULL AUTO_INCREMENT,  
  name VARCHAR(50),  
  PRIMARY KEY (id)  
);

CREATE TABLE Relationship (
  id INT NOT NULL AUTO_INCREMENT,  
  prodId INT,  
  categoryId INT,  
  FOREIGN KEY (prodId) REFERENCES Product(id),  
  FOREIGN KEY (categoryId) REFERENCES Category(id),  
  PRIMARY KEY (id)  
);

INSERT INTO Product (name, price) VALUES ('P1', 10), ('P2', 14), ('P3', 18);

INSERT INTO Category (name) VALUES ('C1'), ('C2');

INSERT INTO Relationship (prodId, categoryId) VALUES (1, 1), (2, 1), (3, 2);

