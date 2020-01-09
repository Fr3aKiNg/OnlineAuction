create database onlineauction;
use onlineauction;

CREATE TABLE `users` (
  `user_id` int PRIMARY KEY AUTO_INCREMENT,
  `full_name` varchar(50),
  `username` varchar(50) UNIQUE,
  `hashpass` varchar(255),
  `address` varchar(100),
  `dob` datetime,
  `email` varchar(50) UNIQUE,
  `type` numeric
);

CREATE TABLE `user_want_upgrade` (
  `user_id` int PRIMARY KEY
);

CREATE TABLE `categories` (
  `cat_id` int PRIMARY KEY AUTO_INCREMENT,
  `cat_name` varchar(50),
  `cat_root` int
);

CREATE TABLE `products` (
  `product_id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(50),
  `starting_price` int,
  `price_step` int,
  `buy_now_price` int,
  `winner_id` int,
  `seller_id` int,
  `category_id` int,
  `posted_time` datetime,
  `end_time` datetime,
  `auto_remain_time` boolean,
  `offer_price` int
);

CREATE TABLE `description` (
  `product_id` int,
  `_time` datetime,
  `content` varchar(500),
  PRIMARY KEY (`product_id`, `_time`)
);

CREATE TABLE `watch_list` (
  `user_id` int,
  `product_id` int,
  PRIMARY KEY (`user_id`, `product_id`)
);

CREATE TABLE `evaluates` (
  `user_id` int,
  `tar_user_id` int,
  `product_id` int,
  `value` int,
  `eval_content` varchar(100)
);

CREATE TABLE `offers` (
  `product_id` int,
  `user_id` int,
  `_time` datetime,
  `money` int,
  PRIMARY KEY (`product_id`, `user_id`, `_time`)
);

CREATE TABLE `blocks` (
  `product_id` int,
  `user_id` int,
  PRIMARY KEY (`product_id`, `user_id`)
);

ALTER TABLE `user_want_upgrade` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `categories` ADD FOREIGN KEY (`cat_root`) REFERENCES `categories` (`cat_id`);

ALTER TABLE `products` ADD FOREIGN KEY (`seller_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `products` ADD FOREIGN KEY (`category_id`) REFERENCES `categories` (`cat_id`);

ALTER TABLE `products` ADD FOREIGN KEY (`winner_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `description` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

ALTER TABLE `watch_list` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `watch_list` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

ALTER TABLE `evaluates` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `evaluates` ADD FOREIGN KEY (`tar_user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `evaluates` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

ALTER TABLE `offers` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

ALTER TABLE `offers` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `blocks` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

ALTER TABLE `blocks` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

CREATE TABLE `sessions` (
  `session_id` varchar(128) COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` mediumtext COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
);

CREATE USER 'adminonlineaution'@'localhost' IDENTIFIED WITH mysql_native_password BY '@ution1234';
GRANT ALL PRIVILEGES ON `onlineauction`.* TO 'adminonlineaution'@'localhost';

/*DROP DATABASE `onlineauction`;*/

