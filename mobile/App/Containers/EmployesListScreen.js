import React, { Component } from 'react'
import { 
  ScrollView, 
  Text, 
  KeyboardAvoidingView, 
  View,
  FlatList, 
  ActivityIndicator, 
  TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles, {
  ListItem,
  Loading,
  Circle,
} from './Styles/EmployesListScreenStyle'
import ActionButton from 'react-native-action-button'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Colors } from '../Themes'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { compose, withState, lifecycle } from 'recompose'
import ActionSheet from 'react-native-actionsheet'

class EmployesListScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Liste des employés',
    headerRight: (
      <View style={{ right: 10, width: 40 }}>
      </View>
      )
  })

  constructor (props) {
    super(props)
    
    this.state = {
      selected: {},
    }

    this.colors = new Map()
    this.colors.set('A', '#f4511e')
    this.colors.set('B', '#f57c00')
    this.colors.set('C', '#fdd835')
    this.colors.set('D', '#cddc39')
    this.colors.set('E', '#8bc34a')
    this.colors.set('F', '#4caf50')
    this.colors.set('G', '#009688')
    this.colors.set('H', '#00bcd4')
    this.colors.set('I', '#03a9f4')
    this.colors.set('J', '#2196f3')
    this.colors.set('K', '#3f51b5')
    this.colors.set('L', '#673ab7')
    this.colors.set('M', '#8e24aa')
    this.colors.set('N', '#e91e63')
    this.colors.set('O', '#f44336')
    this.colors.set('P', '#f4511e')
    this.colors.set('Q', '#f57c00')
    this.colors.set('R', '#fdd835')
    this.colors.set('S', '#cddc39')
    this.colors.set('T', '#8bc34a')
    this.colors.set('U', '#4caf50')
    this.colors.set('V', '#009688')
    this.colors.set('W', '#00bcd4')
    this.colors.set('X', '#03a9f4')
    this.colors.set('Y', '#2196f3')
    this.colors.set('Z', '#3f51b5')

  }

  showActionSheet = (item) => {
    this.setState({ selected: item })
    this.ActionSheet.show()
  }

  render () {
    const findEmployes = this.props.findEmployes
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, marginLeft: 16, marginRight: 16 }}>
          {
            findEmployes.loading && (
              <Loading>
                <ActivityIndicator size="large" color={Colors.pink} />
              </Loading>
            )
          }
          {
            !findEmployes.loading && (
              <FlatList
                data={findEmployes.findEmployes}
                renderItem={({ item }) => (
                  <ListItem>
                    <Circle color={this.colors.get(item.nom.substr(0,1).toUpperCase())}>
                      <Text style={{ color: Colors.snow, fontSize: 20 }}>{item.nom.substr(0,1).toUpperCase()}</Text>
                    </Circle>
                    <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 16 }}>
                      <Text>{item.nom} {item.prenom}</Text>
                      <Text style={{ color: 'rgba(0, 0, 0, 0.5)' }}>{item.poste}</Text>
                    </View>
                    <View>
                      <TouchableOpacity onPress={() => this.showActionSheet(item)}>
                        <View style={{ height: 20 }}>
                          <MaterialIcons 
                              name={'more-horiz'}
                              size={28}
                              color={'rgba(0, 0, 0, 0.3)'}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </ListItem>
                )}
              />
            )
          }
        </View>

        <ActionSheet
          ref={o => this.ActionSheet = o}
          options={['Modifier', 'Supprimer', 'Annuler']}
          cancelButtonIndex={2}
          destructiveButtonIndex={1}
          onPress={(index) => this.handleAction(index)}
        />

        <ActionButton
          buttonColor={Colors.pink}
          offsetX={20}
          offsetY={30}
          size={60}
          shadowStyle={{ elevation: 2 }}
          icon={
            <MaterialIcons
              name="add"
              size={28}
              color="#fff"
            />
          }
          style={{ elevation: 2 }}
          onPress={() => this.props.navigation.navigate('AddEmployeScreen')}
        />
      </View>
    )
  }

  async handleAction (index) {
    switch (index) {
      case 0:
        this.props.navigation.navigate('UpdateEmployeScreen', this.state.selected)
        break
      case 1:
        const id = this.state.selected.id
        await this.props.deleteEmploye({ variables: { id } })
        await this.props.findEmployes.refetch()
        break
    }
  }

}

const FIND_EMPLOYES = gql`
  query {
  findEmployes {
      id
      nom
      prenom
      poste
      age
    }
  }
`

const DELETE_EMPLOYE = gql`
  mutation DeleteEmploye($id: ID!) {
    deleteEmploye(id: $id)
  }
`

export const withFindEmployesQuery = graphql(FIND_EMPLOYES, { name: 'findEmployes' })
export const withDeleteEmployeMutation = graphql(DELETE_EMPLOYE, { name: 'deleteEmploye' })

const withData = compose(
  withFindEmployesQuery,
  withDeleteEmployeMutation,
)

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withData(EmployesListScreen))
