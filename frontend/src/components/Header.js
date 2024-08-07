import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = ({ isLoggedIn, onLogout }) => {
    return (
        <header>
            <h1>Demo Video Sharing App</h1>
            <nav>
                <NavLink to="/">Home</NavLink>
                {isLoggedIn ? (
                    <>
                        <NavLink to="/share">Share Video</NavLink>
                        <button onClick={onLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <NavLink to="/register">Register</NavLink>
                        <NavLink to="/login">Login</NavLink>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
