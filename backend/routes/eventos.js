// backend/routes/eventos.js
const express = require('express');
const db = require('../db');
const router = express.Router();

// Listar todos os eventos
router.get('/', (req, res) => {
    db.query('SELECT * FROM eventos', (err, results) => {
        if (err) {
            console.error('Erro ao buscar eventos:', err);
            return res.status(500).send({ success: false, message: 'Erro ao buscar eventos.' });
        }
        res.send(results);
    });
});

// Criar um evento
router.post('/', (req, res) => {
    const { titulo } = req.body;
    if (!titulo) return res.status(400).send({ success: false, message: 'Título obrigatório' });

    db.query('INSERT INTO eventos (titulo) VALUES (?)', [titulo], (err, result) => {
        if (err) {
            console.error('Erro ao criar evento:', err);
            return res.status(500).send({ success: false, message: 'Erro ao criar evento.' });
        }
        res.status(201).send({ success: true, message: 'Evento criado', evento: { id: result.insertId, titulo } });
    });
});

// Excluir evento
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM eventos WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('Erro ao excluir evento:', err);
            return res.status(500).send({ success: false, message: 'Erro ao excluir evento.' });
        }
        if (result.affectedRows === 0) return res.status(404).send({ success: false, message: 'Evento não encontrado.' });
        res.send({ success: true, message: 'Evento excluído' });
    });
});

module.exports = router;
