import React, { useState } from 'react';
import { View } from 'react-native';
import Loginstyles from '../styles/loginstyle';
import { Octicons } from '@expo/vector-icons';

export default function NavBar(props) {
  return (
    <View
      style={[
        { marginTop: 1, padding: 8, flexDirection: 'row' },
        Loginstyles.blackBackGround,
      ]}
    >
      <Octicons
        name='three-bars'
        size={24}
        style={[Loginstyles.greenColor, { fontSize: 30 }]}
        onPress={() => {
          props.navigation.toggleDrawer();
        }}
      />
    </View>
  );
}
