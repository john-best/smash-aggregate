CREATE DATABASE smash_aggregate;

CREATE TABLE fighters(
  url varchar(64) unique primary key,
  name varchar(64),
  description text,
  discord_url varchar(64),
  discord_server_id bigint,
  fd_url varchar(64),
  ssbw_url varchar(64)
);

CREATE TABLE matchups(
  id int unsigned auto_increment primary key,
  fighter varchar(64),
  opponent varchar(64),
  m_text text,
  foreign key (fighter) references fighters(url) on delete cascade,
  foreign key (opponent) references fighters(url)
)

CREATE TABLE segments(
  id varchar(16) unique primary key,
  s_index int unsigned,
  fighter varchar(64),
  title varchar(128),
  s_type varchar(16),
  s_text text,
  foreign key (fighter) references fighters(url) on delete cascade
);

CREATE TABLE links(
  id varchar(16) unique primary key,
  l_index int unsigned,
  link_type varchar(16),
  url varchar(128),
  title varchar(128),
  segment varchar(16),
  fighter varchar(64),
  foreign key (segment) references segments(id) on delete cascade,
  foreign key (fighter) references fighters(url) on delete cascade
);

CREATE TABLE discord_users(
  id int unsigned auto_increment primary key,
  user_id bigint,
  server varchar(64),
  isAdmin boolean default 0,
  foreign key (server) references fighters(url) on delete cascade
);

INSERT INTO fighters (url, name) VALUES ('mario', 'Mario');INSERT INTO fighters (url, name) VALUES ('donkey_kong', 'Donkey Kong');INSERT INTO fighters (url, name) VALUES ('link', 'Link');INSERT INTO fighters (url, name) VALUES ('samus', 'Samus');INSERT INTO fighters (url, name) VALUES ('dark_samus', 'Dark Samus');INSERT INTO fighters (url, name) VALUES ('yoshi', 'Yoshi');INSERT INTO fighters (url, name) VALUES ('kirby', 'Kirby');INSERT INTO fighters (url, name) VALUES ('fox', 'Fox');INSERT INTO fighters (url, name) VALUES ('pikachu', 'Pikachu');INSERT INTO fighters (url, name) VALUES ('luigi', 'Luigi');INSERT INTO fighters (url, name) VALUES ('ness', 'Ness');INSERT INTO fighters (url, name) VALUES ('captain_falcon', 'Captain Falcon');INSERT INTO fighters (url, name) VALUES ('jigglypuff', 'Jigglypuff');INSERT INTO fighters (url, name) VALUES ('peach', 'Peach');INSERT INTO fighters (url, name) VALUES ('daisy', 'Daisy');INSERT INTO fighters (url, name) VALUES ('bowser', 'Bowser');INSERT INTO fighters (url, name) VALUES ('ice_climbers', 'Ice Climbers');INSERT INTO fighters (url, name) VALUES ('sheik', 'Sheik');INSERT INTO fighters (url, name) VALUES ('zelda', 'Zelda');INSERT INTO fighters (url, name) VALUES ('dr_mario', 'Dr. Mario');INSERT INTO fighters (url, name) VALUES ('pichu', 'Pichu');INSERT INTO fighters (url, name) VALUES ('falco', 'Falco');INSERT INTO fighters (url, name) VALUES ('marth', 'Marth');INSERT INTO fighters (url, name) VALUES ('lucina', 'Lucina');INSERT INTO fighters (url, name) VALUES ('young_link', 'Young Link');INSERT INTO fighters (url, name) VALUES ('ganondorf', 'Ganondorf');INSERT INTO fighters (url, name) VALUES ('mewtwo', 'Mewtwo');INSERT INTO fighters (url, name) VALUES ('roy', 'Roy');INSERT INTO fighters (url, name) VALUES ('chrom', 'Chrom');INSERT INTO fighters (url, name) VALUES ('mr_game_and_watch', 'Mr. Game & Watch');INSERT INTO fighters (url, name) VALUES ('meta_knight', 'Meta Knight');INSERT INTO fighters (url, name) VALUES ('pit', 'Pit');INSERT INTO fighters (url, name) VALUES ('dark_pit', 'Dark Pit');INSERT INTO fighters (url, name) VALUES ('zero_suit_samus', 'Zero Suit Samus');INSERT INTO fighters (url, name) VALUES ('wario', 'Wario');INSERT INTO fighters (url, name) VALUES ('snake', 'Snake');INSERT INTO fighters (url, name) VALUES ('ike', 'Ike');INSERT INTO fighters (url, name) VALUES ('pokemon_trainer', 'Pokemon Trainer');INSERT INTO fighters (url, name) VALUES ('diddy_kong', 'Diddy Kong');INSERT INTO fighters (url, name) VALUES ('lucas', 'Lucas');INSERT INTO fighters (url, name) VALUES ('sonic', 'Sonic');INSERT INTO fighters (url, name) VALUES ('king_dedede', 'King Dedede');INSERT INTO fighters (url, name) VALUES ('olimar', 'Olimar');INSERT INTO fighters (url, name) VALUES ('lucario', 'Lucario');INSERT INTO fighters (url, name) VALUES ('rob', 'R.O.B.');INSERT INTO fighters (url, name) VALUES ('toon_link', 'Toon Link');INSERT INTO fighters (url, name) VALUES ('wolf', 'Wolf');INSERT INTO fighters (url, name) VALUES ('villager', 'Villager');INSERT INTO fighters (url, name) VALUES ('mega_man', 'Mega Man');INSERT INTO fighters (url, name) VALUES ('wii_fit_trainer', 'Wii Fit Trainer');INSERT INTO fighters (url, name) VALUES ('rosalina_and_luma', 'Rosalina & Luma');INSERT INTO fighters (url, name) VALUES ('litte_mac', 'Little Mac');INSERT INTO fighters (url, name) VALUES ('greninja', 'Greninja');INSERT INTO fighters (url, name) VALUES ('mii_brawler', 'Mii Brawler');INSERT INTO fighters (url, name) VALUES ('mii_swordfighter', 'Mii Swordfighter');INSERT INTO fighters (url, name) VALUES ('mii_gunner', 'Mii Gunner');INSERT INTO fighters (url, name) VALUES ('palutena', 'Palutena');INSERT INTO fighters (url, name) VALUES ('pacman', 'PAC-MAN');INSERT INTO fighters (url, name) VALUES ('robin', 'Robin');INSERT INTO fighters (url, name) VALUES ('shulk', 'Shulk');INSERT INTO fighters (url, name) VALUES ('bowser_jr', 'Bowser Jr.');INSERT INTO fighters (url, name) VALUES ('duck_hunt', 'Duck Hunt');INSERT INTO fighters (url, name) VALUES ('ryu', 'Ryu');INSERT INTO fighters (url, name) VALUES ('ken', 'Ken');INSERT INTO fighters (url, name) VALUES ('cloud', 'Cloud');INSERT INTO fighters (url, name) VALUES ('corrin', 'Corrin');INSERT INTO fighters (url, name) VALUES ('bayonetta', 'Bayonetta');INSERT INTO fighters (url, name) VALUES ('inkling', 'Inkling');INSERT INTO fighters (url, name) VALUES ('ridley', 'Ridley');INSERT INTO fighters (url, name) VALUES ('simon', 'Simon');INSERT INTO fighters (url, name) VALUES ('richter', 'Richter');INSERT INTO fighters (url, name) VALUES ('king_k_rool', 'King K. Rool');INSERT INTO fighters (url, name) VALUES ('isabelle', 'Isabelle');INSERT INTO fighters (url, name) VALUES ('incineroar', 'Incineroar');INSERT INTO fighters (url, name) VALUES ('piranha_plant', 'Piranha Plant');INSERT INTO fighters (url, name) VALUES ('joker', 'Joker');