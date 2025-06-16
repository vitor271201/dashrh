const express = require('express');
const db = require('../db');
const router = express.Router();

// Listar todos os avisos com nome do usuário
router.get('/', (req, res) => {
    const sql = `
        SELECT 
            avisos.id, 
            avisos.descricao, 
            avisos.usuario_id, 
            usuarios.nome 
        FROM avisos 
        JOIN usuarios ON avisos.usuario_id = usuarios.id
    `;


    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao buscar avisos:', err);
            return res.status(500).send({ success: false, message: 'Erro ao buscar avisos.' });
        }
        res.send(results);
    });
});

// Criar um novo aviso
router.post('/', (req, res) => {
    const { usuario_id, descricao } = req.body;

    if (!usuario_id || !descricao) {
        return res.status(400).send({ success: false, message: 'Campos obrigatórios ausentes.' });
    }

    const sql = 'INSERT INTO avisos (usuario_id, descricao) VALUES (?, ?)';
    db.query(sql, [usuario_id, descricao], (err, result) => {
        if (err) {
            console.error('Erro ao criar aviso:', err);
            return res.status(500).send({ success: false, message: 'Erro ao criar aviso.' });
        }

        res.status(201).send({
            success: true,
            message: 'Aviso criado com sucesso.',
            aviso: { id: result.insertId, usuario_id, descricao }
        });
    });
});

// Atualizar um aviso
router.put('/:id', (req, res) => {
    const avisoId = req.params.id;
    const { descricao } = req.body;

    if (!descricao) {
        return res.status(400).send({ success: false, message: 'Descrição é obrigatória.' });
    }

    const sql = 'UPDATE avisos SET descricao = ? WHERE id = ?';
    db.query(sql, [descricao, avisoId], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar aviso:', err);
            return res.status(500).send({ success: false, message: 'Erro ao atualizar aviso.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({ success: false, message: 'Aviso não encontrado.' });
        }

        res.send({ success: true, message: 'Aviso atualizado com sucesso.' });
    });
});

// Excluir um aviso
router.delete('/:id', (req, res) => {
    const avisoId = req.params.id;

    const sql = 'DELETE FROM avisos WHERE id = ?';
    db.query(sql, [avisoId], (err, result) => {
        if (err) {
            console.error('Erro ao excluir aviso:', err);
            return res.status(500).send({ success: false, message: 'Erro ao excluir aviso.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({ success: false, message: 'Aviso não encontrado.' });
        }

        res.send({ success: true, message: 'Aviso excluído com sucesso.' });
    });
});

module.exports = router;
