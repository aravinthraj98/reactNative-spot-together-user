import React, { useEffect, useState } from 'react';
import { LogBox, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import NavBar from '../components/topNav';
import Loginstyles from '../styles/loginstyle';
import firebase from '../firebase';
import { Value } from 'react-native-reanimated';
import { FlatList } from 'react-native-gesture-handler';
const db = firebase.firestore();

export default function Home({ navigation }) {
  const [datas, setData] = useState([]);
  useEffect(() => {
    db.collection('users')
      .get()
      .then((data) => {
        let arrayData = [];
        data.forEach((Value) => {
          if (Value.data().channelname) arrayData.push(Value.data());
        });
        console.log(arrayData);
        setData(arrayData);
      });
  }, []);
  function InsideChannel(email) {
    console.log(email);
  }

  return (
    <View style={styles.container}>
      <NavBar navigation={navigation} />
      <View style={[Loginstyles.parent, Loginstyles.blackBackGround]}>
        <FlatList
          numColumns={2}
          data={datas}
          keyExtractor={(item) => item.email}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                backgroundColor: 'white',
                height: '30vh',
                width: '45%',
                margin: '2%',
              }}
              onPress={() => InsideChannel(item.email)}
            >
              <Text>{item.channelname}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
