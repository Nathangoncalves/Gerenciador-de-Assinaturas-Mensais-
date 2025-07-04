import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import AddSubscriptionScreen from '../screens/AddSubscriptionScreen';
import ListScreen from '../screens/ListScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Resumo' }} 
        />
        <Stack.Screen 
          name="Add" 
          component={AddSubscriptionScreen} 
          options={{ title: 'Nova Assinatura' }} 
        />
        <Stack.Screen 
          name="List" 
          component={ListScreen} 
          options={{ title: 'Todas Assinaturas' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
