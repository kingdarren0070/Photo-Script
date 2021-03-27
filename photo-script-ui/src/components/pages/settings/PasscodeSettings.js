import React from 'react'
import styles from './Settings.module.scss'

const PasscodeSettings = () => {
  return (
    <div>
      <form>
        <p className={styles.formHeading}>Change Passcode</p>
        <input className={styles.formInput} placeHolder="Current Password"></input>
        <input className={styles.formInput} placeHolder="New Password"></input>
        <input className={styles.formInput} placeHolder="Confirm Password"></input>
        <button className={styles.formButton}>Change</button>
      </form>
    </div>
  )
}

export default PasscodeSettings
