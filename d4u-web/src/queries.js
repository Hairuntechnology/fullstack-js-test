import { gql } from 'apollo-boost'
import { Query } from 'react-apollo';

const getallemp = gql`
    {
        findEmployes{
          id
          nom
          prenom
          poste 
          experience{
            id 
            titre
          }
        }
      }
`
;
const getallexp = gql`
{
    findExperiences{id description titre}
  }
`
const getemp = gql`
   query($id:ID!){findEmployeById(id:$id){ nom prenom poste age poste}}
`

export { getallemp, getallexp, getemp }