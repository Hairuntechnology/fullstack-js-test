import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Col ,Row } from 'reactstrap';
import logo from './logo.svg';
import './App.css';
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

class App extends Component {
  render() {
    return (
      <Row> 
        <Col sm="1"></Col>
          <Col sm="5">
            <Form>
              <FormGroup>
                <Label for="Nom">Nom</Label>
                <Input type="email" name="nom" id="nom" placeholder="with a placeholder" />
              </FormGroup>
              <FormGroup>
                <Label for="prenom">Prenom</Label>
                <Input type="prenom" name="prenom" id="prenom" placeholder="with a placeholder" />
              </FormGroup>
              <FormGroup>
                <Label for="age">Age</Label>
                <Input type="age" name="age" id="age" placeholder="with a placeholder" />
              </FormGroup>
              <FormGroup>
                <Label for="poste">Poste</Label>
                <Input type="poste" name="poste" id="poste" placeholder="with a placeholder" />
              </FormGroup>
              <FormGroup>
                <Label for="exampleSelect">Experience</Label>
                <Input type="select" name="select" id="exampleSelect">
                  <option>Developper</option>
                  <option>Integrateur</option>
                  <option>devOps</option>
                  <option>Testeur</option>
                </Input>
              </FormGroup>
              <Button>Submit</Button>
            </Form>
          </Col>
          <Col sm="5">
            <div class="list-group">
              <button type="button" class="list-group-item list-group-item-action active">
                Cras justo odio
              </button>
              <button type="button" class="list-group-item list-group-item-action">Dapibus ac facilisis in</button>
              <button type="button" class="list-group-item list-group-item-action">Morbi leo risus</button>
              <button type="button" class="list-group-item list-group-item-action">Porta ac consectetur ac</button>
              <button type="button" class="list-group-item list-group-item-action" disabled>Vestibulum at eros</button>
            </div>
          </Col>
      </Row>
    );
  }
}

const GET_FORMTION = gql`
  query {
    accounts {
      id,
      sin,
      uuid,
      createdAt,
      username,
      publicKey,
      coinbase,
      firstName,
      lastName,
    }
  }
`

const withGetFormtionQuery = graphql(GET_FORMTION, { name: 'getFormation'})
const withData = compose(
  withGetFormtionQuery, 
)



export default {App,withData}
