-- FORM
set @userName = 'raphael';
set @userPassword = '123';
set @customerName = 'Raphael';
set @customerLastName = 'Silva do Nascimneto';
set @customerDate = '1988-10-05';
set @customerImg = '/imgs/profile-m.jpg';
set @customerCpf = '25614557119';
set @professionalCnpj = '10623708000152';
set @commerceName = 'SpazioRD';
set @commerceImg = '/imgs/profile-m.jpg';
set @addressStreet = 'Av. Herminia de Andrade Coulto e Silva';
set @addressNum = '123';
set @addressComplement = 'SpazioRD';
set @addressDistrict = 'Pq. São Quirino';
set @addressZipCod = 13088340;
set @addressCity = 'Campinas';
set @addressState = 'São Paulo';
set @contactPhone = '19998965243';
set @contactEmail = 'alguem@algum.com.br';


-- Address Register ------------------------------------------------------------
INSERT INTO address (street, num, complement, district, postalCode, city, state)
VALUES ( @addressStreet, @addressNum, @addressComplement,
         @addressDistrict, @addressPostalCode, @addressCity, @addressState);
SELECT LAST_INSERT_ID() INTO @addressId;

INSERT INTO contact (phone, eMail) VALUES (@contactPhone, @contactEmail);
SELECT LAST_INSERT_ID() INTO @contactId;

-- Customer Register -------------------------------------------------------
INSERT INTO customer (name, lastName, dateBirth, img, cpf,
                      addressId, contactId)
VALUES ( @customerName, @customerLastName, @customerDate, @customerImg,
         @customerCpf, @addressId, @contactId);
SELECT LAST_INSERT_ID() INTO @customerId;

-- Professional Register -------------------------------------------------------
INSERT INTO professional (customerId, img, cnpj, isAddressShowed,
                          addressId, contactId)
VALUES ( @customerId, @customerImg, @professionalCnpj, 1,
         @addressId, @contactId);
SELECT LAST_INSERT_ID() INTO @professionalId;

-- Commerce Register -----------------------------------------------------------
INSERT INTO commerce (name, img, addressId, contactId)
VALUES ( @commerceName, @commerceImg, @addressId, @contactId);
SELECT LAST_INSERT_ID() INTO @commerceId;

-- Perfil Register -------------------------------------------------------------
INSERT INTO profile ( professionalId, commerceId, customerId)
VALUES ( @professionalId, @commerceId, @customerId);
SELECT LAST_INSERT_ID() INTO @profileId;

-- SysUser register ------------------------------------------------------------
INSERT INTO sysUser (userName, password, profileId)
VALUES ( @userName, @userPassword, @profileId);
SELECT LAST_INSERT_ID() INTO @userId;
