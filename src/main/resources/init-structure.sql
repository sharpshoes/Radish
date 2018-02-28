
DROP TABLE IF EXISTS `t_api`;
CREATE TABLE `t_api` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(45) DEFAULT NULL,
  `command` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code_UNIQUE` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `t_user`
--

DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `logon_name` varchar(45) DEFAULT NULL,
  `nick_name` varchar(45) DEFAULT NULL,
  `password` varchar(128) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `logon_name_UNIQUE` (`logon_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


