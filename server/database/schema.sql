
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `vetopulse` ;
USE `vetopulse` ;

-- -----------------------------------------------------
-- Table `vetopulse`.`owner`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vetopulse`.`owner` ;

CREATE TABLE IF NOT EXISTS `vetopulse`.`owner` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `lastname` VARCHAR(80) NOT NULL,
  `firstname` VARCHAR(40) NOT NULL,
  `adress` VARCHAR(150) NOT NULL,
  `zipcode` VARCHAR(15) NOT NULL COMMENT 'code postaux étrangers avec lettres',
  `city` VARCHAR(45) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `vetopulse`.`species`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vetopulse`.`species` ;

CREATE TABLE IF NOT EXISTS `vetopulse`.`species` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `species-name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `vetopulse`.`race`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vetopulse`.`race` ;

CREATE TABLE IF NOT EXISTS `vetopulse`.`race` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `species_id` INT NOT NULL,
  `race-name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`, `species_id`),
  INDEX `fk_race_species1_idx` (`species_id` ASC) VISIBLE,
  CONSTRAINT `fk_race_species1`
    FOREIGN KEY (`species_id`)
    REFERENCES `vetopulse`.`species` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `vetopulse`.`animal`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vetopulse`.`animal` ;

CREATE TABLE IF NOT EXISTS `vetopulse`.`animal` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `owner_id` INT NOT NULL,
  `race_id` INT NOT NULL,
  `pet-name` VARCHAR(40) NOT NULL,
  `birth_date` DATE NULL,
  `gender` VARCHAR(20) NOT NULL DEFAULT 'unknown' COMMENT 'female, male, unknown',
  `is_neutered` TINYINT NOT NULL,
  `weight` DECIMAL NOT NULL,
  `color` VARCHAR(45) NOT NULL,
  `eyecolor` VARCHAR(45) NOT NULL,
  `insurance` VARCHAR(100) NULL,
  `microchip_number` VARCHAR(20) NULL COMMENT 'int gère pas plus de 10 chiffres or n°puce a 15 chiffres',
  `tatoo_number` VARCHAR(20) NULL COMMENT 'contient des lettres',
  `observations` TEXT NULL COMMENT 'antécédents, allergies etc',
  PRIMARY KEY (`id`, `owner_id`, `race_id`),
  INDEX `fk_animal_owner1_idx` (`owner_id` ASC) VISIBLE,
  INDEX `fk_animal_race1_idx` (`race_id` ASC) VISIBLE,
  CONSTRAINT `fk_animal_owner1`
    FOREIGN KEY (`owner_id`)
    REFERENCES `vetopulse`.`owner` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_animal_race1`
    FOREIGN KEY (`race_id`)
    REFERENCES `vetopulse`.`race` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `vetopulse`.`medical-people`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vetopulse`.`medical-people` ;

CREATE TABLE IF NOT EXISTS `vetopulse`.`medical-people` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `med-lastname` VARCHAR(45) NOT NULL,
  `med-firstname` VARCHAR(45) NOT NULL,
  `status` VARCHAR(45) NOT NULL COMMENT 'vet, assistant',
  `email` VARCHAR(80) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `pin` VARCHAR(4) NOT NULL,
  `start_date` DATE NULL DEFAULT (CURRENT_DATE),
  `end_date` DATE NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `pin_UNIQUE` (`pin` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `vetopulse`.`proxy`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vetopulse`.`proxy` ;

CREATE TABLE IF NOT EXISTS `vetopulse`.`proxy` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `vetopulse`.`appointment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vetopulse`.`appointment` ;

CREATE TABLE IF NOT EXISTS `vetopulse`.`appointment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `animal_id` INT NOT NULL,
  `medical-people_id` INT NOT NULL,
  `start_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
  `reason` VARCHAR(150) NOT NULL,
  `status` VARCHAR(45) NOT NULL DEFAULT 'scheduled' COMMENT 'scheduled, in progress, hospitalized, under observation, discharged',
  `box` INT NULL,
  `health_status` VARCHAR(45) NULL DEFAULT 'stable' COMMENT 'emergency, urgent, stable',
  PRIMARY KEY (`id`, `animal_id`, `medical-people_id`),
  INDEX `fk_appointment_animal1_idx` (`animal_id` ASC) VISIBLE,
  INDEX `fk_appointment_medical-people1_idx` (`medical-people_id` ASC) VISIBLE,
  CONSTRAINT `fk_appointment_animal1`
    FOREIGN KEY (`animal_id`)
    REFERENCES `vetopulse`.`animal` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_appointment_medical-people1`
    FOREIGN KEY (`medical-people_id`)
    REFERENCES `vetopulse`.`medical-people` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `vetopulse`.`prescription`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vetopulse`.`prescription` ;

CREATE TABLE IF NOT EXISTS `vetopulse`.`prescription` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `appointment_id` INT NOT NULL,
  `creation_date` DATE NOT NULL,
  PRIMARY KEY (`id`, `appointment_id`),
  INDEX `fk_prescription_appointment1_idx` (`appointment_id` ASC) VISIBLE,
  CONSTRAINT `fk_prescription_appointment1`
    FOREIGN KEY (`appointment_id`)
    REFERENCES `vetopulse`.`appointment` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `vetopulse`.`medication`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vetopulse`.`medication` ;

CREATE TABLE IF NOT EXISTS `vetopulse`.`medication` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `medication-name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `vetopulse`.`prescription_has_medication`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vetopulse`.`prescription_has_medication` ;

CREATE TABLE IF NOT EXISTS `vetopulse`.`prescription_has_medication` (
  `prescription_id` INT NOT NULL,
  `medication_id` INT NOT NULL,
  `dosage` VARCHAR(100) NOT NULL,
  `duration` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`prescription_id`, `medication_id`),
  INDEX `fk_prescription_has_medication_medication1_idx` (`medication_id` ASC) VISIBLE,
  INDEX `fk_prescription_has_medication_prescription1_idx` (`prescription_id` ASC) VISIBLE,
  CONSTRAINT `fk_prescription_has_medication_prescription1`
    FOREIGN KEY (`prescription_id`)
    REFERENCES `vetopulse`.`prescription` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_prescription_has_medication_medication1`
    FOREIGN KEY (`medication_id`)
    REFERENCES `vetopulse`.`medication` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `vetopulse`.`appointment_has_proxies`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vetopulse`.`appointment_has_proxies` ;

CREATE TABLE IF NOT EXISTS `vetopulse`.`appointment_has_proxies` (
  `appointment_id` INT NOT NULL,
  `proxies_id` INT NOT NULL,
  `id_medical-people` INT NOT NULL COMMENT 'with pin code validation',
  `date` DATE NOT NULL,
  `hour` DATE NOT NULL,
  `value` DECIMAL NOT NULL,
  `observations` TEXT NULL,
  PRIMARY KEY (`appointment_id`, `proxies_id`),
  INDEX `fk_appointment_has_proxies_proxies1_idx` (`proxies_id` ASC) VISIBLE,
  INDEX `fk_appointment_has_proxies_appointment1_idx` (`appointment_id` ASC) VISIBLE,
  CONSTRAINT `fk_appointment_has_proxies_appointment1`
    FOREIGN KEY (`appointment_id`)
    REFERENCES `vetopulse`.`appointment` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_appointment_has_proxies_proxies1`
    FOREIGN KEY (`proxies_id`)
    REFERENCES `vetopulse`.`proxy` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `vetopulse`.`species_has_proxy`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vetopulse`.`species_has_proxy` ;

CREATE TABLE IF NOT EXISTS `vetopulse`.`species_has_proxy` (
  `species_id` INT NOT NULL,
  `proxy_id` INT NOT NULL,
  `min` DECIMAL NOT NULL,
  `max` DECIMAL NOT NULL,
  PRIMARY KEY (`species_id`, `proxy_id`),
  INDEX `fk_species_has_proxy_proxy1_idx` (`proxy_id` ASC) VISIBLE,
  INDEX `fk_species_has_proxy_species1_idx` (`species_id` ASC) VISIBLE,
  CONSTRAINT `fk_species_has_proxy_species1`
    FOREIGN KEY (`species_id`)
    REFERENCES `vetopulse`.`species` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_species_has_proxy_proxy1`
    FOREIGN KEY (`proxy_id`)
    REFERENCES `vetopulse`.`proxy` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
