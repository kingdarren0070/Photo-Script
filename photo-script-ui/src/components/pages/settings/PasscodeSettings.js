import React from 'react'
import styles from './Settings.module.scss'

const PasscodeSettings = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div>
      <form>
        <p className={styles.formHeading}>Change Passcode</p>
        <input className={styles.formInput} type="password" placeHolder="Current Password"></input>
        <input className={styles.formInput} type="password" placeHolder="New Password"></input>
        <input className={styles.formInput} type="password" placeHolder="Confirm Password"></input>
        <button type="submit" onClick={handleSubmit} className={styles.formButton}>Change</button>
      </form>
    </div>
  )
}

export default PasscodeSettings