import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Ingresos from './pages/Ingresos';
import Gastos from './pages/Gastos';
import Presupuestos from './pages/Presupuestos';
import Reportes from './pages/Reportes';
import './styles/main.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="ingresos" element={<Ingresos />} />
                    <Route path="gastos" element={<Gastos />} />
                    <Route path="presupuestos" element={<Presupuestos />} />
                    <Route path="reportes" element={<Reportes />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;