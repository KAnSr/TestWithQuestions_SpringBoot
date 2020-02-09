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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(100) DEFAULT NULL,
  `lastname` varchar(100) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `updatetime` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Вася','Васильев','+380987654321','v_vasilyev@mail.mail','2019-01-20 15:00:00'),(2,'Дима',NULL,NULL,'hgg@ggg.sss',NULL),(3,'Игорёк','Моя Фам','98776678','k1@m.la',NULL),(4,'Витёк','Янукович','010203','vitek@m.la','2020-02-01 22:31:49'),(5,'Жора','Жора','9919191','kkjk@nknl.nfd',NULL),(6,'Надежда','Крупская','9919191','larisa@nknl.nfd','2020-02-04 11:16:20'),(7,'Семен','Кузма','666666666666666','qwerrty@sdfgd.com','2020-02-05 11:33:10'),(8,'Михаил','Горбачёв','9998899','surname_name@host.com','2020-02-02 22:15:41'),(9,'Лёня','Голубков','888111','stepanov@host.com','2020-02-04 19:14:28'),(10,'Билл','Клинтон','11166611','v_sidorov@nknl.nfd','2020-02-05 11:57:42'),(11,'Миша','Саакашвили','77712','selezen@host.com','2020-02-05 16:43:11'),(12,'Botaniqua','Antonous','0995672323','bidokjs@mail.ru','2020-02-05 18:05:35'),(13,'Василий','Пупкин','+380976543210','vaska@gmail.com','2020-02-05 18:04:34'),(14,'Игорь','Бондаренко','8881111','bondarenko@urk.zzz','2020-02-05 18:14:41'),(15,'Petro','Petrov','0501111111','petro@gmail.com','2020-02-05 18:03:17'),(16,'Имя','Фаммм','77322387','kjkjkjfd@jjj.gggg','2020-02-06 19:58:29');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
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
