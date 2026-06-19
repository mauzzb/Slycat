--
-- PostgreSQL database cluster dump
--

\restrict QCYQtN9PTxro6hyhTb5SoJCv8Rebl0BxyawHKIFlrHrFrXf9ncCNcxysC1qrORD

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:iVPTR/rAVSCmyG5aMU/rSQ==$Izkt2llNQUhiNVRyBqBD8g4rZIV91tBvhklf1zCTm58=:T07MUPxJJupWr6II7ZAw6o+9d9/qKKyDLCtYGkVQbhA=';

--
-- User Configurations
--








\unrestrict QCYQtN9PTxro6hyhTb5SoJCv8Rebl0BxyawHKIFlrHrFrXf9ncCNcxysC1qrORD

--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

\restrict g6wYfDIOw4SfF41Vdm80NvM2VCX9DIXIa34d3hrZANaqabrnbOy2SXC9AVHnq1f

-- Dumped from database version 18.3 (Debian 18.3-1.pgdg13+1)
-- Dumped by pg_dump version 18.3 (Debian 18.3-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- PostgreSQL database dump complete
--

\unrestrict g6wYfDIOw4SfF41Vdm80NvM2VCX9DIXIa34d3hrZANaqabrnbOy2SXC9AVHnq1f

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

\restrict HrmwGAtluHOVJxDLhUZpqN7ilVlbXceYKnBZ3gyLuGHpO8oErFWB3qoz9p57q1Q

-- Dumped from database version 18.3 (Debian 18.3-1.pgdg13+1)
-- Dumped by pg_dump version 18.3 (Debian 18.3-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- PostgreSQL database dump complete
--

\unrestrict HrmwGAtluHOVJxDLhUZpqN7ilVlbXceYKnBZ3gyLuGHpO8oErFWB3qoz9p57q1Q

--
-- Database "slycat_db" dump
--

--
-- PostgreSQL database dump
--

\restrict qsiAWnmRCWDrfhxLLfrtVzAWxXdt6hUz3YDq3v1073GwxgMjFBYsV6f86OoU3bn

-- Dumped from database version 18.3 (Debian 18.3-1.pgdg13+1)
-- Dumped by pg_dump version 18.3 (Debian 18.3-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: slycat_db; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE slycat_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE slycat_db OWNER TO postgres;

\unrestrict qsiAWnmRCWDrfhxLLfrtVzAWxXdt6hUz3YDq3v1073GwxgMjFBYsV6f86OoU3bn
\connect slycat_db
\restrict qsiAWnmRCWDrfhxLLfrtVzAWxXdt6hUz3YDq3v1073GwxgMjFBYsV6f86OoU3bn

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cart; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart (
    cart_id integer NOT NULL,
    user_id integer NOT NULL,
    game_id integer NOT NULL,
    quantity integer DEFAULT 1,
    CONSTRAINT cart_quantity_check CHECK ((quantity > 0))
);


ALTER TABLE public.cart OWNER TO postgres;

--
-- Name: cart_cart_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cart_cart_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cart_cart_id_seq OWNER TO postgres;

--
-- Name: cart_cart_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cart_cart_id_seq OWNED BY public.cart.cart_id;


--
-- Name: games; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.games (
    game_id integer NOT NULL,
    title character varying(200) NOT NULL,
    description text,
    price numeric(10,2),
    genre character varying(100),
    release_date date,
    image_url text,
    CONSTRAINT games_price_check CHECK ((price >= (0)::numeric))
);


ALTER TABLE public.games OWNER TO postgres;

--
-- Name: games_game_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.games_game_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.games_game_id_seq OWNER TO postgres;

--
-- Name: games_game_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.games_game_id_seq OWNED BY public.games.game_id;


--
-- Name: library; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.library (
    library_id integer NOT NULL,
    user_id integer NOT NULL,
    game_id integer NOT NULL
);


ALTER TABLE public.library OWNER TO postgres;

--
-- Name: library_library_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.library_library_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.library_library_id_seq OWNER TO postgres;

--
-- Name: library_library_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.library_library_id_seq OWNED BY public.library.library_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_user_id_seq OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: wishlist; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.wishlist (
    wishlist_id integer NOT NULL,
    user_id integer NOT NULL,
    game_id integer NOT NULL
);


ALTER TABLE public.wishlist OWNER TO postgres;

--
-- Name: wishlist_wishlist_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.wishlist_wishlist_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.wishlist_wishlist_id_seq OWNER TO postgres;

--
-- Name: wishlist_wishlist_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.wishlist_wishlist_id_seq OWNED BY public.wishlist.wishlist_id;


--
-- Name: cart cart_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart ALTER COLUMN cart_id SET DEFAULT nextval('public.cart_cart_id_seq'::regclass);


--
-- Name: games game_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.games ALTER COLUMN game_id SET DEFAULT nextval('public.games_game_id_seq'::regclass);


--
-- Name: library library_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.library ALTER COLUMN library_id SET DEFAULT nextval('public.library_library_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Name: wishlist wishlist_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wishlist ALTER COLUMN wishlist_id SET DEFAULT nextval('public.wishlist_wishlist_id_seq'::regclass);


--
-- Data for Name: cart; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cart (cart_id, user_id, game_id, quantity) FROM stdin;
1	1	1	1
\.


--
-- Data for Name: games; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.games (game_id, title, description, price, genre, release_date, image_url) FROM stdin;
1	Portal 2	В Portal 2 вы откроете для себя инновационный геймплей, сюжет и музыку, которая помогла оригиналу заработать более 70 наград в игровой индустрии и стать культовым.\n\nОдиночный режим Portal 2 представит вам нескольких новых персонажей, разнообразные неожиданные головоломки и ещё больше тестовых комнат. Игроки смогут познакомиться с неизвестными им частями лаборатории Aperture Science и снова встретятся с ГЛаДОС — порою кровожадной компьютерной компаньоншей, которая сопровождала главную героиню на протяжении первой части игры.\n\nИграя в кооперативном режиме, игроки откроют для себя абсолютно новую, независимую от оригинальной сюжетную линию с уникальными тестовыми комнатами и двумя персонажами. Здесь каждому из вас придётся проявить всё то, что вы знаете о порталах. Чтобы добиться успеха, вы будете обязаны не просто играть вместе, но и думать сообща.	9.99	Puzzle	2011-11-04	https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/841/capsule_616x353.jpg?t=1447355148
2	Factorio	Factorio - это игра, в которой вы строите фабрики и поддерживаете их работу.\n\nВы будете добывать ресурсы, исследовать новые технологии, создавать инфраструктуру, автоматизировать производство и сражаться с врагами.\n\nНа начальном этапе игры Вы будете вручную рубить деревья, добывать руду и создавать простые манипуляторы и транспортные конвейеры, но через некоторое время Вы, наконец, сможете подняться до энергетической индустрии с огромными солнечными фермами, перегонкой и переработкой нефти, построить роботов и развернуть логистическую сеть, настроенную для Ваших потребностей в ресурсах.\n\nНо жесткая эксплуатация ресурсов планеты не останется без внимания местных жителей, так что вам придется быть готовым постоять за себя и свою механическую империю.\n\nОбъедините силы с другими игроками в Сетевой игре, вместе создавайте огромные фабрики и распределяйте задачи между своими друзьями.\n\nДобавляйте модификации на любой вкус, от мельчайших улучшений до полного изменения игры. Поддержка модов Factorio позволяет создавать новый контент с интересными или необычными особенностями.\nОсновным режимом игры является песочница, однако для любителей справляться с интересными и сложными задачами присутствует Набор сценариев, доступных как бесплатное DLC.	1200.00	Automation	2020-08-14	https://i.playground.ru/e/htax4D4qq745Hn8odaVMGQ.jpeg
3	R.E.P.O.	Игроки выступают в роли наёмников, управляющих роботами, которые выполняют приказы искусственного интеллекта по прозвищу Taxman. Их отправляют в мрачные локации, где необходимо добывать ценные предметы, оставшиеся после исчезновения человечества. Задача осложняется тем, что на локациях обитают монстры, от которых можно как скрываться, так и пытаться обойти.	300.00	horror	2025-02-26	https://trashbox.ru/ifiles2/2087588_6120d3_logo.jpg/r.e.p.o.-mobile-obzor-21.webp
4	Hollow Knight	Глубоко под угасающим городом Грязьмут лежат руины древнего Королевства. Многих влечет под землю тяга к богатству, славе или ответам на старинные загадки.\n\nHollow Knight – классическое двухмерное приключение в огромном взаимосвязанном мире. Исследуйте извилистые пещеры, древние города и смертоносные пустоши, сражайтесь с порчеными тварями и заводите дружбу со странными жуками, раскрывайте древние тайны в самом сердце королевства.	550.00	Souls	2017-02-25	https://images.gog-statics.com/e0a2e359588dcfd93af4fdf058f48ca8f77a79ad5c015d9f30bbda6190f1b777.jpg
5	Garry's Mod	Garry's Mod — физическая песочница. В отличие от обычных игр, здесь не существует каких-либо определённых целей или задач. Мы даём вам инструменты и оставляем вас играть.\n\nВы создаете объекты и соединяете их вместе для создания ваших собственных конструкций — машина ли это, ракета, катапульта или нечто пока без названия — это зависит от вас.\n\nЕсли с конструированием у вас не слишком замечательно — не расстраивайтесь! Вы можете разместить множество персонажей в глупых позах. Но если вы хотите делать больше, у нас есть такие возможности.	750.00	sandbox	2006-10-29	https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4000/ecae0f862ac2f087f1581122999dd1e6281ce3b5/capsule_616x353.jpg?t=1756222843
\.


--
-- Data for Name: library; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.library (library_id, user_id, game_id) FROM stdin;
1	1	2
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, username, email, password) FROM stdin;
1	alex	alex@mail.com	12345
\.


--
-- Data for Name: wishlist; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.wishlist (wishlist_id, user_id, game_id) FROM stdin;
\.


--
-- Name: cart_cart_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cart_cart_id_seq', 1, true);


--
-- Name: games_game_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.games_game_id_seq', 1, true);


--
-- Name: library_library_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.library_library_id_seq', 1, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 1, true);


--
-- Name: wishlist_wishlist_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.wishlist_wishlist_id_seq', 1, false);


--
-- Name: cart cart_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (cart_id);


--
-- Name: cart cart_user_id_game_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_user_id_game_id_key UNIQUE (user_id, game_id);


--
-- Name: games games_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_pkey PRIMARY KEY (game_id);


--
-- Name: library library_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.library
    ADD CONSTRAINT library_pkey PRIMARY KEY (library_id);


--
-- Name: library library_user_id_game_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.library
    ADD CONSTRAINT library_user_id_game_id_key UNIQUE (user_id, game_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: wishlist wishlist_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wishlist
    ADD CONSTRAINT wishlist_pkey PRIMARY KEY (wishlist_id);


--
-- Name: wishlist wishlist_user_id_game_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wishlist
    ADD CONSTRAINT wishlist_user_id_game_id_key UNIQUE (user_id, game_id);


--
-- Name: cart cart_game_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_game_id_fkey FOREIGN KEY (game_id) REFERENCES public.games(game_id) ON DELETE CASCADE;


--
-- Name: cart cart_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- Name: library library_game_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.library
    ADD CONSTRAINT library_game_id_fkey FOREIGN KEY (game_id) REFERENCES public.games(game_id) ON DELETE CASCADE;


--
-- Name: library library_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.library
    ADD CONSTRAINT library_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- Name: wishlist wishlist_game_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wishlist
    ADD CONSTRAINT wishlist_game_id_fkey FOREIGN KEY (game_id) REFERENCES public.games(game_id) ON DELETE CASCADE;


--
-- Name: wishlist wishlist_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wishlist
    ADD CONSTRAINT wishlist_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict qsiAWnmRCWDrfhxLLfrtVzAWxXdt6hUz3YDq3v1073GwxgMjFBYsV6f86OoU3bn

--
-- PostgreSQL database cluster dump complete
--

