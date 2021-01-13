import React from 'react'
import {StyleSheet} from "react-native"
const color = '#006B38FF';
const Loginstyles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: color,
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    margin: 10,
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  child: {
    width: '85%',
    padding: 30,
    alignSelf: 'center',
    backgroundColor: '#101820FF',
    borderRadius: 10,
  },
  icon: {
    padding: 1,
    fontSize: 30,
    alignSelf: 'center',
    color: color,
  },
  button: {
    backgroundColor: '#e5e4e2',
    borderRadius: 10,
    marginTop: 10,
    padding: 5,
    alignItems: 'center',
  },
  blackBackGround: {
    backgroundColor: '#101820FF',
  },
  blackColor: {
    color: '#101820FF',
  },
  greenBackGround:{
      backgroundColor:color
  },
  greenColor:{
      color:color

  }
});
export default Loginstyles;