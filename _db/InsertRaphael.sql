-- FORM
set @img = '/imgs/profile/templ/profile-m.jpg';

set @userName = 'raphael';
set @userPassword = '123';
set @customerName = 'Raphael';
set @customerLastName = 'Silva do Nascimneto';
set @customerDate = '1988-10-05';
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
VALUES ('XPTO', 'Coaching', 'bla Coaching bla Coaching bla', @img,
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
  'coaching', UTC_DATE(),  1, @profileId );
SELECT LAST_INSERT_ID() INTO @productId;
INSERT INTO payment ( name,description,img,value,productId ) VALUES
    ('5 Consultas', 'Aulas Avulsa com duração de 1 dia', @img,'80.53', @productId),
    ('10 Consultas', 'Consultas Avulsa com duração de 1 dia', @img,'75.38', @productId),
    ('15 Consultas', 'Consultas Avulsa com duração de 1 dia', @img,'67.82', @productId);
INSERT INTO productInfo ( productId,title,description,img ) VALUES
    (@productId, 'Titulo 0 Info', 'Descrição do produto 0', @img),
    (@productId, 'Titulo 1 Info', 'Descrição do produto 1', @img),
    (@productId, 'Titulo 2 Info', 'Descrição do produto 2', @img);
