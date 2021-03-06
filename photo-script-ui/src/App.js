import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './components/header/Header';
import EditProject from './components/pages/editProject/EditProject';
import Home from './components/pages/home/Home';
import LoginRegistration from './components/pages/loginRegistration/LoginRegistration';
import NewProject from './components/pages/new-project/NewProject';
import Library from './components/pages/library/Library';
import Settings from './components/pages/settings/Settings';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/new" component={NewProject} />
          <Route exact path="/login" component={LoginRegistration} />
          <Route exact path="/registration" component={LoginRegistration} />
          <Route exact path="/edit" component={EditProject} />
          <Route exact path="/edit/:id" component={EditProject} />
          <Route exact path="/library" component={Library} />
          <Route path="/settings" component={Settings} />
        </Switch>
      </Router>
    </div>
  )
}

export default App;
