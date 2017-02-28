CREATE DATABASE "Blog";

CREATE SEQUENCE public.article_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;

CREATE TABLE public.article
(
  id integer NOT NULL DEFAULT nextval('article_id_seq'::regclass),
  title text NOT NULL,
  heading text NOT NULL,
  date date NOT NULL DEFAULT now(),
  content text NOT NULL,
  CONSTRAINT article_id PRIMARY KEY (id),
  CONSTRAINT article_title UNIQUE (title)
)

CREATE SEQUENCE public.user_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 3
  CACHE 1;

CREATE TABLE public."user"
(
  id integer NOT NULL DEFAULT nextval('user_id_seq'::regclass),
  username text NOT NULL,
  password text NOT NULL,
  age smallint NOT NULL,
  CONSTRAINT user_id PRIMARY KEY (id),
  CONSTRAINT user_username UNIQUE (username)
)

CREATE SEQUENCE public."label_ID_seq"
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 2
  CACHE 1;

CREATE TABLE public.label
(
  "ID" integer NOT NULL DEFAULT nextval('"label_ID_seq"'::regclass),
  article_id integer NOT NULL,
  name character varying NOT NULL,
  CONSTRAINT "label_ID" PRIMARY KEY ("ID"),
  CONSTRAINT label_article_id_fkey FOREIGN KEY (article_id)
      REFERENCES public.article (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT label_name_article_id UNIQUE (name, article_id)
)

CREATE SEQUENCE public.comment_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;

CREATE TABLE public.comment
(
  id integer NOT NULL DEFAULT nextval('comment_id_seq'::regclass),
  article_id integer,
  user_id integer NOT NULL,
  comment text NOT NULL,
  "timestamp" timestamp with time zone NOT NULL DEFAULT now(),
  comment_id integer,
  CONSTRAINT comment_id PRIMARY KEY (id),
  CONSTRAINT comment_article_id_fkey FOREIGN KEY (article_id)
      REFERENCES public.article (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT comment_comment_id_fkey FOREIGN KEY (comment_id)
      REFERENCES public.comment (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT comment_user_id_fkey FOREIGN KEY (user_id)
      REFERENCES public."user" (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
