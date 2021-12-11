-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-12-2021 a las 19:59:13
-- Versión del servidor: 10.4.20-MariaDB
-- Versión de PHP: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `warehouse`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cities`
--

CREATE TABLE `cities` (
  `id` int(11) NOT NULL,
  `name` varchar(40) NOT NULL,
  `country_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cities`
--

INSERT INTO `cities` (`id`, `name`, `country_id`) VALUES
(1, 'Buenos Aires', 1),
(2, 'Córdoba', 1),
(5, 'Bogotá', 3),
(6, 'Medellín', 3),
(7, 'Ciudad de México', 4),
(9, 'Tijuana', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `companies`
--

CREATE TABLE `companies` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `address` varchar(60) NOT NULL,
  `email` varchar(60) NOT NULL,
  `phone` varchar(40) NOT NULL,
  `city_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `companies`
--

INSERT INTO `companies` (`id`, `name`, `address`, `email`, `phone`, `city_id`) VALUES
(3, 'Rappi', '123Street', 'one2@compamy.com', '123456798', 1),
(4, 'Globant', '123Street', 'two2@compamy.com', '123456798', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `last_name` varchar(60) NOT NULL,
  `position` varchar(60) NOT NULL,
  `email` varchar(60) NOT NULL,
  `company_id` int(11) NOT NULL,
  `city_id` int(11) NOT NULL,
  `address` varchar(60) NOT NULL,
  `socials_id` int(11) NOT NULL,
  `account` varchar(60) NOT NULL,
  `pref_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `contacts`
--

INSERT INTO `contacts` (`id`, `name`, `last_name`, `position`, `email`, `company_id`, `city_id`, `address`, `socials_id`, `account`, `pref_id`) VALUES
(1, 'one', 'test', 'intern', 'one@test.com', 3, 1, 'street', 1, '549 156123456', 2),
(3, 'three', 'test', 'developer', 'three@test.com', 4, 1, 'street', 2, '@threetest', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `countries`
--

CREATE TABLE `countries` (
  `id` int(11) NOT NULL,
  `name` varchar(40) NOT NULL,
  `region_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `countries`
--

INSERT INTO `countries` (`id`, `name`, `region_id`) VALUES
(1, 'Argentina', 1),
(3, 'Colombia', 1),
(4, 'México', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preferences`
--

CREATE TABLE `preferences` (
  `id` int(11) NOT NULL,
  `name` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `preferences`
--

INSERT INTO `preferences` (`id`, `name`) VALUES
(1, 'available'),
(2, 'do not disturb');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `regions`
--

CREATE TABLE `regions` (
  `id` int(11) NOT NULL,
  `name` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `regions`
--

INSERT INTO `regions` (`id`, `name`) VALUES
(1, 'Sudamérica'),
(2, 'Norteamérica');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `socials`
--

CREATE TABLE `socials` (
  `id` int(11) NOT NULL,
  `name` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `socials`
--

INSERT INTO `socials` (`id`, `name`) VALUES
(1, 'WhatsApp'),
(2, 'Instagram'),
(3, 'Twitter'),
(4, 'Facebook');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `last_name` varchar(60) NOT NULL,
  `email` varchar(60) NOT NULL,
  `user_profile` enum('admin','regular') NOT NULL,
  `pass` varchar(60) NOT NULL,
  `rep_pass` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `last_name`, `email`, `user_profile`, `pass`, `rep_pass`) VALUES
(2, 'updated', 'updated', 'reg@reg.com', 'regular', '$2b$10$d185F.R8FxtL.ZJjxf4E6OAANUuvLSG8Q2tADlPb0WmYfSLGxhPdS', '$2b$10$d185F.R8FxtL.ZJjxf4E6OAANUuvLSG8Q2tADlPb0WmYfSLGxhPdS'),
(4, 'Admin', 'Admin', 'admin@admin.com', 'admin', '$2b$10$FBv.I1uini8SPGidXwe7oOYDRTg49nJgk5zKlGIpZqhEEAiEiV3me', '$2b$10$FBv.I1uini8SPGidXwe7oOYDRTg49nJgk5zKlGIpZqhEEAiEiV3me'),
(5, 'Regular', 'Regular', 'reg@reg.com', 'regular', '$2b$10$rb/4NZ2v6VLsG8.Vboy/pu6uvRY49tnTVNxq5IHhPHsyfi/QM/7kG', '$2b$10$rb/4NZ2v6VLsG8.Vboy/pu6uvRY49tnTVNxq5IHhPHsyfi/QM/7kG'),
(6, 'test', 'test surname', 'test@test.com', 'regular', '$2b$10$vDN85fZOffi6QbcGNPvfS./sdF8H1GpLadlepHISF9ccFHwjSO4Hm', '$2b$10$vDN85fZOffi6QbcGNPvfS./sdF8H1GpLadlepHISF9ccFHwjSO4Hm'),
(7, 'test_admin', 'test_admin', 'test@admin.com', 'admin', '$2b$10$8fAb.CyYHV3nD2XFyBIolusz0AiNVbDX14Yl4KI6Jbtn5YFquIEOS', '$2b$10$8fAb.CyYHV3nD2XFyBIolusz0AiNVbDX14Yl4KI6Jbtn5YFquIEOS'),
(11, 'Antonella', 'Alvarez', 'anto@alv.com', 'admin', '$2b$10$AfohRU8k8RDh8l5vmDEdTunEGjkqS8LDZ5HofGCGTv3ZuYPVOjko2', '$2b$10$AfohRU8k8RDh8l5vmDEdTunEGjkqS8LDZ5HofGCGTv3ZuYPVOjko2'),
(12, 'Ana', 'Alvarez', 'ana@alv.com', 'regular', '$2b$10$hd5ClElGWpfFoP.0OXn.yOJaUQhhjMi2DL6NZllo2ZB/Hzj7F/0.K', '$2b$10$hd5ClElGWpfFoP.0OXn.yOJaUQhhjMi2DL6NZllo2ZB/Hzj7F/0.K');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `country_id` (`country_id`);

--
-- Indices de la tabla `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `city_id` (`city_id`);

--
-- Indices de la tabla `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `company_id` (`company_id`),
  ADD KEY `city_id` (`city_id`),
  ADD KEY `socials_id` (`socials_id`),
  ADD KEY `pref_id` (`pref_id`);

--
-- Indices de la tabla `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `region_id` (`region_id`);

--
-- Indices de la tabla `preferences`
--
ALTER TABLE `preferences`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `regions`
--
ALTER TABLE `regions`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `socials`
--
ALTER TABLE `socials`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cities`
--
ALTER TABLE `cities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `companies`
--
ALTER TABLE `companies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `countries`
--
ALTER TABLE `countries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `preferences`
--
ALTER TABLE `preferences`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `regions`
--
ALTER TABLE `regions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `socials`
--
ALTER TABLE `socials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cities`
--
ALTER TABLE `cities`
  ADD CONSTRAINT `cities_ibfk_1` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`);

--
-- Filtros para la tabla `companies`
--
ALTER TABLE `companies`
  ADD CONSTRAINT `companies_ibfk_1` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `contacts`
--
ALTER TABLE `contacts`
  ADD CONSTRAINT `contacts_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `contacts_ibfk_2` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `contacts_ibfk_3` FOREIGN KEY (`socials_id`) REFERENCES `socials` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `contacts_ibfk_4` FOREIGN KEY (`pref_id`) REFERENCES `preferences` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `countries`
--
ALTER TABLE `countries`
  ADD CONSTRAINT `countries_ibfk_1` FOREIGN KEY (`region_id`) REFERENCES `regions` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
