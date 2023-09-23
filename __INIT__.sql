DROP EXTENSION IF EXISTS "uuid-ossp" CASCADE;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS "user" CASCADE;

CREATE TABLE IF NOT EXISTS "user"
(
    id         UUID DEFAULT uuid_generate_v4(),

    first_name VARCHAR(32)    NOT NULL,
    last_name  VARCHAR(32)    NOT NULL,
    email      VARCHAR(32)    NOT NULL,
    password   VARCHAR(256)   NOT NULL,

    PRIMARY KEY (id)
);
