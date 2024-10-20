
drop table designers if exists;
create table designers (
                           id INT NOT NULL AUTO_INCREMENT,
                           designer_id VARCHAR(60) NOT NULL UNIQUE,
                           name VARCHAR(255) NOT NULL,
                           dob DATE NOT NULL,
                           country VARCHAR(255),
                           Kimageurl VARCHAR(255),
                           PRIMARY KEY (id)
);

drop table furniture if exists;
create table furniture (
                        id INT NOT NULL AUTO_INCREMENT,
                        furniture_id VARCHAR(36) NOT NULL UNIQUE,
                        name VARCHAR(255) NOT NULL,
                        price DECIMAL(10,2) NOT NULL,
                        material VARCHAR(50),
                        image_url VARCHAR(255),
                        designer_id VARCHAR(60)NOT NULL,
                        PRIMARY KEY (id),
                        FOREIGN KEY (designer_id) REFERENCES designers(designer_id)
);