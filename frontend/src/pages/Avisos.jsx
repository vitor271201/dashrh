import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { Table, Button, Form, Container } from 'react-bootstrap';

function Avisos() {
    const [avisos, setAvisos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [descricao, setDescricao] = useState('');
    const [usuarioId, setUsuarioId] = useState('');
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchAvisos();
        fetchUsuarios();
    }, []);

    const fetchAvisos = () => {
        axios.get('http://localhost:3001/avisos')
            .then(res => setAvisos(res.data))
            .catch(() => alert('Erro ao buscar avisos'));
    };

    const fetchUsuarios = () => {
        axios.get('http://localhost:3001/usuarios')
            .then(res => setUsuarios(res.data))
            .catch(() => alert('Erro ao buscar usuários'));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            axios.put(`http://localhost:3001/avisos/${editingId}`, { descricao })
                .then(() => {
                    fetchAvisos();
                    resetForm();
                });
        } else {
            axios.post('http://localhost:3001/avisos', { usuario_id: usuarioId, descricao })
                .then(() => {
                    fetchAvisos();
                    resetForm();
                });
        }
    };

    const handleEdit = (aviso) => {
        setEditingId(aviso.id);
        setDescricao(aviso.descricao);
        setUsuarioId(aviso.usuario_id);
    };

    const handleDelete = (id) => {
        if (window.confirm('Tem certeza que deseja excluir?')) {
            axios.delete(`http://localhost:3001/avisos/${id}`)
                .then(() => fetchAvisos());
        }
    };

    const resetForm = () => {
        setEditingId(null);
        setDescricao('');
        setUsuarioId('');
    };

    return (
        <Layout>
            <Container>
                <h2 className="my-4">Avisos</h2>

                <Form onSubmit={handleSubmit} className="mb-4">
                    <Form.Group controlId="usuarioSelect" className="mb-3">
                        <Form.Label>Funcionário</Form.Label>
                        <Form.Control as="select" value={usuarioId} onChange={(e) => setUsuarioId(e.target.value)} required>
                            <option value="">Selecione um funcionário</option>
                            {usuarios.map(user => (
                                <option key={user.id} value={user.id}>{user.nome}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="descricao" className="mb-3">
                        <Form.Label>Descrição do Aviso</Form.Label>
                        <Form.Control
                            type="text"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button type="submit" variant={editingId ? 'primary' : 'success'}>
                        {editingId ? 'Salvar Alterações' : 'Cadastrar Aviso'}
                    </Button>

                    {editingId && (
                        <Button variant="secondary" onClick={resetForm} className="ms-2">Cancelar</Button>
                    )}
                </Form>

                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Funcionário</th>
                            <th>Descrição</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {avisos.map(aviso => (
                            <tr key={aviso.id}>
                                <td>{aviso.id}</td>
                                <td>{aviso.nome}</td>
                                <td>{aviso.descricao}</td>
                                <td>
                                    <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(aviso)}>Editar</Button>
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(aviso.id)}>Excluir</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </Layout>
    );
}

export default Avisos;
