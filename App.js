import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import SingUp from './screens/SingUp';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: "transparent"
  }
}

const Stack = createStackNavigator();

const App = () => {
  return (

    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName="SingUp"
      >
        <Stack.Screen name="SingUp" component={SingUp}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>

  )
}

export default App;