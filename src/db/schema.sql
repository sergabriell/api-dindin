CREATE TABLE IF NOT EXISTS usuarios(
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  senha TEXT NOT NULL
);
  
CREATE TABLE IF NOT EXISTS categorias(
  id SERIAL PRIMARY KEY,
  descricao TEXT
);
  
CREATE TABLE IF NOT EXISTS transacoes(
  id SERIAL PRIMARY KEY,
  descricao TEXT NOT NULL,
  valor BIGINT NOT NULL,
  data TIMESTAMPTZ NOT NULL,
  categoria_id INTEGER NOT NULL REFERENCES categorias(id),
  usuario_id INTEGER NOT NULL REFERENCES usuarios(id),
  tipo VARCHAR(7) NOT NULL CHECK(tipo IN('entrada', 'saida'))
);
  
INSERT INTO categorias(descricao)
VALUES('Alimentação'), ('Assinaturas e Serviços'),
    ('Casa'), ('Mercado'), ('Cuidados Pessoais'), ('Educação'), ('Família'),
    ('Lazer'), ('Pets'), ('Presentes'), ('Roupas'), ('Saúde'),
    ('Transporte'), ('Salário'), ('Vendas'), ('Outras receitas'), ('Outras despesas');