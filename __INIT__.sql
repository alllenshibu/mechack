DROP EXTENSION IF EXISTS "uuid-ossp" CASCADE;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS category CASCADE;
DROP TABLE IF EXISTS classification CASCADE;
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

CREATE TABLE IF NOT EXISTS classification
(
    id         UUID DEFAULT uuid_generate_v4(),

    name      VARCHAR(32) NOT NULL,

    PRIMARY KEY (id)
);

INSERT INTO classification (name)
VALUES ('Wants'),
       ('Needs'),
       ('Savings');

CREATE TABLE IF NOT EXISTS category
(
    id   UUID DEFAULT uuid_generate_v4(),

    classification_id UUID NOT NULL,

    name VARCHAR(32) NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (classification_id) REFERENCES classification (id)
);

INSERT INTO category (name, classification_id)
VALUES ('Groceries', (SELECT id FROM classification WHERE name = 'Needs')),
       ('Rent', (SELECT id FROM classification WHERE name = 'Needs')),
       ('Debt', (SELECT id FROM classification WHERE name = 'Needs')),
       ('Entertainment', (SELECT id FROM classification WHERE name = 'Wants')),
       ('Utilities', (SELECT id FROM classification WHERE name = 'Needs')),
       ('Other', (SELECT id FROM classification WHERE name = 'Wants'));

CREATE TABLE IF NOT EXISTS classification
(
    id         UUID DEFAULT uuid_generate_v4(),

    name      VARCHAR(32) NOT NULL,

    PRIMARY KEY (id)
);

INSERT INTO classification (name)
VALUES ('Wants'),
       ('Needs'),
       ('Savings');

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