import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/shared/Card';
import Button from '../components/shared/Button';

const API_URL = 'http://localhost:5007/api/transacciones';

const Ingresos = () => {
    const [ingresos, setIngresos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [formData, setFormData] = useState({
        tipo: 'Ingreso',
        categoria: '',
        monto: '',
        descripcion: '',
        fecha: new Date().toISOString().split('T')[0]
    });

    // Cargar ingresos al iniciar
    useEffect(() => {
        cargarIngresos();
    }, []);

    const cargarIngresos = async () => {
        try {
            setLoading(true);
            const response = await axios.get(API_URL);
            // Filtrar solo ingresos
            const soloIngresos = response.data.filter(t => t.tipo === 'Ingreso');
            setIngresos(soloIngresos);
            setError('');
        } catch (err) {
            setError('Error al cargar los ingresos');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post(API_URL, {
                tipo: 'Ingreso',
                categoria: formData.categoria,
                monto: parseFloat(formData.monto),
                descripcion: formData.descripcion,
                fecha: formData.fecha
            });

            setSuccess('¡Ingreso registrado exitosamente!');
            setFormData({
                tipo: 'Ingreso',
                categoria: '',
                monto: '',
                descripcion: '',
                fecha: new Date().toISOString().split('T')[0]
            });
            cargarIngresos(); // Recargar la lista
        } catch (err) {
            setError(err.response?.data?.message || 'Error al registrar ingreso');
            console.error(err);
        }
    };

    const eliminarIngreso = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este ingreso?')) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                setSuccess('Ingreso eliminado correctamente');
                cargarIngresos();
            } catch (err) {
                setError('Error al eliminar el ingreso');
                console.error(err);
            }
        }
    };

    if (loading) return <div>Cargando...</div>;

    return (
        <div>
            <h2 style={{ marginBottom: '20px' }}>Registro de Ingresos</h2>

            {error && <div style={{ color: 'red', padding: '10px', marginBottom: '10px', backgroundColor: '#ffe6e6', borderRadius: '5px' }}>{error}</div>}
            {success && <div style={{ color: 'green', padding: '10px', marginBottom: '10px', backgroundColor: '#e6ffe6', borderRadius: '5px' }}>{success}</div>}

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
                                min="0.01"
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
                            {ingresos.length === 0 ? (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center' }}>No hay ingresos registrados</td>
                                </tr>
                            ) : (
                                ingresos.map(ingreso => (
                                    <tr key={ingreso.id}>
                                        <td>{new Date(ingreso.fecha).toLocaleDateString()}</td>
                                        <td>{ingreso.categoria}</td>
                                        <td>{ingreso.descripcion}</td>
                                        <td>${ingreso.monto.toFixed(2)}</td>
                                        <td>
                                            <button
                                                onClick={() => eliminarIngreso(ingreso.id)}
                                                style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}
                                            >
                                                🗑️ Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </Card>
            </div>
        </div>
    );
};

export default Ingresos;