const express = require('express');
const db = require('../db');
const router = express.Router();

// Listar todos os eventos
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM calendario ORDER BY data';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao buscar eventos:', err);
            return res.status(500).send({ success: false, message: 'Erro ao buscar eventos.' });
        }
        res.send(results);
    });
});

// Criar evento
router.post('/', (req, res) => {
    const { titulo, data } = req.body;
    if (!titulo || !data) {
        return res.status(400).send({ success: false, message: 'Título e data são obrigatórios.' });
    }

    const sql = 'INSERT INTO calendario (titulo, data) VALUES (?, ?)';
    db.query(sql, [titulo, data], (err, result) => {
        if (err) {
            console.error('Erro ao criar evento:', err);
            return res.status(500).send({ success: false, message: 'Erro ao criar evento.' });
        }
        res.status(201).send({ id: result.insertId, titulo, data });
    });
});

module.exports = router;
