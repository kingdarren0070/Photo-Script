import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './DragAndDropBox.module.scss';

const DragAndDropBox = ({ boxStyles, children }) => {

  let dropRef = React.createRef();

  const handleDragIn = () => {
    console.log("You dragged something in!");
  };

  const handleDragOut = () => {
    console.log("You dragged something out!");
  };
  
  const handleDrop = () => {
    console.log("You dropped something!");
  };

  const handleDrag = () => {
    console.log("You dragged something over me! :O");
  };

  useEffect(() => {
    let div = dropRef.current;
    div.addEventListener('dragenter', handleDragIn)
    div.addEventListener('dragleave', handleDragOut)
    div.addEventListener('dragover', handleDrag)
    div.addEventListener('drop', handleDrop)
    return () => {
      // let div = dropRef.current;  
      div.removeEventListener('dragenter', handleDragIn)
      div.removeEventListener('dragleave', handleDragOut)
      div.removeEventListener('dragover', handleDrag)
      div.removeEventListener('drop', handleDrop)
    }
  }, [dropRef]);


  return(
    <div className={`${styles[boxStyles]}`} ref={dropRef}>
      {children.map((child) => (
        <div key={child}>
          {child}
        </div>
      ))}
    </div>
  );
};

// Prop Validation
DragAndDropBox.propTypes = {
  boxStyles: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired,
}

export default DragAndDropBox;