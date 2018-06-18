import React, { Component } from 'react'
import { 
  ScrollView, 
  Text, 
  KeyboardAvoidingView,
  View, 
  Picker,
  TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/AddEmployeScreenStyle'
import { Hoshi } from 'react-native-textinput-effects'
import { Colors } from '../Themes'
import NumericInput from 'react-native-numeric-input'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { compose, withState, lifecycle } from 'recompose'
import { withFindEmployesQuery } from './EmployesListScreen'

class AddEmployeScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {
      title: 'Ajouter un employer',
      headerRight: (
        <View style={{ right: 10, width: 40 }}>
          <TouchableOpacity onPress={() => params.handleSave()}>
            <Text style={{ fontSize: 18, color: Colors.snow }}>OK</Text>
          </TouchableOpacity>
        </View>
        )
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      nom: null,
      prenom: null,
      poste: null,
      age: 18,
      experience: 'js'
    }
    this.onSave = this.onSave.bind(this)
  }

  componentDidMount() {
    this.props.navigation.setParams({ handleSave: this.onSave });
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <View style={{ margin: 15 }}>
            <View style={{ marginBottom: 15 }}>
              <Hoshi
                label={'Nom'}
                labelStyle={{ fontSize: 16 }}
                borderColor={'#b76c94'}
                backgroundColor={Colors.snow}
                style={{ borderBottomWidth: 0 }}
                inputStyle={{ fontSize: 18 }}
                value={this.state.nom}
                onChangeText={nom => this.setState({ nom })}
              />
            </View>
            <View style={{ marginBottom: 15 }}>
              <Hoshi
                label={'Prénoms'}
                labelStyle={{ fontSize: 16 }}
                borderColor={'#b76c94'}
                backgroundColor={Colors.snow}
                style={{ borderBottomWidth: 0 }}
                inputStyle={{ fontSize: 18 }}
                value={this.state.prenom}
                onChangeText={prenom => this.setState({ prenom })}
              />
            </View>
            <View style={{ flexDirection: 'row', marginTop: 15, marginBottom: 15, marginLeft: 10, marginRight: 10 }}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={{ fontSize: 18 }}>Age</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end'}}>
                <NumericInput rounded type={'up-down'} minValue={18} value={this.state.age} onChange={age => this.setState({ age })} />
              </View>
            </View>
            <View style={{ marginBottom: 15 }}>
              <Hoshi
                label={'Poste'}
                labelStyle={{ fontSize: 16 }}
                borderColor={'#b76c94'}
                backgroundColor={Colors.snow}
                style={{ borderBottomWidth: 0 }}
                inputStyle={{ fontSize: 18 }}
                value={this.state.poste}
                onChangeText={poste => this.setState({ poste })}
              />
            </View>
            <View>
              <View>
                <Text style={{ marginLeft: 8, fontSize: 18 }}>Expérience:</Text>
              </View>
              <View style={{ marginBottom: 15, alignItems: 'center' }}>
                <Picker
                  selectedValue={this.state.experience}
                  style={{ height: 50, width: 100 }}
                  onValueChange={(itemValue, itemIndex) => this.setState({experience: itemValue})}>
                  <Picker.Item label="Java" value="java" />
                  <Picker.Item label="JavaScript" value="js" />
                  <Picker.Item label="A" value="a" />
                  <Picker.Item label="B" value="b" />
                  <Picker.Item label="C" value="c" />
                  <Picker.Item label="D" value="d" />
                </Picker>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }

  async onSave() {
    console.log('save ...')
    console.log(this.props)
    console.log(this.state)

    const response = await this.props.createEmploye({
      variables: {
        nom: this.state.nom,
        prenom: this.state.prenom,
        age: this.state.age,
        poste: this.state.poste,
        experience: this.state.experience,
      }
    })

    console.log(response)
    
    await this.props.findEmployes.refetch()
    this.props.navigation.goBack()
  }
}

const CREATE_EMPLOYE = gql`

mutation CreateEmploye($nom: String, $prenom: String, $age: Int, $poste: String, $experience: String) {
  createEmploye(nom: $nom, prenom: $prenom, age: $age, poste: $poste, experience: $experience) {
    id
  }
}

`

const withCreateEmploye = graphql(CREATE_EMPLOYE, { name: 'createEmploye' })

const withData = compose(
  withCreateEmploye,
  withFindEmployesQuery,
)

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withData(AddEmployeScreen))
