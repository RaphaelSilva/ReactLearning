INSERT INTO productType (id, name, description) VALUES (  1,
  'Aulas em Grupo', 'Aulas em um grupo determinado presencial');
INSERT INTO productType (id, name, description) VALUES (  2,
  'Aulas Personalizadas', 'Aulas individuais presencial');
INSERT INTO productType (id, name, description) VALUES (  3,
  'Retirada', 'O produto tem que ser retirado em um local');
INSERT INTO productType (id, name, description) VALUES (  4,
  'Entregavel', 'O produto será entregue');
INSERT INTO productType (id, name, description) VALUES (  5,
  'Curso Online', 'Curso estruturado em Modulos na plataforma');
INSERT INTO productType (id, name, description) VALUES (  6,
  'Video Aula', 'Video gravado sobre um unico tema');
INSERT INTO productType (id, name, description) VALUES (  7,
  'Aula Online', 'Aulas ao vivo na plataforma');
INSERT INTO productType (id, name, description) VALUES (  8,
  'Atendimento', 'Consulta presencial');
INSERT INTO productType (id, name, description) VALUES (  9,
  'Atendimento Online', 'Consulta online');
INSERT INTO productType (id, name, description) VALUES ( 10,
  'Espaço fisico', 'Espaço fisico para atividades');

select profileId from sysUser where userName = 'didunga' into @profileId;
INSERT INTO product ( name, description, value, tagLink, registerDate, productTypeId, profileId )
VALUES ('Personal', 'bla Personal bla Personal bla', 70.858 , 'personal', UTC_DATE(),  2, @profileId );
INSERT INTO product ( name, description, value, tagLink, registerDate, productTypeId, profileId )
VALUES ('Funcional Kids', 'bla Funcional Kids bla Funcional Kids bla', 40.638 , 'funcionalKids', UTC_DATE(),  1, @profileId );
INSERT INTO product ( name, description, value, tagLink, registerDate, productTypeId, profileId )
VALUES ('Funcional', 'bla Funcional Lagoa bla Funcional Lagoa bla', 67.638 , 'funcionalLagoa', UTC_DATE(),  1, @profileId );
INSERT INTO product ( name, description, value, tagLink, registerDate, productTypeId, profileId )
VALUES ('Fast Hiits', 'bla Fast Hiits bla Fast Hiits bla', 67.638 , 'fastHiits', UTC_DATE(),  1, @profileId );
INSERT INTO product ( name, description, value, tagLink, registerDate, productTypeId, profileId )
VALUES ('Brilhantina', 'bla Brilhantina bla Brilhantina bla', 67.638 , 'brilhantina', UTC_DATE(),  1, @profileId );


select profileId from sysUser where userName = 'raphael' into @profileId;
INSERT INTO product ( name, description, value, tagLink, registerDate, productTypeId, profileId )
VALUES ('Coaching', 'bla Coaching bla Coaching bla', 67.638 , 'coaching', UTC_DATE(),  1, @profileId );
