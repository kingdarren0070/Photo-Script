import React from 'react';
import DragAndDropBox from './components/DragAndDropBox/DragAndDropBox';

function App() {

  const test = () => {
    return (
      <p>hello</p>
    )
  }

  return (
    <DragAndDropBox
      boxStyles="test"
      children={[test]}
    />
  )
}

export default App;
