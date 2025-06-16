const express = require('express');
const db = require('../db');
const router = express.Router();

console.log('Arquivo de rotas METAS carregado');

// Listar todas as metas com nome do usuário
router.get('/', (req, res) => {
    const sql = `
        SELECT 
            metas.id, 
            metas.descricao, 
            metas.usuario_id, 
            metas.data,
            metas.status,
            usuarios.nome 
        FROM metas 
        JOIN usuarios ON metas.usuario_id = usuarios.id
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao buscar metas:', err);
            return res.status(500).send({ success: false, message: 'Erro ao buscar metas.' });
        }
        res.send(results);
    });
});

// Criar uma nova meta
router.post('/', (req, res) => {
    const { usuario_id, descricao, data, status } = req.body;

    if (!usuario_id || !descricao || !data || !status) {
        return res.status(400).send({ success: false, message: 'Todos os campos são obrigatórios.' });
    }

    const sql = 'INSERT INTO metas (usuario_id, descricao, data, status) VALUES (?, ?, ?, ?)';
    console.log("Recebido do front:", { usuario_id, descricao, data, status });

    db.query(sql, [usuario_id, descricao, data, status], (err, result) => {
        if (err) {
            console.error('Erro ao criar meta:', err);
            return res.status(500).send({ success: false, message: 'Erro ao criar meta.' });
        }

        res.status(201).send({
            success: true,
            message: 'Meta criada com sucesso.',
            meta: { id: result.insertId, usuario_id, descricao, data, status }
        });
    });
});

// Atualizar uma meta
router.put('/:id', (req, res) => {
    const metaId = req.params.id;
    const { descricao, data, status } = req.body;

    if (!descricao || !data || !status) {
        return res.status(400).send({ success: false, message: 'Todos os campos são obrigatórios.' });
    }

    const sql = 'UPDATE metas SET descricao = ?, data = ?, status = ? WHERE id = ?';
    db.query(sql, [descricao, data, status, metaId], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar meta:', err);
            return res.status(500).send({ success: false, message: 'Erro ao atualizar meta.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({ success: false, message: 'Meta não encontrada.' });
        }

        res.send({ success: true, message: 'Meta atualizada com sucesso.' });
    });
});

// Excluir uma meta
router.delete('/:id', (req, res) => {
    const metaId = req.params.id;

    const sql = 'DELETE FROM metas WHERE id = ?';
    db.query(sql, [metaId], (err, result) => {
        if (err) {
            console.error('Erro ao excluir meta:', err);
            return res.status(500).send({ success: false, message: 'Erro ao excluir meta.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({ success: false, message: 'Meta não encontrada.' });
        }

        res.send({ success: true, message: 'Meta excluída com sucesso.' });
    });
});

module.exports = router;
