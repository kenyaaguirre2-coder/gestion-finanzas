import React, { useState } from 'react';
import Card from '../components/shared/Card';
import Button from '../components/shared/Button';

const Gastos = () => {
    const [gastos, setGastos] = useState([
        { id: 1, categoria: 'Alimentación', monto: 2500, descripcion: 'Supermercado', fecha: '2026-02-10' },
        { id: 2, categoria: 'Transporte', monto: 500, descripcion: 'Uber', fecha: '2026-02-11' }
    ]);

    return (
        <div>
            <h2 style={{ marginBottom: '20px' }}>Registro de Gastos</h2>
            <Card title="Lista de Gastos">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Categoría</th>
                            <th>Descripción</th>
                            <th>Monto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gastos.map(gasto => (
                            <tr key={gasto.id}>
                                <td>{gasto.fecha}</td>
                                <td>{gasto.categoria}</td>
                                <td>{gasto.descripcion}</td>
                                <td>${gasto.monto.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Button variant="primary">Agregar Gasto</Button>
            </Card>
        </div>
    );
};

export default Gastos;