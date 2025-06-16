import React from "react";
import { Navbar, Container } from "react-bootstrap";

function Header() {
    return (
        <Navbar
            bg="white"
            variant="dark"
            expand="lg"
            fixed="top"
            className="custom-navbar-border"
        >
            <Container fluid className="px-0 mx-0">
                <Navbar.Brand href="#">
                    <img src="/logo.PNG" alt="Logo" className="dashboard-logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <div className="dashboard-search-wrapper">
                        <img
                            src="/lupaia.PNG"
                            alt="Ícone esquerdo"
                            className="search-icon-left"
                        />
                        <input
                            type="text"
                            placeholder="Pesquisar..."
                            className="dashboard-search"
                        />
                        <img
                            src="/notificacao.PNG"
                            alt="Ícone direito"
                            className="search-icon-right"
                        />
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
