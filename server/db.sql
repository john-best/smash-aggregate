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

INSERT INTO fighters (url, name) VALUES ('mario', 'Mario'),('donkey_kong', 'Donkey Kong'),('link', 'Link'),('samus_dark_samus', 'Samus/Dark Samus'),('yoshi', 'Yoshi'),('kirby', 'Kirby'),('fox', 'Fox'),('pikachu', 'Pikachu'),('luigi', 'Luigi'),('ness', 'Ness'),('captain_falcon', 'Captain Falcon'),('jigglypuff', 'Jigglypuff'),('peach_daisy', 'Peach/Daisy'),('bowser', 'Bowser'),('ice_climbers', 'Ice Climbers'),('sheik', 'Sheik'),('zelda', 'Zelda'),('dr_mario', 'Dr. Mario'),('pichu', 'Pichu'),('falco', 'Falco'),('marth_lucina', 'Marth/Lucina'),('young_link', 'Young Link'),('ganondorf', 'Ganondorf'),('mewtwo', 'Mewtwo'),('roy_chrom', 'Roy/Chrom'),('mr_game_and_watch', 'Mr. Game & Watch'),('meta_knight', 'Meta Knight'),('pit_dark_pit', 'Pit/Dark Pit'),('zero_suit_samus', 'Zero Suit Samus'),('wario', 'Wario'),('snake', 'Snake'),('ike', 'Ike'),('pokemon_trainer', 'Pokemon Trainer'),('diddy_kong', 'Diddy Kong'),('lucas', 'Lucas'),('sonic', 'Sonic'),('king_dedede', 'King Dedede'),('olimar', 'Olimar'),('lucario', 'Lucario'),('rob', 'R.O.B.'),('toon_link', 'Toon Link'),('wolf', 'Wolf'),('villager', 'Villager'),('mega_man', 'Mega Man'),('wii_fit_trainer', 'Wii Fit Trainer'),('rosalina_and_luma', 'Rosalina & Luma'),('litte_mac', 'Little Mac'),('greninja', 'Greninja'),('mii_brawler', 'Mii Brawler'),('mii_swordfighter', 'Mii Swordfighter'),('mii_gunner', 'Mii Gunner'),('palutena', 'Palutena'),('pacman', 'PAC-MAN'),('robin', 'Robin'),('shulk', 'Shulk'),('bowser_jr', 'Bowser Jr.'),('duck_hunt', 'Duck Hunt'),('ryu_ken', 'Ryu/Ken'),('cloud', 'Cloud'),('corrin', 'Corrin'),('bayonetta', 'Bayonetta'),('inkling', 'Inkling'),('ridley', 'Ridley'),('simon_richter', 'Simon/Richter'),('king_k_rool', 'King K. Rool'),('isabelle', 'Isabelle'),('incineroar', 'Incineroar'),('piranha_plant', 'Piranha Plant'),('joker', 'Joker');