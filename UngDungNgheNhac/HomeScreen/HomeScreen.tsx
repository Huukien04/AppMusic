import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import Details from './Details'
import AddSinger from './AddSinger'
import Playlist from './PlayMusic/MusicPlayer'

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="AddSinger" component={Details} />
      <Stack.Screen name="Playlist" component={Playlist} />
    </Stack.Navigator>
  );
}

export default function HomeScreen() {
  return (
      <MyStack />
  );
}