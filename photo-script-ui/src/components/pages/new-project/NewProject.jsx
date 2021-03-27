import React, { useContext, useState } from 'react';
import styles from './NewProject.module.scss'
import { FaFileUpload } from 'react-icons/fa' 
import { MainContext } from '../../context/MainContext';

const NewProject = () => {
  
  const {
    setImage
  } = useContext(MainContext);

  const [error, setError] = useState();

  const dragOverHandler = e => {
    e.preventDefault();
    console.log("dragged over")
  }

  const onDropHandler = e => {
    setError(false)
    e.preventDefault();
    const file = e.dataTransfer.files[0]
    const byteArray = [];
    if (file.type.startsWith('image')) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = (evt) => {
        if(evt.target.readyState === FileReader.DONE) {
          const arrayBuffer = evt.target.result;
          const array = new Uint8Array(arrayBuffer);
          array.map((byte) => byteArray.push(byte));
          setImage(byteArray);
        }
      }
    }
  }

  const onImageUploadHandler = e => {
    setError(false)
    console.log('image uploaded')
    e.preventDefault();
    const file = e.target.files[0];
    console.log(file)
    if (file.type.startsWith('image')) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        console.log(reader.result)
      }
    } else {
      setError(true)
    }
  }

  return(
    <div className={styles.mainContainer}>
      <div className={styles.subContainer}>
        {error && 'Error'}
        <div
          className={styles.uploadBoxDropZone}
          onDragOver={dragOverHandler}
          onDrop={onDropHandler}
        >
          <h4 className={styles.uploadBoxDropZoneHeading}>
            Upload your image here
          </h4>
          <FaFileUpload className={styles.uploadBoxDropZoneIcon}/>
        </div>
        <div style={{marginTop:'50px'}}>
          <label
            htmlFor="uploadButton"
            className={styles.uploadButton}
          >
            Upload Your File Here
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
  )
}

export default NewProject;