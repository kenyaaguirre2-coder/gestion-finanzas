import React from 'react';
import { FaUser, FaBell } from 'react-icons/fa';

const Header = ({ title }) => {
    return (
        <header className="header">
            <h1>{title}</h1>
            <div className="user-info">
                <FaBell size={20} style={{ cursor: 'pointer' }} />
                <div className="user-avatar">
                    <FaUser />
                </div>
            </div>
        </header>
    );
};

export default Header;