import React, { useState } from 'react';
import Loginstyles from '../styles/loginstyle';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import Checkbox from 'expo-checkbox';

import {
  Ionicons,
  EvilIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import firebase from '../firebase';
import NavBar from './topNav';
const color = '#006B38FF';
const db = firebase.firestore();
export default function Signup({ navigation }) {
  const initialValue = {
    username: '',
    password: '',
    confirmpassword: '',
    premium: false,
  };
  const [userdetail, setUser] = useState(initialValue);
  function handleInput(name, value) {
    if (name == 'premium') {
      console.log('lll');
      let setbool = value;

      if (value == true) {
        setbool = false;
      } else {
        setbool = true;
      }
      console.log(setbool);
      setUser({ ...userdetail, premium: value });
      return;
    }
    setUser({ ...userdetail, [name]: value });
  }
  function handleSubmit() {
    let isEmail = db
      .collection('appUser')
      .where('email', '==', userdetail.username);
    isEmail.get().then((data) => {
      if (data.empty) {
        let newUser = {
          email: userdetail.username,
          password: userdetail.password,
          premium: userdetail.premium,
        };
        console.log(newUser);
        db.collection('appUser').add(newUser);
        console.log('userAdded');
      } else {
        console.log(data);
        data.forEach((d) => {
          console.log(d.data());
        });
      }
    });
  }

  return (
    <>
      <NavBar navigation={navigation} />
      <View
        style={[
          Loginstyles.blackBackGround,
          { flex: 1, justifyContent: 'center' },
        ]}
      >
        <View style={[Loginstyles.child, { backgroundColor: 'white' }]}>
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
              onChangeText={(value) => handleInput('username', value)}
              style={[Loginstyles.input, { borderBottomColor: color }]}
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
              onChangeText={(value) => handleInput('password', value)}
              style={[Loginstyles.input, { borderBottomColor: color }]}
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
              onChangeText={(value) => handleInput('confirmpassword', value)}
              style={[Loginstyles.input, { borderBottomColor: color }]}
            />
          </View>
          <Text>
            {' '}
            <Checkbox
              value={userdetail.premium}
              name='premium'
              onValueChange={(value) => handleInput('premium', value)}
            />
            WOuld you link to have premium?
          </Text>
          <Text style={{ color: color }}>signUp</Text>
          <TouchableOpacity
            style={[Loginstyles.button, Loginstyles.greenBackGround]}
            onPress={handleSubmit}
          >
            <Text style={{ color: 'white' }}>SIGNUP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
