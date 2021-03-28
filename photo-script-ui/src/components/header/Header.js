import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MainContext } from '../context/MainContext';
import styles from './Header.module.scss';

function Header () {
    const {loggedIn, setLoggedIn} = useContext(MainContext);

    useEffect(() => {
        if(sessionStorage.getItem('jwt')) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, [setLoggedIn])

    const handleLogout = () => {
        setLoggedIn(false);
        sessionStorage.clear();
    };

    return (
        <nav className={styles.bar}>
            <Link className={styles.title} to="/"><p>PhotoScript</p></Link>
            {loggedIn
            ?
            (
                <ul className={styles.navLinks}>
                    <Link className={styles.links} activeStyle={{ textDecoration: 'underline' }} to={`/profile/${sessionStorage.getItem("userId")}`}>Profile</Link>
                    <Link className={styles.links} to="/" onClick={handleLogout}>Logout</Link>
                </ul>
            )
            :
            (
                <ul className={styles.navLinks}>
                    <Link className={styles.links} to="/login">Login</Link>
                    <Link className={styles.links} to="/registration">Register</Link>
                </ul>
            )}
        </nav>
    );
}

export default Header;