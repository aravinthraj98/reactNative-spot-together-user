import React, { useContext, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
// import {ScreenOrientation} from "expo"
import VideoPlayer from 'expo-video-player';

import Loginstyles from '../styles/loginstyle';
import firebase from '../firebase';
import VideoScreen from './VideoScreen';
import Context from '../context';
const db = firebase.firestore();
export default function Videoplayer({ route, navigation }) {
  const [datas, setData] = useState([]);
  const [video, setVideo] = useState({});
  const [screen, setScreen] = useState(false);
  const [context, setcontext] = useContext(Context);
  useState(() => {
    let db = firebase
      .firestore()
      .collection('video')
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
  }, []);
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
      .collection('video')
      .where('id', '==', id)
      .get()
      .then((doc) => {
        doc.forEach((data) => {
          let newData = data.data();
          newData.views += 1;
          db.collection('video').doc(data.id).set(newData);
          // db.collection("video").doc(data.i)
          // db.collection("video").
        });
      });
    setVideo(videoClick);
    setScreen(true);
  }
  return (
    <>
      {screen && <VideoScreen data={video} />}
      <FlatList
        data={datas}
        style={Loginstyles.blackBackGround}
        keyExtractor={(item) => item.id}
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
