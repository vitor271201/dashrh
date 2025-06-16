import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { Table, Button, Form, Container } from 'react-bootstrap';

function Metas() {
    const [metas, setMetas] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [descricao, setDescricao] = useState('');
    const [usuarioId, setUsuarioId] = useState('');
    const [data, setData] = useState('');
    const [status, setStatus] = useState('');
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchMetas();
        fetchUsuarios();
    }, []);

    const fetchMetas = () => {
        axios.get('http://localhost:3001/metas')
            .then(res => setMetas(res.data))
            .catch(() => alert('Erro ao buscar metas'));
    };

    const fetchUsuarios = () => {
        axios.get('http://localhost:3001/usuarios')
            .then(res => setUsuarios(res.data))
            .catch(() => alert('Erro ao buscar usuários'));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = { usuario_id: usuarioId, descricao, data, status };

        if (editingId) {
            axios.put(`http://localhost:3001/metas/${editingId}`, payload)
                .then(() => {
                    fetchMetas();
                    resetForm();
                })
                .catch(() => alert('Erro ao atualizar meta'));
        } else {
            axios.post('http://localhost:3001/metas', payload)
                .then(() => {
                    fetchMetas();
                    resetForm();
                })
                .catch(() => alert('Erro ao cadastrar meta'));
        }
    };

    const handleEdit = (meta) => {
        setEditingId(meta.id);
        setDescricao(meta.descricao);
        setUsuarioId(meta.usuario_id);
        setData(meta.data ? meta.data.split('T')[0] : '');
        setStatus(meta.status || '');
    };

    const handleDelete = (id) => {
        if (window.confirm('Tem certeza que deseja excluir?')) {
            axios.delete(`http://localhost:3001/metas/${id}`)
                .then(() => fetchMetas());
        }
    };

    const resetForm = () => {
        setEditingId(null);
        setDescricao('');
        setUsuarioId('');
        setData('');
        setStatus('');
    };

    return (
        <Layout>
            <Container>
                <h2 className="my-4">Metas</h2>

                <Form onSubmit={handleSubmit} className="mb-4">
                    <Form.Group className="mb-3">
                        <Form.Label>Funcionário</Form.Label>
                        <Form.Control
                            as="select"
                            value={usuarioId}
                            onChange={e => setUsuarioId(e.target.value)}
                            required
                        >
                            <option value="">Selecione um funcionário</option>
                            {usuarios.map(user => (
                                <option key={user.id} value={user.id}>{user.nome}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                            type="text"
                            value={descricao}
                            onChange={e => setDescricao(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Data</Form.Label>
                        <Form.Control
                            type="date"
                            value={data}
                            onChange={e => setData(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                            type="text"
                            value={status}
                            onChange={e => setStatus(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button type="submit" variant={editingId ? 'primary' : 'success'}>
                        {editingId ? 'Salvar Alterações' : 'Cadastrar Meta'}
                    </Button>
                    {editingId && (
                        <Button variant="secondary" onClick={resetForm} className="ms-2">
                            Cancelar
                        </Button>
                    )}
                </Form>

                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Funcionário</th>
                            <th>Descrição</th>
                            <th>Data</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {metas.map(meta => (
                            <tr key={meta.id}>
                                <td>{meta.id}</td>
                                <td>{meta.nome}</td>
                                <td>{meta.descricao}</td>
                                <td>{meta.data ? new Date(meta.data).toLocaleDateString() : '-'}</td>
                                <td>{meta.status || '-'}</td>
                                <td>
                                    <Button
                                        variant="warning"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => handleEdit(meta)}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleDelete(meta.id)}
                                    >
                                        Excluir
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </Layout>
    );
}

export default Metas;
