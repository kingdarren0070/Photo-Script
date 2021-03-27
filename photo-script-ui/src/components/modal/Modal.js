import React from 'react';
import styles from './Modal.module.scss';

const Modal = ({message, yesHandler, noHandler, open}) => {
    return (
        <div className={styles.modalWrapper} style = {{ transform: open ? 'translateY(0vh)' : 'translateY(-100vh)', opacity: open ? '1' : '0' }}>
            <div className={styles.modalContent}>
                <div className={styles.modalBody}>
                    <h1>{message}</h1>
                </div>
                <div className={styles.buttons}>
                    <button onClick = {yesHandler}>Yes</button>
                    <button onClick = {noHandler}>No</button>
                </div>
            </div>
        </div>
    )
}

export default Modal;