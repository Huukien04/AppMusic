import React, { createContext, useContext, useState, useEffect } from 'react';
import MusicPlaylist from '../Class/MusicPlayList';
import Music from '../Class/Music';

const PlaylistContext = createContext();

export const PlaylistProvider = ({ children }) => {
    const [playlists, setPlaylists] = useState([]);
    const [songInPlayList, setSongInPlayList] = useState([]);
    const [song, setSong] = useState([]);

    useEffect(() => {
        const fetchMusicRecent = async () => {
            try {
                const response = await fetch('https://665640f79f970b3b36c4c7a9.mockapi.io/api/v1/ungdungnghenhac/Music');
                const data = await response.json();
                const musicData = data.map(song => new Music(song.id,song.name, song.artists_names, song.thumbnail,song.lyric));
                setSongInPlayList(musicData);
                setSong(musicData);
            } catch (error) {
                console.error('Error fetching music data:', error);
            }
        };

        const fetchPlaylists = async () => {
            try {
                const response = await fetch('https://665640f79f970b3b36c4c7a9.mockapi.io/api/v1/ungdungnghenhac/MusicPlaylist');
                const data = await response.json();
                const playlistData = data.map(playlist => new MusicPlaylist(playlist.id, playlist.name, playlist.playlist));
                setPlaylists(playlistData);
                
            } catch (error) {
                console.error('Error fetching playlists:', error);
            }
        };

        fetchMusicRecent();
        fetchPlaylists();
    }, []);

    const deletePlaylist = async (playlistIndex) => {
        const playlistId = playlists[playlistIndex].id; // Giả sử id của playlist được lưu trong mảng playlists
        try {
            const response = await fetch(`https://665640f79f970b3b36c4c7a9.mockapi.io/api/v1/ungdungnghenhac/MusicPlaylist/${playlistId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Something went wrong while deleting the playlist');
            }
            // Nếu xóa thành công trên server, cập nhật local state
            const updatedPlaylists = [...playlists];
            updatedPlaylists.splice(playlistIndex, 1);
            setPlaylists(updatedPlaylists);
            console.log('Playlist deleted successfully');
        } catch (error) {
            console.error('Error deleting playlist:', error.message);
        }
    };
    

    return (
        <PlaylistContext.Provider value={{ playlists, setPlaylists, deletePlaylist, songInPlayList, setSongInPlayList, song }}>
            {children}
        </PlaylistContext.Provider>
    );
};

export const usePlaylists = () => {
    return useContext(PlaylistContext);
};
