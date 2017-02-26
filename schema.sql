
CREATE TABLE article (
    id integer NOT NULL,
    title text NOT NULL,
    heading text NOT NULL,
    date date NOT NULL,
    content text NOT NULL
);


CREATE SEQUENCE article_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


CREATE TABLE comment (
    id integer NOT NULL,
    article_id integer NOT NULL,
    user_id integer NOT NULL,
    comment text NOT NULL,
    "timestamp" timestamp with time zone DEFAULT now() NOT NULL
);



CREATE SEQUENCE comment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;



CREATE TABLE "user" (
    id integer NOT NULL,
    username text NOT NULL,
    password text NOT NULL
);



CREATE SEQUENCE user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;



ALTER TABLE ONLY article ALTER COLUMN id SET DEFAULT nextval('article_id_seq'::regclass);



ALTER TABLE ONLY comment ALTER COLUMN id SET DEFAULT nextval('comment_id_seq'::regclass);



ALTER TABLE ONLY "user" ALTER COLUMN id SET DEFAULT nextval('user_id_seq'::regclass);


ALTER TABLE ONLY article
    ADD CONSTRAINT article_id PRIMARY KEY (id);



ALTER TABLE ONLY article
    ADD CONSTRAINT article_title UNIQUE (title);



ALTER TABLE ONLY comment
    ADD CONSTRAINT comment_id PRIMARY KEY (id);



ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_id PRIMARY KEY (id);



ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_username UNIQUE (username);



ALTER TABLE ONLY comment
    ADD CONSTRAINT comment_article_id_fkey FOREIGN KEY (article_id) REFERENCES article(id);



ALTER TABLE ONLY comment
    ADD CONSTRAINT comment_user_id_fkey FOREIGN KEY (user_id) REFERENCES "user"(id);
