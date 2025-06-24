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
-- Table structure for table `allcodes`
--

DROP TABLE IF EXISTS `allcodes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `allcodes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `allcodes`
--

LOCK TABLES `allcodes` WRITE;
/*!40000 ALTER TABLE `allcodes` DISABLE KEYS */;
INSERT INTO `allcodes` VALUES (1,'ROLE','admin','R1','2021-10-31 11:30:03','2021-10-31 11:30:03'),(2,'ROLE','user','R2','2021-10-31 11:30:03','2021-10-31 11:30:03'),(3,'STATUS','Kích hoạt','S1','2021-10-31 11:30:03','2021-10-31 11:30:03'),(4,'STATUS','Không kích hoạt','S2','2021-10-31 11:30:03','2021-10-31 11:30:03'),(5,'GENDER','Nam','M','2021-10-31 11:30:03','2021-10-31 11:30:03'),(6,'GENDER','Nữ','FE','2021-10-31 11:30:03','2021-10-31 11:30:03'),(7,'GENDER','Khác','O','2021-10-31 11:30:03','2021-10-31 11:30:03'),(9,'CATEGORY','Kit mùa hè','kit-mua-he','2021-11-03 17:06:16','2025-03-13 21:33:43'),(14,'BRAND','Manchester United','mu','2021-11-03 17:12:18','2025-03-13 21:39:32'),(15,'BRAND','Manchester City','mc','2021-11-03 17:12:18','2025-03-13 21:39:50'),(16,'BRAND','Arsenal','asenal','2021-11-03 17:12:18','2025-03-13 21:40:27'),(22,'CATEGORY','Kit mùa đông ','kit-mua-dong','2021-11-04 00:30:05','2025-03-13 21:34:26'),(23,'CATEGORY','giày bóng đá','giay-bong-da','2021-11-04 00:30:15','2025-03-13 21:34:55'),(24,'CATEGORY','Kit tập luyện','kit-tap-luyen','2021-11-04 00:30:34','2025-03-13 21:36:29'),(28,'SUBJECT','Adidas','adidas','2021-11-06 04:18:15','2025-03-14 09:34:44'),(29,'SUBJECT','Nike','nike','2021-11-06 04:18:15','2025-03-14 09:34:53'),(30,'SUBJECT','Puma','puma','2021-11-06 04:20:29','2025-03-14 09:35:04'),(68,'DISCOUNT','Phần trăm','percent','2021-11-07 06:49:47','2021-11-07 06:49:47'),(69,'DISCOUNT','VND','money','2021-11-07 06:49:47','2021-11-07 06:49:47'),(70,'CATEGORY','Áo Blockcore','blockcore','2021-11-07 23:47:42','2025-03-13 21:36:51'),(73,'CATEGORY','Áo thương mại','ao-thuong-mai','2021-11-10 10:31:34','2025-03-14 21:54:48'),(74,'BRAND','Tottenham Hotspur','tot','2021-11-10 10:34:13','2025-03-13 21:40:37'),(75,'SIZE','S','size-s','2021-11-12 06:26:14','2021-11-12 06:26:14'),(76,'SIZE','M','size-m','2021-11-12 06:26:14','2021-11-12 06:26:14'),(77,'SIZE','L','size-l','2021-11-12 06:26:14','2021-11-12 06:26:14'),(78,'SIZE','XL','size-xl','2021-11-12 06:26:14','2021-11-12 06:26:14'),(79,'SIZE','XXL','size-xxl','2021-11-12 06:26:14','2021-11-12 06:26:14'),(80,'BRAND','Chelsea ','chelsea','2021-11-14 13:22:55','2025-03-13 21:40:47'),(81,'CATEGORY','Phụ kiện khác','other','2021-11-15 00:00:59','2025-03-13 21:37:59'),(82,'STATUS-ORDER','Chờ xác nhận','S3','2021-11-20 17:10:26','2021-11-20 17:10:26'),(83,'STATUS-ORDER','Chờ lấy hàng','S4','2021-11-20 17:10:49','2021-11-20 17:10:49'),(84,'STATUS-ORDER','Đang giao hàng','S5','2021-11-20 17:10:49','2021-11-20 17:10:49'),(85,'STATUS-ORDER','Đã giao hàng','S6','2021-11-20 17:10:49','2021-11-20 17:10:49'),(86,'STATUS-ORDER','Hủy đơn','S7','2021-11-20 17:10:49','2021-11-20 17:10:49'),(89,'ROLE','shipper','R3','2022-10-06 15:00:07','2022-10-06 15:00:07'),(92,'ROLE','saler','R4','2022-12-04 18:03:32','2022-12-04 18:03:32'),(93,'CATEGORY','Balo','balo','2022-12-25 15:08:25','2022-12-25 15:08:25'),(94,'BRAND','Liverpool','liver','2022-12-25 15:09:29','2025-03-13 21:40:59'),(95,'BRAND','Real Madrid','real','2025-03-13 21:41:10','2025-03-13 21:41:10'),(96,'BRAND','FC Barcelona','barca','2025-03-13 21:41:30','2025-03-13 21:41:30'),(97,'BRAND','Inter Milan','inter','2025-03-13 21:41:55','2025-03-13 21:41:55'),(98,'BRAND','AC Milan','ac','2025-03-13 21:42:03','2025-03-13 21:42:03'),(99,'BRAND','Juventus','juve','2025-03-13 21:42:12','2025-03-13 21:42:12'),(100,'BRAND','Al-Nassr ','anat','2025-03-13 21:42:39','2025-03-13 21:42:39'),(101,'BRAND','Inter Miami','sochi','2025-03-13 21:42:49','2025-03-13 21:42:49'),(102,'BRAND','PSG','psg','2025-03-13 21:42:55','2025-03-13 21:42:55');
/*!40000 ALTER TABLE `allcodes` ENABLE KEYS */;
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
