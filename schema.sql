DROP DATABASE IF EXISTS Products;

CREATE DATABASE Products;

USE Products;

CREATE TABLE ProductList (
  ID
    INT AUTO_INCREMENT,
  productID
    INT,
  PRIMARY KEY(ID),
  FOREIGN KEY(ID) REFERENCES ProductInfo(productID)
)

CREATE TABLE ProductInfo (
  productID
    INT AUTO_INCREMENT,
  name
    VARCHAR(20) NOT NULL DEFAULT '',
  slogan
    VARCHAR(100) NOT NULL DEFAULT '',
  description
    VARCHAR(255) NOT NULL DEFAULT '',
  category
    CHAR(20) NOT NULL DEFAULT '',
  PRIMARY KEY(productID)
);

CREATE TABLE ProductFeatures (
  featureID
    SMALLINT AUTO_INCREMENT,
  feature
    VARCHAR(20) NULL,
  feature_value
    VARCHAR(20) NULL,
  productID
    INT,
  PRIMARY KEY(featureID),
  FOREIGN KEY(featureID) REFERENCES ProductInfo(productID)
);

CREATE TABLE ProductStyles (
  styleID
    SMALLINT AUTO_INCREMENT,
  name
    VARCHAR(20) NOT NULL DEFAULT '',
  original_price
    DECIMAL NOT NULL DEFAULT '99999.99',
  sale_price
    DECIMAL NOT NULL DEFAULT '99999.99',
  default
    BOOLEAN NOT NULL DEFAULT 'false',
  productID
    INT,
  PRIMARY KEY(styleID),
  FOREIGN KEY(styleID) REFERENCES ProductInfo(productID)
);

CREATE TABLE ProductPhotos (
  photoID
    MEDIUMINT AUTO_INCREMENT,
  thumbnail_url
    VARCHAR(255) NULL,
  url
    VARCHAR(255) NULL,
  styleID
    INT,
  PRIMARY KEY(photoID),
  FOREIGN KEY(photoID) REFERENCES ProductStyles(styleID)
);

CREATE TABLE ProductStock (
  stockID
    INT AUTO_INCREMENT.
  quantity
    SMALLINT NOT NULL DEFAULT '0',
  size
    ENUM('XS', 'S', 'M', 'L', 'XL', 'XXL'),
  styleID
    INT,
  PRIMARY KEY(stockID),
  FOREIGN KEY(stockID) REFERENCES ProductStyles(styleID)
);