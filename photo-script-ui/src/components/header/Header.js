import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { MainContext } from '../context/MainContext';
import styles from './Header.module.scss';

function Header () {
    const {loggedIn, setLoggedIn} = useContext(MainContext);

    const handleLogout = () => {
        setLoggedIn(false);
        sessionStorage.clear();
    };

    return (
        <nav className={styles.bar}>
            <Link className={styles.title} to="/"><p>PhotoScript</p></Link>
            {loggedIn
            ? (
                <ul className={styles.navLinks}>
                    <NavLink className={styles.links} activeStyle={{ textDecoration: 'underline' }} to={`/profile/${sessionStorage.getItem("userId")}`}>Profile</NavLink>
                    <Link className={styles.links} to="/" onClick={handleLogout}>Logout</Link>
                </ul>
            )
            : (
                <ul className={styles.navLinks}>
                    <Link className={styles.links} to="/login">Login</Link>
                    <Link className={styles.links} to="/registration">Register</Link>
                </ul>
            )}
        </nav>
    );
}

export default Header;