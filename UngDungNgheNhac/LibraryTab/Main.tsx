import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput, Button, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

//import Music from '../Class/Music';
import MusicPlaylist from '../Class/MusicPlayList';
import { usePlaylists } from './PlaylistContext';

export default function MainScreen({ navigation }) {
    const { playlists, setPlaylists, songInPlayList, setSongInPlayList } = usePlaylists();
    const [newPlaylistName, setNewPlaylistName] = useState('');
    const [showNewPlaylistForm, setShowNewPlaylistForm] = useState(false);

    //console.log(songInPlayList);

    //console.log(playlists);

    // const themBaiHat = () => {
    //     playlists.forEach(playlist => {
    //         if (!(playlist instanceof MusicPlaylist)) return;
    //         playlist.addMusic("Điều còn lại", "Phùng Khánh Linh", "3:30", require('../assets/dieuconlai.jpg'));
    //         playlist.addMusic("Trót Yêu", "Trung Quân Idol", "3:25", require('../assets/trotyeu.jpg'));
    //         playlist.addMusic("Từng Là", "Vũ Cát Tường", "3:15", require('../assets/tungla.jpg'));
    //     });
    // }

    const createNewPlaylist = async () => {
        if (newPlaylistName.trim() === '') {
            Alert.alert('Thông báo', 'Hãy nhập tên PlayList');
            return;
        }

        try {
            const response = await fetch('https://665640f79f970b3b36c4c7a9.mockapi.io/api/v1/ungdungnghenhac/Music', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newPlaylistName }),
            });

            if (response.ok) {
                const createdPlaylist = await response.json();
                setPlaylists(prevPlaylists => [...prevPlaylists, new MusicPlaylist(createdPlaylist.id, createdPlaylist.name)]);
                setShowNewPlaylistForm(false);
                setNewPlaylistName('');
            } else {
                Alert.alert('Error', 'Failed to create new playlist');
            }
        } catch (error) {
            console.error('Error creating new playlist:', error);
            Alert.alert('Error', 'An error occurred while creating the playlist');
        }
    };

    const handleItemPress = (item, index) => {
        if (index === 0) {
            setShowNewPlaylistForm(true);
            // themBaiHat();
        } else {
            setShowNewPlaylistForm(false);
            if (item instanceof MusicPlaylist) {
                console.log(item.getMusic());
                navigation.navigate('UpdateAndDelete', { playlist: item, index: index });
                const updatedRecentMusic = [...playlists[index].getMusic()];
                setSongInPlayList(updatedRecentMusic);
            }
        }
    };

    const renderItem = ({ item, index }) => (
        <TouchableOpacity
            onPress={() => handleItemPress(item, index)}
            style={styles.itemPlayList}>
            {index === 0 ? (
                <View style={{ alignItems: 'center' }}>
                    <Icon name='add-circle-outline' color={'#A307CA'} size={60} />
                    <Text style={styles.textItem} numberOfLines={2}>Tạo Danh Sách Nhạc</Text>
                </View>
            ) : (
                <View style={{ alignItems: 'center' }}>
                    <Icon name='album' color={'#A307CA'} size={60} />
                    <Text style={styles.textItem} numberOfLines={2}>{item.name}</Text>
                </View>
            )}
            {index === 0 && (
                <TouchableOpacity
                    onPress={() => setShowNewPlaylistForm(true)}>
                </TouchableOpacity>
            )}
        </TouchableOpacity>
    );


    const recentItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Playlist', { songId: item.id })   
        } style={styles.itemRecent}>
            <Image source={{ uri: item.image }} style={styles.musicImage} />
            <View style={styles.textContainer}>
                <Text style={styles.textMusic} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.textMusic} numberOfLines={1}>{item.artist}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>My Library</Text>

            <FlatList
                data={playlists}
                renderItem={renderItem}
                keyExtractor={(item) => item.name}
                horizontal={true}
                style={{ height: 1 }}
            />

            <Text style={styles.recentText}>Recent</Text>

            <FlatList
                data={songInPlayList}
                renderItem={recentItem}
                keyExtractor={(item) => item.title}
                style={{ height: 300 }}
            />

            {showNewPlaylistForm && (
                <View style={styles.newPlaylistForm}>
                    <Text style={styles.newPlaylistFormTitle}>Tạo danh sách nhạc</Text>
                    <TextInput
                        style={styles.newPlaylistFormInput}
                        placeholder="Nhập tên danh sách nhạc"
                        placeholderTextColor="white"
                        value={newPlaylistName}
                        onChangeText={setNewPlaylistName}
                    />
                    <View style={styles.newPlaylistFormButtonContainer}>
                        <TouchableOpacity onPress={createNewPlaylist} style={styles.newPlaylistFormButton}>
                            <Text style={styles.newPlaylistFormButtonText}>Tạo mới</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#080C0F',
    },
    //Anh cua nhac
    musicImage: {
        width: 70,
        height: 70,
        // borderRadius: 50,
    },
    //item trong playlist
    itemPlayList: {
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        borderColor: 'white',
        borderWidth: 1,
        // borderRadius: 80,
        borderRadius: 10,
        width: 130,
        height: 130,
    },
    textContainer: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center',
    },
    //css cua thuoc tinh recent
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
    //css cua My Library
    headerText: {
        textAlign: 'center',
        fontSize: 32,
        color: 'white',
        marginTop: 16,
        marginBottom: 16,
    },
    //css cua chu trong item danh sach nhac
    textItem: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    //style chu trong nhac
    textMusic: {
        color: 'white',
        fontSize: 16,
    },
    //kieu chu cua tieu de recent
    recentText: {
        color: 'white',
        fontSize: 20,
        marginLeft: 16,
    },
    newPlaylistForm: {
        backgroundColor: '#330066',
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
    },
    newPlaylistFormTitle: {
        color: 'white',
        fontSize: 20,
        textAlign: "center",
        marginBottom: 20,
    },
    newPlaylistFormInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        color: 'white',
        borderRadius: 30,
    },
    newPlaylistFormButton: {
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 30,
        width: 350,
        backgroundColor: '#660099',
        height: 40,
    },
    newPlaylistFormButtonText: {
        textAlign: 'center',
        color: 'white',
    },
    newPlaylistFormButtonContainer: {
        alignItems: 'center',
    }
});