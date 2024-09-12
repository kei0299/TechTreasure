CREATE TABLE logo
(id integer UNIQUE not null,
logo_name text not null UNIQUE,
src_svg text not null UNIQUE,
flag boolean not null DEFAULT false,
owner_name varchar(20), 
PRIMARY KEY(id));