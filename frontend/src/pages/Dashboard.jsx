import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/shared/Card';
import { Line, Doughnut } from 'react-chartjs-2';

const API_URL = 'http://localhost:5007/api/transacciones';

const Dashboard = () => {
    const [transacciones, setTransacciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        try {
            setLoading(true);
            const response = await axios.get(API_URL);
            setTransacciones(response.data);
            setError('');
        } catch (err) {
            setError('Error al cargar los datos');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Calcular estadísticas
    const totalIngresos = transacciones
        .filter(t => t.tipo === 'Ingreso')
        .reduce((sum, t) => sum + t.monto, 0);

    const totalGastos = transacciones
        .filter(t => t.tipo === 'Gasto')
        .reduce((sum, t) => sum + t.monto, 0);

    const balance = totalIngresos - totalGastos;

    // Datos para gráficos
    const gastosPorCategoria = () => {
        const gastos = transacciones.filter(t => t.tipo === 'Gasto');
        const categorias = {};
        gastos.forEach(g => {
            categorias[g.categoria] = (categorias[g.categoria] || 0) + g.monto;
        });
        return {
            labels: Object.keys(categorias),
            datasets: [{
                data: Object.values(categorias),
                backgroundColor: ['#2ecc71', '#3498db', '#f39c12', '#e74c3c', '#9b59b6']
            }]
        };
    };

    if (loading) return <div>Cargando datos financieros...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;

    return (
        <div>
            <h2>Dashboard Financiero</h2>

            {/* Tarjetas de estadísticas */}
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Balance Total</h3>
                    <div className="value">${balance.toFixed(2)}</div>
                </div>
                <div className="stat-card" style={{ background: '#2ecc71' }}>
                    <h3>Ingresos</h3>
                    <div className="value">${totalIngresos.toFixed(2)}</div>
                </div>
                <div className="stat-card" style={{ background: '#e74c3c' }}>
                    <h3>Gastos</h3>
                    <div className="value">${totalGastos.toFixed(2)}</div>
                </div>
                <div className="stat-card" style={{ background: '#3498db' }}>
                    <h3>Transacciones</h3>
                    <div className="value">{transacciones.length}</div>
                </div>
            </div>

            {/* Gráficos */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <Card title="Gastos por Categoría">
                    <Doughnut data={gastosPorCategoria()} />
                </Card>
                <Card title="Últimas Transacciones">
                    <table className="table">
                        <thead>
                            <tr><th>Fecha</th><th>Tipo</th><th>Categoría</th><th>Monto</th></tr>
                        </thead>
                        <tbody>
                            {transacciones.slice(0, 5).map(t => (
                                <tr key={t.id}>
                                    <td>{new Date(t.fecha).toLocaleDateString()}</td>
                                    <td>{t.tipo}</td>
                                    <td>{t.categoria}</td>
                                    <td>${t.monto.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;