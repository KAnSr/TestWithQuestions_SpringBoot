-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: localhost    Database: testwithquestions
-- ------------------------------------------------------
-- Server version	8.0.18

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
-- Table structure for table `results`
--

DROP TABLE IF EXISTS `results`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `results` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) DEFAULT NULL,
  `attempt` int(5) DEFAULT NULL,
  `starttime` timestamp NULL DEFAULT NULL,
  `finishtime` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `results`
--

LOCK TABLES `results` WRITE;
/*!40000 ALTER TABLE `results` DISABLE KEYS */;
INSERT INTO `results` VALUES (10,'vitek@m.la',1,'2020-01-29 18:11:08','2020-01-29 20:22:58'),(11,'vitek@m.la',2,'2020-01-29 18:11:08','2020-01-29 20:24:28'),(12,'vitek@m.la',3,'2020-01-29 18:11:08','2020-01-29 20:24:28'),(13,'vitek@m.la',4,'2020-01-29 18:11:08','2020-01-29 20:25:06'),(14,'vitek@m.la',5,'2020-01-29 18:11:08','2020-01-29 20:25:18'),(15,'vitek@m.la',6,'2020-01-29 18:11:08','2020-01-29 20:25:53'),(16,'vitek@m.la',7,'2020-01-29 18:11:08','2020-01-29 20:26:05'),(17,'vitek@m.la',8,'2020-01-29 18:11:08','2020-01-29 20:57:14'),(18,'vitek@m.la',9,'2020-01-29 18:11:08','2020-01-29 21:26:42'),(19,'vitek@m.la',10,'2020-01-29 18:11:08','2020-01-29 21:27:47'),(20,'vitek@m.la',11,'2020-01-29 18:11:08','2020-01-29 21:28:24'),(21,'vitek@m.la',12,'2020-01-29 18:11:08','2020-01-29 21:29:45'),(22,'larisa@nknl.nfd',1,'2020-01-30 15:28:00','2020-01-30 15:28:11'),(23,'larisa@nknl.nfd',2,'2020-01-30 15:28:00','2020-01-30 15:29:35'),(24,'larisa@nknl.nfd',3,'2020-01-30 15:28:00','2020-01-30 17:17:09'),(25,'vitek@m.la',13,'2020-02-01 22:31:49','2020-02-01 22:31:51'),(26,'vitek@m.la',14,'2020-02-01 22:31:49','2020-02-01 22:35:20'),(27,'vitek@m.la',15,'2020-02-01 22:31:49','2020-02-01 22:41:54'),(28,'vitek@m.la',16,'2020-02-01 22:31:49','2020-02-02 10:25:22'),(29,'vitek@m.la',17,'2020-02-01 22:31:49','2020-02-02 10:29:44'),(30,'vitek@m.la',18,'2020-02-01 22:31:49','2020-02-02 10:30:57'),(31,'vitek@m.la',19,'2020-02-01 22:31:49','2020-02-02 10:40:28'),(32,'vitek@m.la',20,'2020-02-01 22:31:49','2020-02-02 10:42:54'),(33,'vitek@m.la',21,'2020-02-01 22:31:49','2020-02-02 11:56:28'),(34,'vitek@m.la',22,'2020-02-01 22:31:49','2020-02-02 11:58:50'),(35,'vitek@m.la',23,'2020-02-01 22:31:49','2020-02-02 11:59:51'),(36,'vitek@m.la',24,'2020-02-01 22:31:49','2020-02-02 12:04:45'),(37,'vitek@m.la',25,'2020-02-01 22:31:49','2020-02-02 12:06:16'),(38,'vitek@m.la',26,'2020-02-01 22:31:49','2020-02-02 12:06:27'),(39,'vitek@m.la',27,'2020-02-01 22:31:49','2020-02-02 12:06:34'),(40,'vitek@m.la',28,'2020-02-01 22:31:49','2020-02-02 12:08:26'),(41,'vitek@m.la',29,'2020-02-01 22:31:49','2020-02-02 12:09:05'),(42,'vitek@m.la',30,'2020-02-01 22:31:49','2020-02-02 16:29:20'),(43,'vitek@m.la',31,'2020-02-01 22:31:49','2020-02-02 16:30:07'),(44,'vitek@m.la',32,'2020-02-01 22:31:49','2020-02-02 16:34:26'),(45,'vitek@m.la',33,'2020-02-01 22:31:49','2020-02-02 19:44:46'),(46,'vitek@m.la',34,'2020-02-01 22:31:49','2020-02-02 19:46:10'),(47,'vitek@m.la',35,'2020-02-01 22:31:49','2020-02-02 19:46:37'),(48,'vitek@m.la',36,'2020-02-01 22:31:49','2020-02-02 19:58:02'),(49,'vitek@m.la',37,'2020-02-01 22:31:49','2020-02-02 19:59:34'),(54,'vitek@m.la',38,'2020-02-01 22:31:49','2020-02-02 20:50:26'),(55,'vitek@m.la',39,'2020-02-01 22:31:49','2020-02-02 20:50:57'),(57,'vitek@m.la',40,'2020-02-01 22:31:49','2020-02-02 21:07:48'),(58,'vitek@m.la',41,'2020-02-01 22:31:49','2020-02-02 21:08:42'),(59,'surname_name@host.com',1,'2020-02-02 22:15:41','2020-02-02 22:16:48'),(60,'stepanov@host.com',1,'2020-02-03 09:45:00','2020-02-03 09:47:50'),(61,'stepanov@host.com',2,'2020-02-03 09:45:00','2020-02-03 09:51:46'),(62,'stepanov@host.com',3,'2020-02-04 09:51:17','2020-02-04 09:51:18'),(63,'stepanov@host.com',4,'2020-02-04 09:51:17','2020-02-04 11:13:50'),(64,'stepanov@host.com',5,'2020-02-04 09:51:17','2020-02-04 11:14:21'),(65,'larisa@nknl.nfd',4,'2020-02-04 11:16:20','2020-02-04 11:16:47'),(66,'v_sidorov@nknl.nfd',1,'2020-02-04 14:38:33','2020-02-04 14:39:07'),(67,'v_sidorov@nknl.nfd',2,'2020-02-04 14:38:33','2020-02-04 14:43:10'),(68,'selezen@host.com',1,'2020-02-04 20:34:35','2020-02-04 20:34:43'),(69,'selezen@host.com',2,'2020-02-04 20:34:35','2020-02-04 21:28:54'),(70,'qwerrty@sdfgd.com',1,'2020-02-05 11:33:10','2020-02-05 11:33:31'),(71,'v_sidorov@nknl.nfd',3,'2020-02-05 11:30:11','2020-02-05 11:33:33'),(72,'selezen@host.com',3,'2020-02-05 11:29:42','2020-02-05 11:33:31'),(73,'v_sidorov@nknl.nfd',4,'2020-02-05 11:57:42','2020-02-05 11:57:55'),(74,'bidokjs@mail.ru',1,'2020-02-05 16:35:24','2020-02-05 16:36:29'),(75,'bidokjs@mail.ru',2,'2020-02-05 16:38:13','2020-02-05 16:38:17'),(76,'selezen@host.com',4,'2020-02-05 16:43:11','2020-02-05 16:43:16'),(77,'vaska@gmail.com',1,'2020-02-05 18:02:21','2020-02-05 18:03:40'),(78,'petro@gmail.com',1,'2020-02-05 18:03:17','2020-02-05 18:04:19'),(79,'bondarenko@urk.zzz',1,'2020-02-05 18:03:02','2020-02-05 18:04:23'),(80,'vaska@gmail.com',2,'2020-02-05 18:04:34','2020-02-05 18:04:58'),(81,'bidokjs@mail.ru',3,'2020-02-05 18:05:35','2020-02-05 18:05:37'),(82,'bondarenko@urk.zzz',2,'2020-02-05 18:05:49','2020-02-05 18:05:54'),(83,'bondarenko@urk.zzz',3,'2020-02-05 18:14:41','2020-02-05 18:28:49'),(84,'kjkjkjfd@jjj.gggg',1,'2020-02-06 19:58:29','2020-02-06 19:59:33');
/*!40000 ALTER TABLE `results` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-09 11:15:19
