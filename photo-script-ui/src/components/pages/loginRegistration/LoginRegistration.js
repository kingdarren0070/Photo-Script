import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { MainContext } from '../../context/MainContext';
import { axiosCall } from '../../../utils/axiosCall';
import styles from './LoginRegistration.module.scss';
import LoadingSpinner from '../../loadingSpinner/LoadingSpinner';


function LoginRegistration() {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const { setLoggedIn, setUser } = useContext(MainContext);

    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');
    const [login, setLogin] = useState(false);

    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        setLogin(false);
        setCredentials({
            username: '',
            password: ''
        });

        setError('');

        if(sessionStorage.getItem('jwt')) {
            history.push('/library');
        }

        if(location.pathname.split('/')[1] === "login") {
            setLogin(true);
        }

    }, [history, location])

    const handleChange = (e, type) => {
        setCredentials((prevCredentials) => ({ ...prevCredentials, [type]: e.target.value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const loginUser = async () => {
            await axiosCall('post', 'http://localhost:8080/login', credentials)
                .then((res) => {
                    sessionStorage.setItem('jwt', res.data.jwt);
                    setLoggedIn(true);
                    setUser(res.data.user);
                    setLoading(false);
                    history.push('/library');
                })
                .catch(() => {
                    setError('Incorrect email or password');
                    setLoading(false);
                });
        };
        
        if(!login) {
            const createUser = async () => {
                await axiosCall('post', 'http://localhost:8080/users', credentials)
                    .then(() => {
                        loginUser();
                    })
                    .catch(() => {
                        setError('Could not process registration');
                        setLoading(false);
                    })
            }

            createUser();
        } else {
            loginUser();
        }
    }

    return (
        <div className={styles.formContainer}>
            {loading ? <LoadingSpinner />
            :
                <form className={styles.form} onSubmit={handleSubmit}>
                    {login ? <p className={styles.formHeading}>Login</p>
                    :
                        <p className={styles.formHeading}>Registration</p>
                    }
                    {error && <p className={styles.error}>{error}</p>}
                    <input className={styles.formInput} placeholder="Email" value={credentials.username} onChange = {(e) => handleChange(e, "username")} type="email"></input> <br/>
                    <input className={styles.formInput} placeholder="Password" value={credentials.password} onChange = {(e) => handleChange(e, "password")} type="password"></input> <br/>
                    <button className={styles.formButton} type="submit">Submit</button>
                </form>
            }
        </div>
    )
}

export default LoginRegistration;