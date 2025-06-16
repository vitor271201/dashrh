import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { Table, Button, Form, Container } from 'react-bootstrap';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [idade, setIdade] = useState('');
  const [sexo, setSexo] = useState('');
  const [cargo, setCargo] = useState('');

  useEffect(() => {
    buscarUsuarios();
  }, []);

  const buscarUsuarios = () => {
    axios.get('http://localhost:3001/usuarios')
      .then(res => {
        setUsuarios(res.data);
      })
      .catch(err => {
        console.error('Erro ao buscar usuários:', err);
      });
  };

  const deleteUser = (id) => {
    axios.delete(`http://localhost:3001/usuarios/${id}`)
      .then(res => {
        alert(res.data.message);
        setUsuarios(usuarios.filter(user => user.id !== id));
      })
      .catch(err => {
        console.error('Erro ao excluir usuário:', err);
        alert('Erro ao excluir usuário.');
      });
  };

  const editUser = (user) => {
    setEditingUser(user);
    setNome(user.nome);
    setEmail(user.email);
    setSenha(user.senha);
    setIdade(user.idade || '');
    setSexo(user.sexo || '');
    setCargo(user.cargo || '');
  };

  const updateUser = (id) => {
    const updatedUser = { nome, email, senha, idade, sexo, cargo };

    axios.put(`http://localhost:3001/usuarios/${id}`, updatedUser)
      .then(res => {
        alert(res.data.message);
        setUsuarios(usuarios.map(user => (user.id === id ? { ...user, ...updatedUser } : user)));
        resetForm();
      })
      .catch(err => {
        console.error('Erro ao atualizar usuário:', err);
        alert('Erro ao atualizar usuário.');
      });
  };

  const cadastrarUsuario = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/register', {
      nome,
      email,
      senha,
      idade,
      sexo,
      cargo
    })
      .then(res => {
        alert('Usuário cadastrado com sucesso!');
        setUsuarios([...usuarios, res.data.usuario]);
        resetForm();
      })
      .catch(err => {
        console.error('Erro ao cadastrar usuário:', err);
        alert('Erro ao cadastrar usuário.');
      });
  };

  const resetForm = () => {
    setEditingUser(null);
    setNome('');
    setEmail('');
    setSenha('');
    setIdade('');
    setSexo('');
    setCargo('');
  };

  return (
    <Layout>
      <Container>
        <h2 className="my-4">Funcionários</h2>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Idade</th>
              <th>Sexo</th>
              <th>Cargo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nome}</td>
                <td>{user.email}</td>
                <td>{user.idade || '-'}</td>
                <td>{user.sexo || '-'}</td>
                <td>{user.cargo || '-'}</td>
                <td>
                  <Button variant="warning" size="sm" className="me-2" onClick={() => editUser(user)}>Editar</Button>
                  <Button variant="danger" size="sm" onClick={() => deleteUser(user.id)}>Excluir</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <h4 className="mt-5">{editingUser ? 'Editar Funcionário' : 'Cadastrar Novo Funcionário'}</h4>

        <Form
          onSubmit={
            editingUser
              ? (e) => {
                e.preventDefault();
                updateUser(editingUser.id);
              }
              : cadastrarUsuario
          }
          className="mx-auto mt-4"
          style={{ maxWidth: "600px", width: "100%" }}
        >
          <Form.Group controlId="formNome" className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formSenha" className="mb-3">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Idade</Form.Label>
            <Form.Control
              type="number"
              value={idade}
              onChange={(e) => setIdade(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Sexo</Form.Label>
            <Form.Select value={sexo} onChange={(e) => setSexo(e.target.value)}>
              <option value="">Selecione</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Outro">Outro</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Cargo</Form.Label>
            <Form.Control
              type="text"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
            />
          </Form.Group>

          <div className="d-flex gap-2">
            <Button
              type="submit"
              variant={editingUser ? "primary" : "success"}
            >
              {editingUser ? "Salvar Alterações" : "Cadastrar"}
            </Button>
            {editingUser && (
              <Button variant="secondary" onClick={resetForm}>
                Cancelar Edição
              </Button>
            )}
          </div>
        </Form>
      </Container>
    </Layout>
  );
}

export default Usuarios;
