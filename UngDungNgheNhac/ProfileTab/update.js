import React, { useState, createContext, useContext } from "react";
import { SafeAreaView, Text, View, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import Icons from "react-native-vector-icons/Ionicons";
import { launchImageLibrary } from 'react-native-image-picker';
import QuanLyProfle from "./qlProfile";
import { GlobalContext } from "./Context/update";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function MHUpdate({ navigation }) {


  const { userName, setUserName } = useContext(GlobalContext);
  // const { fullName, setFullName } = useContext(GlobalContext);
  // const { email, setEmail } = useContext(GlobalContext);
  // const { passWord, setPassWord } = useContext(GlobalContext);
  // const {  setGlobalEmail } = useContext(GlobalContext);

 // const [userName, setUserName] = useState();
  const [fullName, setFullName] = useState();
  const { email, setEmail } = useContext(GlobalContext);
  const [passWord, setPassWord] = useState();

  const { imgUrl, setImageUrl } = useContext(GlobalContext);

  const openLib = async () => {
       console.log("PRESS=====>")
       const result = await launchImageLibrary();
       if (!result.error && !result.didCancel) {
            const selectedImageUri = result.assets[0].uri;
            setImageUrl(selectedImageUri);
       }
       console.log("RESULT=====>", result)
  }


  // const [loginKey, setLoginKey] = useState({})
  const suaProfile = async () => {
       const objP = {
           fullName: fullName,
           userName: userName,
           passWord: passWord
       };
       try {
           const value = await AsyncStorage.getItem('loginKey');
           if (value !== null) {
               const res = await fetch("https://66564d799f970b3b36c4f12c.mockapi.io/api/profileuser/Profile/"+email, {
                   method: 'PUT',
                   headers: {
                       Accept: 'application/json',
                       'Content-Type': 'application/json',
                   },
                   body: JSON.stringify(objP),
               });
   
               if (res.status === 200) {
                   Alert.alert('Thành công', 'Cập nhật thành công');
               } else if (res.status === 404) {
                   Alert.alert('Lỗi', 'Email không tồn tại.');
               } else {
                   const errorText = await res.text();  // Lấy chi tiết lỗi từ phản hồi
                   console.error('Error:', errorText);
                   Alert.alert('Lỗi', 'Không thể sửa thông tin. Vui lòng thử lại.');
               }
           }
       } catch (error) {
           console.error('Error:', error);
           Alert.alert('Lỗi', 'Có lỗi xảy ra. Vui lòng thử lại.');
       }
   };

  return (
       <SafeAreaView style={styles.background}>
            <LinearGradient
                 start={{ x: 0.1, y: 1 }}
                 end={{ x: 0.2, y: 0.1 }}
                 colors={['rgba(10, 12, 18, 1)', 'transparent']}
                 style={styles.background}
            >
                 <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 200 }}>

                      <View style={{ width: '100%', height: '100%', paddingTop: 40 }}>
                           {/* Title */}
                           <View style={{ width: '100%', height: '20%' }}>
                                <View style={{ width: '100%', height: 30, flexDirection: 'row' }}>
                                     <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                                          <Icons
                                               name="close"
                                               size={30}
                                               style={{ color: '#FFFFFF', paddingLeft: 10 }}
                                          />
                                     </TouchableOpacity>
                                     <Text style={{ color: '#FFFFFF', textAlign: 'center', fontSize: 21, flex: 1, fontWeight: 700, }}>
                                          Chỉnh sửa profile
                                     </Text>
                                     <TouchableOpacity onPress={suaProfile}>
                                          <Text style={{ color: '#FFFFFF', fontSize: 16, paddingRight: 17, fontWeight: 500, paddingTop: 2, }}>
                                               Lưu
                                          </Text>
                                     </TouchableOpacity>
                                </View>

                                {/* Image */}
                                <View style={{ alignItems: 'center', marginTop: 30 }}>
                                     {imgUrl !== '' ?
                                          <Image style={{ width: 150, height: 170, borderRadius: 10 }} source={{ uri: imgUrl }} resizeMode="stretch" />
                                          : null
                                     }
                                     <TouchableOpacity onPress={openLib}>

                                          <Text style={{ color: '#fff', fontWeight: 700, marginTop: 10 }}>Đổi ảnh</Text>

                                     </TouchableOpacity>
                                </View>
                           </View>

                           {/* Edit */}

                           <View style={{ marginTop: 170, alignItems: 'center', width: '100%', height: '70%', }}>
                                <View style={{ width: '100%', height: 60, alignItems: 'center', justifyContent: 'space-between', }}>
                                     {/* <TextInput
                                          value={email}
                                          placeholder="Email"
                                          editable={false}
                                          onChangeText={setEmail}
                                          style={{ color: '#fff', fontSize: 14, height: '80%', width: '85%', borderWidth: 1, borderColor: 'rgba(163, 157, 157, 0.3)', borderRadius: 30, margin: 20, paddingLeft: 20 }}
                                          autoCapitalize='none'>
                                          
                                     </TextInput> */}
                                     <TextInput
                                          value={userName}
                                          placeholder="User name"
                                          onChangeText={setUserName}
                                          style={{ color: '#fff', fontSize: 14, height: '80%', width: '85%', borderWidth: 1, borderColor: 'rgba(163, 157, 157, 0.3)', borderRadius: 30, margin: 20, paddingLeft: 20 }}
                                          autoCapitalize='none'>
                                          {/* ...code */}
                                     </TextInput>
                                     <TextInput
                                          value={fullName}
                                          placeholder="FullName"
                                          onChangeText={setFullName}
                                          style={{ color: '#fff', fontSize: 14, height: '80%', width: '85%', borderWidth: 1, borderColor: 'rgba(163, 157, 157, 0.3)', borderRadius: 30, margin: 20, paddingLeft: 20 }}
                                          autoCapitalize='none'>
                                          {/* ...code */}
                                     </TextInput>
                                     <TextInput
                                          value={passWord}
                                          placeholder="PassWord"
                                          onChangeText={setPassWord}
                                          style={{ color: '#fff', fontSize: 14, height: '80%', width: '85%', borderWidth: 1, borderColor: 'rgba(163, 157, 157, 0.3)', borderRadius: 30, margin: 20, paddingLeft: 20 }}
                                          autoCapitalize='none'>
                                          {/* ...code */}
                                     </TextInput>
                                </View>
                           </View>
                           <View>
                                {/* <Text>{show}</Text> */}

                           </View>

                      </View>
                 </ScrollView>
            </LinearGradient>
       </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  background: {
       backgroundColor: '#0C0415',
       width: '100%',
       height: '100%',
       flex: 1
  },
  backArrow: {
       flexDirection: 'row',
  },
});