import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../pages/Login';
import TaskInit from '../pages/TaskInit';

const Stack = createNativeStackNavigator();

export default function Routes(){
  return(
    
    <Stack.Navigator>
    <Stack.Screen 
        name="Login" 
        component={Login} 
        options={{
          headerShown: false,
        }}
        />

        <Stack.Screen 
        name="TaskInit" 
        component={TaskInit} 
        options={{
          headerShown: false,
        }}
        />
    </Stack.Navigator>
 
  )
}