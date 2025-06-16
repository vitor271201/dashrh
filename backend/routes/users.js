const express = require('express');
const db = require('../db');
const router = express.Router();

// Cadastrar usuário
router.post('/register', (req, res) => {
  const { nome, email, senha, idade, sexo, cargo } = req.body;
  const sql = 'INSERT INTO usuarios (nome, email, senha, idade, sexo, cargo) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [nome, email, senha, idade, sexo, cargo], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({
      success: true,
      usuario: { id: result.insertId, nome, email, idade, sexo, cargo }
    });
  });
});

// Login
router.post('/login', (req, res) => {
  const { email, senha } = req.body;
  db.query('SELECT * FROM usuarios WHERE email = ? AND senha = ?', [email, senha], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length > 0) {
      res.send({ success: true });
    } else {
      res.send({ success: false });
    }
  });
});

// Listar todos os usuários
router.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
      console.error('Erro ao buscar usuários:', err);
      return res.status(500).send({ success: false, message: 'Erro ao buscar usuários.' });
    }
    res.send(results);
  });
});

// Excluir usuário
router.delete('/usuarios/:id', (req, res) => {
  const userId = req.params.id;
  const query = 'DELETE FROM usuarios WHERE id = ?';
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error('Erro ao excluir usuário: ', err);
      return res.status(500).send({ message: 'Erro ao excluir usuário.' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).send({ message: 'Usuário não encontrado.' });
    }

    res.status(200).send({ message: 'Usuário excluído com sucesso.' });
  });
});

// Atualizar usuário
router.put('/usuarios/:id', (req, res) => {
  const userId = req.params.id;
  const { nome, email, senha, idade, sexo, cargo } = req.body;
  const query = 'UPDATE usuarios SET nome = ?, email = ?, senha = ?, idade = ?, sexo = ?, cargo = ? WHERE id = ?';

  db.query(query, [nome, email, senha, idade, sexo, cargo, userId], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar usuário: ', err);
      return res.status(500).send({ message: 'Erro ao atualizar usuário.' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).send({ message: 'Usuário não encontrado.' });
    }

    res.status(200).send({ message: 'Usuário atualizado com sucesso.' });
  });
});

module.exports = router;
