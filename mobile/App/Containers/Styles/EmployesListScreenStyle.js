import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import styled, { css } from 'styled-components'

export const ListItem = styled.View`
  flex-direction: row; 
  padding-top: 10px; 
  padding-bottom: 10px;
`

export const Loading = styled.View`
  flex: 1; 
  align-items: center; 
  justify-content: center;
`

export const Circle = styled.View`
  justify-content: center; 
  align-items: center;  
  height: 50px; 
  width: 50px; 
  border-radius: 25px; 
  
  ${props => props.color && css`
    background-color: ${props.color};
  `}

  ${props => !props.color && css`
  background-color: #7C4DFF;
  `}
`

export default StyleSheet.create({
  ...ApplicationStyles.screen
})
