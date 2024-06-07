import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PlaylistProvider } from './PlaylistContext';

import LibraryScreenMain from './Main';
import UpdateAndDelete from './UpdateAndDelete';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LibraryScreenMain" component={LibraryScreenMain} />
      <Stack.Screen name="UpdateAndDelete" component={UpdateAndDelete} />
    </Stack.Navigator>
  );
}

export default function LibraryScreen() {
  return (
    <PlaylistProvider>
      <MyStack />
    </PlaylistProvider>
  );
}