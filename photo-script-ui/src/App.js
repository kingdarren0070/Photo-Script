import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './components/header/Header';
import EditProject from './components/pages/editProject/EditProject';
import Home from './components/pages/home/Home';
import LoginRegistration from './components/pages/loginRegistration/LoginRegistration';
import NewProject from './components/pages/new-project/NewProject';

function App() {
  return(
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/new" component={NewProject} />
          <Route exact path="/login" component={LoginRegistration} />
          <Route exact path="/registration" component={LoginRegistration} />
          <Route exact path="/edit" component={EditProject} />
        </Switch>
      </Router>
    </div>
  )
}

export default App;
