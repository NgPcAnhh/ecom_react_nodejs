CREATE DATABASE  IF NOT EXISTS `ecom` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ecom`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ecom
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `orderproducts`
--

DROP TABLE IF EXISTS `orderproducts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderproducts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `addressUserId` int DEFAULT NULL,
  `shipperId` int DEFAULT NULL,
  `statusId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `typeShipId` int DEFAULT NULL,
  `voucherId` int DEFAULT NULL,
  `note` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `isPaymentOnlien` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `image` longblob,
  PRIMARY KEY (`id`),
  KEY `addressUserId` (`addressUserId`),
  KEY `shipperId` (`shipperId`),
  KEY `statusId` (`statusId`),
  KEY `typeShipId` (`typeShipId`),
  KEY `voucherId` (`voucherId`),
  CONSTRAINT `orderproducts_ibfk_1` FOREIGN KEY (`addressUserId`) REFERENCES `addressusers` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `orderproducts_ibfk_2` FOREIGN KEY (`shipperId`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `orderproducts_ibfk_3` FOREIGN KEY (`statusId`) REFERENCES `allcodes` (`code`) ON UPDATE CASCADE,
  CONSTRAINT `orderproducts_ibfk_4` FOREIGN KEY (`typeShipId`) REFERENCES `typeships` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `orderproducts_ibfk_5` FOREIGN KEY (`voucherId`) REFERENCES `vouchers` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderproducts`
--

LOCK TABLES `orderproducts` WRITE;
/*!40000 ALTER TABLE `orderproducts` DISABLE KEYS */;
INSERT INTO `orderproducts` VALUES (1,1,NULL,'S6',2,NULL,'',0,'2025-05-12 20:28:58','2025-05-12 20:47:27',NULL),(2,2,NULL,'S6',1,NULL,'',0,'2025-05-12 20:48:46','2025-05-12 20:48:59',NULL),(3,1,NULL,'S7',3,NULL,'',0,'2025-05-12 22:01:09','2025-05-12 22:01:44',NULL),(4,1,NULL,'S6',1,NULL,'',0,'2025-05-18 20:42:34','2025-05-18 20:43:05',NULL),(5,2,NULL,'S7',1,NULL,'',0,'2025-05-19 10:24:25','2025-05-19 10:41:14',NULL),(6,3,NULL,'S7',1,NULL,'',0,'2025-05-22 20:21:46','2025-05-22 20:22:36',NULL),(7,2,NULL,'S3',2,NULL,'',0,'2025-05-22 20:23:18','2025-05-22 20:23:18',NULL),(8,1,NULL,'S3',3,NULL,'',0,'2025-05-22 20:25:05','2025-05-22 20:25:05',NULL),(9,2,NULL,'S3',1,NULL,'',0,'2025-05-22 20:57:01','2025-05-22 20:57:01',NULL),(10,2,NULL,'S6',2,NULL,'',0,'2025-05-28 09:27:54','2025-05-28 09:28:20',NULL),(11,1,NULL,'S5',3,NULL,'',0,'2025-05-28 09:29:19','2025-05-28 09:29:36',NULL);
/*!40000 ALTER TABLE `orderproducts` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-21 16:31:38
