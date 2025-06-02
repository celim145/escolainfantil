CREATE TABLE professor (
  id_professor INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  especialidade VARCHAR(100),
  telefone VARCHAR(20)
);

CREATE TABLE disciplina (
  id_disciplina INT AUTO_INCREMENT PRIMARY KEY,
  id_professor INT,
  carga_horaria INT NOT NULL,
  nome_disciplina VARCHAR(100) NOT NULL,
  FOREIGN KEY (id_professor) REFERENCES professor(id_professor)
    ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE turma (
  id_turma INT AUTO_INCREMENT PRIMARY KEY,
  nome_turma VARCHAR(100) NOT NULL,
  ano_letivo INT NOT NULL,
  turno VARCHAR(20)
);

CREATE TABLE aluno (
  id_aluno INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  data_nascimento DATE,
  responsavel VARCHAR(100),
  telefone VARCHAR(20)
);

CREATE TABLE matricula (
  id_matricula INT AUTO_INCREMENT PRIMARY KEY,
  id_aluno INT,
  id_turma INT,
  data_matricula DATE,
  FOREIGN KEY (id_aluno) REFERENCES aluno(id_aluno) ON DELETE CASCADE,
  FOREIGN KEY (id_turma) REFERENCES turma(id_turma) ON DELETE CASCADE
);

CREATE TABLE aula (
  id_aula INT AUTO_INCREMENT PRIMARY KEY,
  id_professor INT,
  id_disciplina INT,
  id_turma INT,
  data DATE,
  conteudo TEXT,
  FOREIGN KEY (id_professor) REFERENCES professor(id_professor) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (id_disciplina) REFERENCES disciplina(id_disciplina) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (id_turma) REFERENCES turma(id_turma) ON DELETE CASCADE
);

CREATE TABLE frequencia (
  id_frequencia INT AUTO_INCREMENT PRIMARY KEY,
  id_aula INT,
  id_aluno INT,
  presente TINYINT(1),
  FOREIGN KEY (id_aula) REFERENCES aula(id_aula) ON DELETE CASCADE,
  FOREIGN KEY (id_aluno) REFERENCES aluno(id_aluno) ON DELETE CASCADE
);