set @img = '/imgs/profile/temps/profile-m.jpg';


select profileId from sysUser where userName = 'didunga' into @profileId;
INSERT INTO product ( code, name, description, readMore, tagLink, registerDate, productTypeId, profileId )
VALUES ('XPTO', 'Personal', 'Aulas Personalizadas e Individual',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
  'personal', UTC_DATE(),  2, @profileId );
INSERT INTO product ( code, name, description, readMore, tagLink, registerDate, productTypeId, profileId )
VALUES ('XPTO', 'Funcional Kids', 'bla Funcional Kids bla Funcional Kids bla',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
  'funcionalKids', UTC_DATE(),  1, @profileId );
INSERT INTO product ( code, name, description, readMore, tagLink, registerDate, productTypeId, profileId )
VALUES ('XPTO', 'Funcional', 'bla Funcional Lagoa bla Funcional Lagoa bla',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
  'funcionalLagoa', UTC_DATE(),  1, @profileId );
INSERT INTO product ( code, name, description, readMore, tagLink, registerDate, productTypeId, profileId )
VALUES ('XPTO', 'Fast Hiits', 'bla Fast Hiits bla Fast Hiits bla',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
  'fastHiits', UTC_DATE(),  1, @profileId );
INSERT INTO product ( code, name, description, readMore, tagLink, registerDate, productTypeId, profileId )
VALUES ('XPTO', 'Brilhantina', 'bla Brilhantina bla Brilhantina bla',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
  'brilhantina', UTC_DATE(),  1, @profileId );


select profileId from sysUser where userName = 'raphael' into @profileId;
INSERT INTO product ( code, name, description, readMore, tagLink, registerDate, productTypeId, profileId )
VALUES ('XPTO', 'Coaching', 'bla Coaching bla Coaching bla',
  'Read more Read more Read more Read more Read more Read more Read more Read more' ,
  'coaching', UTC_DATE(),  1, @profileId );
