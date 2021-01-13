import React, { useState } from 'react';
import Loginstyles from '../styles/loginstyle';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import {
  Ionicons,
  EvilIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import NavBar from './topNav';
import firebase, { firestore } from 'firebase';
const color = '#006B38FF';
const db = firebase.firestore();
export default function Login({ navigation, login }) {
  const initialValue = {
    username: '',
    password: '',
  };
  const [userdetail, setUser] = useState(initialValue);
  function handleInput(name, value) {
    setUser({ ...userdetail, [name]: value });
  }
  function handleSubmit() {
    console.log('called');
    if (userdetail.username.length > 2 && userdetail.password.length > 3) {
      let isUser = db
        .collection('appUser')
        .where('email', '==', userdetail.username)
        .where('password', '==', userdetail.password);
      isUser.get().then((data) => {
        if (data.size == 1) {
          login();
          console.log('state changed');
        } else {
          console.log('datasize' + data.size);
        }
      });
    } else {
      console.log(userdetail.username.length);
    }
  }

  return (
    <>
      <NavBar navigation={navigation} />
      <View style={Loginstyles.parent}>
        <View style={Loginstyles.child}>
          <Ionicons
            style={{ alignSelf: 'center', fontSize: 40, color: color }}
            name='person'
            size={24}
            color='black'
          />
          <Text style={{ color: color, textAlign: 'center' }}>LOGIN</Text>

          <View style={{ flexDirection: 'row' }}>
            <EvilIcons
              name='user'
              size={24}
              color='white'
              style={Loginstyles.icon}
            />
            <TextInput
              onChangeText={(value) => setusername(value)}
              style={Loginstyles.input}
              onChangeText={(value) => handleInput('username', value)}
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <MaterialCommunityIcons
              name='form-textbox-password'
              size={24}
              color='white'
              style={Loginstyles.icon}
            />
            <TextInput
              secureTextEntry
              style={Loginstyles.input}
              onChangeText={(value) => handleInput('password', value)}
            />
          </View>
          <TouchableOpacity style={Loginstyles.button} onPress={handleSubmit}>
            <Text style={{ color: color }}>LOGIN</Text>
          </TouchableOpacity>
          <Text style={{ color: color, textAlign: 'center' }}>
            No account?
            <TouchableOpacity
              style={Loginstyles.button}
              onPress={() => navigation.navigate('signUp')}
            >
              <Text style={{ color: color }}>signUp</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </>
  );
}
