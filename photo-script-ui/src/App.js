import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Footer from './components/blocks/footer/Footer';
import Header from './components/blocks/header/Header';
import Home from './components/pages/home/Home';
import LoggedOut from './components/pages/logged-out/LoggedOut';
import Login from './components/pages/login/Login';
import ProjectEdit from './components/pages/project-edit/ProjectEdit';
import ProjectLibrary from './components/pages/project-library/ProjectLibrary';
import ProjectNew from './components/pages/project-new/ProjectNew';
import Register from './components/pages/register/Register';

function App() {
  return(
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/new" component={ProjectNew} />
        <Route exact path="/edit" component={ProjectEdit} />
        <Route exact path="/library" component={ProjectLibrary} />
        <Route exact path="/logged-out" component={LoggedOut} />
      </Switch>
      <Footer />
    </Router>
  )
}

export default App;
