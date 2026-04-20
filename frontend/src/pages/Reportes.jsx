import React from 'react';
import Card from '../components/shared/Card';
import Button from '../components/shared/Button';

const Reportes = () => {
    return (
        <div>
            <h2 style={{ marginBottom: '20px' }}>Reportes Financieros</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <Card title="Reporte Mensual">
                    <p>Resumen de ingresos y gastos del mes</p>
                    <Button variant="primary">Generar PDF</Button>
                </Card>
                <Card title="Reporte por Categorías">
                    <p>Análisis de gastos por categoría</p>
                    <Button variant="primary">Ver Detalle</Button>
                </Card>
            </div>
        </div>
    );
};

export default Reportes;