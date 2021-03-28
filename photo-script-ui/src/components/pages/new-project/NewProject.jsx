import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from './NewProject.module.scss'
import { FaFileUpload } from 'react-icons/fa' 
import { MainContext } from '../../context/MainContext';

const NewProject = () => {
  const history = useHistory();
  const { setImage } = useContext(MainContext);
  const [error, setError] = useState();

  const dragOverHandler = e => {
    e.preventDefault();
  }

  const handleImageUpload = (file) => {
    if (file.type.startsWith('image')) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (evt) => {
        if (evt.target.readyState === FileReader.DONE) {
          setImage(evt.target.result);
          history.push('/edit');
        }
      }
    } else {
      setError(true)
    }
  }

  const onImageDropHandler = e => {
    setError(false)
    e.preventDefault();
    const file = e.dataTransfer.files[0]
    handleImageUpload(file)
  }

  const onImageUploadHandler = e => {
    setError(false)
    e.preventDefault();
    const file = e.target.files[0];
    handleImageUpload(file)
  }

  return(
    <div>
      <nav className={styles.bar}>
        <ul className={styles.navLinks}>
          <Link className={styles.link} to="/library">Library</Link>
          <Link className={styles.link} to="/settings">Settings</Link>
        </ul>
      </nav>
      <div className={styles.mainContainer}>
        <div className={styles.subContainer}>
          {error && 'Error'}
          <div
            className={styles.uploadBoxDropZone}
            onDragOver={dragOverHandler}
            onDrop={onImageDropHandler}
            onClick={() => document.getElementById('uploadButton').click()}
          >
            <div className={styles.uploadBoxDropZoneHeading}>
              Drop Your Image Here
            </div>
            <FaFileUpload className={styles.uploadBoxDropZoneIcon}/>
          </div>
          <div style={{marginTop:'50px'}}>
            <label
              htmlFor="uploadButton"
              className={styles.uploadButton}
            >
              Click to Upload Image
            </label>
            <input
              accept="image/*"
              id="uploadButton"
              type="file"
              hidden
              onChange={onImageUploadHandler}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewProject;