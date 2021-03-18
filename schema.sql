DROP DATABASE IF EXISTS Products;

CREATE DATABASE Products;

USE Products;

CREATE TABLE ProductInfo (
  productID
    INT AUTO_INCREMENT,
  name
    VARCHAR(100) NOT NULL,
  slogan
    VARCHAR(100) NOT NULL,
  description
    VARCHAR(255) NOT NULL,
  category
    VARCHAR(100) NOT NULL,
  default_price
    DECIMAL NOT NULL,
  PRIMARY KEY(productID)
);

-- LOAD DATA LOCAL INFILE './database/product.csv' INTO TABLE ProductInfo FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 LINES;

CREATE TABLE ProductFeatures (
  featureID
    SMALLINT AUTO_INCREMENT,
  productID
    INT,
  feature
    VARCHAR(100),
  feature_value
    VARCHAR(100),
  PRIMARY KEY(featureID),
  FOREIGN KEY(productID) REFERENCES ProductInfo(productID)
);

CREATE TABLE ProductStyles (
  styleID
    SMALLINT AUTO_INCREMENT,
  productID
    INT,
  name
    VARCHAR(100) NOT NULL,
  sale_price
    DECIMAL NOT NULL,
  original_price
    DECIMAL NOT NULL,
  default_style
    TINYINT(1) NOT NULL DEFAULT '0',
  PRIMARY KEY(styleID),
  FOREIGN KEY(productID) REFERENCES ProductInfo(productID)
);

CREATE TABLE ProductPhotos (
  photoID
    INT AUTO_INCREMENT,
  styleID
    SMALLINT,
  thumbnail_url
    VARCHAR(255),
  url
    VARCHAR(255),
  PRIMARY KEY(photoID),
  FOREIGN KEY(styleID) REFERENCES ProductStyles(styleID)
);

CREATE TABLE ProductStock (
  stockID
    INT AUTO_INCREMENT,
  styleID
    SMALLINT,
  size
    ENUM('XS', 'S', 'M', 'L', 'XL', 'XXL'),
  quantity
    SMALLINT NOT NULL,
  PRIMARY KEY(stockID),
  FOREIGN KEY(styleID) REFERENCES ProductStyles(styleID)
);
