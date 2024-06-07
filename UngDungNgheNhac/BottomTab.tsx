import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from './HomeScreen/HomeScreen';
import FavoriteScreen from './FavoriteScreen/FavoriteScreen';
import LibraryScreen from './LibraryTab/LibraryScreen'
import ProfileScreen from './ProfileTab/ProfileScreen'

const Tab = createMaterialBottomTabNavigator();

export default function BottomTab() {
    return (
        <Tab.Navigator
            barStyle={{
                backgroundColor: 'black',
                borderTopWidth: 2,
                borderColor: 'white',
            }}>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: "",
                    tabBarIcon: ({ focused }) => <Icon name='home' color={focused ? '#080C0F' : 'white'} size={32} />
                }} />
            <Tab.Screen
                name="Favorite"
                component={FavoriteScreen}
                options={{
                    tabBarLabel: "",
                    tabBarIcon: ({ focused }) => <Icon name='favorite' color={focused ? '#080C0F' : 'white'} size={32} />
                }} />
            <Tab.Screen
                name="Library"
                component={LibraryScreen}
                options={{
                    tabBarLabel: "",
                    tabBarIcon: ({ focused }) => <Icon name='library-music' color={focused ? '#080C0F' : 'white'} size={32} />
                }} />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: "",
                    tabBarIcon: ({ focused }) => <Icon name='person' color={focused ? '#080C0F' : 'white'} size={32} />
                }} />
        </Tab.Navigator>
    );
}
