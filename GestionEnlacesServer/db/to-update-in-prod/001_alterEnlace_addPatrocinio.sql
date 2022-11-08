ALTER TABLE `enlaces-medicos`.`enlace` 
ADD COLUMN `patrocinado` TINYINT NOT NULL DEFAULT 0 AFTER `mediaVotos`;
