const express = require('express');
const router = express.Router();
const db = require('../db'); // seu arquivo de conexão mysql

// Buscar descrição do perfil (pegamos id = 1, perfil único)
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM perfil WHERE id = 1';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length === 0) return res.status(404).json({ message: 'Perfil não encontrado' });
        res.json(results[0]);
    });
});

// Atualizar descrição do perfil
router.put('/', (req, res) => {
    const { descricao } = req.body;
    const sql = 'UPDATE perfil SET descricao = ? WHERE id = 1';
    db.query(sql, [descricao], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Descrição atualizada com sucesso' });
    });
});

module.exports = router;
