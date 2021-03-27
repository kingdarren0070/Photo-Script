import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { MainContext } from '../context/MainContext';
import styles from './Header.module.scss';

function Header () {
    const {loggedIn, userId, setLoggedIn} = useContext(MainContext);

    const handleLogout = () => {
        setLoggedIn(false);
        sessionStorage.clear();
    };

    return (
        <nav className={styles.bar}>
            <h1 className={styles.title}>PhotoScript</h1>
            {loggedIn
            ? (
                <ul className={styles.navLinks}>
                    <NavLink className={styles.links} activeStyle={{ textDecoration: 'underline' }} to={`/profile/${userId}`}>Profile</NavLink>
                    <Link className={styles.links} to="/" onClick={handleLogout}>Logout</Link>
                </ul>
            )
            : (
                <ul className={styles.navLinks}>
                    <Link className={styles.links} to="/">Login</Link>
                    <Link className={styles.links} to="/registration">Register</Link>
                </ul>
            )}
        </nav>
    );
}

export default Header;