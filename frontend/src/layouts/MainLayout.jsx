import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/shared/Sidebar';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';

const MainLayout = () => {
    return (
        <div className="app">
            <Sidebar />
            <div className="main-content">
                <Header title="Gestor de Finanzas Personales" />
                <main style={{ paddingTop: '60px', minHeight: 'calc(100vh - 120px)' }}>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default MainLayout;