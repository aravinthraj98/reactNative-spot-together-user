import React, { useEffect, useState } from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../components/Home';

import Login from '../components/Login';
import { useSafeArea } from 'react-native-safe-area-context';
import Signup from '../components/Signup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logout from '../components/Logout';

import Videoplayer from '../components/VideoPlayer';
import Context from '../context';
const Drawer = createDrawerNavigator();

export default function DrawerNav() {
  const [login, isLogin] = useState(false);
  const [premium, isPremium] = useState(false);

  useEffect(() => {
    async function getAsync() {
      let isAuth = await AsyncStorage.getItem('userlogin');
      console.log(isAuth);
      if (isAuth) {
        let getP = await AsyncStorage.getItem('premium');
        isPremium(getP);
        isLogin(true);
      }
    }
    getAsync();
  }, []);
  function setLogin(val) {
    if (val != null && val == true) {
      isPremium(true);
      console.log('premium user');
      AsyncStorage.setItem('premium', true);
    } else {
      AsyncStorage.setItem('premium', false);
    }
    AsyncStorage.setItem('userlogin', true);

    isLogin(true);
  }
  function logout() {
    AsyncStorage.clear();
    isLogin(false);
  }
  return (
    <>
      <Context.Provider value={[premium, isPremium]}>
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
              <Drawer.Screen name='VideoPlayer' component={Videoplayer} />
              <Drawer.Screen
                name='Logout'
                component={() => <Logout logout={logout} />}
              />
            </Drawer.Navigator>
          </NavigationContainer>
        )}
      </Context.Provider>
    </>
  );
}
