import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, TextInput, Modal, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

// Các phần còn lại của mã

const AddSingerScreen = ({ navigation }) => {
  const [newSinger, setNewSinger] = useState('');
  const [newSongName, setNewSongName] = useState('');
  const [newSongImage, setNewSongImage] = useState(null);

  const handleAddSinger = () => {
    if (newSinger.trim() !== '') {
      // Logic để thêm ca sĩ mới vào danh sách data
      const newSingerData = {
        singer: newSinger.trim(),
        songs: [],
      };
      data.push(newSingerData);
      setNewSinger('');
    }
  };

  const handleAddNewSong = () => {
    if (newSongName.trim() !== '' && newSongImage !== null) {
      // Logic để thêm bài hát mới vào danh sách data
      const newSong = {
        id: data.length + 1, // ID mới là số lượng ca sĩ hiện có + 1
        name: newSongName.trim(),
        image: newSongImage,
        singer: newSinger.trim(), // Tên ca sĩ được chọn
      };
      const singerIndex = data.findIndex((singer) => singer.singer === newSinger.trim());
      if (singerIndex !== -1) {
        data[singerIndex].songs.push(newSong);
      }
      setNewSongName('');
      setNewSongImage(null);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Tên ca sĩ mới"
        value={newSinger}
        onChangeText={(text) => setNewSinger(text)}
      />
      <Button title="Thêm ca sĩ" onPress={handleAddSinger} />

      <TextInput
        style={styles.input}
        placeholder="Tên bài hát mới"
        value={newSongName}
        onChangeText={(text) => setNewSongName(text)}
      />
      <Button title="Chọn ảnh bài hát" onPress={() => {/* Xử lý chọn ảnh từ máy */}} />
      {newSongImage && <Image source={newSongImage} style={styles.image} />}
      <Button title="Thêm bài hát" onPress={handleAddNewSong} />
    </View>
  );
};

export default AddSingerScreen;
