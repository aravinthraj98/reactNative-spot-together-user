import React, { useState } from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../components/Home';

import Login from '../components/Login';
import { useSafeArea } from 'react-native-safe-area-context';
import Signup from '../components/Signup';
const Drawer = createDrawerNavigator();

export default function DrawerNav() {
  const [login, isLogin] = useState(true);
  function setLogin() {
    isLogin(true);
  }
  return (
    <>
      {!login ? (
        <NavigationContainer>
          <Drawer.Navigator initialRouteName='Home'>
            <Drawer.Screen
              name='Home'
              component={({ navigation }) => (
                <Login navigation={navigation} login={setLogin} />
              )}
            />
            <Drawer.Screen name='signUp' component={Signup} />
          </Drawer.Navigator>
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <Drawer.Navigator initialRouteName='Show Update'>
            <Drawer.Screen name='Show Update' component={Home} />
          </Drawer.Navigator>
        </NavigationContainer>
      )}
    </>
  );
}
