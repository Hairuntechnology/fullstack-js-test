import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Col ,Row } from 'reactstrap';
import logo from '../logo.svg';
import '../App.css';
import { graphql, compose } from 'react-apollo'
import { gql } from 'apollo-boost'
import ListExperience from '../containers/listexperience'
import AddEmployer from '../containers/addEmployer'
import AddExperience from '../containers/addExperience'
import Navbar from '../containers/navbar'

class Experience extends Component {

  render() {
    console.log(this.props)
    return (
    <Row>
      <Col xs="3"/>
        <Col xs="6">
          <div> 
            <Navbar/>
            <ListExperience/>
            <AddExperience/>
          </div>
        </Col>
      <Col xs="3"/>
    </Row>
     
    );
  }
}

export default Experience
