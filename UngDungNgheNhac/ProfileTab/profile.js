import React, { useState, useContext, useEffect } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Back from 'react-native-vector-icons/Ionicons'
import Edit from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'
import { GlobalContext } from './Context/update';
import QuanLyProfle from './qlProfile';
import AsyncStorage from "@react-native-async-storage/async-storage";




const DATA = [
    {
        id: '1',
        iconFirst: <View><Edit name='application-edit-outline' size={40} style={{ color: '#fff' }} /></View>,
        title: 'Edit Profile',
        iconLast: <View><MaterialIcons name='navigate-next' size={40} style={{ color: '#fff' }} /></View>,
    },
    {
        id: '2',
        iconFirst: <View><MaterialIcons name='spatial-audio' size={40} style={{ color: '#fff' }} /></View>,
        title: 'Audio Quatality',
        iconLast: <View><MaterialIcons name='navigate-next' size={40} style={{ color: '#fff' }} /></View>,
    },
    {
        id: '3',
        iconFirst: <View><MaterialIcons name='video-settings' size={40} style={{ color: '#fff' }} /></View>,
        title: 'Video Quality',
        iconLast: <View><MaterialIcons name='navigate-next' size={40} style={{ color: '#fff' }} /></View>,
    },
    {
        id: '4',
        iconFirst: <View><Feather name='download-cloud' size={40} style={{ color: '#fff' }} /></View>,
        title: 'Downloaded',
        iconLast: <View><MaterialIcons name='navigate-next' size={40} style={{ color: '#fff' }} /></View>,
    },
    {
        id: '5',
        iconFirst: <View><MaterialIcons name='language' size={40} style={{ color: '#fff' }} /></View>,
        title: 'Language',
        iconLast: <View><MaterialIcons name='navigate-next' size={40} style={{ color: '#fff' }} /></View>,
    },
    {
        id: '6',
        iconFirst: <View><MaterialIcons name='storage' size={40} style={{ color: '#fff' }} /></View>,
        title: 'Stogare',
        iconLast: <View><MaterialIcons name='navigate-next' size={40} style={{ color: '#fff' }} /></View>,
    },
    {
        id: '7',
        iconFirst: <View><Back name='settings-outline' size={40} style={{ color: '#fff' }} /></View>,
        title: 'Setting',
        iconLast: <View><MaterialIcons name='navigate-next' size={40} style={{ color: '#fff' }} /></View>,
    },
    {
        id: '8',
        iconFirst: <View><MaterialIcons name='feedback' size={40} style={{ color: '#fff' }} /></View>,
        title: 'Feedback',
        iconLast: <View><MaterialIcons name='navigate-next' size={40} style={{ color: '#fff' }} /></View>,
    },
]




export default function ProfileScreen({ navigation }) {
   
    // const { email } = useContext(GlobalContext);
    const { imgUrl } = useContext(GlobalContext);

    const [loginKey, setLoginKey] = useState({})
    const getLoginInfo = async ()=>{
            const value = await AsyncStorage.getItem('loginKey')
            try {
                if (value !== null){
                  setLoginKey(JSON.parse(value))
                }
            } catch (error) {
                console.log(error);
            }
    }
     
     useEffect(()=>{
        const unsubscribe = navigation.addListener('focus',()=>{
            getLoginInfo();
        });
        return unsubscribe
     },[navigation])
    const renderItem = ({ item }) => {
        const backgroundColor = '#0C0415';
        const color = '#fff';
        const Item = ({ item, onPress, backgroundColor, textColor }) => (
            <TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor }]}>
                <View style={{ flex: 1, paddingLeft: 10, }}>
                    <Text style={[styles.title, { color: textColor }]}>{item.iconFirst}</Text>
                </View>

                <View style={{ flex: 3, justifyContent: 'center' }}>
                    <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
                </View>

                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={[{ color: '#fff', fontSize: 22, paddingLeft: 20 }, { color: textColor }]}>{item.iconLast}</Text>
                </View>
            </TouchableOpacity>
        );
        return (
            <Item
                item={item}
                onPress={() => {
                    switch (item.id) {
                        case '1':
                            navigation.navigate('Update');
                            break;
                        case '8':
                            navigation.navigate('LoginScreen');
                            break;

                        default:
                            break;
                    }
                }}
                backgroundColor={backgroundColor}
                textColor={color}
            />
        );
    };
    return (
        <SafeAreaView style={styles.background}>
            <ScrollView>
                <View style={{ width: '100%', height: '100%', paddingTop: 40 }}>
                    {/* Title */}
                    <View style={{ width: '100%', height: '20%', flex: 1 }}>
                        <View style={{ width: '100%', height: 50, flexDirection: 'row', }}>
                            <View style={{ flex: 1, }}>

                            </View >
                            <View style={{ flex: 1, }}>
                                <Text style={{ color: '#fff', textAlign: 'center', fontSize: 21, fontWeight: 900, }}
                                >Profile
                                </Text>
                            </View>
                            <View style={{ flex: 1, }}>
                                <View style={{ flexDirection: 'row', }}>
                                    <View style={{ flex: 1, }}>

                                    </View >
                                    <View style={{ flex: 1, }}>
                                        <Back
                                            name="notifications"
                                            size={20}
                                            style={{ fontSize: 24, fontWeight: 600, color: '#fff', textAlign: 'center', }}
                                        />
                                    </View>
                                    <View style={{ flex: 1, alignContent: 'flex-end', paddingLeft: 10 }}>
                                        <Back
                                            name="search"
                                            size={20}
                                            style={{ fontSize: 24, fontWeight: 600, color: '#fff', textAlign: 'center' }}
                                        />
                                    </View>

                                </View>
                            </View>
                        </View>
                    </View>
                    {/* Thong tin nguoi dung da dang nhap*/}
                    <View style={{ width: '100%', height: '70%', flex: 1, marginBottom: 40 }}>
                        <View style={{ flexDirection: 'row', }}>
                            <View style={{ width: '100%', height: 100, flex: 1, justifyContent: 'center', paddingLeft: 10 }}>
                                {/* <Image
                                    source={require('../images/dia_nhac_trong.png')}
                                    resizeMode="stretch"
                                    style={{ width: 75, height: 75, borderRadius: 60 }}
                                /> */}
                                {imgUrl !== '' ?
                                    <Image style={{ width: 75, height: 75, borderRadius: 60 }} source={{ uri: imgUrl }} resizeMode="stretch" />
                                    : null
                                }
                            </View>
                            <View style={{ height: 100, flex: 3, justifyContent: 'center', paddingLeft: 5 }}>
                                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 700, fontFamily: "sans-serif" }}>
                                    {/* {globalState} */}
                                  {loginKey.email}
                                </Text>
                                <Text style={{ color: '#fff', paddingLeft: 10, fontStyle: 'italic' }}>
                                    {/* {globalEmail} */}
                                    {loginKey.userName}
                                </Text>
                            </View>
                            {/* <View style={{ height: 100,  flex: 1, backgroundColor: 'green' }}>
                               
                            </View> */}
                        </View>
                    </View>

                    {/* cac chuc nang cua man hinh profile */}


                    <FlatList
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}

                        scrollEnabled={false}
                    />


                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#0C0415",
        width: '100%',
        height: '100%',
        flex: 1
    },
    item: {
        marginTop: 15,
        borderBottomWidth: 2,
        paddingBottom: 20,
        borderColor: 'rgba(163, 157, 157, 0.08)',
        marginVertical: 8,
        marginHorizontal: 10,
        flexDirection: 'row'

    },
    title: {
        color: '#fff',
        fontSize: 22,
    },
});