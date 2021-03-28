import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { axiosCall } from '../../../utils/axiosCall';
import { MainContext } from '../../context/MainContext';
import LoadingSpinner from '../../loadingSpinner/LoadingSpinner';
import styles from './Library.module.scss';

function Library() {
  const { setImage } = useContext(MainContext);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState(false);

  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    const getImages = async () => {
      await axiosCall('get', `http://localhost:8080/images/userId/${sessionStorage.getItem("userId")}`)
        .then((res) => {
          setImages(res.data)
          if (res.data.length === 0) {
            setNotice("No Images Found!")
          }
          setLoading(false)
        })
        .catch(() => {
          setNotice("Could not process request")
        });
    }

    if (sessionStorage.getItem("userId")) {
      getImages();
    } else {
      setNotice("You must be logged in to save images to your library");
      setLoading(false);
    }
  }, []);

  const handleClick = (imgData, id) => {
    setImage(imgData);
    history.push(`/edit/${id}`);
  }

  return (
    <div>
      <nav className={styles.bar}>
        <ul className={styles.navLinks1}>
          <Link className={styles.links} to="/new">New</Link>
        </ul>
        <ul className={styles.navLinks2}>
          <Link className={styles.links} to="/library">Library</Link>
          <Link className={styles.links} to="/settings">Settings</Link>
        </ul>
      </nav>
      <div className={styles.mainContainer}>
        <div className={styles.titleContainer}>
          <p className={styles.title}>Your Library</p>
        </div>
        {notice && <p className={styles.noContent}>{notice}</p>}
        {loading ? <LoadingSpinner />
          :
          <div className={styles.imageContainer}>
            {images.length !== 0 && images.map((image) => (<img className={styles.image} src={image.imgData} alt="" onClick={() => handleClick(image.imgData, image.id)} />))}
          </div>
        }
      </div>
    </div>
  )
}

export default Library;