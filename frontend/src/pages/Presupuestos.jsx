import React from 'react';
import Card from '../components/shared/Card';

const Presupuestos = () => {
    const presupuestos = [
        { categoria: 'Alimentación', asignado: 5000, gastado: 3200, restante: 1800 },
        { categoria: 'Transporte', asignado: 2000, gastado: 850, restante: 1150 },
        { categoria: 'Entretenimiento', asignado: 1500, gastado: 1200, restante: 300 }
    ];

    return (
        <div>
            <h2 style={{ marginBottom: '20px' }}>Presupuestos por Categoría</h2>
            <Card title="Resumen de Presupuestos">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Categoría</th>
                            <th>Asignado</th>
                            <th>Gastado</th>
                            <th>Restante</th>
                        </tr>
                    </thead>
                    <tbody>
                        {presupuestos.map((item, index) => (
                            <tr key={index}>
                                <td>{item.categoria}</td>
                                <td>${item.asignado}</td>
                                <td>${item.gastado}</td>
                                <td>${item.restante}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    );
};

export default Presupuestos;