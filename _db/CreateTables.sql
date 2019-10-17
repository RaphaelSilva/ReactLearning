USE `db_spaziord`;

DROP TABLE IF EXISTS `address`;
DROP TABLE IF EXISTS `contact`;
DROP TABLE IF EXISTS `customer`;
DROP TABLE IF EXISTS `professional`;
DROP TABLE IF EXISTS `commerce`;
DROP TABLE IF EXISTS `profile`;
DROP TABLE IF EXISTS `sysUser`;
DROP TABLE IF EXISTS `local`;
DROP TABLE IF EXISTS `productType`;
DROP TABLE IF EXISTS `product`;
DROP TABLE IF EXISTS `productInfo`;
DROP TABLE IF EXISTS `payment`;
DROP TABLE IF EXISTS `cart`;
DROP TABLE IF EXISTS `sOrder`;
DROP TABLE IF EXISTS `sOrderItem`;

CREATE TABLE `address` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `postalCode` VARCHAR(20) NULL,
  `street` VARCHAR(50) NULL,
  `num` VARCHAR(20) NULL,
  `complement` VARCHAR(80) NULL,
  `district` VARCHAR(30) NULL,
  `city` VARCHAR(20) NULL,
  `state` VARCHAR(20) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `contact` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `phone` VARCHAR(15) NOT NULL,
  `eMail` VARCHAR(80) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET utf8;

CREATE TABLE `customer` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(20) NULL,
  `lastName` VARCHAR(50) NULL,
  `dateBirth` DATE NULL,
  `img` VARCHAR(100) NULL,
  `cpf` VARCHAR(11) NULL,
  `addressId` INT NULL,
  `contactId` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE `professional` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `customerId` INT NULL,
  -- it can be same of the customer table at creation
  `img` VARCHAR(100) NULL,
  `cnpj` VARCHAR(14) NULL,
  `isAddressShowed` TINYINT NULL,
  `addressId` INT NULL,
  `contactId` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE `commerce` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NULL,
  `img` VARCHAR(100) NULL,
  `cnpj` VARCHAR(14) NULL,
  `addressId` INT NULL,
  `contactId` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE `profile` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `professionalId` INT NULL,
  `commerceId` INT NULL,
  `customerId` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `sysUser` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userName` VARCHAR(50) NOT NULL,
  `password` VARCHAR(128) NOT NULL,
  `profileId` INT NULL,
  `actived`  TINYINT DEFAULT 1,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET utf8;

CREATE TABLE `local` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NULL,
  `description` VARCHAR(80) NULL,
  `addressId` INT NULL,
  `commerceId` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE `productType` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NULL,
  `description` VARCHAR(80) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE `product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(35) NULL,
  `name` VARCHAR(50) NULL,
  `description` VARCHAR(120) NULL,
  `img` VARCHAR(100) NULL,
  `readMore` TEXT NULL, -- If it isn't a good ideia do it in a file
  `tagLink` VARCHAR(64) NULL, -- This columm can be indexed by tag too
  `registerDate` DATE NULL,
  `productTypeId` INT NULL,
  `profileId` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE `productInfo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `productId` INT NULL,
  `description` VARCHAR(80) NULL,
  `img` VARCHAR(100) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE `payment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NULL,
  `description` VARCHAR(80) NULL,
  `value` DECIMAL(5,3) NULL,
  `productId` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- Just to save all cart from cookies
CREATE TABLE `cart` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `info` VARCHAR(50) NULL,
  `status` CHAR(10) NULL,
  -- Proccess as a vector string (,)
  `listIdItens` VARCHAR(100) NULL,
  `createReg` DATE NULL,
  `customerId` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- If some item were a recurrence then split it to a new checkout
CREATE TABLE `sOrder` (
  `id` INT NOT NULL AUTO_INCREMENT,
  -- credcard, debtcard, bitcoins, _boleto_
  `paymentMethod` CHAR(8) NULL,
  `customerId` INT NULL,
  `cartId` INT NULL,
  `subTotal` DECIMAL(5,3),
  -- It will came from PagSeguro
  `status` CHAR(15),
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE `sOrderItem` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `checkoutId` INT NULL,
  `paymentId` INT NULL,
  -- if product has a payment to offer
  `productId` INT NULL,
  `customerId` INT NULL,
  -- check payment roles before setting if
  `isRecurrence` TINYINT DEFAULT 0,
  `quantity` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

INSERT INTO productType (id, name, description) VALUES (  1, 'Aulas em Grupo', 'Aulas em um grupo determinado presencial');
INSERT INTO productType (id, name, description) VALUES (  2, 'Aulas Personalizadas', 'Aulas individuais presencial');
INSERT INTO productType (id, name, description) VALUES (  3, 'Retirada', 'O produto tem que ser retirado em um local');
INSERT INTO productType (id, name, description) VALUES (  4, 'Entregavel', 'O produto será entregue');
INSERT INTO productType (id, name, description) VALUES (  5, 'Curso Online', 'Curso estruturado em Modulos na plataforma');
INSERT INTO productType (id, name, description) VALUES (  6, 'Video Aula', 'Video gravado sobre um unico tema');
INSERT INTO productType (id, name, description) VALUES (  7, 'Aula Online', 'Aulas ao vivo na plataforma');
INSERT INTO productType (id, name, description) VALUES (  8, 'Atendimento', 'Consulta presencial');
INSERT INTO productType (id, name, description) VALUES (  9, 'Atendimento Online', 'Consulta online');
INSERT INTO productType (id, name, description) VALUES ( 10, 'Espaço fisico', 'Espaço fisico para atividades');
