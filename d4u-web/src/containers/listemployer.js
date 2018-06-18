import React from 'react';
import { Table, Button } from 'reactstrap';
import { getallemp,getallexp, } from '../queries';
import { delEmp } from '../Mutation'
import { graphql, compose } from 'react-apollo';

class ListEmployer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        selected: null
    }
}


deleteEmp(e){
  this.props.delEmp({
    variables: {
        id: e,
    },
    refetchQueries: [{ query: getallemp }]
});
}
modEmp(e){
  let event = new CustomEvent('modifemp',{ detail:e});
  let root = document.getElementById('root');
      root.dispatchEvent(event);
      return false;
}
displayEmp(){
  var data = this.props.getallemp;
  if(data.loading){
      return( <tr id="1"><td>Loading list...</td></tr> );
  } else {
      let i=1
      return data.findEmployes.map(emp => {
          return(
            <tr  key={ emp.id }>
            <th scope="row">1</th>
            <td>{ emp.nom }</td>
            <td>{ emp.prenom }</td>
            <td>{ emp.poste }</td>
            <td>{ emp.id }</td>
            <td>
              <Button color="warning" onClick = {()=>this.modEmp(emp.id)}>Modifier</Button>{' '}
              <Button color="danger" onClick = {()=>this.deleteEmp(emp.id)}>Supprimer</Button>
            </td>
            </tr>
          );
      })
  }
}
  render() {
    return (
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nom</th>
            <th>Prenom</th>
            <th>Poste</th>
            <th>Exp</th>
          </tr>
        </thead>
        <tbody>
        {  this.displayEmp() }
        </tbody>
      </Table>
    );
  }
}

export default compose(
  graphql(getallemp, { name: "getallemp"}),
  graphql(delEmp, { name: "delEmp"})
)(ListEmployer)