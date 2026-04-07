drop database if exists my_first_db;

create database my_first_db;

\c my_first_db

create table authors (
 id serial primary key,
 first_name text,
 last_name text
);

CREATE TABLE books (id serial primary key, title varchar, publishing_year integer);

CREATE TABLE genres (id serial primary key, name varchar);


insert into authors (first_name, last_name) values ('william', 'shakespeare');
insert into authors (first_name, last_name) values ('jane', 'austen');
insert into authors (first_name, last_name) values ('leo', 'tolstoy');
insert into authors (first_name, last_name) values ('virginia', 'woolf');
insert into authors (first_name, last_name) values ('James', 'S. A. Corey');
insert into authors (first_name, last_name) values ('Craig', 'Alanson');
insert into authors (first_name, last_name) values ('Cixin', 'Liu');
insert into authors (first_name, last_name) values ('John', 'Scalzi');

insert into books (title, publishing_year) values ('GameOfThrones', '2000');
insert into books (title, publishing_year) values ('Dune', '2020');
insert into books (title, publishing_year) values ('Harry Potter', '1998');

insert into genres (name) values ('Sci-fi');
insert into genres (name) values ('Horror');
insert into genres (name) values ('Romance');