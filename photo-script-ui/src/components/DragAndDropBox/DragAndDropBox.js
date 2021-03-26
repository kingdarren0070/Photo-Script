import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './DragAndDropBox.module.scss';

const DragAndDropBox = ({ boxStyles, children }) => {

  dropRef = React.createRef();

  const handleDragIn = () => {
    return null
  };

  const handleDragOut = () => {
    return null
  };
  
  const handleDrop = () => {
    return null
  };

  const handleDrag = () => {
    return null
  };

  useEffect(() => {
    let div = dropRef.current;
    div.addEventListener('dragenter', handleDragIn)
    div.addEventListener('dragleave', handleDragOut)
    div.addEventListener('dragover', handleDrag)
    div.addEventListener('drop', handleDrop)
    return () => {
      let div = dropRef.current;  
      div.removeEventListener('dragenter', handleDragIn)
      div.removeEventListener('dragleave', handleDragOut)
      div.removeEventListener('dragover', handleDrag)
      div.removeEventListener('drop', handleDrop)
    }
  }, [input])


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