-- FORM
set @userName = 'didunga';
set @userPassword = '123';
set @professionalName = 'Diana';
set @professionalLastName = 'Serregni Ribeiro';
set @professionalDate = '1986-08-20';
set @professionalImg = '/imagens/avatar-m.jpg';
set @commerceName = 'SpazioRD';
set @commerceImg = '/imagens/avatar-m.jpg';
set @addressStreet = 'Av. Herminia de Andrade Coulto e Silva';
set @addressNum = '123';
set @addressComplement = 'SpazioRD';
set @addressDistrict = 'Pq. São Quirino';
set @addressZipCod = 13088340;
set @addressCity = 'Campinas';
set @addressState = 'São Paulo';

-- Address Register ------------------------------------------------------------
INSERT INTO address (street, num, complement, district, zipCod, city, state)
VALUES ( @addressStreet, @addressNum, @addressComplement,
         @addressDistrict, @addressZipCod, @addressCity, @addressState);
SELECT LAST_INSERT_ID() INTO @addressId;

-- Professional Register -------------------------------------------------------
INSERT INTO professional (name, lastName, addressId, contactId, dateBirth,
                          isAddressShowed, img)
VALUES ( @professionalName, @professionalLastName, @addressId,
         1, @professionalDate, 1, @professionalImg);
SELECT LAST_INSERT_ID() INTO @professionalId;

-- Commerce Register -----------------------------------------------------------
INSERT INTO commerce (name, img, addressId, contactId)
VALUES ( @commerceName, @commerceImg, @addressId, 1);
SELECT LAST_INSERT_ID() INTO @commerceId;

-- Perfil Register -------------------------------------------------------------
INSERT INTO profile ( professionalId, commerceId)
VALUES ( @professionalId, @commerceId);
SELECT LAST_INSERT_ID() INTO @profileId;

-- SysUser register ------------------------------------------------------------
INSERT INTO sysUser (userName, password, profileId)
VALUES ( @userName, @userPassword, @profileId);
SELECT LAST_INSERT_ID() INTO @userId;
