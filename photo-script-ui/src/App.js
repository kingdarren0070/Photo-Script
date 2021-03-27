import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './components/header/Header';
import Home from './components/home/Home';
import NewProejct from './components/new-project/NewProject';

function App() {
  return(
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/new" component={NewProejct} />
        </Switch>
      </Router>
    </div>
  )
}

export default App;
