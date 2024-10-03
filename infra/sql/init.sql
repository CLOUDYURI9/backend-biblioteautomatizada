-- CREATE ALUNO - TRIGGER - FUNCTION

CREATE SEQUENCE seq_ra START 1;

CREATE TABLE Aluno (
    id_aluno SERIAL PRIMARY KEY,
    ra VARCHAR (7) UNIQUE NOT NULL,
    nome VARCHAR (80) NOT NULL,
    sobrenome VARCHAR (80) NOT NULL,
    data_nascimento DATE,
    endereco VARCHAR (200),
    email VARCHAR (80),
    celular VARCHAR (20) NOT NULL
);

CREATE OR REPLACE FUNCTION gerar_ra() RETURNS TRIGGER AS $$
BEGIN
    NEW.ra := 'AAA' || TO_CHAR(nextval('seq_ra'), 'FM0000');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_gerar_ra
BEFORE INSERT ON Aluno
FOR EACH ROW EXECUTE FUNCTION gerar_ra();

-- CREATE LIVRO
CREATE TABLE Livro (
    id_livro SERIAL PRIMARY KEY,
    titulo VARCHAR (200) NOT NULL,
    autor VARCHAR (150) NOT NULL,
    editora VARCHAR (100) NOT NULL,
    ano_publicacao VARCHAR (5),
    isbn VARCHAR (20),
    quant_total INTEGER NOT NULL,
    quant_disponivel INTEGER NOT NULL,
    valor_aquisicao DECIMAL (10,2),
    status_livro_emprestado VARCHAR (20)
);

-- CREATE EMPRESTIMO
CREATE TABLE Emprestimo (
    id_emprestimo SERIAL PRIMARY KEY,
    id_aluno INT REFERENCES Aluno(id_aluno),
    id_livro INT REFERENCES Livro(id_livro),
    data_emprestimo DATE NOT NULL,
    data_devolucao DATE,
    status_emprestimo VARCHAR (20)
);


-- ALUNO
INSERT INTO Aluno (nome, sobrenome, data_nascimento, endereco, email, celular) 
VALUES 
('Conor', 'McGregor', '2005-01-15', 'Rua UFC, 123', 'mcgregor@ufc.com', '16998959876'),
('Amanda', 'Nunes', '2004-03-22', 'Rua UFC, 456', 'amanda.nunes@ufc.com', '16995992305'),
('Angelina', 'Jolie', '2003-07-10', 'Rua Hollywood, 789', 'jolie@cinema.com', '16991915502'),
('Natalie', 'Portman', '2002-11-05', 'Rua Hollywood, 101', 'natalie.portman@cinema.com', '16993930703'),
('Shaquille', 'ONeal', '2004-09-18', 'Rua NBA, 202', 'shaquille@gmail.com', '16993937030'),
('Harry', 'Kane', '2000-05-18', 'Rua Futebol, 2024', 'kane@futi.com', '16998951983'),
('Jaqueline', 'Carvalho', '2001-12-10', 'Rua Volei, 456', 'jack@volei.com', '16991993575'),
('Sheilla', 'Castro', '2003-04-25', 'Rua Volei, 2028', 'sheilla.castro@volei.com', '16981974547'),
('Gabriela', 'Guimarães', '2007-08-19', 'Rua Volei, 2028', 'gaby@volei.com', '16983932215'),
('Magic', 'Johnson', '2003-07-08', 'Rua NBA, 1999', 'magic@gmail.com', '16993932020');

-- ALUNO
INSERT INTO Aluno (nome, sobrenome, data_nascimento, endereco, email, celular) 
VALUES 
('Lucas', 'Silva', '2002-02-20', 'Rua Brasil, 101', 'lucas.silva@gmail.com', '16991234567'),
('Maria', 'Oliveira', '2003-04-15', 'Rua Santos, 202', 'maria.oliveira@yahoo.com', '16992345678'),
('Pedro', 'Almeida', '2001-06-30', 'Avenida Paulista, 303', 'pedro.almeida@hotmail.com', '16993456789'),
('Ana', 'Costa', '2000-08-10', 'Rua das Flores, 404', 'ana.costa@gmail.com', '16994567890'),
('João', 'Pereira', '2004-10-05', 'Rua Bela Vista, 505', 'joao.pereira@gmail.com', '16995678901'),
('Carla', 'Ferreira', '2002-12-25', 'Avenida Central, 606', 'carla.ferreira@hotmail.com', '16996789012'),
('Felipe', 'Souza', '2005-03-18', 'Rua do Sol, 707', 'felipe.souza@yahoo.com', '16997890123'),
('Beatriz', 'Lima', '2003-05-22', 'Rua dos Pinheiros, 808', 'beatriz.lima@gmail.com', '16998901234'),
('Rafael', 'Martins', '2001-07-14', 'Rua da Paz, 909', 'rafael.martins@gmail.com', '16999012345'),
('Julia', 'Rocha', '2000-09-28', 'Avenida das Nações, 1010', 'julia.rocha@hotmail.com', '16990123456');

-- LIVRO
INSERT INTO Livro (titulo, autor, editora, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestado) 
VALUES 
('O Senhor dos Anéis', 'J.R.R. Tolkien', 'HarperCollins', '1954', '978-0007525546', 10, 10, 150.00, 'Disponível'),
('1984', 'George Orwell', 'Companhia das Letras', '1949', '978-8535906770', 8, 8, 90.00, 'Disponível'),
('Dom Quixote', 'Miguel de Cervantes', 'Penguin Classics', '1605', '978-0142437230', 6, 6, 120.00, 'Disponível'),
('O Pequeno Príncipe', 'Antoine de Saint-Exupéry', 'Agir', '1943', '978-8522008731', 12, 12, 50.00, 'Disponível'),
('A Revolução dos Bichos', 'George Orwell', 'Penguin', '1945', '978-0141036137', 7, 7, 80.00, 'Disponível'),
('O Hobbit', 'J.R.R. Tolkien', 'HarperCollins', '1937', '978-0007458424', 9, 9, 140.00, 'Disponível'),
('O Conde de Monte Cristo', 'Alexandre Dumas', 'Penguin Classics', '1844', '978-0140449266', 5, 5, 110.00, 'Disponível'),
('Orgulho e Preconceito', 'Jane Austen', 'Penguin Classics', '1813', '978-0141439518', 7, 7, 90.00, 'Disponível'),
('Moby Dick', 'Herman Melville', 'Penguin Classics', '1851', '978-0142437247', 4, 4, 100.00, 'Disponível'),
('Guerra e Paz', 'Liev Tolstói', 'Companhia das Letras', '1869', '978-8535922343', 3, 3, 130.00, 'Disponível');

-- LIVRO
INSERT INTO Livro (titulo, autor, editora, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestado) 
VALUES 
('A Metamorfose', 'Franz Kafka', 'Companhia das Letras', '1915', '978-8535914843', 6, 6, 70.00, 'Disponível'),
('Cem Anos de Solidão', 'Gabriel Garcia Marquez', 'Record', '1967', '978-8501097439', 8, 8, 100.00, 'Disponível'),
('O Apanhador no Campo de Centeio', 'J.D. Salinger', 'Intrínseca', '1951', '978-0060937104', 10, 10, 85.00, 'Disponível'),
('Crime e Castigo', 'Fiódor Dostoiévski', 'Penguin Classics', '1866', '978-0140449136', 5, 5, 110.00, 'Disponível'),
('O Processo', 'Franz Kafka', 'Companhia das Letras', '1925', '978-8535914842', 7, 7, 80.00, 'Disponível'),
('O Lobo da Estepe', 'Hermann Hesse', 'Record', '1927', '978-8501087782', 6, 6, 90.00, 'Disponível'),
('As Aventuras de Huckleberry Finn', 'Mark Twain', 'Penguin Classics', '1884', '978-0141439648', 4, 4, 75.00, 'Disponível'),
('Anna Kariênina', 'Liev Tolstói', 'Companhia das Letras', '1877', '978-8535912344', 5, 5, 120.00, 'Disponível'),
('O Retrato de Dorian Gray', 'Oscar Wilde', 'Penguin Classics', '1890', '978-0141439570', 8, 8, 95.00, 'Disponível'),
('Os Miseráveis', 'Victor Hugo', 'Companhia das Letras', '1862', '978-8535918926', 3, 3, 150.00, 'Disponível');

-- Inserindo Emprestimos
INSERT INTO Emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao, status_emprestimo) 
VALUES 
(1, 2, '2024-09-01', '2024-09-15', 'Em andamento'),
(2, 1, '2024-09-02', '2024-09-16', 'Em andamento'),
(3, 5, '2024-09-03', '2024-09-17', 'Em andamento'),
(5, 3, '2024-09-04', '2024-09-18', 'Em andamento'),
(4, 6, '2024-09-05', '2024-09-19', 'Em andamento'),
(6, 4, '2024-09-06', '2024-09-20', 'Em andamento'),
(7, 8, '2024-09-07', '2024-09-21', 'Em andamento'),
(8, 7, '2024-09-08', '2024-09-22', 'Em andamento'),
(10, 9, '2024-09-09', '2024-09-23', 'Em andamento'),
(9, 10, '2024-09-10', '2024-09-24', 'Em andamento'),
(1, 10, '2024-09-11', '2024-09-25', 'Em andamento'),
(2, 3, '2024-09-11', '2024-09-25', 'Em andamento'),
(4, 5, '2024-09-11', '2024-09-25', 'Em andamento'),
(6, 2, '2024-09-11', '2024-09-25', 'Em andamento');

-- Inserindo Emprestimos sem repetição de id_aluno e id_livro
INSERT INTO Emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao, status_emprestimo) 
VALUES 
(18, 11, '2024-10-01', '2024-10-15', 'Em andamento'),
(11, 12, '2024-10-02', '2024-10-16', 'Em andamento'),
(12, 13, '2024-10-03', '2024-10-17', 'Em andamento'),
(14, 15, '2024-10-04', '2024-10-18', 'Em andamento'),
(13, 14, '2024-10-05', '2024-10-19', 'Em andamento'),
(15, 16, '2024-10-06', '2024-10-20', 'Em andamento'),
(17, 18, '2024-10-07', '2024-10-21', 'Em andamento'),
(16, 17, '2024-10-08', '2024-10-22', 'Em andamento'),
(19, 20, '2024-10-09', '2024-10-23', 'Em andamento'),
(20, 19, '2024-10-10', '2024-10-24', 'Em andamento');





