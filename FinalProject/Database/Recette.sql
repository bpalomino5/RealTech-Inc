-- phpMyAdmin SQL Dump
-- version 4.7.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Feb 07, 2018 at 03:54 AM
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
(1, 7),
(1, 16),
(1, 17),
(1, 18),
(1, 19),
(1, 20),
(1, 21);

-- --------------------------------------------------------

--
-- Table structure for table `has_ingredients`
--

CREATE TABLE `has_ingredients` (
  `dummy_id` int(11) NOT NULL,
  `recipe_id` int(20) NOT NULL,
  `ingredient_id` int(20) NOT NULL,
  `quantity` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `has_ingredients`
--

INSERT INTO `has_ingredients` (`dummy_id`, `recipe_id`, `ingredient_id`, `quantity`) VALUES
(1, 1, 8, '0'),
(2, 1, 7, '0'),
(3, 5, 11, '0'),
(4, 5, 2, '0'),
(5, 14, 6, '0'),
(6, 2, 1, '0'),
(7, 13, 5, '0'),
(8, 13, 1, '0'),
(9, 13, 7, '0'),
(10, 6, 5, '0'),
(11, 6, 1, '0'),
(12, 6, 8, '0'),
(13, 3, 10, '0'),
(14, 3, 4, '0'),
(15, 3, 2, '0'),
(16, 15, 10, '0'),
(17, 15, 2, '0'),
(18, 9, 3, '0'),
(19, 10, 1, '0'),
(20, 12, 2, '0'),
(21, 12, 8, '0'),
(22, 12, 4, '0'),
(23, 4, 11, '0'),
(24, 4, 2, '0'),
(25, 11, 9, '0'),
(26, 11, 10, '0'),
(27, 7, 7, '0'),
(28, 7, 3, '0'),
(29, 16, 15, '0'),
(30, 16, 16, '0'),
(31, 16, 17, '0'),
(32, 16, 20, '0'),
(33, 16, 21, '0'),
(34, 16, 22, '0'),
(35, 16, 23, '0'),
(36, 16, 1, '0'),
(37, 17, 18, '0'),
(38, 17, 24, '0'),
(39, 17, 19, '0'),
(40, 17, 26, '0'),
(41, 17, 25, '0'),
(42, 17, 27, '0'),
(43, 17, 28, '0'),
(44, 17, 29, '0'),
(45, 17, 30, '0'),
(46, 17, 16, '0'),
(47, 17, 32, '0'),
(48, 17, 31, '0'),
(49, 18, 37, '0'),
(50, 18, 36, '0'),
(51, 18, 38, '0'),
(52, 18, 7, '0'),
(53, 18, 43, '0'),
(54, 18, 31, '0'),
(55, 18, 27, '0'),
(56, 18, 44, '0'),
(57, 18, 45, '0'),
(58, 18, 25, '0'),
(59, 18, 39, '0'),
(60, 18, 40, '0'),
(61, 18, 29, '0'),
(62, 18, 41, '0'),
(63, 19, 35, '0'),
(64, 19, 46, '0'),
(65, 19, 40, '0'),
(66, 19, 47, '0'),
(67, 19, 29, '0'),
(68, 19, 27, '0'),
(69, 19, 48, '0'),
(70, 19, 15, '0'),
(71, 19, 49, '0'),
(72, 19, 31, '0'),
(74, 19, 50, '0'),
(75, 20, 51, '0'),
(76, 20, 42, '0'),
(77, 20, 7, '0'),
(78, 20, 25, '0'),
(79, 20, 15, '0'),
(80, 20, 3, '0'),
(81, 20, 52, '0'),
(82, 20, 54, '0'),
(83, 20, 53, '0'),
(84, 20, 55, '0'),
(85, 20, 56, '0'),
(86, 20, 44, '0'),
(87, 21, 57, ''),
(88, 21, 58, ''),
(89, 21, 40, ''),
(90, 21, 59, ''),
(91, 21, 60, ''),
(92, 21, 62, ''),
(93, 22, 27, ''),
(94, 22, 42, ''),
(95, 22, 22, ''),
(96, 22, 31, ''),
(97, 22, 63, ''),
(98, 22, 64, ''),
(99, 23, 39, ''),
(100, 23, 16, ''),
(101, 23, 67, ''),
(102, 23, 68, ''),
(103, 23, 31, ''),
(104, 23, 69, ''),
(105, 23, 70, ''),
(106, 23, 44, ''),
(107, 23, 29, ''),
(108, 23, 40, ''),
(109, 23, 57, ''),
(110, 23, 71, ''),
(111, 24, 40, ''),
(112, 24, 35, ''),
(113, 24, 39, ''),
(114, 24, 48, ''),
(115, 24, 34, ''),
(116, 24, 33, ''),
(117, 25, 61, ''),
(118, 25, 72, ''),
(119, 25, 41, ''),
(120, 25, 24, ''),
(121, 25, 1, ''),
(122, 25, 44, ''),
(123, 25, 74, ''),
(124, 25, 75, '');

-- --------------------------------------------------------

--
-- Table structure for table `ingredients`
--

CREATE TABLE `ingredients` (
  `ingredient_id` int(20) NOT NULL,
  `name` varchar(50) NOT NULL,
  `unit_id` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ingredients`
--

INSERT INTO `ingredients` (`ingredient_id`, `name`, `unit_id`) VALUES
(1, 'Salt', 1),
(2, 'Meat', 8),
(3, 'Milk', 3),
(4, 'Cheese', 9),
(5, 'Chicken', 8),
(6, 'Coffee Beans', 2),
(7, 'Flour', 3),
(8, 'Sugar', 2),
(9, 'Beef', 8),
(10, 'Buns', 0),
(11, 'Noodles', 8),
(12, 'Rice', 3),
(13, 'Soy Sauce', 2),
(14, 'Ice', 0),
(15, 'Water', 3),
(16, 'Garlic', 14),
(17, 'Cumin', 1),
(18, 'Chicken broth', 3),
(19, 'American cheese', 8),
(20, 'Lemon juice', 3),
(21, 'Tahini', 3),
(22, 'Parsley', 2),
(23, 'Chickpeas', 3),
(24, 'Tomatoes', 0),
(25, 'Olive oil', 2),
(26, 'Yellow onion', 0),
(27, 'Jalapenos', 0),
(28, 'Chicken breast', 0),
(29, 'Green onions', 0),
(30, 'Mexican chorizo', 15),
(31, 'Cheddar cheese', 9),
(32, 'Mushroom', 0),
(33, 'Colby-Monterey Jack cheese', 3),
(34, 'Refried beans', 9),
(35, 'Ground beef', 9),
(36, 'Bacon', 16),
(37, 'Bacon fat', 2),
(38, 'Kosher salt', 1),
(39, 'Cream cheese', 3),
(40, 'Sour cream', 3),
(41, 'Lime juice', 1),
(42, 'Butter', 2),
(43, 'Egg', 0),
(44, 'Cayenne pepper', 17),
(45, 'Black pepper', 17),
(46, 'Salsa', 3),
(47, 'Black olives', 9),
(48, 'Taco', 9),
(49, 'Tortilla chips', 9),
(50, 'Beans', 9),
(51, 'Steak', 9),
(52, 'Onion', 3),
(53, 'Sweet peppers', 3),
(54, 'Provolone cheese', 9),
(55, 'Nutmeg', 17),
(56, 'Baguettes', 0),
(57, 'Mayonnaise', 3),
(58, 'Water chestnuts', 9),
(59, 'Spinach', 9),
(60, 'Leek soup', 9),
(61, 'Avocados', 0),
(62, 'Bread', 8),
(63, 'Buttermilk biscuit dough', 9),
(64, 'Mozzarella cheese', 3),
(65, 'Lump crabmeat', 8),
(66, 'Lemon', 0),
(67, 'Artichoke bottoms', 9),
(68, 'Tarragon', 1),
(69, 'Worcestershire sauce', 1),
(70, 'Red bell pepper', 3),
(71, 'Sourdough bread', 0),
(72, 'Cilantro', 2),
(74, 'Minced garlic', 1),
(75, 'Diced onion', 3);

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
  `ready_in` time NOT NULL,
  `rating` enum('0','1','2','3','4','5') DEFAULT NULL,
  `origin_id` int(20) NOT NULL,
  `style_id` int(11) NOT NULL,
  `instruction` text NOT NULL,
  `image_location` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `recipes`
--

INSERT INTO `recipes` (`recipe_id`, `user_id`, `name`, `prep_time`, `cooking_time`, `ready_in`, `rating`, `origin_id`, `style_id`, `instruction`, `image_location`) VALUES
(1, 1, 'Chocolate Chip Cookie', '01:00:00', '00:05:00', '00:00:00', '5', 1, 2, '', 'images/cookie1.jpg'),
(2, 1, 'French Fries', '01:00:00', '00:05:00', '00:00:00', '2', 1, 3, '', 'images/fries2.jpg'),
(3, 1, 'Hamburger', '01:00:00', '00:05:00', '00:00:00', '4', 1, 3, '', 'images/burger3.jpg'),
(4, 1, 'Spaghetti', '01:00:00', '00:05:00', '00:00:00', '4', 3, 2, '', 'images/spaghetti4.jpg'),
(5, 1, 'Chow Mein', '01:00:00', '00:05:00', '00:00:00', '4', 2, 3, '', 'images/chowMein5.jpg'),
(6, 1, 'Fried Rice', '01:00:00', '00:05:00', '00:00:00', '3', 2, 3, '', 'images/friedrice6.jpg'),
(7, 1, 'Waffle', '01:00:00', '00:05:00', '00:00:00', '3', 4, 1, '', 'images/waffles7.jpg'),
(8, 1, 'Scrambled Eggs', '01:00:00', '00:05:00', '00:00:00', '4', 1, 1, '', 'images/eggs8.jpg'),
(9, 1, 'Ice Cream', '01:00:00', '00:05:00', '00:00:00', '4', 1, 2, '', 'images/iceCream9.jpg'),
(10, 1, 'Kimchi', '01:00:00', '00:05:00', '00:00:00', '3', 7, 3, '', 'images/kimchi10.jpg'),
(11, 1, 'Taco', '01:00:00', '00:05:00', '00:00:00', '4', 5, 2, '', 'images/taco-11.jpg'),
(12, 1, 'Meat Lasagna', '01:00:00', '00:05:00', '00:00:00', '4', 1, 2, '', 'images/lasagna12.jpg'),
(13, 1, 'Fried Chicken', '01:00:00', '00:05:00', '00:00:00', '5', 1, 4, '', 'images/chicken13.jpg'),
(14, 1, 'Coffee', '01:00:00', '00:05:00', '00:00:00', '5', 1, 1, '', 'images/coffer14.jpg'),
(15, 1, 'Hot Dog', '01:00:00', '00:05:00', '00:00:00', '4', 1, 3, '', 'images/hotdog15.jpg'),
(16, 1, 'Tao Hummus', '00:10:00', '00:10:00', '00:00:00', '5', 1, 7, 'Combine chickpeas, tahini, water, lemon juice, garlic, cumin, and salt in food processor or blender; puree until smooth. Transfer hummus to a flat dish. Sprinkle parsley over the hummus to serve.', 'images/taoHummus16.jpg'),
(17, 1, 'Loaded Queso Fundido', '00:15:00', '00:20:00', '00:35:00', '4', 5, 7, '1. Bring chicken broth to a boil in a pot; add American cheese, bring to a simmer, reduce heat to low, and cook, stirring frequently, until the cheese melts into the broth, about 5 minutes.\r\n2. Heat olive oil in a skillet over medium-high heat; saute chicken and chorizo in oil until the chicken is no longer pink in the center, 5 to 7 minutes. Add mushrooms, tomatoes, onion, jalapenos, green onions, and garlic; saute until all vegetables are tender, 7 to 10 minutes.\r\n3. Stir chicken mixture into the melted cheese; bring to a simmer. Stir Cheddar cheese into the mixture and cook until completely melted, about 5 minutes.', 'images/loadedQuesoFundido17.jpg'),
(18, 1, 'Bacon Jalapeno Popper Puffs', '00:15:00', '00:30:00', '01:15:00', '5', 1, 7, '1. Place bacon in a large skillet and cook over medium-high heat, turning occasionally, until evenly browned and crisp, about 10 minutes. Drain bacon slices on paper towels. Crumble or finely chop. Drain fat from skillet, reserving 1 tablespoon.\r\n2. Mix cream cheese, creme fraiche, green onions, and lime juice together in a bowl. If mixture seems too thick, add enough water to thin it to your preferred consistency.\r\n3. Place skillet over medium-high heat. Add cold water, butter, reserved bacon fat, and salt. Bring mixture to a simmer; reduce heat to medium. Pour in flour all at once. Stir to mix and mash with a wooden spoon until dough starts to pull together, 2 to 3 minutes. Remove pan from heat; transfer dough to a mixing bowl and let cool for about 5 minutes.\r\n4. When dough is cool, whisk in 1 egg. Mixture will separate slightly. Continue whisking in first egg until mixture pulls back together. Repeat with the second egg. Scrape down sides of bowl. Add diced jalapeno, bacon pieces, shredded cheese, cayenne pepper, and black pepper. Mix thoroughly with a spatula. Wrap dough in plastic wrap and refrigerate until cool, 30 minutes to 1 hour.\r\n5. Heat oil in deep fryer to 375 degrees F.\r\n6. Using a small scoop, scoop out rounds of dough. Drop rounds of dough into hot oil and cook until golden brown and cooked through, 3 to 4 minutes. Work in batches if necessary. Transfer to a cooling rack.\r\n7. serve with dipping sauce garnished with a few green onion slices.', 'images/baconJalapenoPopperPuffs18.jpg'),
(19, 1, 'Super Nachos', '00:30:00', '00:20:00', '00:50:00', '4', 5, 7, '1. Cook and stir ground beef in a skillet over medium heat until meat is crumbly and no longer pink, 5 to 10 minutes. Drain excess grease. Stir in taco seasoning mix and water and simmer until beef mixture has thickened, 8 to 10 minutes.\r\n2. Set the oven rack about 6 inches from the heat source and preheat the broiler. Line a baking sheet with aluminum foil.\r\n3. Spread tortilla chips on the prepared baking sheet; top with Cheddar cheese and dot with refried beans and ground beef mixture.\r\n4. Broil in the preheated oven until cheese is melted, watching carefully to prevent burning, 3 to 5 minutes.\r\n5. Top nachos with salsa, sour cream, black olives, green onions, and jalapeno peppers.', 'images/supernachos19.jpg'),
(20, 1, 'Mini Philly Cheesesteaks', '00:30:00', '00:30:00', '01:20:00', '4', 1, 7, '1. Preheat oven to 400 degrees F (200 degrees C). Line baking sheets with aluminum foil.\r\n2. Melt butter in a skillet over medium-high heat. Whisk flour into hot butter and cook, whisking constantly, until mixture is pale and flour taste cooks off, about 1 minute. Pour milk into flour mixture and cook, whisking constantly, until mixture is hot and thickened, 3 to 6 minutes. Add 2 ounces provolone cheese, nutmeg, cayenne pepper, and salt; stir until cheese is completely melted. Remove from heat.\r\n3. Season steak all over with salt and ground black pepper.\r\n4. Heat 1 tablespoon olive oil in skillet over medium-high heat. Cook steak in hot oil, turning occasionally, until meat is slightly firm and pink on the inside, 5 to 7 minutes. Transfer meat to a plate.\r\n5. Return skillet to heat and pour water into the skillet; bring to a boil while scraping the browned bits of food off of the bottom of the pan with a wooden spoon. Pour liquid from the skillet over steak. Cool steak to room temperature; dice meat and place meat and accumulated juices from the plate into a large bowl.\r\n6. Heat 1 tablespoon oil in a skillet over medium-high heat; saute onion and peppers in hot oil until softened and slightly translucent, about 5 minutes.\r\n7. Stir peppers and onions mixture into diced meat; season with salt and pepper.\r\n8. Spread bread slices out on prepared baking sheets and drizzle remaining olive oil over the top. Turn slices over so that the oiled-side is facing down. Spread a thick layer of cheese mixture onto each slice. Spoon meat mixture over cheese. Sprinkle provolone cheese over the top of each slice.\r\n9. Bake in the preheated oven until browned and cheese is melted, 12 to 15 minutes.', 'images/miniPhillyCheeseSteaks20.jpg'),
(21, 1, 'Best Spinach Dip Ever', '00:15:00', '00:00:00', '06:15:00', '4', 1, 7, '1. In a medium bowl, mix together mayonnaise, sour cream, dry leek soup mix, water chestnuts and chopped spinach. Chill in the refrigerator 6 hours, or overnight.\r\n2. Remove top and interior of sourdough bread. Fill with mayonnaise mixture. Tear removed bread chunks into pieces for dipping.', 'images/bestSpinachDipEver21.jpg'),
(22, 1, 'Big Ray\'s Mexican Monkey Bread', '00:10:00', '00:40:00', '00:55:00', '4', 5, 7, '1. Preheat oven to 350 degrees F (175 degrees C). Prepare a 9x5-inch loaf pan with cooking spray.\r\n2. Pour melted butter into a small bowl. Dip each piece of biscuit dough in melted butter to coat.\r\n3. Arrange enough of the biscuit dough pieces in the bottom of the loaf pan to form a single layer; top with 1/2 cup Cheddar cheese, 1/4 cup pepper slices, and 1/4 teaspoon parsley. Repeat layering once and top with remaining biscuit dough pieces, pepper slices, and parsley flakes.\r\n4. Mix remaining 1/4 cup Cheddar cheese and mozzarella cheese together in a bowl; spread over the top of the ingredients to cover.\r\n5. Bake in preheated oven until golden brown, 40 to 45 minutes. Cool bread in pan for 5 minutes before inverting onto a plate to serve.', 'images/bigRaysMexcanMonkeyBread22.jpg'),
(23, 1, 'Baked Crab and Artichoke Dip', '00:30:00', '00:30:00', '01:00:00', '4', 1, 7, '1. Preheat oven to 375 degrees F (190 degrees C). Line a baking dish with aluminum foil.\r\n2. Combine cream cheese, crab meat, artichoke bottoms, 6 ounces Cheddar cheese, red bell pepper, green onions, sour cream, mayonnaise, garlic, lemon zest and juice, tarragon, Worcestershire sauce, and cayenne pepper in a large bowl; season with salt and black pepper.\r\n3. Cut the top 1/3 off the loaf of sourdough bread and discard. Remove the bread filling and discard, leaving just the crust. Place in the prepared baking dish.\r\n4. Transfer artichoke mixture to the prepared bread bowl; top with 2 tablespoons Cheddar cheese and cayenne pepper.\r\n5. Bake in the preheated oven until dip is warmed and top is golden brown, about 30 minutes.', 'images/BakedCrabandArtichokeDip23.jpg'),
(24, 1, 'Cheesy Burrito Game Day Dip', '00:15:00', '00:30:00', '00:45:00', '4', 1, 7, '1. Preheat oven to 350 degrees F (175 degrees C). Spray a 9x13-inch baking dish with cooking spray.\r\n2. Heat a large skillet over medium-high heat. Cook and stir beef in the hot skillet until browned and crumbly, 5 to 7 minutes; drain and discard grease.\r\n3. Stir ground beef, refried beans, 3 cups Colby-Monterey Jack cheese, sour cream, cream cheese, and taco seasoning mix together in a bowl until well mixed. Spread mixture into the prepared baking dish.\r\n4. Bake in the preheated oven for 20 minutes; sprinkle with remaining 1 cup Colby-Monterey Jack cheese. Continue baking until cheese is melted, about 5 more minutes.', 'images/cheesyBurritoGameDayDip24.jpg'),
(25, 1, 'Guacamole', '00:10:00', '00:00:00', '00:10:00', '5', 5, 7, '1. In a medium bowl, mash together the avocados, lime juice, and salt. Mix in onion, cilantro, tomatoes, and garlic. Stir in cayenne pepper. Refrigerate 1 hour for best flavor, or serve immediately.', 'images/guacamole25.jpg');

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
(6, 'Burger'),
(7, 'Appetizer');

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
(14, 'cloves'),
(3, 'cup'),
(12, 'fluid oz'),
(7, 'gallon'),
(11, 'grams'),
(13, 'kilogram'),
(15, 'links'),
(6, 'liter'),
(10, 'milliliter'),
(9, 'ounces'),
(17, 'pinch'),
(4, 'pint'),
(8, 'pound'),
(5, 'quart'),
(16, 'strips'),
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
  ADD PRIMARY KEY (`dummy_id`),
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
-- AUTO_INCREMENT for table `has_ingredients`
--
ALTER TABLE `has_ingredients`
  MODIFY `dummy_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=125;
--
-- AUTO_INCREMENT for table `ingredients`
--
ALTER TABLE `ingredients`
  MODIFY `ingredient_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;
--
-- AUTO_INCREMENT for table `origin`
--
ALTER TABLE `origin`
  MODIFY `origin_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `recipes`
--
ALTER TABLE `recipes`
  MODIFY `recipe_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT for table `style`
--
ALTER TABLE `style`
  MODIFY `style_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `unit`
--
ALTER TABLE `unit`
  MODIFY `unit_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `addIngredient`(IN `recipes_id` INT(100), IN `ingredients_id` INT(30), IN `ingredient_quantity` INT(30))
BEGIN
  insert into has_ingredients(recipe_id, ingredient_id, quantity)
  values(recipes_id, ingredients_id, ingredient_quantity);
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `addRecipe`(IN `creator_id` INT(100), IN `recipe_name` VARCHAR(30), IN `recipe_prep_time` TIME, IN `recipe_cooking_time` TIME, IN `recipe_origin_id` INT(20), IN `recipe_style_id` INT(20), IN `recipe_image` LONGBLOB)
BEGIN
  insert into recipes(user_id, name, prep_time, cooking_time, rating, origin_id, style_id, image)
  values(creator_id, recipe_name, recipe_prep_time, recipe_cooking_time, recipe_origin_id, recipe_style_id, recipe_image);
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
CREATE DEFINER=`‘root’`@`‘localhost’` PROCEDURE `findIngredientsByID`(IN `recipe_id` INT)
BEGIN
  #Returns Ingredients that the recipe is using (ID).
  SELECT ingredient_id FROM has_ingredients where has_ingredients.recipe_id = recipe_id; 
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`‘root’`@`‘localhost’` PROCEDURE `getRecipeByID`(IN `recipe_id` INT)
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
