import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button } from 'react-native';
import { Video } from 'expo-av';
// import {ScreenOrientation} from "expo"
import VideoPlayer from 'expo-video-player';

import Loginstyles from '../styles/loginstyle';
import firebase from '../firebase';
import VideoScreen from './VideoScreen';
import Context from '../context';
import AudioScreen from './MusicScreen';
const db = firebase.firestore();
export default function Videoplayer({ route, navigation }) {
  const [datas, setData] = useState([]);
  const [video, setVideo] = useState({});
  const [screen, setScreen] = useState(false);
  const [context, setcontext] = useContext(Context);
  const [music, setMusic] = useState(false);
  const [type, setType] = useState('music');
  useEffect(() => {
    setScreen(false);
    let db = firebase
      .firestore()
      .collection(type)
      .where('email', '==', route.params.email);
    db.get().then((data) => {
      let arrayValue = [];
      data.forEach((value) => {
        // arrayValue.push(value.data());
        let premium = false;
        if (value.data().vip != null && value.data().vip == 'yes') {
          premium = true;
        }
        let v = {
          id: value.data().id,
          url:
            'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          companyName: value.data().email,
          description: value.data().description,
          views: value.data().views,
          premium: premium,
        };
        arrayValue.push(v);
      });
      setData(arrayValue);
      console.log(arrayValue.length);
      console.log('jj');
    });
  }, [type]);
  function ShowVideo(url, id, description, views, premium) {
    if (context == false && premium == true) {
      window.alert('premium users only');
      return;
    }

    console.log('Video playig');
    let videoClick = {
      id,
      url,
      description,
      views,
    };
    firebase
      .firestore()
      .collection(type)
      .where('id', '==', id)
      .get()
      .then((doc) => {
        doc.forEach((data) => {
          let newData = data.data();
          newData.views += 1;
          db.collection(type).doc(data.id).set(newData);
          // db.collection("video").doc(data.i)
          // db.collection("video").
        });
      });

    setVideo(videoClick);
    if (type == 'video') setScreen(true);
    else setMusic(true);
  }
  return (
    <>
      <View style={{ flexDirection: 'row', width: '100%' }}>
        <View style={{ width: '49%', margin: 2 }}>
          <Button title='music' onPress={() => setType('music')} />
        </View>
        <View style={{ width: '49%', margin: 2 }}>
          <Button title='video' onPress={() => setType('video')} />
        </View>
      </View>
      {music && <AudioScreen data={video} />}
      {screen && <VideoScreen data={video} />}
      <FlatList
        data={datas}
        style={Loginstyles.blackBackGround}
        keyExtractor={(item) => item.id + Math.random() * 10}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              {
                flexDirection: 'row',

                margin: 1,
                height: 50,
                maxHeight: 100,
                margin: 10,
                backgroundColor: 'whitesmoke',
              },
              ,
            ]}
            onPress={() =>
              ShowVideo(
                item.url,
                item.id,
                item.description,
                item.views,
                item.premium
              )
            }
          >
            <Video
              source={{
                uri: item.url,
              }}
              resizeMode='stretch'
              isMuted={false}
              rate={1}
              style={{ width: '20%', height: '100%' }}
              shouldPlay={false}
            />
            <Text style={[{ margin: 5, fontWeight: 'bold' }]}>
              {item.description}
              {item.premium ? 'premium' : 'NOT'}
              {item.views}
            </Text>
          </TouchableOpacity>
        )}
      />
    </>
  );
}
