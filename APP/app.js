const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());


app.use('/professores', require(path.join(__dirname, 'routes', 'professor.routes')));
app.use('/alunos', require(path.join(__dirname, 'routes', 'aluno.routes')));
app.use('/turmas', require(path.join(__dirname, 'routes', 'turma.routes')));
app.use('/disciplinas', require(path.join(__dirname, 'routes', 'disciplina.routes')));
app.use('/aulas', require(path.join(__dirname, 'routes', 'aula.routes')));
app.use('/matriculas', require(path.join(__dirname, 'routes', 'matricula.routes')));
app.use('/frequencias', require(path.join(__dirname, 'routes', 'frequencia.routes')));

app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
