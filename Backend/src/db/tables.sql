-- Store user information.
CREATE TABLE IF NOT EXISTS "user" (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100),
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    authid INTEGER NOT NULL
);
-- Store user's unique api key for allowing them fetch data.
CREATE TABLE IF NOT EXISTS "userapikey" (
    id SERIAL PRIMARY KEY,
    userid INTEGER NOT NULL,
    apikey VARCHAR(100),
    FOREIGN KEY (userid) REFERENCES "user"(id)
    ON DELETE CASCADE
);
-- Store user's api keys.
CREATE TABLE IF NOT EXISTS "apikeys" (
    id SERIAL PRIMARY KEY,
    userid INTEGER NOT NULL,
    github VARCHAR(100),
    linkedin VARCHAR(100),
    youtube VARCHAR(100),
    devto VARCHAR(100),
    FOREIGN KEY (userid) REFERENCES "user"(id)
    ON DELETE CASCADE
);