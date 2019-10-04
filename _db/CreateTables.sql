USE `db_spaziord`;

DROP TABLE IF EXISTS `sysTableId`;
CREATE TABLE IF NOT EXISTS `sysTableId` (
  `tableName` VARCHAR(50) NOT NULL,
  `currentId` INT NULL,
  `nextId` INT NULL,
  PRIMARY KEY (`tableName`))
ENGINE=InnoDB
DEFAULT CHARACTER SET utf8;

DROP TABLE IF EXISTS `sysUser`;
CREATE TABLE IF NOT EXISTS `sysUser` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userName` VARCHAR(50) NOT NULL,
  `password` VARCHAR(128) NOT NULL,
  `profileId` INT NULL,
  `actived`  TINYINT DEFAULT 1,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET utf8;

DROP TABLE IF EXISTS `address`;
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

DROP TABLE IF EXISTS `contact`;
CREATE TABLE IF NOT EXISTS `contact` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `phone` VARCHAR(15) NOT NULL,
  `eMail` VARCHAR(80) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET utf8;

DROP TABLE IF EXISTS `customer`;
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

DROP TABLE IF EXISTS `professional`;
CREATE TABLE `professional` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `customerId` VARCHAR(20) NULL,
  `isAddressShowed` TINYINT NULL,
  -- it can be same of the customer table at creation
  `img` VARCHAR(100) NULL,
  `cnpj` VARCHAR(14) NULL,
  `addressId` INT NULL,
  `contactId` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

DROP TABLE IF EXISTS `commerce`;
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

DROP TABLE IF EXISTS `profile`;
DEFAULT CHARACTER SET = utf8;
CREATE TABLE `profile` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `professionalId` INT NULL,
  `commerceId` INT NULL,
  `customerId` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

DROP TABLE IF EXISTS `local`;
CREATE TABLE `local` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NULL,
  `description` VARCHAR(80) NULL,
  `addressId` INT NULL,
  `commerceId` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

DROP TABLE IF EXISTS `productType`;
CREATE TABLE `productType` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NULL,
  `description` VARCHAR(80) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NULL,
  `description` VARCHAR(80) NULL,
  `readMore` TEXT NULL, -- If it isn't a good ideia do it in a file
  `tagLink` VARCHAR(64) NULL, -- This columm can be indexed by tag too
  `registerDate` DATE NULL,
  `productTypeId` INT NULL,
  `profileId` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

DROP TABLE IF EXISTS `payment`;
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
DROP TABLE IF EXISTS `cart`;
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
DROP TABLE IF EXISTS `checkout`;
CREATE TABLE `checkout` (
  `id` INT NOT NULL AUTO_INCREMENT,
  -- credcard, debtcard, bitcoins, _boleto_
  `paymentMethod` CHAR(8) NULL,
  `customerId` INT NULL,
  `cartId` INT NULL,
  `subTotal` DECIMAL(5,3),
  -- It will came from PagSeguro
  `status` CHAR(15)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

DROP TABLE IF EXISTS `checkoutItem`;
CREATE TABLE `checkoutItem` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `checkoutId` INT NULL,
  `paymentId` INT NULL,
  -- if product has a payment to offer
  `productId` INT NULL,
  `customerId` INT NULL,
  -- check payment roles before setting if
  `isRecurrence` TINYINT DEFAULT 0,
  `quantity` INT NULL
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

--
--
--
--
--
--
--
--
--
--
--
--
--
--
--
--
--
--
--
--
--
--
--
--
--
--
--
--
--
--
--
--
--
--
--
--
--
