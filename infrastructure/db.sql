-- Adminer 4.7.7 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP DATABASE IF EXISTS `restaurants`;
CREATE DATABASE `restaurants` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `restaurants`;

DROP TABLE IF EXISTS `address_types`;
CREATE TABLE `address_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `addresses`;
CREATE TABLE `addresses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `address_line_1` varchar(265) DEFAULT NULL,
  `address_line_2` varchar(45) DEFAULT NULL,
  `suburb` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `province` varchar(45) DEFAULT NULL,
  `postal_code` varchar(45) DEFAULT NULL,
  `users_id` int NOT NULL,
  `address_types_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_addresses_users1_idx` (`users_id`),
  KEY `fk_addresses_address_types1_idx` (`address_types_id`),
  CONSTRAINT `fk_addresses_address_types1` FOREIGN KEY (`address_types_id`) REFERENCES `address_types` (`id`),
  CONSTRAINT `fk_addresses_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(256) DEFAULT NULL,
  `available` char(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `item_spice_levels`;
CREATE TABLE `item_spice_levels` (
  `id` int NOT NULL AUTO_INCREMENT,
  `spice_level` varchar(10) NOT NULL,
  `description` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `items`;
CREATE TABLE `items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(256) DEFAULT NULL,
  `price` double NOT NULL,
  `featured` char(1) DEFAULT NULL,
  `available` char(1) DEFAULT NULL,
  `complimentary` char(1) DEFAULT NULL,
  `categories_id` int NOT NULL,
  `item_spice_levels_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_items_categories1_idx` (`categories_id`),
  KEY `fk_items_item_spice_levels1_idx` (`item_spice_levels_id`),
  CONSTRAINT `fk_items_categories1` FOREIGN KEY (`categories_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `fk_items_item_spice_levels1` FOREIGN KEY (`item_spice_levels_id`) REFERENCES `item_spice_levels` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `items_has_complementary_items`;
CREATE TABLE `items_has_complementary_items` (
  `items_id` int NOT NULL AUTO_INCREMENT,
  `complemetary_item_id` int NOT NULL,
  PRIMARY KEY (`items_id`,`complemetary_item_id`),
  KEY `fk_items_has_items_items2_idx` (`complemetary_item_id`),
  KEY `fk_items_has_items_items1_idx` (`items_id`),
  CONSTRAINT `fk_items_has_items_items1` FOREIGN KEY (`items_id`) REFERENCES `items` (`id`),
  CONSTRAINT `fk_items_has_items_items2` FOREIGN KEY (`complemetary_item_id`) REFERENCES `items` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `milestones`;
CREATE TABLE `milestones` (
  `id` int NOT NULL,
  `name` varchar(15) NOT NULL,
  `description` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `order_items`;
CREATE TABLE `order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL,
  `instructions` varchar(256) DEFAULT NULL,
  `orders_id` int NOT NULL,
  `items_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_order_items_orders1_idx` (`orders_id`),
  KEY `fk_order_items_items1_idx` (`items_id`),
  CONSTRAINT `fk_order_items_items1` FOREIGN KEY (`items_id`) REFERENCES `items` (`id`),
  CONSTRAINT `fk_order_items_orders1` FOREIGN KEY (`orders_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `total_cost` double NOT NULL,
  `discount` double DEFAULT NULL,
  `order_mode` varchar(15) DEFAULT NULL,
  `collected_by` varchar(60) DEFAULT NULL,
  `current_milestones_id` int NOT NULL,
  `addresses_id` int NOT NULL,
  `users_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_orders_milestones1_idx` (`current_milestones_id`),
  KEY `fk_orders_addresses1_idx` (`addresses_id`),
  KEY `fk_orders_users1_idx` (`users_id`),
  CONSTRAINT `fk_orders_addresses1` FOREIGN KEY (`addresses_id`) REFERENCES `addresses` (`id`),
  CONSTRAINT `fk_orders_milestones1` FOREIGN KEY (`current_milestones_id`) REFERENCES `milestones` (`id`),
  CONSTRAINT `fk_orders_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `restaurants`;
CREATE TABLE `restaurants` (
  `id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `category` varchar(30) NOT NULL,
  `cuisine` varchar(15) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `email` varchar(30) NOT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `owner` varchar(45) DEFAULT NULL,
  `serves_breakfast` char(1) DEFAULT NULL,
  `serves_lunch` char(1) DEFAULT NULL,
  `serves_dinner` char(1) DEFAULT NULL,
  `serves_takeaway` char(1) DEFAULT NULL,
  `serves_delivery` char(1) DEFAULT NULL,
  `outdoor_seating` char(1) DEFAULT NULL,
  `indoor_seating` char(1) DEFAULT NULL,
  `vegan_available` char(1) DEFAULT NULL,
  `veg_available` char(1) DEFAULT NULL,
  `nonveg_available` char(1) DEFAULT NULL,
  `halaal_available` char(1) DEFAULT NULL,
  `smoking` char(1) DEFAULT NULL,
  `soft_drinks_available` char(1) DEFAULT NULL,
  `hard_drinks_availbale` char(1) DEFAULT NULL,
  `is_delivery_open` char(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `restaurants` (`id`, `name`, `category`, `cuisine`, `phone`, `email`, `latitude`, `longitude`, `owner`, `serves_breakfast`, `serves_lunch`, `serves_dinner`, `serves_takeaway`, `serves_delivery`, `outdoor_seating`, `indoor_seating`, `vegan_available`, `veg_available`, `nonveg_available`, `halaal_available`, `smoking`, `soft_drinks_available`, `hard_drinks_availbale`, `is_delivery_open`) VALUES
(1,	'Taste Of India',	'Food and Beverages',	'Indian',	'+27 11 463 1651',	'info@tasteofindiajhb.com',	-26.043507,	28.014769,	'Ashok',	'Y',	'Y',	'Y',	'Y',	'Y',	'Y',	'Y',	'Y',	'Y',	'Y',	'Y',	'Y',	'Y',	'N',	'Y');

DROP TABLE IF EXISTS `user_roles`;
CREATE TABLE `user_roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `user_roles` (`id`, `name`, `description`) VALUES
(1,	'USER',	'The user without admin panel'),
(2,	'ADMIN',	'User with access to admin panel');

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `password` varchar(256) DEFAULT NULL,
  `created` date DEFAULT NULL,
  `is_active` char(1) DEFAULT NULL,
  `activation_token` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `restaurants_id` int NOT NULL,
  `user_roles_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_email` (`email`),
  KEY `fk_users_restaurants_idx` (`restaurants_id`),
  KEY `fk_users_user_roles1_idx` (`user_roles_id`),
  CONSTRAINT `fk_users_restaurants` FOREIGN KEY (`restaurants_id`) REFERENCES `restaurants` (`id`),
  CONSTRAINT `fk_users_user_roles1` FOREIGN KEY (`user_roles_id`) REFERENCES `user_roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `users` (`id`, `first_name`, `last_name`, `phone`, `email`, `password`, `created`, `is_active`, `activation_token`, `restaurants_id`, `user_roles_id`) VALUES
(1,	'Vasundhara',	'Chine',	'0815694544',	'vasu.chine@gmail.com',	'$2a$10$PK4TqGXSCGv4L29PxpFkT.aI14hi9Zqrsdpy7r/zHCvRbxxGPkLlO',	'2020-11-09',	'N',	'42bea02da21555bbefbadfdcf9434d101bb26bc6',	1,	1);

-- 2020-11-11 20:30:10
