import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Col ,Row } from 'reactstrap';
import logo from '../logo.svg';
import '../App.css';
import { graphql, compose } from 'react-apollo'
import { gql } from 'apollo-boost'
import ListEmployer from '../containers/listemployer'
import AddEmployer from '../containers/addEmployer'
import Navbar from '../containers/navbar'

class Employer extends Component {

  render() {
    console.log(this.props)
    return (
    <Row>
      <Col xs="3"/>
        <Col xs="6">
          <div> 
            <Navbar/>
            <ListEmployer/>
            <AddEmployer/>
          </div>
        </Col>
      <Col xs="3"/>
    </Row>
     
    );
  }
}

export default Employer
