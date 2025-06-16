import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import "../styles/index.css";
import axios from "axios";

function Dashboard() {
  const [totalFuncionarios, setTotalFuncionarios] = useState(0);
  const [totalAvisos, setTotalAvisos] = useState(0);
  const [totalMetas, setTotalMetas] = useState(0);
  const [totalEventos, setTotalEventos] = useState(0);
  const [ultimoAviso, setUltimoAviso] = useState(null);
  const [ultimaMeta, setUltimaMeta] = useState(null);

  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const resUsuarios = await axios.get("http://localhost:3001/usuarios");
        setTotalFuncionarios(resUsuarios.data.length);

        const resAvisos = await axios.get("http://localhost:3001/avisos");
        setTotalAvisos(resAvisos.data.length);

        const resMetas = await axios.get("http://localhost:3001/metas");
        setTotalMetas(resMetas.data.length);

        const resEventos = await axios.get("http://localhost:3001/eventos");
        setTotalEventos(resEventos.data.length);
      } catch (error) {
        console.error("Erro ao buscar totais:", error);
      }
    };

    const fetchUltimos = async () => {
      try {
        const resUltimoAviso = await axios.get("http://localhost:3001/avisos/ultimo");
        setUltimoAviso(resUltimoAviso.data);

        const resUltimaMeta = await axios.get("http://localhost:3001/metas/ultimo");
        setUltimaMeta(resUltimaMeta.data);
      } catch (error) {
        console.error("Erro ao buscar últimos dados:", error);
      }
    };

    fetchTotals();
    fetchUltimos();
  }, []);

  return (
    <Layout>
      {/* Blocos superiores */}
      <section className="dashboard-blocks">
        <div className="block">
          Total de funcionários
          <br />
          {totalFuncionarios}
        </div>
        <div className="block">
          Total de avisos
          <br />
          {totalAvisos}
        </div>
        <div className="block">
          Total de metas
          <br />
          {totalMetas}
        </div>
        <div className="block">
          Total de eventos
          <br />
          {totalEventos}
        </div>
      </section>

      {/* Container extra removido */}

      {/* Dois containers inferiores do mesmo tamanho */}
      <div
        className="dashboard-lower-section"
        style={{ gap: "30px", justifyContent: "space-between" }}
      >
        <div
          style={{
            flex: 1,
            backgroundColor: "#fff",
            border: "1px solid #cccccc",
            borderRadius: "6px",
            padding: "20px",
            boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
            minHeight: "30vh",
            marginRight: "15px",
          }}
        >
          <h5>Última Meta</h5>
          {ultimaMeta ? (
            <>
              <p><strong>Descrição:</strong> {ultimaMeta.descricao || "Sem descrição"}</p>
              <p><strong>Status:</strong> {ultimaMeta.status || "Desconhecido"}</p>
              <p><strong>Data:</strong> {ultimaMeta.data ? new Date(ultimaMeta.data).toLocaleDateString() : "Sem data"}</p>
              <p><strong>Responsável:</strong> {ultimaMeta.nome || "Desconhecido"}</p>
            </>
          ) : (
            <p>Nenhuma meta encontrada.</p>
          )}
        </div>

        <div
          style={{
            flex: 1,
            backgroundColor: "#fff",
            border: "1px solid #cccccc",
            borderRadius: "6px",
            padding: "20px",
            boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
            minHeight: "30vh",
            marginLeft: "15px",
          }}
        >
          <h5>Último Aviso</h5>
          {ultimoAviso ? (
            <>
              <p><strong>Descrição:</strong> {ultimoAviso.descricao || "Sem descrição"}</p>
              <p><strong>Autor:</strong> {ultimoAviso.nome || "Desconhecido"}</p>
            </>
          ) : (
            <p>Nenhum aviso encontrado.</p>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
