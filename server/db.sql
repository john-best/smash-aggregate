CREATE DATABASE smash_aggregate;

CREATE TABLE fighters(
  url varchar(32) unique primary key,
  icon varchar(32),
  name varchar(32),
  description text,
  discord_url varchar(64),
  discord_server_id bigint,
  kh_url varchar(64),
  ssbw_url varchar(64),
);

CREATE TABLE matchups(
  id int unsigned auto_increment primary key,
  fighter varchar(32),
  opponent varchar(32),
  m_text text,
  foreign key (fighter) references fighters(url) on delete cascade
)

CREATE TABLE segments(
  id int unsigned auto_increment primary key,
  s_index int,
  fighter varchar(32),
  s_type varchar(16),
  s_text text,
  foreign key (fighter) references fighters(url) on delete cascade
);

CREATE TABLE links(
  id int unsigned auto_increment primary key,
  link_type varchar(16),
  url varchar(128),
  title varchar(128),
  segment int unsigned,
  foreign key (segment) references segments(id) on delete cascade
);

CREATE TABLE discord_users(
  id int unsigned auto_increment primary key,
  user_id bigint,
  server varchar(32),
  foreign key (server) references fighters(url) on delete cascade
);