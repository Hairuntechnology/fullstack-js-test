import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Col ,Row } from 'reactstrap'
import { 
  BrowserRouter as Router,
  HashRouter,
  Route, 
  Link,
} from 'react-router-dom'
import { Switch } from 'react-router'
import logo from './logo.svg'
import './App.css';
import { graphql, compose } from 'react-apollo'
import { gql } from 'apollo-boost'
import Employer  from './components/employerPage'
import Experience  from './components/experiencePage'

class App extends Component {

  render() {
    console.log(this.props)
    return (
    <HashRouter>
      <Switch>
        <div>
          <Route path="/employer" component={Employer} />
          <Route path="/experience" component={Experience} />
        </div>
      </Switch>
    </HashRouter>, 
    document.getElementById('root')
    );
  }
}

export default App
