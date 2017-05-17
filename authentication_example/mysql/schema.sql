
create database if not exists example;
use example;
create table if not exists user (
    id int auto_increment primary key,
    email varchar(256) unique not null, 
    password varchar(256) not null

) ENGINE=InnoDB;

