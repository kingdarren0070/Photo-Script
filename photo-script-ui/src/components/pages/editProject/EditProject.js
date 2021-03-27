import React, { useState, useContext } from 'react';
import { MainContext } from '../../context/MainContext';
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
    const { image } = useContext(MainContext);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
    const [options, setOptions] = useState(defaultOptions);
    const selectedOption = options[selectedOptionIndex];

    const handleChange = (e) => {
        setOptions(prevOptions => {
            return prevOptions.map((option, index) => {
                if(index !== selectedOptionIndex) return option
                return { ...option, value: e.target.value}
            })
        })
    }

    function getImageStyle() {
        const filters = options.map(option => {
            return `${option.property}(${option.value})${option.unit})`
        })

        return {
            backgroundImage: `url("${image}")`, 
            filter: filters.join(' ') }
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.sideBar}>
                {/* {defaultOptions.map((option, index) => {
                    return (
                        <SidebarItem
                            key={index}
                            name={option.name}
                            active={index === selectedOptionIndex}
                            handleClick={() => setSelectedOptionIndex(index)}
                        />
                    )
                })} */}
            </div>
            <div className={styles.image} style={ getImageStyle() } />
        </div>
    )
}

export default EditProject;