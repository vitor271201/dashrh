import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
    return (
        <div>
            <Header />

            <div className="d-flex">
                {/* Sidebar fixa na lateral */}
                <Sidebar />

                {/* Conteúdo principal */}
                <div className="flex-grow-1 p-4" style={{ marginLeft: "220px", marginTop: "60px" }}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;
