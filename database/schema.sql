DROP DATABASE IF EXISTS Products;

CREATE DATABASE Products;

USE Products;

CREATE TABLE ProductInfo (
  id
    INT AUTO_INCREMENT,
  name
    VARCHAR(100) NOT NULL,
  slogan
    VARCHAR(255) NOT NULL,
  description
    TEXT NOT NULL,
  category
    VARCHAR(100) NOT NULL,
  default_price
    DECIMAL(12, 2) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE ProductFeatures (
  id
    INT AUTO_INCREMENT,
  product_id
    INT,
  feature
    VARCHAR(100),
  feature_value
    VARCHAR(100),
  PRIMARY KEY(id),
  FOREIGN KEY(product_id) REFERENCES ProductInfo(id)
);

CREATE TABLE ProductStyles (
  id
    INT AUTO_INCREMENT,
  product_id
    INT,
  name
    VARCHAR(100) NOT NULL,
  sale_price
    DECIMAL(6, 2) DEFAULT NULL,
  original_price
    DECIMAL(12, 2),
  default_style
    TINYINT(1) NOT NULL DEFAULT '0',
  PRIMARY KEY(id),
  FOREIGN KEY(product_id) REFERENCES ProductInfo(id)
);

CREATE TABLE ProductPhotos (
  id
    INT AUTO_INCREMENT,
  style_id
    INT,
  url
    TEXT,
  thumbnail_url
    TEXT,
  PRIMARY KEY(id),
  FOREIGN KEY(style_id) REFERENCES ProductStyles(id)
);

CREATE TABLE ProductStock (
  id
    INT AUTO_INCREMENT,
  style_id
    INT,
  size
    varchar(10) NOT NULL,
  quantity
    SMALLINT NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(style_id) REFERENCES ProductStyles(id)
);
