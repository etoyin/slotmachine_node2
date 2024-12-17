-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 17, 2024 at 01:43 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `slot_node`
--

-- --------------------------------------------------------

--
-- Table structure for table `campaign_data`
--

CREATE TABLE `campaign_data` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `number` varchar(250) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `credit_card_page_visits`
--

CREATE TABLE `credit_card_page_visits` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `number` varchar(250) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `credit_card_page_visits`
--

INSERT INTO `credit_card_page_visits` (`id`, `user_id`, `number`, `created_at`, `updated_at`) VALUES
(1, 17, '125', '2024-12-12 19:06:31', '2024-12-16 10:27:45'),
(2, 18, '1', '2024-12-16 11:03:51', '2024-12-16 11:03:51'),
(3, 20, '1', '2024-12-16 11:11:32', '2024-12-16 11:11:32'),
(4, 21, '1', '2024-12-16 11:15:03', '2024-12-16 11:15:03'),
(5, 22, '1', '2024-12-16 11:16:31', '2024-12-16 11:16:31'),
(6, 23, '1', '2024-12-16 11:18:01', '2024-12-16 11:18:01'),
(7, 24, '1', '2024-12-16 11:19:51', '2024-12-16 11:19:51'),
(8, 25, '1', '2024-12-16 11:35:42', '2024-12-16 11:35:42'),
(9, 27, '2', '2024-12-16 11:39:04', '2024-12-16 11:39:08'),
(10, 30, '1', '2024-12-16 13:46:56', '2024-12-16 13:46:56'),
(11, 31, '1', '2024-12-16 14:00:36', '2024-12-16 14:00:36'),
(12, 32, '1', '2024-12-16 14:46:55', '2024-12-16 14:46:55'),
(13, 33, '1', '2024-12-16 15:04:59', '2024-12-16 15:04:59'),
(14, 35, '1', '2024-12-16 20:28:50', '2024-12-16 20:28:50');

-- --------------------------------------------------------

--
-- Table structure for table `daily_email_clicks`
--

CREATE TABLE `daily_email_clicks` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `number` varchar(250) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `email_verification_clicks`
--

CREATE TABLE `email_verification_clicks` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `number` varchar(250) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `email_verification_clicks`
--

INSERT INTO `email_verification_clicks` (`id`, `user_id`, `number`, `created_at`, `updated_at`) VALUES
(1, 36, '2', '2024-12-16 23:11:53', '2024-12-16 23:11:54');

-- --------------------------------------------------------

--
-- Table structure for table `fund_page_visits`
--

CREATE TABLE `fund_page_visits` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `number` varchar(250) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `fund_page_visits`
--

INSERT INTO `fund_page_visits` (`id`, `user_id`, `number`, `created_at`, `updated_at`) VALUES
(1, 17, '29', '2024-12-12 18:16:07', '2024-12-12 20:12:35'),
(2, 35, '6', '2024-12-16 20:26:46', '2024-12-16 20:35:24');

-- --------------------------------------------------------

--
-- Table structure for table `gamer_profile`
--

CREATE TABLE `gamer_profile` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `balance` varchar(250) DEFAULT NULL,
  `number_visits` varchar(250) DEFAULT NULL,
  `number_spins` varchar(250) DEFAULT NULL,
  `daily_emails` varchar(250) DEFAULT NULL,
  `email_clicks` varchar(250) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gamer_profile`
--

INSERT INTO `gamer_profile` (`id`, `user_id`, `balance`, `number_visits`, `number_spins`, `daily_emails`, `email_clicks`, `created_at`, `updated_at`) VALUES
(1, 14, NULL, NULL, NULL, NULL, NULL, '2024-12-12 09:11:10', '2024-12-12 09:11:10'),
(2, 15, NULL, NULL, NULL, NULL, NULL, '2024-12-12 09:39:00', '2024-12-12 09:39:00'),
(3, 16, NULL, NULL, NULL, NULL, NULL, '2024-12-12 09:40:47', '2024-12-12 09:40:47'),
(4, 17, '1000', NULL, NULL, NULL, NULL, '2024-12-12 09:48:18', '2024-12-12 18:54:18'),
(5, 18, NULL, NULL, NULL, NULL, NULL, '2024-12-16 11:01:01', '2024-12-16 11:01:01'),
(6, 19, NULL, NULL, NULL, NULL, NULL, '2024-12-16 11:03:58', '2024-12-16 11:03:58'),
(7, 20, NULL, NULL, NULL, NULL, NULL, '2024-12-16 11:08:37', '2024-12-16 11:08:37'),
(8, 21, NULL, NULL, NULL, NULL, NULL, '2024-12-16 11:11:35', '2024-12-16 11:11:35'),
(9, 22, NULL, NULL, NULL, NULL, NULL, '2024-12-16 11:15:09', '2024-12-16 11:15:09'),
(10, 23, NULL, NULL, NULL, NULL, NULL, '2024-12-16 11:16:34', '2024-12-16 11:16:34'),
(11, 24, NULL, NULL, NULL, NULL, NULL, '2024-12-16 11:18:02', '2024-12-16 11:18:02'),
(12, 25, NULL, NULL, NULL, NULL, NULL, '2024-12-16 11:19:53', '2024-12-16 11:19:53'),
(13, 26, NULL, NULL, NULL, NULL, NULL, '2024-12-16 11:35:45', '2024-12-16 11:35:45'),
(14, 27, NULL, NULL, NULL, NULL, NULL, '2024-12-16 11:37:38', '2024-12-16 11:37:38'),
(15, 28, NULL, NULL, NULL, NULL, NULL, '2024-12-16 11:39:11', '2024-12-16 11:39:11'),
(16, 29, NULL, NULL, NULL, NULL, NULL, '2024-12-16 11:48:18', '2024-12-16 11:48:18'),
(17, 30, NULL, NULL, NULL, NULL, NULL, '2024-12-16 11:49:27', '2024-12-16 11:49:27'),
(18, 31, NULL, NULL, NULL, NULL, NULL, '2024-12-16 13:46:56', '2024-12-16 13:46:56'),
(19, 32, NULL, NULL, NULL, NULL, NULL, '2024-12-16 14:00:45', '2024-12-16 14:00:45'),
(20, 33, NULL, NULL, NULL, NULL, NULL, '2024-12-16 14:46:51', '2024-12-16 14:46:51'),
(21, 34, NULL, NULL, NULL, NULL, NULL, '2024-12-16 15:05:05', '2024-12-16 15:05:05'),
(22, 35, NULL, NULL, NULL, NULL, NULL, '2024-12-16 20:15:20', '2024-12-16 20:15:20'),
(23, 36, NULL, NULL, NULL, NULL, NULL, '2024-12-16 23:07:24', '2024-12-16 23:07:24');

-- --------------------------------------------------------

--
-- Table structure for table `game_page_visits`
--

CREATE TABLE `game_page_visits` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `number` varchar(250) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `game_page_visits`
--

INSERT INTO `game_page_visits` (`id`, `user_id`, `number`, `created_at`, `updated_at`) VALUES
(1, 17, '67', '2024-12-12 10:34:53', '2024-12-16 10:58:56'),
(2, 18, '1', '2024-12-16 11:01:04', '2024-12-16 11:01:04'),
(3, 19, '1', '2024-12-16 11:03:59', '2024-12-16 11:03:59'),
(4, 20, '1', '2024-12-16 11:08:38', '2024-12-16 11:08:38'),
(5, 21, '1', '2024-12-16 11:11:48', '2024-12-16 11:11:48'),
(6, 22, '1', '2024-12-16 11:15:10', '2024-12-16 11:15:10'),
(7, 23, '1', '2024-12-16 11:16:37', '2024-12-16 11:16:37'),
(8, 24, '1', '2024-12-16 11:18:04', '2024-12-16 11:18:04'),
(9, 25, '1', '2024-12-16 11:19:55', '2024-12-16 11:19:55'),
(10, 26, '1', '2024-12-16 11:35:49', '2024-12-16 11:35:49'),
(11, 27, '1', '2024-12-16 11:37:40', '2024-12-16 11:37:40'),
(12, 28, '1', '2024-12-16 11:39:13', '2024-12-16 11:39:13'),
(13, 29, '1', '2024-12-16 11:48:26', '2024-12-16 11:48:26'),
(14, 30, '1', '2024-12-16 11:49:29', '2024-12-16 11:49:29'),
(15, 31, '1', '2024-12-16 13:47:00', '2024-12-16 13:47:00'),
(16, 32, '1', '2024-12-16 14:00:54', '2024-12-16 14:00:54'),
(17, 33, '1', '2024-12-16 14:47:00', '2024-12-16 14:47:00'),
(18, 34, '3', '2024-12-16 15:05:11', '2024-12-16 15:50:32'),
(19, 35, '8', '2024-12-16 20:15:24', '2024-12-16 22:42:30'),
(20, 36, '2', '2024-12-16 23:07:34', '2024-12-16 23:12:05');

-- --------------------------------------------------------

--
-- Table structure for table `spins_number`
--

CREATE TABLE `spins_number` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `number` varchar(250) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `spins_number`
--

INSERT INTO `spins_number` (`id`, `user_id`, `number`, `created_at`, `updated_at`) VALUES
(2, 17, '8', '2024-12-12 10:13:57', '2024-12-12 12:26:39'),
(3, 35, '15', '2024-12-16 20:26:26', '2024-12-16 20:36:22');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(250) DEFAULT NULL,
  `verify_token` varchar(250) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `verify_token`, `created_at`, `updated_at`) VALUES
(36, 'toyinadesina60@gmail.com', '', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRveWluYWRlc2luYTYwQGdtYWlsLmNvbSIsImlhdCI6MTczNDM4Njg0MywiZXhwIjoxNzM0NDczMjQzfQ.VXTEAkLWDJIkT4FZDCQzjR3f3UedPyWrFVmpe22frIo', '2024-12-16 23:07:23', '2024-12-16 23:07:23');

-- --------------------------------------------------------

--
-- Table structure for table `visits`
--

CREATE TABLE `visits` (
  `id` int(11) NOT NULL,
  `identifier` varchar(250) NOT NULL,
  `number` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `visits`
--

INSERT INTO `visits` (`id`, `identifier`, `number`, `created_at`, `updated_at`) VALUES
(1, '28ce9ff6-50b8-41ec-b2be-b19fa3794749', 1, '2024-12-11 15:47:05', '2024-12-11 15:47:05'),
(2, 'ca98e2f7-71d3-4d4e-8fd1-fe722e15949b', 4, '2024-12-11 19:18:05', '2024-12-11 20:09:18'),
(3, 'ac940cf7-4cb4-4375-b1c7-35ecb206afef', 1, '2024-12-11 19:28:37', '2024-12-11 19:28:37'),
(5, 'aba55405-aecc-49f6-9684-1e2b09660115', 1, '2024-12-11 19:55:51', '2024-12-11 19:55:51'),
(6, 'c8082c18-f88a-486e-88bc-62c84d51329e', 2, '2024-12-11 19:57:00', '2024-12-11 20:10:56'),
(7, 'b4d85670-a485-492c-a108-3493901d4c7c', 1, '2024-12-11 19:59:49', '2024-12-11 19:59:49'),
(8, 'a04f570a-8d18-49ba-90e9-3f60d2323350', 1, '2024-12-11 20:00:51', '2024-12-11 20:00:51'),
(9, '9d2c2aec-0ae0-495e-8cc6-92e6e84a75a4', 1, '2024-12-11 20:11:28', '2024-12-11 20:11:28'),
(10, '329f1775-96a7-4875-a4f2-af2edb21e5cc', 1, '2024-12-11 20:16:54', '2024-12-11 20:16:54'),
(11, '751a0841-75e8-4143-8f5f-2fa2bb079719', 1, '2024-12-11 20:18:53', '2024-12-11 20:18:53'),
(12, 'e48f44b2-2c30-42ae-a776-cf59a846b023', 1, '2024-12-11 21:06:46', '2024-12-11 21:06:46'),
(13, 'c1f56cb3-fc4c-4d07-9912-dcfced98dcb3', 1, '2024-12-11 21:07:49', '2024-12-11 21:07:49'),
(14, '4b8168ad-6f45-4a7c-b566-414f26ce09b3', 1, '2024-12-11 21:08:37', '2024-12-11 21:08:37'),
(15, '63cabe81-7229-4efa-93ff-fe4cd3e89345', 1, '2024-12-11 21:09:20', '2024-12-11 21:09:20'),
(16, '97e95118-18ee-41ee-93df-3e8e68d9b6db', 1, '2024-12-11 21:10:11', '2024-12-11 21:10:11'),
(17, 'a70f34dc-6123-4e91-9783-4976674838be', 1, '2024-12-11 21:10:38', '2024-12-11 21:10:38'),
(18, 'b8b28edb-bf1f-4600-97c3-b290fc1fb024', 1, '2024-12-11 21:29:36', '2024-12-11 21:29:36'),
(19, 'b28006c3-e29e-4e5e-bd24-d79f63f79fe0', 1, '2024-12-11 21:29:40', '2024-12-11 21:29:40'),
(20, 'b5cd7ca2-ea47-4682-9ec6-af48fd690f8f', 1, '2024-12-11 21:29:57', '2024-12-11 21:29:57'),
(21, '30babbbe-1196-488b-abf3-3787970ff6a9', 1, '2024-12-11 21:30:43', '2024-12-11 21:30:43'),
(22, '7b8a673f-e666-460a-8a54-0d31bedfa4e2', 1, '2024-12-11 21:30:59', '2024-12-11 21:30:59'),
(23, 'd013a80f-636e-43b6-9a3d-ac24278162ac', 1, '2024-12-11 21:31:14', '2024-12-11 21:31:14'),
(24, '5948afb6-7014-4946-8df1-229c47cb7dc6', 1, '2024-12-11 21:38:57', '2024-12-11 21:38:57'),
(25, 'dca3fc13-a1f6-4d20-8dc8-84baa861579f', 1, '2024-12-12 08:40:25', '2024-12-12 08:40:25'),
(26, '55969760-2c63-4601-b4ee-b1a8205a3ee0', 1, '2024-12-12 08:43:50', '2024-12-12 08:43:50'),
(27, '7b576c9c-5fc9-445d-8f18-cdb58b6e8e0b', 1, '2024-12-12 08:54:28', '2024-12-12 08:54:28'),
(28, '871f7585-306b-4632-8118-8a54f38566d4', 1, '2024-12-12 08:59:35', '2024-12-12 08:59:35'),
(29, '78a81ac0-5ef8-49b6-87a8-e95c69e0ca3a', 1, '2024-12-12 08:59:43', '2024-12-12 08:59:43'),
(30, '6e638f02-8ed3-41a5-a023-d0a367a67bcb', 1, '2024-12-12 09:02:33', '2024-12-12 09:02:33'),
(31, '6b6402b6-8888-430b-98e1-32fb6fed4483', 1, '2024-12-12 09:04:45', '2024-12-12 09:04:45'),
(32, '1d5de0cc-1e0d-4419-875a-81fc4a736c82', 1, '2024-12-12 09:08:07', '2024-12-12 09:08:07'),
(33, 'e423a6ed-045d-4181-a977-47fa2340e1ad', 1, '2024-12-12 09:08:12', '2024-12-12 09:08:12'),
(34, 'c6fa87f8-6c64-4928-be42-e0787a6450f9', 1, '2024-12-12 09:11:06', '2024-12-12 09:11:06'),
(35, '2ded2dc3-6c6b-40cb-a470-a5c90f1e0de9', 1, '2024-12-12 09:38:50', '2024-12-12 09:38:50'),
(36, 'ed98e73b-791b-422f-b691-dadd5860378b', 1, '2024-12-12 09:48:11', '2024-12-12 09:48:11'),
(37, 'cdcbad4f-2cc0-4f41-90d2-5e9ccdc54f90', 1, '2024-12-12 12:27:40', '2024-12-12 12:27:40'),
(38, 'e9d837db-3263-46aa-9786-920bfe677071', 1, '2024-12-12 17:28:56', '2024-12-12 17:28:56'),
(39, '98e50b43-f75c-4452-9fbc-92a2b91f9288', 1, '2024-12-12 17:32:35', '2024-12-12 17:32:35'),
(40, 'dbb1d137-8283-4261-9bf9-59f4607a995e', 1, '2024-12-12 17:35:02', '2024-12-12 17:35:02'),
(41, '85f00a62-7f8d-4d69-95d9-2e75ca5c1096', 1, '2024-12-12 17:35:54', '2024-12-12 17:35:54'),
(42, 'c678634b-b2e7-43f7-8380-783f088978a9', 1, '2024-12-12 17:37:29', '2024-12-12 17:37:29'),
(43, 'b79d84af-2b67-4603-886a-e68ac98a478a', 1, '2024-12-12 17:37:50', '2024-12-12 17:37:50'),
(44, '90824396-4d5f-433a-935c-d00d7ed5bb4e', 1, '2024-12-12 17:38:43', '2024-12-12 17:38:43'),
(45, '9542a98d-3172-4d9a-bced-06b1141a6300', 1, '2024-12-12 17:39:40', '2024-12-12 17:39:40'),
(46, '5b3afcde-673d-4e89-8985-1df251e196a6', 1, '2024-12-12 17:40:10', '2024-12-12 17:40:10'),
(47, 'eb595673-1b38-4c83-ad67-e10da2eb1e1d', 1, '2024-12-12 17:40:29', '2024-12-12 17:40:29'),
(48, 'a755605e-c0c6-4246-bcdc-d9cee09ffd16', 1, '2024-12-12 17:40:40', '2024-12-12 17:40:40'),
(49, 'fcaa26e0-59a4-4ab7-9d60-a3a3a28e2e07', 1, '2024-12-12 17:41:46', '2024-12-12 17:41:46'),
(50, '2d5821b3-d71e-4dbf-b1cd-defd96063aaf', 1, '2024-12-12 17:43:11', '2024-12-12 17:43:11'),
(51, 'ea07c5a0-e2e7-4b53-b809-45d6b4f928ec', 1, '2024-12-12 17:44:54', '2024-12-12 17:44:54'),
(52, 'f62ac5fb-db2e-48d4-b228-dd30d9cfef79', 1, '2024-12-12 17:45:25', '2024-12-12 17:45:25'),
(53, 'f599f572-7d63-4962-9b0d-5bf503714e08', 1, '2024-12-12 17:46:28', '2024-12-12 17:46:28'),
(54, '625fc8f9-322f-4cc4-999b-13cfd4add2ac', 1, '2024-12-12 17:46:58', '2024-12-12 17:46:58'),
(55, 'b5023a9d-0af1-4219-9cea-e36f1e5fd42a', 1, '2024-12-12 17:47:12', '2024-12-12 17:47:12'),
(56, '1212aebe-4927-4697-aeae-91008bc81d29', 1, '2024-12-12 17:47:22', '2024-12-12 17:47:22'),
(57, '32b66769-233d-40a1-b27b-20b68bf132b4', 1, '2024-12-12 17:47:26', '2024-12-12 17:47:26'),
(58, '7926e162-970b-480f-94d7-e2bf5cce2f21', 1, '2024-12-12 17:47:31', '2024-12-12 17:47:31'),
(59, '20d0b042-4878-4a11-a050-1472a6258e66', 1, '2024-12-12 17:47:51', '2024-12-12 17:47:51'),
(60, 'ef921789-2ac4-479f-aadd-2b6dca8b6e93', 1, '2024-12-12 17:47:56', '2024-12-12 17:47:56'),
(61, 'cc0bc7a0-0271-4ae8-ac83-77cca629bf5b', 1, '2024-12-12 17:48:03', '2024-12-12 17:48:03'),
(62, '0e8c21f6-469c-4f46-8ab7-7d5858840641', 1, '2024-12-12 17:48:27', '2024-12-12 17:48:27'),
(63, '4d047a27-087e-468c-90cb-07ab5a7d32e4', 1, '2024-12-12 17:49:01', '2024-12-12 17:49:01'),
(64, 'e060247b-cb0c-4bba-8d5d-52045e9a239a', 1, '2024-12-12 17:49:09', '2024-12-12 17:49:09'),
(65, '21064308-e4e8-4913-952b-b7d493095e70', 1, '2024-12-12 17:53:07', '2024-12-12 17:53:07'),
(66, 'e0002393-6c66-480e-831c-87785e8caf2d', 1, '2024-12-12 17:53:22', '2024-12-12 17:53:22'),
(67, '1ac507fa-8c79-494a-9dc4-28ac8ea54287', 1, '2024-12-12 17:54:10', '2024-12-12 17:54:10'),
(68, '54f50de5-7cdf-49bb-bee9-a3c0db2a579b', 1, '2024-12-12 17:54:49', '2024-12-12 17:54:49'),
(69, 'ee0cfdd8-5f34-4924-a9cc-d8ed8b19fad0', 1, '2024-12-12 17:55:15', '2024-12-12 17:55:15'),
(70, 'e6b2a5a4-c256-4c86-8469-07d68282bf1c', 1, '2024-12-12 17:55:56', '2024-12-12 17:55:56'),
(71, '40dabb2e-fee5-44c3-8fa3-531517d4bba5', 1, '2024-12-12 17:59:47', '2024-12-12 17:59:47'),
(72, '505437b0-35d0-49ce-8abf-e576e389bf1f', 1, '2024-12-12 18:00:00', '2024-12-12 18:00:00'),
(73, 'fd0bfd9d-80a5-42e8-a92f-dadb3173106c', 1, '2024-12-12 18:00:22', '2024-12-12 18:00:22'),
(74, '73bf0126-a06d-44f8-b5f1-ab9dc4b291ca', 1, '2024-12-12 18:00:29', '2024-12-12 18:00:29'),
(75, 'f34e46e3-4016-44b7-b651-aceaa72da939', 1, '2024-12-12 18:00:39', '2024-12-12 18:00:39'),
(76, 'ae86f981-5adb-4fe8-804f-ea49db25ad24', 1, '2024-12-12 18:00:46', '2024-12-12 18:00:46'),
(77, '06c57ab8-1e06-405c-b978-3803c548a11c', 1, '2024-12-12 18:01:09', '2024-12-12 18:01:09'),
(78, '475940bd-09fa-4945-9f48-c14a05410d9e', 1, '2024-12-12 18:02:05', '2024-12-12 18:02:05'),
(79, '05295862-4108-4668-b6c1-ba296ef110db', 1, '2024-12-12 18:02:15', '2024-12-12 18:02:15'),
(80, '801d7390-51d4-4c4f-b170-8a99a9557d3b', 1, '2024-12-12 18:02:27', '2024-12-12 18:02:27'),
(81, 'd4424594-7856-4627-8088-4d6144e4fa0b', 1, '2024-12-12 18:02:45', '2024-12-12 18:02:45'),
(82, 'f3ccdfd2-278f-41e5-a24a-2d1307c25725', 1, '2024-12-12 18:02:52', '2024-12-12 18:02:52'),
(83, '74e8e3bd-312d-4884-8d21-8c2fe88be957', 1, '2024-12-12 18:02:57', '2024-12-12 18:02:57'),
(84, 'e2af25a9-bc9b-4820-b0ed-407920662dc9', 1, '2024-12-12 18:03:05', '2024-12-12 18:03:05'),
(85, 'db277418-9727-495b-ad47-fe1b86ef8e35', 1, '2024-12-12 18:03:10', '2024-12-12 18:03:10'),
(86, '78fd4f6b-b8c7-48ad-bc7c-39bf8dcbc18e', 1, '2024-12-12 18:03:21', '2024-12-12 18:03:21'),
(87, '60f86903-e4be-452a-ac09-0d244a7c3d5b', 1, '2024-12-12 18:03:54', '2024-12-12 18:03:54'),
(88, '84cdcf5a-da7d-4335-bb1b-c9a89227f23d', 1, '2024-12-12 18:04:22', '2024-12-12 18:04:22'),
(89, '18b0bef7-83ea-4841-ba35-1fc8e057b565', 1, '2024-12-12 18:05:33', '2024-12-12 18:05:33');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `campaign_data`
--
ALTER TABLE `campaign_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `credit_card_page_visits`
--
ALTER TABLE `credit_card_page_visits`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `daily_email_clicks`
--
ALTER TABLE `daily_email_clicks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `email_verification_clicks`
--
ALTER TABLE `email_verification_clicks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fund_page_visits`
--
ALTER TABLE `fund_page_visits`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gamer_profile`
--
ALTER TABLE `gamer_profile`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `game_page_visits`
--
ALTER TABLE `game_page_visits`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `spins_number`
--
ALTER TABLE `spins_number`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `visits`
--
ALTER TABLE `visits`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `campaign_data`
--
ALTER TABLE `campaign_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `credit_card_page_visits`
--
ALTER TABLE `credit_card_page_visits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `daily_email_clicks`
--
ALTER TABLE `daily_email_clicks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `email_verification_clicks`
--
ALTER TABLE `email_verification_clicks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `fund_page_visits`
--
ALTER TABLE `fund_page_visits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `gamer_profile`
--
ALTER TABLE `gamer_profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `game_page_visits`
--
ALTER TABLE `game_page_visits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `spins_number`
--
ALTER TABLE `spins_number`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `visits`
--
ALTER TABLE `visits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
