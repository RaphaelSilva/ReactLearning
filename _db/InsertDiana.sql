-- FORM
set @img = '/imgs/profile/templ/profile-m.jpg';

set @userName = 'didunga';
set @userPassword = '123';
set @customerName = 'Diana';
set @customerLastName = 'Serregni Ribeiro';
set @customerDate = '1986-08-20';
set @customerCpf = '25614557119';
set @professionalCnpj = '10623708000152';
set @commerceName = 'SpazioRD';
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
VALUES ( @customerName, @customerLastName, @customerDate, @img,
         @customerCpf, @addressId, @contactId);
SELECT LAST_INSERT_ID() INTO @customerId;

-- Professional Register -------------------------------------------------------
INSERT INTO professional (customerId, img, cnpj, isAddressShowed,
                          addressId, contactId)
VALUES ( @customerId, @img, @professionalCnpj, 1,
         @addressId, @contactId);
SELECT LAST_INSERT_ID() INTO @professionalId;

-- Commerce Register -----------------------------------------------------------
INSERT INTO commerce (name, img, addressId, contactId)
VALUES ( @commerceName, @img, @addressId, @contactId);
SELECT LAST_INSERT_ID() INTO @commerceId;

-- Perfil Register -------------------------------------------------------------
INSERT INTO profile ( professionalId, commerceId, customerId)
VALUES ( @professionalId, @commerceId, @customerId);
SELECT LAST_INSERT_ID() INTO @profileId;

-- SysUser register ------------------------------------------------------------
INSERT INTO sysUser (userName, password, profileId)
VALUES ( @userName, @userPassword, @profileId);
SELECT LAST_INSERT_ID() INTO @userId;

INSERT INTO product ( code, name, description, img, readMore, tagLink, registerDate, productTypeId, profileId )
VALUES ('XPTO', 'Personal', 'Aulas Personalizadas e Individual', @img,
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
  'personal', UTC_DATE(),  2, @profileId );
INSERT INTO product ( code, name, description, img, readMore, tagLink, registerDate, productTypeId, profileId )
VALUES ('XPTO', 'Funcional Kids', 'bla Funcional Kids bla Funcional Kids bla', @img,
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
  'funcionalKids', UTC_DATE(),  1, @profileId );
INSERT INTO product ( code, name, description, img, readMore, tagLink, registerDate, productTypeId, profileId )
VALUES ('XPTO', 'Funcional', 'bla Funcional Lagoa bla Funcional Lagoa bla', @img,
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
  'funcionalLagoa', UTC_DATE(),  1, @profileId );
INSERT INTO product ( code, name, description, img, readMore, tagLink, registerDate, productTypeId, profileId )
VALUES ('XPTO', 'Fast Hiits', 'bla Fast Hiits bla Fast Hiits bla', @img,
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
  'fastHiits', UTC_DATE(),  1, @profileId );
INSERT INTO product ( code, name, description, img, readMore, tagLink, registerDate, productTypeId, profileId )
VALUES ('XPTO', 'Brilhantina', 'bla Brilhantina bla Brilhantina bla', @img,
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
  'brilhantina', UTC_DATE(),  1, @profileId );
