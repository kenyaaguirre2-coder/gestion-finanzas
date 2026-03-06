import React, { useState } from 'react';
import Card from '../components/shared/Card';
import Button from '../components/shared/Button';

const Ingresos = () => {
    const [ingresos, setIngresos] = useState([
        { id: 1, categoria: 'Salario', monto: 15000, descripcion: 'Salario mensual', fecha: '2026-02-01' },
        { id: 2, categoria: 'Freelance', monto: 3000, descripcion: 'Proyecto web', fecha: '2026-02-05' }
    ]);

    const [formData, setFormData] = useState({
        categoria: '',
        monto: '',
        descripcion: '',
        fecha: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const nuevoIngreso = {
            id: ingresos.length + 1,
            ...formData,
            monto: parseFloat(formData.monto)
        };
        setIngresos([...ingresos, nuevoIngreso]);
        setFormData({ categoria: '', monto: '', descripcion: '', fecha: '' });
    };

    return (
        <div>
            <h2 style={{ marginBottom: '20px' }}>Registro de Ingresos</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
                {/* Formulario */}
                <Card title="Agregar Nuevo Ingreso">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Categoría</label>
                            <select 
                                className="form-control"
                                name="categoria"
                                value={formData.categoria}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Seleccionar...</option>
                                <option value="Salario">Salario</option>
                                <option value="Freelance">Freelance</option>
                                <option value="Inversiones">Inversiones</option>
                                <option value="Negocios">Negocios</option>
                                <option value="Otros">Otros</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Monto ($)</label>
                            <input
                                type="number"
                                className="form-control"
                                name="monto"
                                value={formData.monto}
                                onChange={handleInputChange}
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Descripción</label>
                            <input
                                type="text"
                                className="form-control"
                                name="descripcion"
                                value={formData.descripcion}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Fecha</label>
                            <input
                                type="date"
                                className="form-control"
                                name="fecha"
                                value={formData.fecha}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <Button type="submit" variant="primary">Guardar Ingreso</Button>
                    </form>
                </Card>

                {/* Lista de ingresos */}
                <Card title="Lista de Ingresos">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Categoría</th>
                                <th>Descripción</th>
                                <th>Monto</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ingresos.map(ingreso => (
                                <tr key={ingreso.id}>
                                    <td>{ingreso.fecha}</td>
                                    <td>{ingreso.categoria}</td>
                                    <td>{ingreso.descripcion}</td>
                                    <td>${ingreso.monto.toFixed(2)}</td>
                                    <td>
                                        <Button variant="danger" size="small">Eliminar</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            </div>
        </div>
    );
};

export default Ingresos;