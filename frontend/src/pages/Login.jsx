import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  Form,
  Button,
  Image,
} from "react-bootstrap";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/login", {
        email,
        senha,
      });
      if (res.data.success) {
        navigate("/dashboard");
      } else {
        alert("Login inválido");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEsqueciMinhaSenha = () => {
    alert("Funcionalidade de recuperação em breve.");
  };

  return (
    <>
      <style>{`
        body, html, #root {
          margin: 0; padding: 0; height: 100%;
          overflow-x: hidden;
        }
        .login-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: #fff;
          padding: 0 10px;
        }
        .login-card {
          width: 100%;
          max-width: 600px;
          padding: 2rem;
          background-color: #fff;
          border: none;        /* Remove borda */
          box-shadow: none;    /* Remove sombra */
        }
        .login-card input.form-control {
          width: 100%;
          font-size: 1.1rem;
          padding: 0.75rem 1rem;
          border-color: #000;
          color: #000;
          background-color: #fff;
        }
        .login-card button.btn-dark {
          width: 100%;
          background-color: #000;
          border-color: #000;
          color: #fff;
          padding: 0.75rem 1rem;
          font-size: 1.1rem;
          margin-bottom: 1rem;
          transition: background-color 0.3s ease;
        }
        .login-card button.btn-dark:hover {
          background-color: #333;
          border-color: #333;
        }
      `}</style>

      <Container fluid className="login-container">
        <Image
          src="/logo.PNG"
          alt="Logo"
          style={{ width: 220, marginBottom: 30 }}
          fluid
        />

        <Card className="login-card">
          <Card.Body>
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formSenha" className="mb-4">
                <Form.Control
                  type="password"
                  placeholder="Senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="dark" type="submit">
                Entrar
              </Button>

              <Button variant="dark" onClick={handleEsqueciMinhaSenha}>
                Esqueceu a senha?
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default Login;
