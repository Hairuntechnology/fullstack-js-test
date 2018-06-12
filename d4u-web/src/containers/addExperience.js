import React from 'react';
import { compose, graphql } from 'react-apollo'
import { addExp } from '../Mutation'
import { getallexp } from '../queries'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class AddExperience extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      titre:"",
      descr:""
    }
  }

  submitForm(e){
    e.preventDefault()
    console.log(this.props)
    this.props.addExp({
      variables: {
          titre: this.state.titre,
          description: this.state.descr
      },
      refetchQueries: [{ query: getallexp }]
  });
  }
  render() {
    return (
      <Form onSubmit={ this.submitForm.bind(this)}>
        <FormGroup>
          <Label >Titre</Label>
          <Input type="text" name="titre" id="titre" onChange ={ (e) => this.setState({titre: e.target.value})} placeholder="Entrez le titre" />
        </FormGroup>
        <FormGroup>
          <Label>Description</Label>
          <Input type="text" name="descr" id="descr" onChange ={ (e) => this.setState({descr: e.target.value})} placeholder="Description..." />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}
export default compose(
  graphql(getallexp, { name: "getallexp"}),
  graphql(addExp, { name: "addExp"})
)(AddExperience)
