import React, { useContext } from 'react';
import styles from './NewProject.module.scss'
import { FaFileUpload } from 'react-icons/fa' 
import { MainContext } from '../context/MainContext';

const NewProject = () => {
  
  const {
    image, setImage
  } = useContext(MainContext);

  const dragOverHandler = e => {
    e.preventDefault();
    console.log("dragged over")
  }

  const imageUploadHandler = e => {
    e.preventDefault();
    const file = e.dataTransfer.files[0]
    console.log(file)
    console.log(file.type)
    console.log(file.type.startsWith('image'))
    if (file.type.startsWith('image')) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        console.log(reader.result)
      }
    }
  }

  return(
    <div className={styles.mainContainer}>
      <div className={styles.subContainer}>
        <div
          className={styles.uploadBox}
          onDragOver={dragOverHandler}
          onDrop={imageUploadHandler}
        >
          <h4 className={styles.uploadBoxHeading}>
            Upload your image here
          </h4>
          <FaFileUpload className={styles.uploadIcon}/>
        </div>
        <input className={styles.fileUploader} type="file"/>
      </div>
    </div>
  )
}

export default NewProject;