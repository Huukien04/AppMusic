import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput, Button, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { usePlaylists } from './PlaylistContext';

//import Music from '../Class/Music';

export default function UpdateAndDeleteScreen({ navigation }) {
    const route = useRoute();
    const { deletePlaylist, setSongInPlayList, playlists, songInPlayList, song } = usePlaylists();
    const selectedPlaylist = route.params.playlist;
    const index = route.params.index;
    const [newPlaylistName, setNewPlaylistName] = useState(selectedPlaylist.name);

    const [musicInPlayList, setMusicInPlayList] = useState(selectedPlaylist.getMusic());

    console.log(playlists[index].playlist);

    //const [songInPlayList, setsongInPlayList] = useState(songInPlayList);

    const onClick = () => {
        console.log("Item is pressed");
        // playlists[2].setName("asdasdas")
        // console.log(playlists[index].getName());
    }

    const handleDeletePlaylist = () => {
        Alert.alert(
            'Xóa danh sách nhạc',
            'Bạn có chắc chắn muốn xóa danh sách nhạc này?',
            [
                { text: 'Hủy', style: 'cancel' },
                { text: 'Xóa', onPress: () => confirmDeletePlaylist(index) }
            ]
        );
    };

    const deleteSong = (i) => {
        console.log(i);
        Alert.alert(
            'Xóa bài hát',
            'Bạn có chắc chắn muốn xóa bài hát này?',
            [
                { text: 'Hủy', style: 'cancel' },
                { text: 'Xóa', onPress: () => deleteSongConfirm(i) }
            ]
        );
    }

    const deleteSongConfirm = (i) => {
        playlists[index].removeMusic(i);
        setMusicInPlayList([...playlists[index].getMusic()]);
        setSongInPlayList([...playlists[index].getMusic()]);
    }

    const confirmDeletePlaylist = (index) => {
        deletePlaylist(index);
        navigation.navigate('LibraryScreenMain');
    };

    const changeNamePlayList = async () => {
        if (newPlaylistName.trim() === '') {
            Alert.alert(
                'Thông báo',
                'Hãy nhập tên PlayList',
            );
            return;
        }
        const playlistId = playlists[index].id;
        playlists[index].setName(newPlaylistName);
        console.log(index);

        try {
            const response = await fetch(`https://665640f79f970b3b36c4c7a9.mockapi.io/api/v1/ungdungnghenhac/MusicPlaylist/${playlistId}`, {
                method: 'PUT', // Hoặc 'PATCH' tùy vào API yêu cầu
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(playlists[index])
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                console.error('Failed to add music to playlist:', response.statusText, errorMessage);
                return;
            }

            // Nếu cập nhật thành công trên server, cập nhật local state
            navigation.navigate('LibraryScreenMain', { index: index });
        } catch (error) {
            console.error('Error updating playlist name:', error.message);
        }
    };


    const addMusicToPlayList = (i) => {
        console.log(i)
        playlists[index].addMusic(song[i].id, song[i].title, song[i].artist, song[i].image, song[i].lyric);
        setMusicInPlayList([...playlists[index].getMusic()]);
        setSongInPlayList([...playlists[index].getMusic()]);
    }


    const musicInPlayListItem = ({ item, index }) => (
        <TouchableOpacity onPress={onClick} style={styles.itemRecent}>
            <Image source={{ uri: item.image }} style={styles.musicImage} />
            <View style={styles.textContainer}>
                <Text style={styles.textMusic} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.textMusic} numberOfLines={1}>{item.artist}</Text>
            </View>
            <View style={styles.buttonSongMusicRecent}>
                <TouchableOpacity onPress={() => deleteSong(index)} style={{ marginRight: 7 }}>
                    <Icon name='close' color={'white'} size={33} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    const songInPlayListItem = ({ item, index }) => (
        <TouchableOpacity onPress={onClick} style={styles.itemRecent}>
            <Image source={{ uri: item.image }} style={styles.musicImage} />
            <View style={styles.textContainer}>
                <Text style={styles.textMusic} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.textMusic} numberOfLines={1}>{item.artist}</Text>
            </View>
            <View style={styles.buttonSongMusicRecent}>
                <TouchableOpacity onPress={onClick} style={{ marginRight: 7 }}>
                    <Icon name='favorite' color={'white'} size={33} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => addMusicToPlayList(index)}>
                    <Icon name='add' color={'white'} size={33} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Chỉnh Sửa PlayList</Text>

            <TextInput
                style={styles.input}
                placeholder="Nhập Tên PlayList"
                placeholderTextColor="white"
                value={newPlaylistName}
                onChangeText={setNewPlaylistName}
            />

            <Text style={styles.recentText}>Bài hát trong danh sách</Text>

            <FlatList
                data={songInPlayList}
                renderItem={musicInPlayListItem}
                keyExtractor={(item) => item.title}
                style={{ height: 200 }}
            />

            <Text style={styles.recentText}>Bài hát gợi ý</Text>

            <FlatList
                data={song}
                renderItem={songInPlayListItem}
                keyExtractor={(item) => item.title}
                style={{ height: 200 }}
            />

            <View style={styles.newPlaylistForm}>
                <TouchableOpacity onPress={handleDeletePlaylist} style={styles.newPlaylistFormButton}>
                    <Text style={styles.newPlaylistFormButtonText}>Xóa</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={changeNamePlayList} style={styles.newPlaylistFormButton}>
                    <Text style={styles.newPlaylistFormButtonText}>Sửa</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonSongMusicRecent: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    textContainer: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center',
    },
    textMusic: {
        color: 'white',
        fontSize: 16,
    },
    musicImage: {
        width: 70,
        height: 70,
        // borderRadius: 50,
    },
    itemRecent: {
        flexDirection: 'row',
        padding: 10,
        marginBottom: 30,
        marginVertical: 8,
        marginHorizontal: 16,
        borderColor: 'gray',
        // borderWidth: 1,
        borderTopWidth: 0.4,
        borderBottomWidth: 0.4,
        // borderRadius: 10,
    },
    recentText: {
        marginTop: 10,
        color: 'white',
        fontSize: 20,
        marginLeft: 16,
    },
    newPlaylistForm: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
    },
    container: {
        flex: 1,
        backgroundColor: '#080C0F',
    },
    musicItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    title: {
        textAlign: 'center',
        fontSize: 32,
        color: 'white',
        marginTop: 20,
        marginBottom: 16,
    },
    input: {
        backgroundColor: "#080C0F",
        color: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 25,
        fontSize: 16,
        borderColor: '#A307CA',
        borderWidth: 2,
        fontStyle: 'italic',
        marginTop: 10,
        marginHorizontal: 20,
    },
    newPlaylistFormButton: {
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 30,
        width: 200,
        backgroundColor: '#660099',
        height: 40,
    },
    newPlaylistFormButtonText: {
        textAlign: 'center',
        color: 'white',
    },
});