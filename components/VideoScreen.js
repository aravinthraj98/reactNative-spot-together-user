import React, { useState } from 'react';
import { Video } from 'expo-av';
// import {ScreenOrientation} from "expo"

import VideoPlayer from 'expo-video-player';
import * as ScreenOrientation from 'expo-screen-orientation';

import { Dimensions, View, Text } from 'react-native';
import Loginstyles from '../styles/loginstyle';
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

export default function VideoScreen(props) {
  const [dimention, setDimention] = useState({ width, height });
  //   useState(a () => {
  //     // await landscape();
  //   }, []);
  async function landscape() {
    console.log(ScreenOrientation.getOrientationLockAsync());
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
    );
    let width = Dimensions.get('window').height;
    let height = Dimensions.get('window').width;
    let dimensions = {
      width,
      height,
    };
    setDimention(dimensions);
    console.log('hello');
  }

  return (
    <>
      {/* <VideoPlayer
        videoProps={{
          shouldPlay: false,
          resizeMode: Video.RESIZE_MODE_COVER,

          source: {
            uri:
              'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          },
        }}
        width={dimention.width}
        height={dimention.height}
        fullscreenExitIcon={true}
        switchToLandscape={landscape}
      /> */}
      <Video
        source={{
          uri: props.data.url,
        }}
        isBuffering
        isMuted={false}
        resizeMode='stretch'
        rate={1}
        style={{ width: '100%', height: '40%' }}
        shouldPlay={false}
        useNativeControls
        onFullscreenUpdate={landscape}
      />
      <View
        style={[
          Loginstyles.blackBackGround,
          { flexDirection: 'row', justifyContent: 'space-between', padding: 7 },
        ]}
      >
        <Text style={[{ padding: '3%', color: 'white' }]}>
          description:  {props.data.description}
        </Text>
        <Text style={{ color: 'grey', textAlign: 'right', alignSelf: 'right' }}>
          Views:{props.data.views}
        </Text>
      </View>
    </>
  );
}
