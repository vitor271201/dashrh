import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Calendario() {
    const [startDate, setStartDate] = useState(new Date());
    const [showModal, setShowModal] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [eventos, setEventos] = useState([]);
    const [alert, setAlert] = useState(null);

    // Buscar eventos do backend
    useEffect(() => {
        fetch('http://localhost:3001/calendario')
            .then(res => res.json())
            .then(data => setEventos(data))
            .catch(() => setAlert({ variant: 'danger', message: 'Erro ao carregar eventos' }));
    }, []);

    // Abrir modal para novo evento
    function abrirModal() {
        setTitulo('');
        setShowModal(true);
    }

    // Criar novo evento
    function salvarEvento() {
        if (!titulo.trim()) {
            setAlert({ variant: 'warning', message: 'Título é obrigatório' });
            return;
        }
        // Formatar data yyyy-mm-dd
        const dataFormatada = startDate.toISOString().slice(0, 10);

        fetch('http://localhost:3001/calendario', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo, data: dataFormatada }),
        })
            .then(res => {
                if (!res.ok) throw new Error('Erro ao salvar');
                return res.json();
            })
            .then(novoEvento => {
                setEventos([...eventos, novoEvento]);
                setShowModal(false);
                setAlert({ variant: 'success', message: 'Evento criado com sucesso!' });
            })
            .catch(() => setAlert({ variant: 'danger', message: 'Erro ao criar evento' }));
    }

    return (
        <Layout>
            <h1 className="mb-4">Calendário</h1>

            {alert && (
                <Alert variant={alert.variant} onClose={() => setAlert(null)} dismissible>
                    {alert.message}
                </Alert>
            )}

            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                <div>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        inline
                    />
                    <Button variant="primary" className="mt-3" onClick={abrirModal}>
                        Novo Evento
                    </Button>
                </div>

                <div style={{ flex: 1 }}>
                    <h4>Eventos cadastrados</h4>
                    <ul>
                        {eventos.map((evt) => (
                            <li key={evt.id}>
                                {evt.data} - {evt.titulo}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Modal para criar evento */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Novo Evento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="tituloEvento">
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                type="text"
                                value={titulo}
                                onChange={e => setTitulo(e.target.value)}
                                placeholder="Digite o título do evento"
                            />
                        </Form.Group>
                        <Form.Group controlId="dataEvento" className="mt-3">
                            <Form.Label>Data</Form.Label>
                            <Form.Control type="text" readOnly value={startDate.toLocaleDateString()} />
                            <small className="text-muted">Data selecionada no calendário</small>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
                    <Button variant="primary" onClick={salvarEvento}>Salvar</Button>
                </Modal.Footer>
            </Modal>
        </Layout>
    );
}

export default Calendario;
