import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/shared/Card';
import Button from '../components/shared/Button';
import { Line, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const Dashboard = () => {
    const [transacciones, setTransacciones] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTransacciones();
    }, []);

    const fetchTransacciones = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/transacciones');
            setTransacciones(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
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

    // Datos para gráfico de línea (últimos 7 días)
    const lineChartData = {
        labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
        datasets: [
            {
                label: 'Ingresos',
                data: [1200, 1900, 800, 2100, 1500, 1800, 2000],
                borderColor: '#2ecc71',
                backgroundColor: 'rgba(46, 204, 113, 0.1)',
                tension: 0.4
            },
            {
                label: 'Gastos',
                data: [800, 1100, 600, 900, 1000, 700, 900],
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                tension: 0.4
            }
        ]
    };

    // Datos para gráfico de dona (gastos por categoría)
    const doughnutData = {
        labels: ['Alimentación', 'Transporte', 'Entretenimiento', 'Servicios', 'Salud'],
        datasets: [
            {
                data: [30, 15, 20, 25, 10],
                backgroundColor: [
                    '#2ecc71',
                    '#3498db',
                    '#f39c12',
                    '#e74c3c',
                    '#9b59b6'
                ]
            }
        ]
    };

    const lineChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            }
        }
    };

    return (
        <div>
            <h2 style={{ marginBottom: '20px' }}>Dashboard</h2>
            
            {/* Tarjetas de estadísticas */}
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Balance Total</h3>
                    <div className="value">${balance.toFixed(2)}</div>
                </div>
                <div className="stat-card" style={{ background: 'linear-gradient(135deg, #2ecc71, #27ae60)' }}>
                    <h3>Ingresos</h3>
                    <div className="value">${totalIngresos.toFixed(2)}</div>
                </div>
                <div className="stat-card" style={{ background: 'linear-gradient(135deg, #e74c3c, #c0392b)' }}>
                    <h3>Gastos</h3>
                    <div className="value">${totalGastos.toFixed(2)}</div>
                </div>
                <div className="stat-card" style={{ background: 'linear-gradient(135deg, #3498db, #2980b9)' }}>
                    <h3>Transacciones</h3>
                    <div className="value">{transacciones.length}</div>
                </div>
            </div>

            {/* Gráficos */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
                <Card title="Evolución de Finanzas">
                    <div style={{ height: '300px' }}>
                        <Line data={lineChartData} options={lineChartOptions} />
                    </div>
                </Card>

                <Card title="Gastos por Categoría">
                    <div style={{ height: '300px' }}>
                        <Doughnut data={doughnutData} />
                    </div>
                </Card>
            </div>

            {/* Últimas transacciones */}
            <Card title="Últimas Transacciones">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Tipo</th>
                            <th>Categoría</th>
                            <th>Descripción</th>
                            <th>Monto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transacciones.slice(0, 5).map(transaccion => (
                            <tr key={transaccion.id}>
                                <td>{new Date(transaccion.fecha).toLocaleDateString()}</td>
                                <td>
                                    <span style={{ 
                                        color: transaccion.tipo === 'Ingreso' ? '#2ecc71' : '#e74c3c',
                                        fontWeight: 'bold'
                                    }}>
                                        {transaccion.tipo}
                                    </span>
                                </td>
                                <td>{transaccion.categoria}</td>
                                <td>{transaccion.descripcion}</td>
                                <td>${transaccion.monto.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div style={{ marginTop: '15px', textAlign: 'right' }}>
                    <Button variant="primary">Ver todas</Button>
                </div>
            </Card>
        </div>
    );
};

export default Dashboard;