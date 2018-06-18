import React from 'react';
import { Table, Button } from 'reactstrap';
import { graphql, compose } from 'react-apollo';
import { getallexp } from '../queries'
import { delExp } from '../Mutation'

class ListExperience extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        selected: null
    }
}
  displayExp(){
    var data = this.props.getallexp;
    if(data.loading){
        return( <div>Loading list...</div> );
    } else {
        let i=1
        return data.findExperiences.map(exp => {

            return(
              <tr  key={ exp.id }>
                <th scope="row">{i++}</th>
                <td>{ exp.titre }</td>
                <td>{ exp.description  }</td>
                <td>
              <Button color="warning" onClick = {()=>this.deleteExp(exp.id)}>Modifier</Button>{' '}
              <Button color="danger" onClick = {()=>this.deleteExp(exp.id)}>Supprimer</Button>
            </td>
              </tr>
            );
        })
    }
  }
  deleteExp(e){
    this.props.delExp({
      variables: {
          id: e,
      },
      refetchQueries: [{ query: getallexp }]
  });
  }
  render() {
    console.log(this.props)
    return (
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Titre</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {  this.displayExp() }
        </tbody>
      </Table>
    );
  }
}

export default compose(
  graphql(getallexp, { name: "getallexp"}),
  graphql(delExp, { name: "delExp"})
)(ListExperience)