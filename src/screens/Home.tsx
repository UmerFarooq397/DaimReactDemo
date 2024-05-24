import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Image } from 'react-native';
import DashboardScreen from './Dashboard';
import TransactionScreen from './Transaction';
import AccountsScreen from './Accounts';
import SettingsScreen from './Settings';

const Tab = createMaterialBottomTabNavigator();

export default function HomeScreen() {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      activeColor="#424b5a"
      inactiveColor="#424b5a"
      barStyle={{ backgroundColor: '#f2f5f7' }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ focused }) => {
            let iconName = focused
              ? require('./../resources/images/home_selected.png')
              : require('./../resources/images/home_unselected.png');
            return <Image source={iconName} style={{ width: 24, height: 24 }} />;
          },
        }}
      />
      <Tab.Screen
        name="Accounts"
        component={AccountsScreen}
        options={{
          tabBarLabel: 'Cuentas',
          tabBarIcon: ({ focused }) => {
            let iconName = focused
              ? require('./../resources/images/account_selected.png')
              : require('./../resources/images/account_unselected.png');
            return <Image source={iconName} style={{ width: 24, height: 24 }} />;
          },
        }}
      />
      <Tab.Screen
        name="Transactions"
        component={TransactionScreen}
        options={{
          tabBarLabel: 'Transacciones',
          tabBarIcon: ({ focused }) => {
            let iconName = focused
              ? require('./../resources/images/transaction_selected.png')
              : require('./../resources/images/transaction_unselected.png');
            return <Image source={iconName} style={{ width: 24, height: 24 }} />;
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Mas',
          tabBarIcon: ({ focused }) => {
            let iconName = focused
              ? require('./../resources/images/mass_selected.png')
              : require('./../resources/images/mass_unselected.png');
            return <Image source={iconName} style={{ width: 24, height: 24 }} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
