import React, { useState, useContext } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { axiosCall } from '../../../utils/axiosCall';
import { MainContext } from '../../context/MainContext';
import EditFilter from '../../edit-filter/EditFilter';
import styles from './EditProject.module.scss';

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

function EditProject() {
    const { image, loggedIn } = useContext(MainContext);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
    const [options, setOptions] = useState(defaultOptions);

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
                    .then(() => history.push('/library'));
                }

                editImage();
            } else {
                const newSave = {
                    userId: sessionStorage.getItem("userId"),
                    imgData: dt
                }

                const saveImage = async () => {
                    await axiosCall('post', 'http://localhost:8080/images', newSave)
                        .then(() => history.push('/library'));
                }
    
                saveImage();
            }
        }
    }

    // creating shapes

    const [mouseDownXCoords, setMouseDownXCoords] = useState(0);
    const [mouseDownYCoords, setMouseDownYCoords] = useState(0);
    const [mouseUpXCoords, setMouseUpXCoords] = useState(0);
    const [mouseUpYCoords, setMouseUpYCoords] = useState(0);

    const handleShapeMouseDown = async evt => {
        // console.log(evt)
        // console.log(evt.nativeEvent)
        console.log(evt.nativeEvent.offsetX)
        await setMouseDownXCoords(evt.nativeEvent.offsetX)
        console.log(evt.nativeEvent.offsetY)
        await setMouseDownYCoords(evt.nativeEvent.offsetY)
    }

    const handleShapeMouseUp = async evt => {
        // console.log(evt)
        // console.log(evt.nativeEvent)
        console.log(evt.nativeEvent.offsetX)
        await setMouseUpXCoords(evt.nativeEvent.offsetX)
        console.log(evt.nativeEvent.offsetY)
        await setMouseUpYCoords(evt.nativeEvent.offsetY)
        // await createRectangle();
    }

    const createRectangle = () => {
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext('2d');
        let image = document.getElementById("image");
        canvas.setAttribute('width', image.width)
        canvas.setAttribute('width', image.height)
        canvas.setAttribute('border', '1px solid black')
        ctx.beginPath()
        ctx.rect(0, 0, 50, 50)
        ctx.stroke()
        console.log('rectangle drawn')
    }

    return (
        <div>
            <nav className={styles.bar}>
                <ul className={styles.navLinks1}>
                    <Link className={styles.links} to="/new">New</Link>
                    <p className={styles.links} onClick={handleDownload}>Download</p>
                    <p className={styles.links} onClick={handleSave}>Save</p>
                </ul>
                <ul className={styles.navLinks2}>
                  <Link className={styles.links} to="/library">Library</Link>
                  <Link className={styles.links} to="/settings">Settings</Link>
                </ul>
            </nav>
            <div className={styles.mainContainer}>
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
                <div
                    className={styles.imageContainer}
                    onMouseDown={handleShapeMouseDown}
                    onMouseUp={handleShapeMouseUp}
                    onWheel={(e) => console.log(e)}
                >
                    <div className={styles.imageContainer2}>
                        {/* <canvas id="canvas" /> */}
                        <img draggable='false' id="image" alt="" src={image} className={styles.image} style={getImageStyle()}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProject;