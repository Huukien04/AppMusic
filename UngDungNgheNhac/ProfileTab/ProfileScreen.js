import * as React from 'react';
import MHUpdate from './update';
import ProfileScreen from './profile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

function MyTabs() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="Update" component={MHUpdate} />
        </Stack.Navigator>
    );
}

export default function MHHome() {
    return (
        <MyTabs />
    )
}