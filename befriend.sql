-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 22, 2020 at 08:08 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `befriend`
--

-- --------------------------------------------------------

--
-- Table structure for table `confirm`
--

CREATE TABLE `confirm` (
  `User_ID_Confirm` int(11) NOT NULL,
  `Post_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `confirm`
--

INSERT INTO `confirm` (`User_ID_Confirm`, `Post_ID`) VALUES
(44, 58),
(48, 66);

-- --------------------------------------------------------

--
-- Table structure for table `donation`
--

CREATE TABLE `donation` (
  `Post_ID` int(11) NOT NULL,
  `User_ID_Donate` int(11) NOT NULL,
  `Things_Name` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `Recieve_Date` datetime DEFAULT NULL,
  `Things_Number_Donate` int(11) DEFAULT NULL,
  `Amount_Money_Donate` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `Post_ID` int(11) NOT NULL,
  `Post_Title` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Post_Description` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Post_Status` int(11) DEFAULT NULL,
  `Post_Date` datetime DEFAULT NULL,
  `FileImage` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `AmountMoney` int(11) DEFAULT NULL,
  `BankAccount` varchar(65) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Count` int(11) NOT NULL,
  `User_ID_Post` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`Post_ID`, `Post_Title`, `Post_Description`, `Post_Status`, `Post_Date`, `FileImage`, `AmountMoney`, `BankAccount`, `Count`, `User_ID_Post`) VALUES
(50, 'Hope', 'I want the Hope to be change my life', 3, '2020-12-18 01:25:54', '1608229552672_dark1.jpg', 200000, 'Mr.Hope Robot\r\n0812617458', 1, 32),
(51, 'asf', 'asdf', 4, '2020-12-18 02:04:41', '1608231881697_book.jpg', 2000, 'sdf', 1, 33),
(53, 'Fire', 'Locatn', 3, '2020-12-21 13:07:22', '1608530842324_fire.jpg', 5000, 'asdasd', 5, 37),
(54, 'Hope', 'Hope', 4, '2020-12-21 13:28:31', '1608532111547_dark1.jpg', 20000, 'KOIK', 0, 34),
(55, 'fire', 'fire is bad.pls donate!!!', 3, '2020-12-21 13:39:46', '1608532784452_victim2-1.jpg', 8000, 'Mr.pollo\r\n41253645454', 5, 2),
(58, 'Ko', 'Kop', 1, '2020-12-21 16:01:12', '1608541272226_fire.jpg', 50000, '000', 4, 42),
(59, 'Emergency response t', 'At the peak of the fires, our focus was to get emergency support to the amazing frontline organisations, rescuing and caring for injured and fire-affected wildlife.\r\nNow that the fires are out, it’s time to focus on the long road to recovery and future-proofing our country for the fire seasons ahead.\r\nAs we grapple with the global pandemic, the need for our work does not stop. In fact, nature needs us now more than ever. We continue to work safely through COVID-19 to deliver work on-the-ground w', 2, '2020-12-21 16:15:30', '1608542130572_fire.jpg', 5000000, 'Mrs.Thanin Wongsa\r\nPromt Pay : 0812619458\r\n', 0, 1),
(61, 'Help child in Thaila', 'Saving Lives, Building Futures What you’re about to do could change a child’s life forever. We\'re delighted that you\'re considering donating to UNICEF. The money you give today could protect a child from dangers like disease and abuse, and help them grow up safe and healthy.  UNICEF receives no money from the UN budget. We rely entirely on charitable donations like yours to fund our vital work to protect children, transform their lives and build a safer world for them to grow and develop. We wor', 2, '2020-12-21 16:23:27', '1608542607400_dark1.jpg', 150000, 'Mr.Korn\r\nPromt Pay:987654321', 0, 45),
(65, 'Poor', 'Poor', 2, '2020-12-21 22:06:26', '1608563186225_child1-1.jpg', 5000, 'Kiloi', 7, 47),
(66, 'Pet', 'Pet', 1, '2020-12-22 13:46:55', '1608619615004_cat-1.jpg', 2000, 'LOLKIOL', 1, 48),
(67, 'Plase donate for cre', 'temple', 1, '2020-12-22 13:55:28', '1608620128271_temple.jpg', 80000, 'Mr.Aimaim\r\n125478254', 0, 44);

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

CREATE TABLE `report` (
  `Report_ID` int(11) NOT NULL,
  `Report_Description` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `User_ID_Report` int(11) DEFAULT NULL,
  `Post_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `require_things`
--

CREATE TABLE `require_things` (
  `Things_Name` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `Things_Number` int(11) DEFAULT NULL,
  `Post_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `require_things`
--

INSERT INTO `require_things` (`Things_Name`, `Things_Number`, `Post_ID`) VALUES
('', 0, 67),
('Box', 5, 59),
('Box', 5, 66),
('Grade', 10, 54),
('Hope', 5, 65),
('milk', 15, 55),
('Pencil', 1000, 61),
('Taxi', 5, 51),
('Toy', 4, 58);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `User_ID` int(11) NOT NULL,
  `Username` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `Password` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `FirstName` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `LastName` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `Address` varchar(70) COLLATE utf8_unicode_ci NOT NULL,
  `PhoneNumber` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `EvidenceFile` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `Status_User` int(11) DEFAULT NULL,
  `Upload_Status` int(11) DEFAULT NULL,
  `User_Role` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`User_ID`, `Username`, `Password`, `FirstName`, `LastName`, `Address`, `PhoneNumber`, `EvidenceFile`, `Status_User`, `Upload_Status`, `User_Role`) VALUES
(1, 'korn', '$2b$10$cbxkE4l.h5CBXdkTiQcaeeipzOD/02zbSNfNGjcxHJjpqBoGUPCXW', '', '', '', NULL, NULL, NULL, 0, 1),
(2, 'aumaim', '$2b$10$2KdOzzyqHnB0rAY1ZWALX./mjzofyU8F2ZMYZZMtIyeQp0mhwEYKq', '', '', '', NULL, '1608532704225_aim.jpg', NULL, 0, 1),
(22, 'break', '$2b$10$0//7VRy27dTatKnuHF8/9egVQQeHEQfRhwXh4hyGm.KIY4AkB69ny', 'Thirak', 'Samaidai', 'Thai', '0889562541', '1607592124013_korn.jpg', 2, 0, 2),
(32, 'moon', '$2b$10$wGeW5JvT5Y89IobqPuUyWeiZudB1.vof0CHPaMx.Rzqy6QKstbxD.', 'Luna', 'Sunshine', '458/52 Los Angeles Patric Road United Satae 25410', '0845695874', '1608229258818_aim.jpg', 2, 0, 2),
(33, 'fu', '$2b$10$tXMZm6PR196oMhkjM0lAfe7/OwONGQL2kX9wToyYm/LgpHkO/BaHW', 'Fuu', 'Fuu', 'fu', 'fu', '1608231859107_cat-1.jpg', 1, NULL, 2),
(34, 'aa', '$2b$10$CIh2GRqow6CGSEdG7BU2VeFjBVcMsTP6YMhMok.bXQQdBjKDzUkMG', 'adas', 'asdasd', 'aa', 'aa', '1608562651820_child1-1.jpg', 1, 2, 2),
(35, 'uu', '$2b$10$eyIGVIWMw24TF1hLB39mIeHE6dELcj1mnaSY1I1iqtQ.NCvSM9yt2', 'Uni', 'Uno', 'Aloha Thailand', '0812364578', '1608563249926_fire1-1.jpg', 1, 2, 2),
(37, 'aim', '$2b$10$/6c.JdaaKy3ytMixu/tFzepH4gVMWR/gFGcTE9XEOv3NONO3iauz6', '', '', 'ghfgh', 'ujikh', '1608530572880_2020.8.9_200809.jpg', 1, NULL, 2),
(39, 'aim', '$2b$10$6DbUNydmVHwxyJlUlLt/GOt6N7kWQwWnk4anVvM.61CKuv01blx2u', 'aim', 'aim', '413/22,1 chaing rai 57100', '0833612917', NULL, 1, NULL, 2),
(40, 'aum', '$2b$10$wEpnvMXH2f.Zz4rnXoatDe4CDAO17PPDbJs2sPGsKyO7Ami4ICpwG', 'aum', 'aum', '413/22,1 chaing rai 57100', '0833612917', '1608532501058_aim.jpg', 1, NULL, 2),
(41, 'bb', '$2b$10$ILa5br3WRTKX/0M.u3vFC.eit3ZHIig/UPXXZadtRREsGv10.C4ym', 'asd', 'asd', 'asd', 'ad', '1608536194327_fire1-1.jpg', 1, 2, 2),
(42, 'nn', '$2b$10$bwQCsfq.6TZOcUayPyiAi.OKzjx8VM6xeavN4Xl1v5GEE5ieViX1q', 'asdasd', 'asdasd', 'asd', 'ad', '1608540465487_child1-1.jpg', 1, 2, 2),
(43, 'nin', '$2b$10$ETXlXXbh/XkOXi4FkQI8budlXUP54gguosjAVw05waCUzxp1Uh0dy', 'Thanin', 'WongSa', '105/22 Chinarong Road Muang Chjang Mai  Chiang Mai ', '0812619458', '1608541990536_dark1.jpg', 1, 2, 2),
(44, 'aimaim', '$2b$10$dCjytpR2XmGojilFtrSM8ejmQclNgtTETkN7qLn2NCuDVp8.3zaWu', 'Thidawan', 'Chaichana', '26/26 chaing rai 57100', '0833612917', '1608542275417_aim.jpg', 1, 2, 2),
(45, 'kok', '$2b$10$Cx6U2xVboghb9.dmvCVe2u21Jlm7d3i/mGBypWKr1TrA630UzHxwu', 'Peetikorn', 'Preechachot', '104 Chainarong Road Khon kaen 40000', '0845963215', '1608542514753_korn.jpg', 1, 2, 2),
(46, 'ii', '$2b$10$/vb723rlPX6b1VMQP1sdqeFivfFb23NM2NZ67IXd4rXhhXWttPW5K', 'thina', 'jgjgj', 'LOLOLOLOLO', '0845695236', '1608544135796_fire.jpg', 1, 2, 2),
(47, 'oo', '$2b$10$bdquTcNWNpV8XlDNAkLqB.vzpLYdmR1T4SmKmCHYgypq69.VIan5y', 'Ho', 'Oh', 'KIKLIKI{\"PLK\"', '0512654789', '1608563154476_poor.jpg', 1, 2, 2),
(48, 'kilo', '$2b$10$o3Xq/AVwPYgKMHoXatJbl.UIT/mYiIkowpZU5XCjJqMqEql3eWlGC', 'Kilo', 'Namnuk', 'kioloilpl;p', '0856963254', '1608619557224_child2-1.jpg', 1, 2, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `confirm`
--
ALTER TABLE `confirm`
  ADD PRIMARY KEY (`User_ID_Confirm`,`Post_ID`),
  ADD KEY `Post_ID` (`Post_ID`);

--
-- Indexes for table `donation`
--
ALTER TABLE `donation`
  ADD PRIMARY KEY (`Post_ID`,`User_ID_Donate`,`Things_Name`),
  ADD KEY `User_ID_Donate` (`User_ID_Donate`),
  ADD KEY `Things_Name` (`Things_Name`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`Post_ID`),
  ADD KEY `User_ID_Post` (`User_ID_Post`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`Report_ID`),
  ADD KEY `User_ID_Report` (`User_ID_Report`),
  ADD KEY `Post_ID` (`Post_ID`);

--
-- Indexes for table `require_things`
--
ALTER TABLE `require_things`
  ADD PRIMARY KEY (`Things_Name`,`Post_ID`),
  ADD KEY `Post_ID` (`Post_ID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`User_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `Post_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT for table `report`
--
ALTER TABLE `report`
  MODIFY `Report_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `User_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `confirm`
--
ALTER TABLE `confirm`
  ADD CONSTRAINT `confirm_ibfk_1` FOREIGN KEY (`User_ID_Confirm`) REFERENCES `users` (`User_ID`),
  ADD CONSTRAINT `confirm_ibfk_2` FOREIGN KEY (`Post_ID`) REFERENCES `post` (`Post_ID`);

--
-- Constraints for table `donation`
--
ALTER TABLE `donation`
  ADD CONSTRAINT `donation_ibfk_1` FOREIGN KEY (`Post_ID`) REFERENCES `require_things` (`Post_ID`),
  ADD CONSTRAINT `donation_ibfk_2` FOREIGN KEY (`User_ID_Donate`) REFERENCES `users` (`User_ID`),
  ADD CONSTRAINT `donation_ibfk_3` FOREIGN KEY (`Things_Name`) REFERENCES `require_things` (`Things_Name`);

--
-- Constraints for table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `post_ibfk_1` FOREIGN KEY (`User_ID_Post`) REFERENCES `users` (`User_ID`);

--
-- Constraints for table `report`
--
ALTER TABLE `report`
  ADD CONSTRAINT `report_ibfk_1` FOREIGN KEY (`User_ID_Report`) REFERENCES `users` (`User_ID`),
  ADD CONSTRAINT `report_ibfk_2` FOREIGN KEY (`Post_ID`) REFERENCES `post` (`Post_ID`);

--
-- Constraints for table `require_things`
--
ALTER TABLE `require_things`
  ADD CONSTRAINT `require_things_ibfk_1` FOREIGN KEY (`Post_ID`) REFERENCES `post` (`Post_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
