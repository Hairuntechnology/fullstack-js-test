import { StackNavigator } from 'react-navigation'
import UpdateEmployeScreen from '../Containers/UpdateEmployeScreen'
import AddEmployeScreen from '../Containers/AddEmployeScreen'
import EmployesListScreen from '../Containers/EmployesListScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'
import { Colors } from '../Themes'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  UpdateEmployeScreen: { screen: UpdateEmployeScreen },
  AddEmployeScreen: { screen: AddEmployeScreen },
  EmployesListScreen: { screen: EmployesListScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  // headerMode: 'none',
  initialRouteName: 'EmployesListScreen',
  navigationOptions: {
    headerTintColor: Colors.snow,
    headerStyle: styles.header,
    headerTitleStyle: {
      color: Colors.snow
    }
  }
})

export default PrimaryNav
