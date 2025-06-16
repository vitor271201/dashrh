import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Container, Row, Col, Button, Modal, Form, Image } from 'react-bootstrap';
import axios from 'axios';

function Perfil() {
    const [descricao, setDescricao] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [novaDescricao, setNovaDescricao] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/perfil')
            .then(res => setDescricao(res.data.descricao))
            .catch(err => console.error(err));
    }, []);

    const handleSave = () => {
        axios.put('http://localhost:3001/perfil', { descricao: novaDescricao })
            .then(() => {
                setDescricao(novaDescricao);
                setShowModal(false);
            })
            .catch(err => console.error(err));
    };

    return (
        <Layout>
            <Container className="mt-5">
                <Row className="justify-content-center align-items-center">
                    <Col md={7}>
                        <h3>Alexandre Silva Santos</h3>
                        <p>{descricao || 'Sem descrição cadastrada.'}</p>
                        <Button onClick={() => {
                            setNovaDescricao(descricao);
                            setShowModal(true);
                        }}>
                            {descricao ? 'Editar descrição' : 'Adicionar descrição'}
                        </Button>
                    </Col>
                    <Col md={3} className="text-center">
                        <Image
                            src="/alexperfil.PNG"
                            roundedCircle
                            fluid
                            alt="Foto do perfil"
                            style={{ maxWidth: '150px' }}
                        />
                    </Col>
                </Row>

                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar descrição</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formDescricao">
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    value={novaDescricao}
                                    onChange={e => setNovaDescricao(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
                        <Button variant="primary" onClick={handleSave}>Salvar</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </Layout>
    );
}

export default Perfil;
