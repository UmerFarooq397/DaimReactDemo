import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "./src/screens/Login";
import HomeScreen from './src/screens/Home';
import SplashScreen from './src/screens/Splash';
import TransactionScreen from './src/screens/Transaction';
import { store } from './src/store/store'
import { Provider } from 'react-redux'

const navStack = createStackNavigator();

const App = () => {

  return(
    <Provider store={store}>
      <NavigationContainer>
        <navStack.Navigator>
        <navStack.Screen 
            name= 'SplashScreen'
            component={SplashScreen}
            options={{headerShown: false}}
          />
          <navStack.Screen 
            name= 'LoginScreen'
            component={LoginScreen}
            options={{headerShown: false}}
          />
          {/* Home Screen Added */}
          <navStack.Screen 
            name='HomeScreen'
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <navStack.Screen 
            name="Transactions" 
            component={TransactionScreen} 
            options={{ title: 'Transactions' }} 
          />
        </navStack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App;