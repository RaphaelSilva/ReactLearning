USE db_spaziord;

INSERT INTO sysTableId (tableName,  currentId,  nextId )
VALUES  ('sysUser', 0, 1)
      , ('address', 0, 1)
      , ('professional', 0, 1)
      , ('commerce', 0, 1)
      , ('perfil', 0, 1)
      , ('local', 0, 1)
      , ('productType', 0, 1)
      , ('product', 0, 1);

-- FORM
set @userName = 'raphael';
set @userPassword = '123';
set @professionalName = 'Raphael';
set @professionalLastName = 'Silva do Nascimneto';
set @professionalDate = '1988-10-05';
set @professionalImg = '/imagens/perfil-de-avatar.jpg';
set @commerceName = 'SpazioRD';
set @commerceImg = '/imagens/perfil-de-avatar.jpg';
set @addressStreet = 'Av. Herminia de Andrade Coulto e Silva';
set @addressNum = '123';
set @addressComplement = 'SpazioRD';
set @addressDistrict = 'Pq. São Quirino';
set @addressZipCod = 13088340;
set @addressCity = 'Campinas';
set @addressState = 'São Paulo';

-- Address Register ------------------------------------------------------------
-- select nextId from sysTableId where tableName = 'address' into @addressId;

INSERT INTO address (street, num, complement, district, zipCod, city, state)
VALUES ( /* @addressId ,*/ @addressStreet, @addressNum, @addressComplement,
         @addressDistrict, @addressZipCod, @addressCity, @addressState);

-- UPDATE sysTableId SET currentId = @addressId, nextId = @addressId + 1
-- WHERE tableName = 'address';

-- Professional Register -------------------------------------------------------
-- select nextId from sysTableId where tableName = 'professional' into @professionalId;

INSERT INTO professional (name, lastName, addressId, contatoId, dateBirth,
                          isAddressShowed, img)
VALUES ( /* @professionalId ,*/ @professionalName, @professionalLastName, @addressId,
         1, @professionalDate, 1, @professionalImg);

-- UPDATE sysTableId SET currentId = @professionalId, nextId = @professionalId + 1
-- WHERE tableName = 'professional';

-- Commerce Register -----------------------------------------------------------
-- select nextId from sysTableId where tableName = 'commerce' into @commerceId;

INSERT INTO commerce (name, img, addressId, contatoId)
VALUES ( /* @commerceId ,*/ @commerceName, @commerceImg, @addressId, 1);

-- UPDATE sysTableId SET currentId = @commerceId, nextId = @commerceId + 1
-- WHERE tableName = 'commerce';

-- Perfil Register -------------------------------------------------------------
-- select nextId from sysTableId where tableName = 'perfil' into @perfilId;

INSERT INTO perfil (professionalId, commerceId)
VALUES ( /* @perfilId ,*/ @professionalId, @commerceId);

-- UPDATE sysTableId SET currentId = @perfilId, nextId = @perfilId + 1
-- WHERE tableName = 'perfil';

-- SysUser register ------------------------------------------------------------
-- select nextId from sysTableId where tableName = 'sysUser' into @userId;

INSERT INTO sysUser (userName, password, perfilId)
VALUES ( /* @userId ,*/ @userName, @userPassword, @perfilId);

-- UPDATE sysTableId SET currentId = @userId, nextId = @userId + 1
-- WHERE tableName = 'sysUser';
