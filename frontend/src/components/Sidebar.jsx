import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
    const buttonStyle = {
        backgroundColor: "transparent",
        border: "none",
        color: "#000",
        fontWeight: "500",
        textDecoration: "none",
    };

    const buttonHoverStyle = {
        backgroundColor: "transparent",
        color: "purple", // cor roxa no hover
    };

    return (
        <div
            className="bg-white border-end position-fixed d-flex flex-column justify-content-between"
            style={{
                width: "220px",
                height: "100vh",
                top: "0",
                left: "0",
                paddingTop: "100px", // altura atual do Header
                zIndex: 1000,
                overflowY: "hidden",
            }}
        >
            <div>
                {/* Seção de Perfil */}
                <div className="d-flex align-items-center px-3 mb-3">
                    <img
                        src="/alexperfil.PNG"
                        alt="Foto de perfil"
                        className="rounded-circle me-2"
                        style={{ width: "48px", height: "48px", objectFit: "cover" }}
                    />
                    <div>
                        <strong>Alex</strong>
                        <br />
                        <small className="text-muted">Coordenador</small>
                    </div>
                </div>

                {/* Linha separadora */}
                <hr className="my-2 mx-0" style={{ borderColor: "#999" }} />

                {/* Navegação */}
                <nav className="nav flex-column px-3">
                    {[
                        { to: "/dashboard", label: "Dashboard", icon: "/dashboard.PNG" },
                        { to: "/usuarios", label: "Funcionários", icon: "/jornada.PNG" },
                        { to: "/avisos", label: "Avisos", icon: "/avisos.PNG" },
                        { to: "/metas", label: "Metas", icon: "/metas.PNG" },
                        { to: "/calendario", label: "Calendário", icon: "/calendario.PNG" },
                    ].map((item, index) => (
                        <Link
                            to={item.to}
                            key={index}
                            className="d-flex align-items-center mb-2 gap-2 sidebar-link"
                            style={buttonStyle}
                            onMouseOver={(e) => Object.assign(e.currentTarget.style, buttonHoverStyle)}
                            onMouseOut={(e) => Object.assign(e.currentTarget.style, buttonStyle)}
                        >
                            <img src={item.icon} alt="" style={{ width: "32px" }} />
                            {item.label}
                        </Link>
                    ))}

                    {/* Linha separadora entre Calendário e Perfil */}
                    <hr className="my-2 mx-0" style={{ borderColor: "#999" }} />

                    {[ // restante dos botões depois da linha
                        { to: "/perfil", label: "Perfil", icon: "/perfil.PNG" },
                        { to: "/", label: "Sair", icon: "/ajustes.PNG" },
                    ].map((item, index) => (
                        <Link
                            to={item.to}
                            key={"after-" + index}
                            className="d-flex align-items-center mb-2 gap-2 sidebar-link"
                            style={buttonStyle}
                            onMouseOver={(e) => Object.assign(e.currentTarget.style, buttonHoverStyle)}
                            onMouseOut={(e) => Object.assign(e.currentTarget.style, buttonStyle)}
                        >
                            <img src={item.icon} alt="" style={{ width: "32px" }} />
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
