import React from 'react';
import { compose, graphql } from 'react-apollo'
import { addEmp , upEmp} from '../Mutation'
import { getallexp, getallemp, getemp } from '../queries'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class AddEmployer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      nom:"",
      prenom:"",
      poste:"",
      age:"",
      exp:"",
      subBtn:"Ajout",
      uid:""
    }
  }

  componentDidMount () {
    const root = document.getElementById('root')
    root.addEventListener('modifemp', this.modEmp.bind(this), false)
  }
  componentWillUnmount() {

    const root = document.getElementById('root')
    root.removeEventListener('modifemp', () => {}, false)
  }


  modEmp(e){
    this.setState({subBtn:"Modifier"})
    this.setState({ uid: e.detail})
    let uid = e.detail
    console.log("Misy modif o!!!!!!!!!!!!!")

  }

  displayExp(){
    var data = this.props.getallexp;
    if(data.loading){
        return( <option id="1">Loading list...</option> );
    } else {
        let i=1
        return data.findExperiences.map(exp => {

            return(
              <option key={exp.id} value={exp.id}>{exp.titre}</option>
            );
        })
    }
  }
  submitForm(e){
    e.preventDefault()
   
    console.log(this.props)
    if(this.state.subBtn == 'Ajout'){
    this.props.addEmp({
      variables: {
          nom: this.state.nom,
          prenom: this.state.prenom,
          age: this.state.age,
          experience: this.state.exp,
          poste: this.state.poste
          
      },
      refetchQueries: [{ query: getallemp }]
  })} else{
    this.props.upEmp({
      variables: {
          id: this.state.uid,
          nom: this.state.nom,
          prenom: this.state.prenom,
          age: this.state.age,
          experience: this.state.exp,
          poste: this.state.poste
          
      },
      refetchQueries: [{ query: getallemp }]
  })
  this.setState({subBtn:"Modifier"})
  }
}
  render() {
    return (
      <Form onSubmit={ this.submitForm.bind(this)}>
        <FormGroup>
          <Label>Nom</Label>
          <Input type="text" name="nom" id="nom" onChange ={ (e) => this.setState({nom: e.target.value})} placeholder="Entrez votre nom" />
        </FormGroup>
        <FormGroup>
          <Label>prenom</Label>
          <Input type="text" name="prenom" id="prenom" defaultValue="" onChange ={ (e) => this.setState({prenom: e.target.value})} placeholder="Entrez votre prenom" />
        </FormGroup>
        <FormGroup>
        <Label >Poste</Label>
        <Input type="text" name="poste" id="poste" onChange ={ (e) => this.setState({poste: e.target.value})} placeholder="Entrez votre poste" />
      </FormGroup>
      <FormGroup>
      <Label >Age</Label>
      <Input type="text" name="age" id="age" onChange ={ (e) => this.setState({age: e.target.value})} placeholder="Entrez votre age" />
    </FormGroup>
        <FormGroup>

          <Label for="exampleSelect">Experience</Label>
          <Input type="select" name="select" id="exampleSelect" onChange ={ (e) => this.setState({exp: e.target.value})}>
           {this.displayExp()}
          </Input>
        </FormGroup>
        <Button>{this.state.subBtn} </Button>
      </Form>
    );
  }
}
export default compose(
  graphql(getallexp, { name: "getallexp"}),
  graphql(addEmp, { name: "addEmp"}),
  graphql(upEmp, { name: "upEmp"})

)(AddEmployer)
