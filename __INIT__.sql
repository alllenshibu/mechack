DROP EXTENSION IF EXISTS "uuid-ossp" CASCADE;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS category CASCADE;
DROP TABLE IF EXISTS expense CASCADE;
DROP TABLE IF EXISTS recurring_payment CASCADE;
DROP TABLE IF EXISTS goal CASCADE;
DROP TABLE IF EXISTS income CASCADE;

CREATE TABLE IF NOT EXISTS "user"
(
    id       UUID DEFAULT uuid_generate_v4(),

    name     VARCHAR(32)  NOT NULL,
    email    VARCHAR(32)  NOT NULL,
    dob      TIMESTAMP,
    password VARCHAR(256) NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS category
(
    id   UUID DEFAULT uuid_generate_v4(),
    name VARCHAR(32) NOT NULL,

    PRIMARY KEY (id)
);

INSERT INTO category (name)
VALUES ('Groceries'),
       ('Rent'),
       ('Debt'),
       ('Entertainment'),
       ('Utilities'),
       ('Other');

CREATE TABLE IF NOT EXISTS expense
(
    id          UUID DEFAULT uuid_generate_v4(),

    user_id     UUID           NOT NULL,
    category_id UUID           NOT NULL,

    title       VARCHAR(32)    NOT NULL,
    amount      NUMERIC(10, 2) NOT NULL,
    timestamp   TIMESTAMPTZ    NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES "user" (id),
    FOREIGN KEY (category_id) REFERENCES category (id)
);

CREATE TABLE IF NOT EXISTS recurring_payment
(
    id          UUID DEFAULT uuid_generate_v4(),

    user_id     UUID           NOT NULL,
    category_id UUID           NOT NULL,

    title       VARCHAR(32)    NOT NULL,
    amount      NUMERIC(10, 2) NOT NULL,
    ends_on     DATE           NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES "user" (id),
    FOREIGN KEY (category_id) REFERENCES category (id)
);

CREATE TABLE IF NOT EXISTS goal
(
    id          UUID                    DEFAULT uuid_generate_v4(),

    user_id     UUID           NOT NULL,
    category_id UUID           NOT NULL,

    title       VARCHAR(32)    NOT NULL,
    amount      NUMERIC(10, 2) NOT NULL,
    due_date    TIMESTAMP      NOT NULL,

    completed   BOOLEAN        NOT NULL DEFAULT FALSE,

    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES "user" (id),
    FOREIGN KEY (category_id) REFERENCES category (id)
);

CREATE TABLE IF NOT EXISTS income
(
    id         UUID                    DEFAULT uuid_generate_v4(),

    user_id    UUID           NOT NULL,

    title      VARCHAR(32)    NOT NULL,
    amount     NUMERIC(10, 2) NOT NULL,

    timestamp  TIMESTAMP      NOT NULL,

    PRIMARY KEY (id)
);