import React, { useState, useContext } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { axiosCall } from '../../../utils/axiosCall';
import { MainContext } from '../../context/MainContext';
import EditFilter from '../../edit-filter/EditFilter';
import styles from './EditProject.module.scss';
import Modal from '../../modal/Modal';
import LoadingSpinner from '../../loadingSpinner/LoadingSpinner';

const defaultOptions = [
    {
        name: 'Brightness',
        property: 'brightness',
        value: 100,
        range: {
          min: 0,
          max: 200
        },
        unit: '%'
    },
    {
        name: 'Contrast',
        property: 'contrast',
        value: 100,
        range: {
          min: 0,
          max: 200
        },
        unit: '%'
    },
    {
        name: 'Saturation',
        property: 'saturate',
        value: 100,
        range: {
          min: 0,
          max: 200
        },
        unit: '%'
    },
    {
        name: 'Grayscale',
        property: 'grayscale',
        value: 0,
        range: {
          min: 0,
          max: 100
        },
        unit: '%'
    },
    {
        name: 'Sepia',
        property: 'sepia',
        value: 0,
        range: {
          min: 0,
          max: 100
        },
        unit: '%'
    },
    {
        name: 'Hue Rotate',
        property: 'hue-rotate',
        value: 0,
        range: {
          min: 0,
          max: 360
        },
        unit: 'deg'
    },
    {
        name: 'Blur',
        property: 'blur',
        value: 0,
        range: {
          min: 0,
          max: 20
        },
        unit: 'px'
    }
]

function EditProject(match) {
    const { image, loggedIn } = useContext(MainContext);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
    const [options, setOptions] = useState(defaultOptions);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
        
    const [isDraggingImage, setIsDraggingImage] = useState(false);
    const [prevMouseXPos, setPrevMouseXPos] = useState(0)
    const [prevMouseYPos, setPrevMouseYPos] = useState(0)

    const history = useHistory();
    
    // filtering

    const { id } = useParams();

    const handleChange = (e) => {
        setOptions(prevOptions => {
            return prevOptions.map((option, index) => {
                if(index !== selectedOptionIndex) return option
                return { ...option, value: e.target.value}
            })
        })
    }

    const getImageStyle = () => {
        const filters = options.map(option => {
            return `${option.property}(${option.value}${option.unit})`
        })
    
        return { filter: filters.join(' ') }
    }

    const getFiltersToString = () => {
        const filters = options.map(option => {
            return `${option.property}(${option.value}${option.unit})`
        })

        console.log(filters.join(' '));
        return(filters.join(' '))
    }

    // saving and downloading

    const handleDownload = () => {
        let canvas = document.createElement("canvas");
        let image = document.getElementById("image");
        canvas.width = image.width;
        canvas.height = image.height;
        let ctx = canvas.getContext('2d');
        ctx.filter = getFiltersToString();
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        let dt = canvas.toDataURL('image/png');
        let element = document.createElement('a');
        element.setAttribute('href', dt);
        element.setAttribute('download', 'PhotoScriptImage');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    const handleSave = () => {
        if (loggedIn) {
            setLoading(true);
            let canvas = document.createElement("canvas");
            let image = document.getElementById("image");
            canvas.width = image.width;
            canvas.height = image.height;
            let ctx = canvas.getContext('2d');
            ctx.filter = getFiltersToString();
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            let dt = canvas.toDataURL('image/png');

            if(id) {
                const updateImage = {
                    id,
                    userId: sessionStorage.getItem("userId"),
                    imgData: dt
                }

                const editImage = async () => {
                    await axiosCall('put', `http://localhost:8080/images/edit/${id}`, updateImage)
                    .then(() => {
                        setLoading(false);
                        history.push('/library');
                    })
                    .catch(() => {
                        setLoading(false);
                    })
                }

                editImage();
            } else {
                const newSave = {
                    userId: sessionStorage.getItem("userId"),
                    imgData: dt
                }

                const saveImage = async () => {
                    await axiosCall('post', 'http://localhost:8080/images', newSave)
                        .then(() => {
                            setLoading(false);
                            history.push('/library');
                        });
                }
    
                saveImage();
            }
        }
    }

    const handleCopy = () => {
        if (loggedIn) {
            setLoading(true);
            let canvas = document.createElement("canvas");
            let image = document.getElementById("image");
            canvas.width = image.width;
            canvas.height = image.height;
            let ctx = canvas.getContext('2d');
            ctx.filter = getFiltersToString();
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            let dt = canvas.toDataURL('image/png');

            const newSave = {
                userId: sessionStorage.getItem("userId"),
                imgData: dt
            }

            const saveImage = async () => {
                await axiosCall('post', 'http://localhost:8080/images', newSave)
                    .then(() => {
                        setLoading(false);
                        history.push('/library');
                    });
            }
    
            saveImage();
        }
    }

    const openDeleteModal = () => {
        setShowModal(true);
    }

    const handleNoDelete = () => {
        setShowModal(false);
    }

    const handleDelete = () => {
        setShowModal(false);
        setLoading(true);
        if(id) {
            const deleteImage = async () => {
                await axiosCall('delete', `http://localhost:8080/images/${id}`)
                    .then(() => {
                        setLoading(false);
                        history.push('/library');
                    });
            }

            deleteImage();
        } else if (loggedIn) {
            history.push('/library');
        } else {
            history.push('/new');
        }
    }

    // dragging feature

    const handleImageMouseMove = e => {

        if (isDraggingImage) {

            const newMouseXPos = e.clientX;
            const newMouseYPos = e.clientY;

            // calculate distance mouse moved while 'dragging' element

            const xDif = newMouseXPos - prevMouseXPos;
            const yDif = newMouseYPos - prevMouseYPos;

            // set prev mous x pos

            setPrevMouseXPos(newMouseXPos)
            setPrevMouseYPos(newMouseYPos)

            // move element same distance mouse moved

            e.target.style.top = e.target.offsetTop + yDif + "px"
            e.target.style.left = e.target.offsetLeft + xDif + "px"

        }

    }

    const handleImageMouseDown = async (e) => {

        // get mouse current position

        setPrevMouseXPos(e.clientX)
        setPrevMouseYPos(e.clientY)

        // add the mouse move attribute to element

        setIsDraggingImage(true)

        e.target.style.cursor = 'grabbing'

    }
    
    const handleImageMouseUp = e => {
        setIsDraggingImage(false)
        e.target.style.cursor = 'grab'
    }
    
    // zoom feature

    const zoom = (magnitude, image) => {

        // vars

        let currentImageHeight = image.height;
        let currentImageWidth = image.width;
        let newImageHeight = (image.height * magnitude)
        let newImageWidth = (image.width * magnitude)
        
        // calculate new values

        image.style.top = image.offsetTop - Math.floor((newImageHeight - currentImageHeight)/2) + 'px'
        image.style.left = image.offsetLeft - Math.floor((newImageWidth - currentImageWidth)/2) + 'px'
        image.height = (image.height * magnitude)
        image.width = (image.width * magnitude)

    }

    const handleWheel = (e) => {
        const image = document.getElementById('image')
        image.style.top = image.offsetTop;
        image.style.left = image.offsetLeft
        if (e.deltaY < 0) zoom(.9, image)
        if (e.deltaY > 0) zoom(1.1, image)
    }

    return (
        <div>
            <nav className={styles.bar}>
                <ul className={styles.navLinks1}>
                    <Link className={styles.link} to="/new">New</Link>
                    <p className={styles.link} onClick={handleDownload}>Download</p>
                    {loggedIn && <p className={styles.link} onClick={handleSave}>Save</p>}
                    {loggedIn && <p className={styles.link} onClick={handleCopy}>Save Copy</p>}
                    {loggedIn && <p className={styles.link} onClick={openDeleteModal}>Delete</p>}
                </ul>
                <ul className={styles.navLinks2}>
                  <Link className={styles.link} to="/library">Library</Link>
                  <Link className={styles.link} to="/settings">Settings</Link>
                </ul>
            </nav>
            <div className={styles.mainContainer}>
                {loading && <LoadingSpinner />}
                <div className={styles.sideBar}>
                    {
                        options.map((filter, index) => (
                            <EditFilter
                                key={index}
                                name={filter.name}
                                min={filter.range.min}
                                max={filter.range.max}
                                value={filter.value}
                                handleChange={handleChange}
                                active={index === selectedOptionIndex}
                                handleClick={() => setSelectedOptionIndex(index)}
                            />
                        ))
                    }
                </div>
                <div className={styles.imageContainer}>
                    <div className={styles.imageContainer2} onWheel={handleWheel}>
                        <img
                            draggable='false'
                            id="image" alt=""
                            src={image}
                            className={styles.image}
                            style={getImageStyle()}
                            onMouseDown={handleImageMouseDown}
                            onMouseUp={handleImageMouseUp}
                            onMouseMove={handleImageMouseMove}
                        />
                    </div>
                </div>
            </div>
            <Modal
                message="Are you sure you want to delete this image?"
                yesHandler={handleDelete}
                noHandler={handleNoDelete}
                open={showModal}
            />
        </div>
    )
}

export default EditProject;