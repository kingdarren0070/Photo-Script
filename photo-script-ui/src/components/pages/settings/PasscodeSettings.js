import React, { useState } from 'react'
import { axiosCall } from '../../../utils/axiosCall';
import styles from './Settings.module.scss'

const PasscodeSettings = () => {

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const setters = { current: setCurrentPassword, new: setNewPassword, confirm: setConfirmPassword }

  const id = sessionStorage.getItem("userId");

  const changePassword = () => {
    return axiosCall(
      "put",
      `http://localhost:8080/users/edit/${id}`,
      { id, username: sessionStorage.getItem('userEmail'), password: newPassword }
    ).then(() => {
      Object.values(setters).forEach((setter) => {
        setter("");
      })
      setSuccess(true);
      setError("");
    }).catch(() => { setError("Unexpected error occured, please try your request again later") })
  }

  const handleSubmit = (e) => {
    setSuccess(false);
    setError("");
    e.preventDefault();
    console.log(id)
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required")
    } else if (newPassword !== confirmPassword) {
      setError("New Password does not match confirm password");
    } else (
      axiosCall("post", 'http://localhost:8080/login', { username: sessionStorage.getItem("userEmail"), password: currentPassword })
        .then(() =>
          changePassword()
        ).catch(() => setError("Incorrect current password")))
  }

  const handleChange = ({ target: { name, value } }) => {
    setters[name](value);
  }

  return (
    <div>
      <form>
        {success && <p className={styles.success}>Password has been successfully changed!</p>}
        {error && <p className={styles.error}>{error}</p>}
        <p className={styles.formHeading}>Change Passcode</p>
        <input className={styles.formInput} onChange={handleChange} value={currentPassword || ""} name="current" type="password" placeholder="Current Password"></input>
        <input className={styles.formInput} onChange={handleChange} value={newPassword || ""} name="new" type="password" placeholder="New Password"></input>
        <input className={styles.formInput} onChange={handleChange} value={confirmPassword || ""} name="confirm" type="password" placeholder="Confirm Password"></input>
        <button type="submit" onClick={handleSubmit} className={styles.formButton}>Change</button>
      </form>
    </div>
  )
}

export default PasscodeSettings