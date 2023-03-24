import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Main from './src/screens/main';
import  store  from './src/store/store';
import { Provider } from 'react-redux'
const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  )
}
export default App;

