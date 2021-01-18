import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Loginstyles from '../styles/loginstyle';

export default function AudioScreen(props) {
  const [sound, setSound] = React.useState();

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(props.data.url);
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  React.useEffect(() => {
    playSound();
  }, []);

  return (
    <View
      style={[
        { flexDirection: 'row', color: 'black', padding: 10 },
        Loginstyles.greenBackGround,
      ]}
    >
      <Text>playing-{props.data.description}</Text>
    </View>
  );
}
