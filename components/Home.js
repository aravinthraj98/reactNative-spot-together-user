import React, { useEffect, useState } from 'react';
import {
  LogBox,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import NavBar from '../components/topNav';
import Loginstyles from '../styles/loginstyle';
import firebase from '../firebase';
import { Value } from 'react-native-reanimated';
import { FlatList } from 'react-native-gesture-handler';
const db = firebase.firestore();

export default function Home({ navigation }) {
  const dummyurl =
    'https://tse1.mm.bing.net/th?id=OIP.L6DngeDOZ1Vmlv9MbEtj5QHaHa&pid=Api&P=0&w=300&h=300';
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
    navigation.navigate('VideoPlayer', { email });
    console.log('navigated');
    return;
  }

  return (
    <View style={styles.container}>
      <NavBar navigation={navigation} />
      <View style={[Loginstyles.parent, Loginstyles.blackBackGround]}>
        <FlatList
          numColumns={2}
          data={datas}
          keyExtractor={(item) => item.email}
          renderItem={({ item }) => {
            if (item.logo == 'nourl') {
              item.logo = dummyurl;
              console.log(item.logo + 'ss');
            } else {
              console.log(item.logo);
            }

            return (
              <TouchableOpacity
                style={{
                  height: '30vh',
                  width: '45%',
                  margin: '2%',
                }}
                onPress={() => InsideChannel(item.email)}
              >
                <Image
                  style={{ width: '100%', height: '25vh' }}
                  source={{
                    uri: item.logo,
                  }}
                />
                <Text style={{ color: 'white', alignSelf: 'center' }}>
                  {item.channelname}
                </Text>
              </TouchableOpacity>
            );
          }}
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
