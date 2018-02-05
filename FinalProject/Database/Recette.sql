-- phpMyAdmin SQL Dump
-- version 4.7.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 05, 2018 at 07:58 AM
-- Server version: 5.6.35
-- PHP Version: 7.1.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Recette`
--

-- --------------------------------------------------------

--
-- Table structure for table `created_by`
--

CREATE TABLE `created_by` (
  `user_id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `created_by`
--

INSERT INTO `created_by` (`user_id`, `recipe_id`) VALUES
(1, 1),
(1, 5),
(1, 14),
(1, 2),
(1, 13),
(1, 6),
(1, 3),
(1, 15),
(1, 9),
(1, 9),
(1, 10),
(1, 12),
(1, 8),
(1, 11),
(1, 4),
(1, 11),
(1, 7);

-- --------------------------------------------------------

--
-- Table structure for table `has_ingredients`
--

CREATE TABLE `has_ingredients` (
  `recipe_id` int(20) NOT NULL,
  `ingredient_id` int(20) NOT NULL,
  `quantity` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `has_ingredients`
--

INSERT INTO `has_ingredients` (`recipe_id`, `ingredient_id`, `quantity`) VALUES
(1, 8, 0),
(1, 7, 0),
(5, 11, 0),
(5, 2, 0),
(14, 6, 0),
(2, 1, 0),
(13, 5, 0),
(13, 1, 0),
(13, 7, 0),
(6, 5, 0),
(6, 1, 0),
(6, 8, 0),
(3, 10, 0),
(3, 4, 0),
(3, 2, 0),
(15, 10, 0),
(15, 2, 0),
(9, 3, 0),
(10, 1, 0),
(12, 2, 0),
(12, 8, 0),
(12, 4, 0),
(4, 11, 0),
(4, 2, 0),
(11, 9, 0),
(11, 10, 0),
(7, 7, 0),
(7, 3, 0);

-- --------------------------------------------------------

--
-- Table structure for table `ingredients`
--

CREATE TABLE `ingredients` (
  `ingredient_id` int(20) NOT NULL,
  `name` varchar(20) NOT NULL,
  `unit_id` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ingredients`
--

INSERT INTO `ingredients` (`ingredient_id`, `name`, `unit_id`) VALUES
(1, 'Salt', 0),
(2, 'Meat', 0),
(3, 'Milk', 0),
(4, 'Cheese', 0),
(5, 'Chicken', 0),
(6, 'Coffee Beans', 0),
(7, 'Flour', 0),
(8, 'Sugar', 0),
(9, 'Beef', 0),
(10, 'Buns', 0),
(11, 'Noodles', 0),
(12, 'Rice', 0),
(13, 'Soy Sauce', 0),
(14, 'Ice', 0),
(15, 'Water', 0);

-- --------------------------------------------------------

--
-- Table structure for table `origin`
--

CREATE TABLE `origin` (
  `origin_id` int(20) NOT NULL,
  `name` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `origin`
--

INSERT INTO `origin` (`origin_id`, `name`) VALUES
(1, 'America'),
(2, 'China'),
(3, 'Italy'),
(4, 'Europe'),
(5, 'Mexico'),
(6, 'Canada'),
(7, 'Korea'),
(8, 'Vietnam'),
(9, 'France');

-- --------------------------------------------------------

--
-- Table structure for table `recipes`
--

CREATE TABLE `recipes` (
  `recipe_id` int(100) NOT NULL,
  `user_id` int(100) NOT NULL DEFAULT '0',
  `name` varchar(30) NOT NULL,
  `prep_time` time NOT NULL,
  `cooking_time` time NOT NULL,
  `rating` enum('0','1','2','3','4','5') DEFAULT NULL,
  `origin_id` int(20) NOT NULL,
  `style_id` int(11) NOT NULL,
  `image` longblob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `recipes`
--

INSERT INTO `recipes` (`recipe_id`, `user_id`, `name`, `prep_time`, `cooking_time`, `rating`, `origin_id`, `style_id`, `image_location`) VALUES
(1, 1, 'Chocolate Chip Cookie', '01:00:00', '00:05:00', '5', 1, 2, 'images/cookie1.jpg'),
(2, 1, 'French Fries', '01:00:00', '00:05:00', '2', 1, 3, 'images/fries2.jpg'),
(3, 1, 'Hamburger', '01:00:00', '00:05:00', '4', 1, 3, 'images/burger3.jpg'),
(4, 1, 'Spaghetti', '01:00:00', '00:05:00', '4', 3, 2, 'images/spaghetti4.jpg'),
(5, 1, 'Chow Mein', '01:00:00', '00:05:00', '4', 2, 3, 'images/chowMein5.jpg'),
(6, 1, 'Fried Rice', '01:00:00', '00:05:00', '3', 2, 3, 'images/friedrice6.jpg'),
(7, 1, 'Waffle', '01:00:00', '00:05:00', '3', 4, 1, 'images/waffles7.jpg'),
(8, 1, 'Scrambled Eggs', '01:00:00', '00:05:00', '4', 1, 1, 'images/eggs8.jpg'),
(9, 1, 'Ice Cream', '01:00:00', '00:05:00', '4', 1, 2, 'images/iceCream9.jpg'),
(10, 1, 'Kimchi', '01:00:00', '00:05:00', '3', 7, 3, 'images/kimchi10.jpg'),
(11, 1, 'Taco', '01:00:00', '00:05:00', '4', 5, 2, 'images/taco-11.jpg'),
(12, 1, 'Meat Lasagna', '01:00:00', '00:05:00', '4', 1, 2, 'images/lasagna12.jpg'),
(13, 1, 'Fried Chicken', '01:00:00', '00:05:00', '5', 1, 4, 'images/chicken13.jpg'),
(14, 1, 'Coffee', '01:00:00', '00:05:00', '5', 1, 1, 'images/coffer14.jpg'),
(15, 1, 'Hot Dog', '01:00:00', '00:05:00', '4', 1, 3, 'images/hotdog15.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `style`
--

CREATE TABLE `style` (
  `style_id` int(20) NOT NULL,
  `name` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `style`
--

INSERT INTO `style` (`style_id`, `name`) VALUES
(1, 'Breakfast'),
(2, 'Dinner'),
(3, 'Lunch'),
(4, 'BBQ'),
(5, 'Buffet'),
(6, 'Burger');

-- --------------------------------------------------------

--
-- Table structure for table `unit`
--

CREATE TABLE `unit` (
  `unit_id` int(20) NOT NULL,
  `name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `unit`
--

INSERT INTO `unit` (`unit_id`, `name`) VALUES
(3, 'cup'),
(12, 'fluid oz'),
(7, 'gallon'),
(11, 'grams'),
(13, 'kilogram'),
(6, 'liter'),
(10, 'milliliter'),
(9, 'ounces'),
(4, 'pint'),
(8, 'pound'),
(5, 'quart'),
(2, 'tablespoon'),
(1, 'teaspoon');

-- --------------------------------------------------------

--
-- Table structure for table `user_data`
--

CREATE TABLE `user_data` (
  `user_id` int(10) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `email` varchar(40) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_data`
--

INSERT INTO `user_data` (`user_id`, `username`, `password`, `email`, `first_name`, `last_name`) VALUES
(1, 'realtech', 'cs435', 'RealTechInc@cpp.edu', 'Real', 'Tech');

-- --------------------------------------------------------

--
-- Table structure for table `user_rating`
--

CREATE TABLE `user_rating` (
  `user_id` int(20) NOT NULL,
  `recipe_id` int(20) NOT NULL,
  `rating` decimal(4,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `created_by`
--
ALTER TABLE `created_by`
  ADD KEY `user_id` (`user_id`),
  ADD KEY `recipe_id` (`recipe_id`);

--
-- Indexes for table `has_ingredients`
--
ALTER TABLE `has_ingredients`
  ADD KEY `recipe_id` (`recipe_id`),
  ADD KEY `ingredient_id` (`ingredient_id`);

--
-- Indexes for table `ingredients`
--
ALTER TABLE `ingredients`
  ADD PRIMARY KEY (`ingredient_id`),
  ADD KEY `unit_id` (`unit_id`);

--
-- Indexes for table `origin`
--
ALTER TABLE `origin`
  ADD PRIMARY KEY (`origin_id`);

--
-- Indexes for table `recipes`
--
ALTER TABLE `recipes`
  ADD PRIMARY KEY (`recipe_id`) USING BTREE,
  ADD KEY `user_id` (`user_id`),
  ADD KEY `origin_id` (`origin_id`),
  ADD KEY `style_id` (`style_id`);

--
-- Indexes for table `style`
--
ALTER TABLE `style`
  ADD PRIMARY KEY (`style_id`);

--
-- Indexes for table `unit`
--
ALTER TABLE `unit`
  ADD PRIMARY KEY (`unit_id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `user_data`
--
ALTER TABLE `user_data`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `user_rating`
--
ALTER TABLE `user_rating`
  ADD PRIMARY KEY (`user_id`,`recipe_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ingredients`
--
ALTER TABLE `ingredients`
  MODIFY `ingredient_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `origin`
--
ALTER TABLE `origin`
  MODIFY `origin_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `recipes`
--
ALTER TABLE `recipes`
  MODIFY `recipe_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `style`
--
ALTER TABLE `style`
  MODIFY `style_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `unit`
--
ALTER TABLE `unit`
  MODIFY `unit_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `user_data`
--
ALTER TABLE `user_data`
  MODIFY `user_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `created_by`
--
ALTER TABLE `created_by`
  ADD CONSTRAINT `created_by_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_data` (`user_id`),
  ADD CONSTRAINT `created_by_ibfk_2` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`recipe_id`);

--
-- Constraints for table `has_ingredients`
--
ALTER TABLE `has_ingredients`
  ADD CONSTRAINT `has_ingredients_ibfk_1` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`ingredient_id`),
  ADD CONSTRAINT `has_ingredients_ibfk_2` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`recipe_id`);

--
-- Constraints for table `recipes`
--
ALTER TABLE `recipes`
  ADD CONSTRAINT `recipes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_data` (`user_id`),
  ADD CONSTRAINT `recipes_ibfk_2` FOREIGN KEY (`origin_id`) REFERENCES `origin` (`origin_id`),
  ADD CONSTRAINT `recipes_ibfk_3` FOREIGN KEY (`style_id`) REFERENCES `style` (`style_id`);

--
-- Stored Procedures
--
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `addRecipe`(IN `creator_id` INT(100), IN `recipe_name` VARCHAR(30), IN `recipe_prep_time` TIME, IN `recipe_cooking_time` TIME, IN `recipe_origin_id` INT(20), IN `recipe_style_id` INT(20), IN `recipe_image` LONGBLOB)
BEGIN
  insert into recipes(user_id, name, prep_time, cooking_time, rating, origin_id, style_id, image)
  values(creator_id, recipe_name, recipe_prep_time, recipe_cooking_time, recipe_origin_id, recipe_style_id, recipe_image);
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `addIngredient`(IN `recipes_id` INT(100), IN `ingredients_id` INT(30), IN `ingredient_quantity` INT(30))
BEGIN
  insert into has_ingredients(recipe_id, ingredient_id, quantity)
  values(recipes_id, ingredients_id, ingredient_quantity);
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `createUser`(
  in user_username varchar(30),
  in user_password varchar(30),
  in user_email varchar(40),
  in user_first varchar(20),
  in user_last varchar(20)
)
BEGIN
  insert into user_data(username,user_data.password,email,first_name,last_name)
  values(user_username, user_password, user_email, user_first, user_last);
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`‘root’`@`‘localhost’` PROCEDURE `getIngredients`()
BEGIN
  #This procedure returns all Ingredients in the database
  SELECT name FROM ingredients; 
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`‘root’`@`‘localhost’` PROCEDURE `getImage`()
BEGIN
  #This procedure returns all Ingredients in the database
  SELECT image_location FROM recipes; 
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`‘root’`@`‘localhost’` PROCEDURE `getRecipeByID`(IN `recipe_id` INT)
BEGIN
  #Returns Ingredients that the recipe is using (ID).
  SELECT ingredient_id FROM has_ingredients where has_ingredients.recipe_id = recipe_id; 
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`‘root’`@`‘localhost’` PROCEDURE `getIngredients`()
BEGIN
  #This procedure gets data from the recipe table
  SELECT name, prep_time, cooking_time, origin_id, style_id, image, rating FROM recipes where recipes.recipe_id = recipe_id; 
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`‘root’`@`‘localhost’` PROCEDURE `getRecipe`()
BEGIN
  SELECT name, prep_time, cooking_time, origin_id, style_id, image, rating FROM recipes; # This procedure grabs information from the Recipe table.
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `newIngredient`(IN `ingredient_unit` INT(20), IN `ingredient_name` VARCHAR(30))
BEGIN
  insert into ingredients(name, unit_id)
  values(ingredient_name, ingredient_unit)
  on DUPLICATE KEY UPDATE name = name;
END$$
DELIMITER ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
