CREATE TABLE users (
  uid SERIAL PRIMARY KEY,
  username VARCHAR(25) UNIQUE,
  email VARCHAR(100) UNIQUE,
  date_created DATE,
  last_login DATE
);

CREATE TABLE posts (
  pid SERIAL PRIMARY KEY,
  title VARCHAR(256),
  body VARCHAR,
  user_id INT REFERENCES users(uid),
  author VARCHAR REFERENCES users(username),
  page_name VARCHAR(20),
  date_created TIMESTAMP,
  like_user_id INT[] DEFAULT ARRAY[]::INT[],
  likes INT DEFAULT 0,
  dislike_user_id INT[] DEFAULT ARRAY[]::INT[],
  dislikes INT DEFAULT 0
);

CREATE TABLE comments (
  cid SERIAL PRIMARY KEY,
  comment VARCHAR(512),
  author VARCHAR REFERENCES users(username),
  user_id INT REFERENCES users(uid),
  post_id INT REFERENCES posts(pid),
  date_created TIMESTAMP,
  like_user_id INT[] DEFAULT ARRAY[]::INT[],
  likes INT DEFAULT 0,
  dislike_user_id INT[] DEFAULT ARRAY[]::INT[],
  dislikes INT DEFAULT 0
);