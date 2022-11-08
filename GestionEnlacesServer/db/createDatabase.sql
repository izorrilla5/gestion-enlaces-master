CREATE DATABASE  IF NOT EXISTS `enlaces-medicos` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `enlaces-medicos`;
-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: enlaces-medicos
-- ------------------------------------------------------
-- Server version	8.0.17

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
-- Table structure for table `campo`
--

DROP TABLE IF EXISTS `campo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campo` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `idCategoriaPadre` int(11) NOT NULL,
  `idEntidad` int(11) NOT NULL DEFAULT '3',
  PRIMARY KEY (`id`),
  KEY `FK_8f7483e58511da46a0966211de5` (`idCategoriaPadre`),
  KEY `FK_c1815c46d46f03d4d9e8908145e` (`idEntidad`),
  CONSTRAINT `FK_8f7483e58511da46a0966211de5` FOREIGN KEY (`idCategoriaPadre`) REFERENCES `categoria` (`id`),
  CONSTRAINT `FK_c1815c46d46f03d4d9e8908145e` FOREIGN KEY (`idEntidad`) REFERENCES `entidad` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `enlace`
--

DROP TABLE IF EXISTS `enlace`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enlace` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idCategoria` int(11) NOT NULL,
  `fechaCreacion` datetime  NULL DEFAULT now(),
  `idEntidad` int(11) NOT NULL DEFAULT '1',
  `idTipo` int(11) DEFAULT NULL,
  `mediaVotos` FLOAT NULL DEFAULT 0, 
  PRIMARY KEY (`id`),
  KEY `FK_d66051b57c5a7234e1ecd02edac` (`idTipo`),
  KEY `FK_bc1072f7ed0059651916bda58e9` (`idUsuario`),
  KEY `FK_630e652bd68f44421840d201019` (`idCategoria`),
  KEY `FK_cf0bdfd9add76c6f4b329e7728d` (`idEntidad`),
  CONSTRAINT `FK_630e652bd68f44421840d201019` FOREIGN KEY (`idCategoria`) REFERENCES `categoria` (`id`),
  CONSTRAINT `FK_bc1072f7ed0059651916bda58e9` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`id`),
  CONSTRAINT `FK_cf0bdfd9add76c6f4b329e7728d` FOREIGN KEY (`idEntidad`) REFERENCES `entidad` (`id`),
  CONSTRAINT `FK_d66051b57c5a7234e1ecd02edac` FOREIGN KEY (`idTipo`) REFERENCES `tipo` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `enlacetag`
--

DROP TABLE IF EXISTS `enlaceTag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enlaceTag` (
  `idEnlace` int(11) NOT NULL,
  `idTag` int(11) NOT NULL,
  PRIMARY KEY (`idEnlace`,`idTag`),
  KEY `IDX_ab42a493f35bb8e94fd44dbb8b` (`idEnlace`),
  KEY `IDX_ea43f11e0a2d43e7f6d9687b1a` (`idTag`),
  CONSTRAINT `FK_ab42a493f35bb8e94fd44dbb8b5` FOREIGN KEY (`idEnlace`) REFERENCES `enlace` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_ea43f11e0a2d43e7f6d9687b1a2` FOREIGN KEY (`idTag`) REFERENCES `tag` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `entidad`
--

DROP TABLE IF EXISTS `entidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entidad` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `idioma`
--

DROP TABLE IF EXISTS `idioma`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `idioma` (
  `id` int(11) NOT NULL,
  `codigo` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `idEntidad` int(11) NOT NULL DEFAULT '7',
  PRIMARY KEY (`id`),
  KEY `FK_34fb8b18be30fca5d0b23909e69` (`idEntidad`),
  CONSTRAINT `FK_34fb8b18be30fca5d0b23909e69` FOREIGN KEY (`idEntidad`) REFERENCES `entidad` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lista`
--

DROP TABLE IF EXISTS `lista`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lista` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idCategoria` int(11) NOT NULL,
  `idEntidad` int(11) NOT NULL DEFAULT '2',
  PRIMARY KEY (`id`),
  KEY `FK_6df2ae37d038ea8c9284702d56b` (`idUsuario`),
  KEY `FK_6209268c5ad62aa2da58e85430c` (`idCategoria`),
  KEY `FK_8e2ae8feeb893b8df9bdd18980a` (`idEntidad`),
  CONSTRAINT `FK_6209268c5ad62aa2da58e85430c` FOREIGN KEY (`idCategoria`) REFERENCES `categoria` (`id`),
  CONSTRAINT `FK_6df2ae37d038ea8c9284702d56b` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`id`),
  CONSTRAINT `FK_8e2ae8feeb893b8df9bdd18980a` FOREIGN KEY (`idEntidad`) REFERENCES `entidad` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `listaenlace`
--

DROP TABLE IF EXISTS `listaEnlace`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `listaEnlace` (
  `idLista` int(11) NOT NULL,
  `idEnlace` int(11) NOT NULL,
  PRIMARY KEY (`idLista`,`idEnlace`),
  KEY `IDX_39c8c1ff0f312f042b9b361252` (`idLista`),
  KEY `IDX_6a4b1e269cd2f251d8fc8cfd3f` (`idEnlace`),
  CONSTRAINT `FK_39c8c1ff0f312f042b9b361252f` FOREIGN KEY (`idLista`) REFERENCES `lista` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_6a4b1e269cd2f251d8fc8cfd3f2` FOREIGN KEY (`idEnlace`) REFERENCES `enlace` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `listatag`
--

DROP TABLE IF EXISTS `listaTag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `listaTag` (
  `idLista` int(11) NOT NULL,
  `idTag` int(11) NOT NULL,
  PRIMARY KEY (`idLista`,`idTag`),
  KEY `IDX_2d8e17a6ad5e0e53cd33e0b47c` (`idLista`),
  KEY `IDX_3614b81c1b3dacce4bce5bb00a` (`idTag`),
  CONSTRAINT `FK_2d8e17a6ad5e0e53cd33e0b47cb` FOREIGN KEY (`idLista`) REFERENCES `lista` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_3614b81c1b3dacce4bce5bb00a7` FOREIGN KEY (`idTag`) REFERENCES `tag` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `idEntidad` int(11) NOT NULL DEFAULT '6',
  PRIMARY KEY (`id`),
  KEY `FK_416fb68f6b2241d2681b12b8caa` (`idEntidad`),
  CONSTRAINT `FK_416fb68f6b2241d2681b12b8caa` FOREIGN KEY (`idEntidad`) REFERENCES `entidad` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `idEntidad` int(11) NOT NULL DEFAULT '4',
  PRIMARY KEY (`id`),
  KEY `FK_7db80fdc6733446edc0bac07dd4` (`idEntidad`),
  CONSTRAINT `FK_7db80fdc6733446edc0bac07dd4` FOREIGN KEY (`idEntidad`) REFERENCES `entidad` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tipo`
--

DROP TABLE IF EXISTS `tipo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `idEntidad` int(11) NOT NULL DEFAULT '5',
  PRIMARY KEY (`id`),
  KEY `FK_30db2c3dd9d4de05a0a9ef6ec9a` (`idEntidad`),
  CONSTRAINT `FK_30db2c3dd9d4de05a0a9ef6ec9a` FOREIGN KEY (`idEntidad`) REFERENCES `entidad` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `traduccion`
--

DROP TABLE IF EXISTS `traduccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `traduccion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idTabla` int(11) NOT NULL,
  `idEntidad` int(11) NOT NULL,
  `idCampo` int(11) NOT NULL,
  `idIdioma` int(11) NOT NULL,
  `texto` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=193 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;



DROP TABLE IF EXISTS `provincia`;
CREATE TABLE `provincia` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `apellidos` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `pwd` varchar(255) NOT NULL,
  `activo` tinyint(4) NOT NULL,
  `idIdiomaSeleccionado` int(11) NOT NULL DEFAULT '1',
  `idRol` int(11) DEFAULT NULL,
  `necesitaCambiarContrasena` tinyint(4) NOT NULL DEFAULT '1',
  `username` varchar(255) NOT NULL,
  `colegiado` varchar(45) DEFAULT NULL,
  `idProvincia` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_67ebe767e105c968d0edfe05541` (`idRol`),
  KEY `FK_8a7ddd09ac9c8d18c2b247ca0f9` (`idIdiomaSeleccionado`),
  KEY `FK_provincia_idx` (`idProvincia`),
  CONSTRAINT `FK_67ebe767e105c968d0edfe05541` FOREIGN KEY (`idRol`) REFERENCES `rol` (`id`),
  CONSTRAINT `FK_8a7ddd09ac9c8d18c2b247ca0f9` FOREIGN KEY (`idIdiomaSeleccionado`) REFERENCES `idioma` (`id`),
  CONSTRAINT `FK_provincia` FOREIGN KEY (`idProvincia`) REFERENCES `provincia` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;



/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `voto`
--

DROP TABLE IF EXISTS `voto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `voto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idEnlace` int(11) NOT NULL,
  `valor` FLOAT NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_e176d1f804229864406bd555e4e` (`idEnlace`),
  CONSTRAINT `FK_e176d1f804229864406bd555e4e` FOREIGN KEY (`idEnlace`) REFERENCES `enlace` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-31 12:38:42
