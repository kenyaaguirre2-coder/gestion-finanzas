import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
    FaHome, 
    FaMoneyBillWave, 
    FaShoppingCart, 
    FaChartPie, 
    FaFileAlt,
    FaCog 
} from 'react-icons/fa';

const Sidebar = () => {
    const menuItems = [
        { path: '/', icon: <FaHome />, label: 'Dashboard' },
        { path: '/ingresos', icon: <FaMoneyBillWave />, label: 'Ingresos' },
        { path: '/gastos', icon: <FaShoppingCart />, label: 'Gastos' },
        { path: '/presupuestos', icon: <FaChartPie />, label: 'Presupuestos' },
        { path: '/reportes', icon: <FaFileAlt />, label: 'Reportes' },
        { path: '/configuracion', icon: <FaCog />, label: 'Configuración' }
    ];

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h2>Finanzas Personales</h2>
                <p>v1.0.0</p>
            </div>
            <ul className="sidebar-nav">
                {menuItems.map((item, index) => (
                    <li key={index}>
                        <NavLink 
                            to={item.path}
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;