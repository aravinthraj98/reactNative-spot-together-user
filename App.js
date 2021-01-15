import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { LogBox, StyleSheet, Text, View } from 'react-native';

import VideoScreen from './components/VideoScreen';

import DrawerNav from './navigation/DrawerNav';

export default function App() {
  return (
    <>
      <DrawerNav />
      {/* <VideoScreen /> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'center',
  },
});
