--
-- PostgreSQL database cluster dump
--

-- Started on 2025-05-28 22:03:53

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS;

--
-- User Configurations
--








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

-- Dumped from database version 17.3
-- Dumped by pg_dump version 17.3

-- Started on 2025-05-28 22:03:53

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

-- Completed on 2025-05-28 22:03:53

--
-- PostgreSQL database dump complete
--

--
-- Database "toAnunciando" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 17.3
-- Dumped by pg_dump version 17.3

-- Started on 2025-05-28 22:03:53

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
-- TOC entry 4911 (class 1262 OID 16547)
-- Name: toAnunciando; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "toAnunciando" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'pt-BR';


ALTER DATABASE "toAnunciando" OWNER TO postgres;

\connect "toAnunciando"

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
-- TOC entry 5 (class 2615 OID 2200)
-- Name: toanunciando; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA toanunciando;


ALTER SCHEMA toanunciando OWNER TO pg_database_owner;

--
-- TOC entry 4912 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA toanunciando; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA toanunciando IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 16549)
-- Name: anunciante; Type: TABLE; Schema: toanunciando; Owner: postgres
--

CREATE TABLE toanunciando.anunciante (
    id integer NOT NULL,
    nome character varying(100) NOT NULL,
    cpfcnpj character varying(14) NOT NULL,
    email character varying(100) NOT NULL,
    endereco character varying(100) NOT NULL,
    cidade character varying(40) NOT NULL,
    uf character varying(2) NOT NULL,
    pais character varying(2) NOT NULL,
    telefone character varying(15) NOT NULL,
    senha character varying(255) NOT NULL,
    creditos integer DEFAULT 0,
    complemento character varying(75),
    cep integer NOT NULL
);


ALTER TABLE toanunciando.anunciante OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 16773)
-- Name: anunciante_id_seq; Type: SEQUENCE; Schema: toanunciando; Owner: postgres
--

CREATE SEQUENCE toanunciando.anunciante_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE toanunciando.anunciante_id_seq OWNER TO postgres;

--
-- TOC entry 4913 (class 0 OID 0)
-- Dependencies: 236
-- Name: anunciante_id_seq; Type: SEQUENCE OWNED BY; Schema: toanunciando; Owner: postgres
--

ALTER SEQUENCE toanunciando.anunciante_id_seq OWNED BY toanunciando.anunciante.id;


--
-- TOC entry 217 (class 1259 OID 16548)
-- Name: anunciantes_id_seq; Type: SEQUENCE; Schema: toanunciando; Owner: postgres
--

CREATE SEQUENCE toanunciando.anunciantes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE toanunciando.anunciantes_id_seq OWNER TO postgres;

--
-- TOC entry 4914 (class 0 OID 0)
-- Dependencies: 217
-- Name: anunciantes_id_seq; Type: SEQUENCE OWNED BY; Schema: toanunciando; Owner: postgres
--

ALTER SEQUENCE toanunciando.anunciantes_id_seq OWNED BY toanunciando.anunciante.id;


--
-- TOC entry 228 (class 1259 OID 16609)
-- Name: anuncio; Type: TABLE; Schema: toanunciando; Owner: postgres
--

CREATE TABLE toanunciando.anuncio (
    id integer NOT NULL,
    descricao character varying(100) NOT NULL,
    data_anuncio date NOT NULL,
    st_ativo boolean DEFAULT true,
    id_anunciante integer NOT NULL,
    id_tipo_anuncio integer NOT NULL,
    id_imovel integer,
    id_carro integer
);


ALTER TABLE toanunciando.anuncio OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 16860)
-- Name: anuncio_id_seq; Type: SEQUENCE; Schema: toanunciando; Owner: postgres
--

CREATE SEQUENCE toanunciando.anuncio_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE toanunciando.anuncio_id_seq OWNER TO postgres;

--
-- TOC entry 4915 (class 0 OID 0)
-- Dependencies: 240
-- Name: anuncio_id_seq; Type: SEQUENCE OWNED BY; Schema: toanunciando; Owner: postgres
--

ALTER SEQUENCE toanunciando.anuncio_id_seq OWNED BY toanunciando.anuncio.id;


--
-- TOC entry 227 (class 1259 OID 16608)
-- Name: anuncios_id_seq; Type: SEQUENCE; Schema: toanunciando; Owner: postgres
--

CREATE SEQUENCE toanunciando.anuncios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE toanunciando.anuncios_id_seq OWNER TO postgres;

--
-- TOC entry 4916 (class 0 OID 0)
-- Dependencies: 227
-- Name: anuncios_id_seq; Type: SEQUENCE OWNED BY; Schema: toanunciando; Owner: postgres
--

ALTER SEQUENCE toanunciando.anuncios_id_seq OWNED BY toanunciando.anuncio.id;


--
-- TOC entry 230 (class 1259 OID 16637)
-- Name: avaliacao; Type: TABLE; Schema: toanunciando; Owner: postgres
--

CREATE TABLE toanunciando.avaliacao (
    id integer NOT NULL,
    descricao character varying(200),
    rating integer,
    id_anunciante_avaliado integer NOT NULL,
    id_anunciante_avaliador integer NOT NULL
);


ALTER TABLE toanunciando.avaliacao OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 16856)
-- Name: avaliacao_id_seq; Type: SEQUENCE; Schema: toanunciando; Owner: postgres
--

CREATE SEQUENCE toanunciando.avaliacao_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE toanunciando.avaliacao_id_seq OWNER TO postgres;

--
-- TOC entry 4917 (class 0 OID 0)
-- Dependencies: 238
-- Name: avaliacao_id_seq; Type: SEQUENCE OWNED BY; Schema: toanunciando; Owner: postgres
--

ALTER SEQUENCE toanunciando.avaliacao_id_seq OWNED BY toanunciando.avaliacao.id;


--
-- TOC entry 229 (class 1259 OID 16636)
-- Name: avaliacoes_id_seq; Type: SEQUENCE; Schema: toanunciando; Owner: postgres
--

CREATE SEQUENCE toanunciando.avaliacoes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE toanunciando.avaliacoes_id_seq OWNER TO postgres;

--
-- TOC entry 4918 (class 0 OID 0)
-- Dependencies: 229
-- Name: avaliacoes_id_seq; Type: SEQUENCE OWNED BY; Schema: toanunciando; Owner: postgres
--

ALTER SEQUENCE toanunciando.avaliacoes_id_seq OWNED BY toanunciando.avaliacao.id;


--
-- TOC entry 222 (class 1259 OID 16572)
-- Name: carro; Type: TABLE; Schema: toanunciando; Owner: postgres
--

CREATE TABLE toanunciando.carro (
    id integer NOT NULL,
    descricao character varying(100) NOT NULL,
    observacao text,
    valor numeric(15,2) NOT NULL,
    cidade character varying(40) NOT NULL,
    uf character varying(2) NOT NULL,
    pais character varying(2) NOT NULL,
    ano_fabricacao character varying(9) NOT NULL,
    km integer NOT NULL,
    placa character varying(8),
    marca character varying(20) NOT NULL,
    tipo_modelo character varying(1) NOT NULL,
    combustivel character varying(1) NOT NULL,
    cor character varying(20) NOT NULL,
    id_acessorio integer
);


ALTER TABLE toanunciando.carro OWNER TO postgres;

--
-- TOC entry 4919 (class 0 OID 0)
-- Dependencies: 222
-- Name: COLUMN carro.tipo_modelo; Type: COMMENT; Schema: toanunciando; Owner: postgres
--

COMMENT ON COLUMN toanunciando.carro.tipo_modelo IS 'p=pickup;c=carro;k=caminhao;m=motocicleta';


--
-- TOC entry 224 (class 1259 OID 16586)
-- Name: carro_acessorio; Type: TABLE; Schema: toanunciando; Owner: postgres
--

CREATE TABLE toanunciando.carro_acessorio (
    id integer NOT NULL,
    cambio character varying(1),
    portas integer,
    air_bag boolean DEFAULT false,
    alarme character varying(1),
    ar_condicionado boolean DEFAULT false,
    direcao character varying(1),
    freio_abs boolean DEFAULT false,
    travas character varying(1),
    vidros character varying(1),
    ar_quente boolean DEFAULT false,
    computador_bordo boolean DEFAULT false,
    tipo_roda character varying(1),
    teto_solar boolean DEFAULT false,
    tracao_4x4 boolean DEFAULT false
);


ALTER TABLE toanunciando.carro_acessorio OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 16776)
-- Name: carro_acessorio_id_seq; Type: SEQUENCE; Schema: toanunciando; Owner: postgres
--

CREATE SEQUENCE toanunciando.carro_acessorio_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE toanunciando.carro_acessorio_id_seq OWNER TO postgres;

--
-- TOC entry 4920 (class 0 OID 0)
-- Dependencies: 237
-- Name: carro_acessorio_id_seq; Type: SEQUENCE OWNED BY; Schema: toanunciando; Owner: postgres
--

ALTER SEQUENCE toanunciando.carro_acessorio_id_seq OWNED BY toanunciando.carro_acessorio.id;


--
-- TOC entry 223 (class 1259 OID 16585)
-- Name: carro_acessorios_id_seq; Type: SEQUENCE; Schema: toanunciando; Owner: postgres
--

CREATE SEQUENCE toanunciando.carro_acessorios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE toanunciando.carro_acessorios_id_seq OWNER TO postgres;

--
-- TOC entry 4921 (class 0 OID 0)
-- Dependencies: 223
-- Name: carro_acessorios_id_seq; Type: SEQUENCE OWNED BY; Schema: toanunciando; Owner: postgres
--

ALTER SEQUENCE toanunciando.carro_acessorios_id_seq OWNED BY toanunciando.carro_acessorio.id;


--
-- TOC entry 235 (class 1259 OID 16771)
-- Name: carro_id_seq; Type: SEQUENCE; Schema: toanunciando; Owner: postgres
--

CREATE SEQUENCE toanunciando.carro_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE toanunciando.carro_id_seq OWNER TO postgres;

--
-- TOC entry 4922 (class 0 OID 0)
-- Dependencies: 235
-- Name: carro_id_seq; Type: SEQUENCE OWNED BY; Schema: toanunciando; Owner: postgres
--

ALTER SEQUENCE toanunciando.carro_id_seq OWNED BY toanunciando.carro.id;


--
-- TOC entry 221 (class 1259 OID 16571)
-- Name: carros_id_seq; Type: SEQUENCE; Schema: toanunciando; Owner: postgres
--

CREATE SEQUENCE toanunciando.carros_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE toanunciando.carros_id_seq OWNER TO postgres;

--
-- TOC entry 4923 (class 0 OID 0)
-- Dependencies: 221
-- Name: carros_id_seq; Type: SEQUENCE OWNED BY; Schema: toanunciando; Owner: postgres
--

ALTER SEQUENCE toanunciando.carros_id_seq OWNED BY toanunciando.carro.id;


--
-- TOC entry 220 (class 1259 OID 16558)
-- Name: imovel; Type: TABLE; Schema: toanunciando; Owner: postgres
--

CREATE TABLE toanunciando.imovel (
    id integer NOT NULL,
    descricao character varying(100) NOT NULL,
    observacao text,
    tipo_imovel character varying(1) NOT NULL,
    tipo_negocio character varying(1) NOT NULL,
    valor numeric(15,2) NOT NULL,
    endereco character varying(100) NOT NULL,
    cidade character varying(40) NOT NULL,
    uf character varying(2) NOT NULL,
    pais character varying(2) NOT NULL,
    area_privativa numeric(15,2),
    area_construida numeric(15,2),
    area_externa numeric(15,2),
    area_total numeric(15,2),
    id_imovel_detalhe integer
);


ALTER TABLE toanunciando.imovel OWNER TO postgres;

--
-- TOC entry 4924 (class 0 OID 0)
-- Dependencies: 220
-- Name: COLUMN imovel.tipo_imovel; Type: COMMENT; Schema: toanunciando; Owner: postgres
--

COMMENT ON COLUMN toanunciando.imovel.tipo_imovel IS 'c=casa;a=apartamento;t=terreno;l=lote;c=comercial;r=rural';


--
-- TOC entry 4925 (class 0 OID 0)
-- Dependencies: 220
-- Name: COLUMN imovel.tipo_negocio; Type: COMMENT; Schema: toanunciando; Owner: postgres
--

COMMENT ON COLUMN toanunciando.imovel.tipo_negocio IS 'a=aluguel;v=venda;t=troca';


--
-- TOC entry 219 (class 1259 OID 16557)
-- Name: imoveis_id_seq; Type: SEQUENCE; Schema: toanunciando; Owner: postgres
--

CREATE SEQUENCE toanunciando.imoveis_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE toanunciando.imoveis_id_seq OWNER TO postgres;

--
-- TOC entry 4926 (class 0 OID 0)
-- Dependencies: 219
-- Name: imoveis_id_seq; Type: SEQUENCE OWNED BY; Schema: toanunciando; Owner: postgres
--

ALTER SEQUENCE toanunciando.imoveis_id_seq OWNED BY toanunciando.imovel.id;


--
-- TOC entry 232 (class 1259 OID 16655)
-- Name: imovel_detalhe; Type: TABLE; Schema: toanunciando; Owner: postgres
--

CREATE TABLE toanunciando.imovel_detalhe (
    id integer NOT NULL,
    suites integer,
    banheiros integer,
    garagem integer,
    sacada integer,
    comodo integer,
    sala integer,
    quarto integer
);


ALTER TABLE toanunciando.imovel_detalhe OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 16765)
-- Name: imovel_detalhe_id_seq; Type: SEQUENCE; Schema: toanunciando; Owner: postgres
--

CREATE SEQUENCE toanunciando.imovel_detalhe_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE toanunciando.imovel_detalhe_id_seq OWNER TO postgres;

--
-- TOC entry 4927 (class 0 OID 0)
-- Dependencies: 233
-- Name: imovel_detalhe_id_seq; Type: SEQUENCE OWNED BY; Schema: toanunciando; Owner: postgres
--

ALTER SEQUENCE toanunciando.imovel_detalhe_id_seq OWNED BY toanunciando.imovel_detalhe.id;


--
-- TOC entry 231 (class 1259 OID 16654)
-- Name: imovel_detalhes_id_seq; Type: SEQUENCE; Schema: toanunciando; Owner: postgres
--

CREATE SEQUENCE toanunciando.imovel_detalhes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE toanunciando.imovel_detalhes_id_seq OWNER TO postgres;

--
-- TOC entry 4928 (class 0 OID 0)
-- Dependencies: 231
-- Name: imovel_detalhes_id_seq; Type: SEQUENCE OWNED BY; Schema: toanunciando; Owner: postgres
--

ALTER SEQUENCE toanunciando.imovel_detalhes_id_seq OWNED BY toanunciando.imovel_detalhe.id;


--
-- TOC entry 234 (class 1259 OID 16767)
-- Name: imovel_id_seq; Type: SEQUENCE; Schema: toanunciando; Owner: postgres
--

CREATE SEQUENCE toanunciando.imovel_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE toanunciando.imovel_id_seq OWNER TO postgres;

--
-- TOC entry 4929 (class 0 OID 0)
-- Dependencies: 234
-- Name: imovel_id_seq; Type: SEQUENCE OWNED BY; Schema: toanunciando; Owner: postgres
--

ALTER SEQUENCE toanunciando.imovel_id_seq OWNED BY toanunciando.imovel.id;


--
-- TOC entry 226 (class 1259 OID 16598)
-- Name: tipo_anuncio; Type: TABLE; Schema: toanunciando; Owner: postgres
--

CREATE TABLE toanunciando.tipo_anuncio (
    id integer NOT NULL,
    categoria_anuncio character varying(1) NOT NULL,
    tipo character varying(1) NOT NULL,
    saldo integer,
    descricao character varying(200),
    duracao_dia integer
);


ALTER TABLE toanunciando.tipo_anuncio OWNER TO postgres;

--
-- TOC entry 4930 (class 0 OID 0)
-- Dependencies: 226
-- Name: COLUMN tipo_anuncio.categoria_anuncio; Type: COMMENT; Schema: toanunciando; Owner: postgres
--

COMMENT ON COLUMN toanunciando.tipo_anuncio.categoria_anuncio IS 'b=bronze;p=prata;o=ouro';


--
-- TOC entry 4931 (class 0 OID 0)
-- Dependencies: 226
-- Name: COLUMN tipo_anuncio.tipo; Type: COMMENT; Schema: toanunciando; Owner: postgres
--

COMMENT ON COLUMN toanunciando.tipo_anuncio.tipo IS 'i=imovel;v=veiculo';


--
-- TOC entry 239 (class 1259 OID 16858)
-- Name: tipo_anuncio_id_seq; Type: SEQUENCE; Schema: toanunciando; Owner: postgres
--

CREATE SEQUENCE toanunciando.tipo_anuncio_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE toanunciando.tipo_anuncio_id_seq OWNER TO postgres;

--
-- TOC entry 4932 (class 0 OID 0)
-- Dependencies: 239
-- Name: tipo_anuncio_id_seq; Type: SEQUENCE OWNED BY; Schema: toanunciando; Owner: postgres
--

ALTER SEQUENCE toanunciando.tipo_anuncio_id_seq OWNED BY toanunciando.tipo_anuncio.id;


--
-- TOC entry 225 (class 1259 OID 16597)
-- Name: tipos_anuncio_id_seq; Type: SEQUENCE; Schema: toanunciando; Owner: postgres
--

CREATE SEQUENCE toanunciando.tipos_anuncio_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE toanunciando.tipos_anuncio_id_seq OWNER TO postgres;

--
-- TOC entry 4933 (class 0 OID 0)
-- Dependencies: 225
-- Name: tipos_anuncio_id_seq; Type: SEQUENCE OWNED BY; Schema: toanunciando; Owner: postgres
--

ALTER SEQUENCE toanunciando.tipos_anuncio_id_seq OWNED BY toanunciando.tipo_anuncio.id;


--
-- TOC entry 4684 (class 2604 OID 16797)
-- Name: anunciante id; Type: DEFAULT; Schema: toanunciando; Owner: postgres
--

ALTER TABLE ONLY toanunciando.anunciante ALTER COLUMN id SET DEFAULT nextval('toanunciando.anunciante_id_seq'::regclass);


--
-- TOC entry 4697 (class 2604 OID 16894)
-- Name: anuncio id; Type: DEFAULT; Schema: toanunciando; Owner: postgres
--

ALTER TABLE ONLY toanunciando.anuncio ALTER COLUMN id SET DEFAULT nextval('toanunciando.anuncio_id_seq'::regclass);


--
-- TOC entry 4699 (class 2604 OID 16892)
-- Name: avaliacao id; Type: DEFAULT; Schema: toanunciando; Owner: postgres
--

ALTER TABLE ONLY toanunciando.avaliacao ALTER COLUMN id SET DEFAULT nextval('toanunciando.avaliacao_id_seq'::regclass);


--
-- TOC entry 4687 (class 2604 OID 16796)
-- Name: carro id; Type: DEFAULT; Schema: toanunciando; Owner: postgres
--

ALTER TABLE ONLY toanunciando.carro ALTER COLUMN id SET DEFAULT nextval('toanunciando.carro_id_seq'::regclass);


--
-- TOC entry 4688 (class 2604 OID 16798)
-- Name: carro_acessorio id; Type: DEFAULT; Schema: toanunciando; Owner: postgres
--

ALTER TABLE ONLY toanunciando.carro_acessorio ALTER COLUMN id SET DEFAULT nextval('toanunciando.carro_acessorio_id_seq'::regclass);


--
-- TOC entry 4686 (class 2604 OID 16795)
-- Name: imovel id; Type: DEFAULT; Schema: toanunciando; Owner: postgres
--

ALTER TABLE ONLY toanunciando.imovel ALTER COLUMN id SET DEFAULT nextval('toanunciando.imovel_id_seq'::regclass);


--
-- TOC entry 4700 (class 2604 OID 16794)
-- Name: imovel_detalhe id; Type: DEFAULT; Schema: toanunciando; Owner: postgres
--

ALTER TABLE ONLY toanunciando.imovel_detalhe ALTER COLUMN id SET DEFAULT nextval('toanunciando.imovel_detalhe_id_seq'::regclass);


--
-- TOC entry 4696 (class 2604 OID 16893)
-- Name: tipo_anuncio id; Type: DEFAULT; Schema: toanunciando; Owner: postgres
--

ALTER TABLE ONLY toanunciando.tipo_anuncio ALTER COLUMN id SET DEFAULT nextval('toanunciando.tipo_anuncio_id_seq'::regclass);


--
-- TOC entry 4883 (class 0 OID 16549)
-- Dependencies: 218
-- Data for Name: anunciante; Type: TABLE DATA; Schema: toanunciando; Owner: postgres
--

COPY toanunciando.anunciante (id, nome, cpfcnpj, email, endereco, cidade, uf, pais, telefone, senha, creditos, complemento, cep) FROM stdin;
1	Empresa ABC	12345678901234	empresa@abc.com	Rua 123, Bairro XYZ	São Paulo	SP	BR	11987654321	hashedpassword	100	\N	99700000
4	felipe	00767051025	felipecieslak@gmail.com	teste	Erechim	RS	BR	54996174233	$2b$10$a4qXn.DUZNrbP6iDCBuoiOQtdUcfhT.ASTOCntH2Q1SJAgDi/.UQe	0	\N	99700000
\.


--
-- TOC entry 4893 (class 0 OID 16609)
-- Dependencies: 228
-- Data for Name: anuncio; Type: TABLE DATA; Schema: toanunciando; Owner: postgres
--

COPY toanunciando.anuncio (id, descricao, data_anuncio, st_ativo, id_anunciante, id_tipo_anuncio, id_imovel, id_carro) FROM stdin;
2	Anúncio de teste	2025-05-25	t	4	1	1	\N
3	Anúncio de teste	2025-05-25	t	4	1	\N	1
\.


--
-- TOC entry 4895 (class 0 OID 16637)
-- Dependencies: 230
-- Data for Name: avaliacao; Type: TABLE DATA; Schema: toanunciando; Owner: postgres
--

COPY toanunciando.avaliacao (id, descricao, rating, id_anunciante_avaliado, id_anunciante_avaliador) FROM stdin;
\.


--
-- TOC entry 4887 (class 0 OID 16572)
-- Dependencies: 222
-- Data for Name: carro; Type: TABLE DATA; Schema: toanunciando; Owner: postgres
--

COPY toanunciando.carro (id, descricao, observacao, valor, cidade, uf, pais, ano_fabricacao, km, placa, marca, tipo_modelo, combustivel, cor, id_acessorio) FROM stdin;
1	Carro Novo	\N	55000.00	São Paulo	SP	BR	2022	20000	ABC1234	Toyota	S	F	Preto	3
\.


--
-- TOC entry 4889 (class 0 OID 16586)
-- Dependencies: 224
-- Data for Name: carro_acessorio; Type: TABLE DATA; Schema: toanunciando; Owner: postgres
--

COPY toanunciando.carro_acessorio (id, cambio, portas, air_bag, alarme, ar_condicionado, direcao, freio_abs, travas, vidros, ar_quente, computador_bordo, tipo_roda, teto_solar, tracao_4x4) FROM stdin;
3	A	4	t	S	t	H	t	E	E	t	t	L	t	t
4	A	4	t	S	t	H	t	E	E	t	t	L	t	t
\.


--
-- TOC entry 4885 (class 0 OID 16558)
-- Dependencies: 220
-- Data for Name: imovel; Type: TABLE DATA; Schema: toanunciando; Owner: postgres
--

COPY toanunciando.imovel (id, descricao, observacao, tipo_imovel, tipo_negocio, valor, endereco, cidade, uf, pais, area_privativa, area_construida, area_externa, area_total, id_imovel_detalhe) FROM stdin;
1	Apartamento de luxo com vista para o mar	Recém-reformado, pronto para morar.	A	V	1200000.50	Rua das Palmeiras, 123	Rio de Janeiro	RJ	BR	120.50	150.75	20.00	170.75	1
\.


--
-- TOC entry 4897 (class 0 OID 16655)
-- Dependencies: 232
-- Data for Name: imovel_detalhe; Type: TABLE DATA; Schema: toanunciando; Owner: postgres
--

COPY toanunciando.imovel_detalhe (id, suites, banheiros, garagem, sacada, comodo, sala, quarto) FROM stdin;
1	2	3	1	1	5	1	3
\.


--
-- TOC entry 4891 (class 0 OID 16598)
-- Dependencies: 226
-- Data for Name: tipo_anuncio; Type: TABLE DATA; Schema: toanunciando; Owner: postgres
--

COPY toanunciando.tipo_anuncio (id, categoria_anuncio, tipo, saldo, descricao, duracao_dia) FROM stdin;
1	I	P	10	Anúncio premium para imóveis	30
\.


--
-- TOC entry 4934 (class 0 OID 0)
-- Dependencies: 236
-- Name: anunciante_id_seq; Type: SEQUENCE SET; Schema: toanunciando; Owner: postgres
--

SELECT pg_catalog.setval('toanunciando.anunciante_id_seq', 4, true);


--
-- TOC entry 4935 (class 0 OID 0)
-- Dependencies: 217
-- Name: anunciantes_id_seq; Type: SEQUENCE SET; Schema: toanunciando; Owner: postgres
--

SELECT pg_catalog.setval('toanunciando.anunciantes_id_seq', 1, true);


--
-- TOC entry 4936 (class 0 OID 0)
-- Dependencies: 240
-- Name: anuncio_id_seq; Type: SEQUENCE SET; Schema: toanunciando; Owner: postgres
--

SELECT pg_catalog.setval('toanunciando.anuncio_id_seq', 3, true);


--
-- TOC entry 4937 (class 0 OID 0)
-- Dependencies: 227
-- Name: anuncios_id_seq; Type: SEQUENCE SET; Schema: toanunciando; Owner: postgres
--

SELECT pg_catalog.setval('toanunciando.anuncios_id_seq', 1, false);


--
-- TOC entry 4938 (class 0 OID 0)
-- Dependencies: 238
-- Name: avaliacao_id_seq; Type: SEQUENCE SET; Schema: toanunciando; Owner: postgres
--

SELECT pg_catalog.setval('toanunciando.avaliacao_id_seq', 1, false);


--
-- TOC entry 4939 (class 0 OID 0)
-- Dependencies: 229
-- Name: avaliacoes_id_seq; Type: SEQUENCE SET; Schema: toanunciando; Owner: postgres
--

SELECT pg_catalog.setval('toanunciando.avaliacoes_id_seq', 1, false);


--
-- TOC entry 4940 (class 0 OID 0)
-- Dependencies: 237
-- Name: carro_acessorio_id_seq; Type: SEQUENCE SET; Schema: toanunciando; Owner: postgres
--

SELECT pg_catalog.setval('toanunciando.carro_acessorio_id_seq', 1, false);


--
-- TOC entry 4941 (class 0 OID 0)
-- Dependencies: 223
-- Name: carro_acessorios_id_seq; Type: SEQUENCE SET; Schema: toanunciando; Owner: postgres
--

SELECT pg_catalog.setval('toanunciando.carro_acessorios_id_seq', 4, true);


--
-- TOC entry 4942 (class 0 OID 0)
-- Dependencies: 235
-- Name: carro_id_seq; Type: SEQUENCE SET; Schema: toanunciando; Owner: postgres
--

SELECT pg_catalog.setval('toanunciando.carro_id_seq', 1, false);


--
-- TOC entry 4943 (class 0 OID 0)
-- Dependencies: 221
-- Name: carros_id_seq; Type: SEQUENCE SET; Schema: toanunciando; Owner: postgres
--

SELECT pg_catalog.setval('toanunciando.carros_id_seq', 1, true);


--
-- TOC entry 4944 (class 0 OID 0)
-- Dependencies: 219
-- Name: imoveis_id_seq; Type: SEQUENCE SET; Schema: toanunciando; Owner: postgres
--

SELECT pg_catalog.setval('toanunciando.imoveis_id_seq', 1, true);


--
-- TOC entry 4945 (class 0 OID 0)
-- Dependencies: 233
-- Name: imovel_detalhe_id_seq; Type: SEQUENCE SET; Schema: toanunciando; Owner: postgres
--

SELECT pg_catalog.setval('toanunciando.imovel_detalhe_id_seq', 1, false);


--
-- TOC entry 4946 (class 0 OID 0)
-- Dependencies: 231
-- Name: imovel_detalhes_id_seq; Type: SEQUENCE SET; Schema: toanunciando; Owner: postgres
--

SELECT pg_catalog.setval('toanunciando.imovel_detalhes_id_seq', 1, true);


--
-- TOC entry 4947 (class 0 OID 0)
-- Dependencies: 234
-- Name: imovel_id_seq; Type: SEQUENCE SET; Schema: toanunciando; Owner: postgres
--

SELECT pg_catalog.setval('toanunciando.imovel_id_seq', 1, false);


--
-- TOC entry 4948 (class 0 OID 0)
-- Dependencies: 239
-- Name: tipo_anuncio_id_seq; Type: SEQUENCE SET; Schema: toanunciando; Owner: postgres
--

SELECT pg_catalog.setval('toanunciando.tipo_anuncio_id_seq', 2, true);


--
-- TOC entry 4949 (class 0 OID 0)
-- Dependencies: 225
-- Name: tipos_anuncio_id_seq; Type: SEQUENCE SET; Schema: toanunciando; Owner: postgres
--

SELECT pg_catalog.setval('toanunciando.tipos_anuncio_id_seq', 1, false);


--
-- TOC entry 4702 (class 2606 OID 16556)
-- Name: anunciante pk_anunciante; Type: CONSTRAINT; Schema: toanunciando; Owner: postgres
--

ALTER TABLE ONLY toanunciando.anunciante
    ADD CONSTRAINT pk_anunciante PRIMARY KEY (id);


--
-- TOC entry 4724 (class 2606 OID 16615)
-- Name: anuncio pk_anuncio; Type: CONSTRAINT; Schema: toanunciando; Owner: postgres
--

ALTER TABLE ONLY toanunciando.anuncio
    ADD CONSTRAINT pk_anuncio PRIMARY KEY (id);


--
-- TOC entry 4726 (class 2606 OID 16643)
-- Name: avaliacao pk_avaliacao; Type: CONSTRAINT; Schema: toanunciando; Owner: postgres
--

ALTER TABLE ONLY toanunciando.avaliacao
    ADD CONSTRAINT pk_avaliacao PRIMARY KEY (id);


--
-- TOC entry 4712 (class 2606 OID 16579)
-- Name: carro pk_carro; Type: CONSTRAINT; Schema: toanunciando; Owner: postgres
--

ALTER TABLE ONLY toanunciando.carro
    ADD CONSTRAINT pk_carro PRIMARY KEY (id);


--
-- TOC entry 4716 (class 2606 OID 16591)
-- Name: carro_acessorio pk_carro_acessorio; Type: CONSTRAINT; Schema: toanunciando; Owner: postgres
--

ALTER TABLE ONLY toanunciando.carro_acessorio
    ADD CONSTRAINT pk_carro_acessorio PRIMARY KEY (id);


--
-- TOC entry 4708 (class 2606 OID 16565)
-- Name: imovel pk_imovel; Type: CONSTRAINT; Schema: toanunciando; Owner: postgres
--

ALTER TABLE ONLY toanunciando.imovel
    ADD CONSTRAINT pk_imovel PRIMARY KEY (id);


--
-- TOC entry 4728 (class 2606 OID 16660)
-- Name: imovel_detalhe pk_imovel_detalhe; Type: CONSTRAINT; Schema: toanunciando; Owner: postgres
--

ALTER TABLE ONLY toanunciando.imovel_detalhe
    ADD CONSTRAINT pk_imovel_detalhe PRIMARY KEY (id);


--
-- TOC entry 4718 (class 2606 OID 16603)
-- Name: tipo_anuncio pk_tipo_anuncio; Type: CONSTRAINT; Schema: toanunciando; Owner: postgres
--

ALTER TABLE ONLY toanunciando.tipo_anuncio
    ADD CONSTRAINT pk_tipo_anuncio PRIMARY KEY (id);


--
-- TOC entry 4714 (class 2606 OID 16834)
-- Name: carro unqk_acessorio; Type: CONSTRAINT; Schema: toanunciando; Owner: postgres
--

ALTER TABLE ONLY toanunciando.carro
    ADD CONSTRAINT unqk_acessorio UNIQUE (id_acessorio);


--
-- TOC entry 4720 (class 2606 OID 16605)
-- Name: tipo_anuncio unqk_categoria_anuncio; Type: CONSTRAINT; Schema: toanunciando; Owner: postgres
--

ALTER TABLE ONLY toanunciando.tipo_anuncio
    ADD CONSTRAINT unqk_categoria_anuncio UNIQUE (categoria_anuncio);


--
-- TOC entry 4704 (class 2606 OID 16667)
-- Name: anunciante unqk_cpfcnpj; Type: CONSTRAINT; Schema: toanunciando; Owner: postgres
--

ALTER TABLE ONLY toanunciando.anunciante
    ADD CONSTRAINT unqk_cpfcnpj UNIQUE (cpfcnpj);


--
-- TOC entry 4706 (class 2606 OID 16669)
-- Name: anunciante unqk_email; Type: CONSTRAINT; Schema: toanunciando; Owner: postgres
--

ALTER TABLE ONLY toanunciando.anunciante
    ADD CONSTRAINT unqk_email UNIQUE (email);


--
-- TOC entry 4710 (class 2606 OID 16770)
-- Name: imovel unqk_imovel_detalhe; Type: CONSTRAINT; Schema: toanunciando; Owner: postgres
--

ALTER TABLE ONLY toanunciando.imovel
    ADD CONSTRAINT unqk_imovel_detalhe UNIQUE (id_imovel_detalhe);


--
-- TOC entry 4722 (class 2606 OID 16607)
-- Name: tipo_anuncio unqk_tipo_anuncio; Type: CONSTRAINT; Schema: toanunciando; Owner: postgres
--

ALTER TABLE ONLY toanunciando.tipo_anuncio
    ADD CONSTRAINT unqk_tipo_anuncio UNIQUE (tipo);


--
-- TOC entry 4729 (class 2606 OID 16840)
-- Name: imovel FK_0fb3ce86d53924ea8ce1f10c75f; Type: FK CONSTRAINT; Schema: toanunciando; Owner: postgres
--

ALTER TABLE ONLY toanunciando.imovel
    ADD CONSTRAINT "FK_0fb3ce86d53924ea8ce1f10c75f" FOREIGN KEY (id_imovel_detalhe) REFERENCES toanunciando.imovel_detalhe(id);


--
-- TOC entry 4731 (class 2606 OID 16872)
-- Name: anuncio fk_anuncio_anunciante; Type: FK CONSTRAINT; Schema: toanunciando; Owner: postgres
--

ALTER TABLE ONLY toanunciando.anuncio
    ADD CONSTRAINT fk_anuncio_anunciante FOREIGN KEY (id_anunciante) REFERENCES toanunciando.anunciante(id);


--
-- TOC entry 4732 (class 2606 OID 16900)
-- Name: anuncio fk_anuncio_carro; Type: FK CONSTRAINT; Schema: toanunciando; Owner: postgres
--

ALTER TABLE ONLY toanunciando.anuncio
    ADD CONSTRAINT fk_anuncio_carro FOREIGN KEY (id_carro) REFERENCES toanunciando.carro(id) ON DELETE CASCADE;


--
-- TOC entry 4733 (class 2606 OID 16905)
-- Name: anuncio fk_anuncio_imovel; Type: FK CONSTRAINT; Schema: toanunciando; Owner: postgres
--

ALTER TABLE ONLY toanunciando.anuncio
    ADD CONSTRAINT fk_anuncio_imovel FOREIGN KEY (id_imovel) REFERENCES toanunciando.imovel(id) ON DELETE CASCADE;


--
-- TOC entry 4734 (class 2606 OID 16895)
-- Name: anuncio fk_anuncio_tipo_anuncio; Type: FK CONSTRAINT; Schema: toanunciando; Owner: postgres
--

ALTER TABLE ONLY toanunciando.anuncio
    ADD CONSTRAINT fk_anuncio_tipo_anuncio FOREIGN KEY (id_tipo_anuncio) REFERENCES toanunciando.tipo_anuncio(id);


--
-- TOC entry 4735 (class 2606 OID 16862)
-- Name: avaliacao fk_avaliacao_anunciante_avaliado; Type: FK CONSTRAINT; Schema: toanunciando; Owner: postgres
--

ALTER TABLE ONLY toanunciando.avaliacao
    ADD CONSTRAINT fk_avaliacao_anunciante_avaliado FOREIGN KEY (id_anunciante_avaliado) REFERENCES toanunciando.anunciante(id);


--
-- TOC entry 4736 (class 2606 OID 16867)
-- Name: avaliacao fk_avaliacao_anunciante_avaliador; Type: FK CONSTRAINT; Schema: toanunciando; Owner: postgres
--

ALTER TABLE ONLY toanunciando.avaliacao
    ADD CONSTRAINT fk_avaliacao_anunciante_avaliador FOREIGN KEY (id_anunciante_avaliador) REFERENCES toanunciando.anunciante(id);


--
-- TOC entry 4730 (class 2606 OID 16850)
-- Name: carro fk_carro_carro_acessorio; Type: FK CONSTRAINT; Schema: toanunciando; Owner: postgres
--

ALTER TABLE ONLY toanunciando.carro
    ADD CONSTRAINT fk_carro_carro_acessorio FOREIGN KEY (id_acessorio) REFERENCES toanunciando.carro_acessorio(id);


-- Completed on 2025-05-28 22:03:53

--
-- PostgreSQL database dump complete
--

-- Completed on 2025-05-28 22:03:53

--
-- PostgreSQL database cluster dump complete
--

