import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
  Animated,
} from 'react-native';
import React, { useEffect, useRef, useState ,useCallback} from 'react';
import TrackPlayer, {
  Event,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Picker as SelectPicker } from '@react-native-picker/picker';
import { useRoute } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

let currentTrack = 'play';
let playerInitialized = false;

const setUpPlayer = async (songs) => {
  if (!playerInitialized) {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add(songs);
      playerInitialized = true;
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log('Trình phát đã được khởi tạo');
  }
};

const togglePlayBack = async playBackState => {
  if (currentTrack !== null) {
    if (currentTrack === 'play') {
      await TrackPlayer.play();
      currentTrack = 'pause';
    } else {
      await TrackPlayer.pause();
      currentTrack = 'play';
    }
  }
};

const MusicPlayer = () => {
  const progress = useProgress();
  const [isPressed, setIsPressed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songIndex, setsongIndex] = useState(0);
  const [songs, setSongs] = useState([]);
  const [isRepeatOn, setIsRepeatOn] = useState(false); // State for repeat mode
  const srcollX = useRef(new Animated.Value(0)).current;
  const songSlider = useRef(null);

  const [selectedTime, setSelectedTime] = useState(30);
  const [showNewPlaylistForm, setShowNewPlaylistForm] = useState(false);
  const [message, setMessage] = useState("Hẹn giờ để tắt nhạc");


  const route = useRoute();
  const { songId } = route.params || {};
  // const fetchSongs = async () => {
  //   try {
  //     const response = await fetch('https://665c284d3e4ac90a04d8ce50.mockapi.io/BaiHat');
  //     const data = await response.json();
  //     const formattedSongs = data.map(song => ({
  //       id: song.id,
  //       url: song.url,
  //       title: song.title,
  //       artist: song.artist,
  //       artwork: song.artwork
  //     }));
  //     setSongs(formattedSongs);
  //     setUpPlayer(formattedSongs); // Setup player with fetched data
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const fetchSongs = useCallback(async () => {
    if (!songId) return;
    try {
        const response = await fetch(`https://665640f79f970b3b36c4c7a9.mockapi.io/api/v1/ungdungnghenhac/Music/${songId}`);
        console.log(`https://665640f79f970b3b36c4c7a9.mockapi.io/api/v1/ungdungnghenhac/Music/${songId}`);
        const data = await response.json();
        const formattedSongs = {
            id: data.id,
            title: data.name,
            artist: data.artists_names,
            thumbnail: data.thumbnail,
            url: data.lyric,
        };
        setSongs([formattedSongs]);
        setUpPlayer(formattedSongs)
    } catch (error) {
        console.log(error);
    }
}, [songId]);


  const scheduleShutdown = () => {
    const seconds = parseInt(selectedTime);
    //const seconds = minutes * 60;
    setShowNewPlaylistForm(false);
    setMessage(`Nhạc sẽ dừng trong ${seconds} giây.`);
    setTimeout(() => {
      setMessage("Nhạc đã dừng.");
      TrackPlayer.stop();
      setIsPlaying(false);
    }, seconds * 1000);
  };

  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async event => {
    if (event.type === Event.PlaybackActiveTrackChanged && event.nextTrack != null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
    }
  });

  const skipTo = async trackId => {
    await TrackPlayer.skip(trackId);
  };

  useEffect(() => {
        fetchSongs();
        
        const listener = srcollX.addListener(({ value }) => {
            const index = Math.round(value / width);
            // Call your skipTo function or any other logic
            skipTo(index);
            setsongIndex(index);
        });

        return () => {
          srcollX.removeListener(listener);
        };
    }, [fetchSongs, srcollX]);


  const handleSliderChange = async value => {
    await TrackPlayer.seekTo(value);
  };

  const handlePress = () => {
    setIsPressed(!isPressed);
  };

  const PlaybackState = usePlaybackState();

  const skipToNext = () => {
    if (isRepeatOn && songIndex === songs.length - 1) {
      // If repeat mode is on and at the last song, go to the first song.
      songSlider.current.scrollToOffset({ offset: 0 });
    } else {
      songSlider.current.scrollToOffset({ offset: (songIndex + 1) * width });
    }
  };

  const skipToPrevious = () => {
    if (isRepeatOn && songIndex === 0) {
      // If repeat mode is on and at the first song, go to the last song.
      songSlider.current.scrollToOffset({ offset: (songs.length - 1) * width });
    } else {
      songSlider.current.scrollToOffset({ offset: (songIndex - 1) * width });
    }
  };

  const rewind5Seconds = async () => {
    const currentPosition = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(currentPosition - 5);
  };

  const forward5Seconds = async () => {
    const currentPosition = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(currentPosition + 5);
  };

  const toggleRepeat = () => {
    setIsRepeatOn(!isRepeatOn);
  };

  const renderSong = ({ item }) => (
    <Animated.View style={style.mainImageWrapper}>
      <View style={[style.imageWrapper, style.elevation]}>
        <Image source={{ uri: item.thumbnail }} style={style.musicImage} />
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={style.container}>
      <View style={style.maincontainer}>
        {songs.length > 0 && (
          <>
            <Animated.FlatList
              ref={songSlider}
              renderItem={renderSong}
              data={songs}
              keyExtractor={item => item.id}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: { x: srcollX },
                    },
                  },
                ],
                { useNativeDriver: true },
              )}
            />
            {/* Hiển thị thông tin bài hát */}
            <View>
              <Text style={[style.songContent, style.songTitle]}>
                {songs[songIndex]?.title}
              </Text>
              <Text style={[style.songContent, style.songArtist]}>
                {songs[songIndex]?.artists_names}
              </Text>
            </View>
            {/* Thanh trượt */}
            <View>
              <Slider
                style={style.progressbar}
                value={progress.position}
                minimumValue={0}
                maximumValue={progress.duration}
                thumbTintColor="#EEEEEE"
                minimumTrackTintColor="#EEEEEE"
                maximumTrackTintColor="#EEEEEE"
                onValueChange={handleSliderChange}
              />
              {/* Hiển thị thời gian */}
              <View style={style.progressLevelDuration}>
                <Text style={style.propressLabelText}>
                  {new Date(progress.position * 1000).toISOString().substring(14, 19)}
                </Text>
                <Text style={style.propressLabelText}>
                  {new Date(progress.duration * 1000).toISOString().substring(14, 19)}
                </Text>
              </View>
            </View>
            {/* Điều khiển nhạc */}
            <View style={style.musicControlContainer}>
              <TouchableOpacity onPress={rewind5Seconds}>
                <Ionicons name="play-back-outline" size={35} color="#EEEEEE" />
              </TouchableOpacity>
              <TouchableOpacity onPress={skipToPrevious}>
                <Ionicons name="play-skip-back-outline" size={35} color="#EEEEEE" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  togglePlayBack(PlaybackState);
                  setIsPlaying(!isPlaying);
                }}>
                <Ionicons
                  name={isPlaying ? 'pause-circle-sharp' : 'play-circle-sharp'}
                  size={80}
                  color="#EEEEEE"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={skipToNext}>
                <Ionicons
                  name="play-skip-forward-outline"
                  size={35}
                  color="#EEEEEE"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={forward5Seconds}>
                <Ionicons name="play-forward-outline" size={35} color="#EEEEEE" />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
      <View style={style.bottomContainer}>
        <View style={style.bottomIconWrapper}>
          <TouchableOpacity onPress={handlePress}>
            <Ionicons
              name={isPressed ? 'heart' : 'heart-outline'}
              size={30}
              color={isPressed ? '#FF69B4' : '#888888'}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleRepeat}>
            <Ionicons
              name={isRepeatOn ? 'repeat' : 'repeat-outline'}
              size={30}
              color={isRepeatOn ? '#FF69B4' : '#888888'}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons name="share-outline" size={30} color="#888888" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShowNewPlaylistForm(true)}>
            <Ionicons name="timer-outline" size={30} color="#888888" />
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons name="ellipsis-horizontal" size={30} color="#888888" />
          </TouchableOpacity>
        </View>
      </View>

      {showNewPlaylistForm && (
        <View style={style.newPlaylistForm}>
          <Text style={style.message}>{message}</Text>
          <SelectPicker
            selectedValue={selectedTime}
            style={style.picker}
            onValueChange={(itemValue) => setSelectedTime(itemValue)}
          >
            <SelectPicker.Item label="30 giây" value="30" />
            <SelectPicker.Item label="1 phút" value="60" />
            <SelectPicker.Item label="5 phút" value="300" />
            <SelectPicker.Item label="10 phút" value="600" />
            <SelectPicker.Item label="15 phút" value="900" />
            <SelectPicker.Item label="30 phút" value="1800" />
            <SelectPicker.Item label="60 phút" value="3600" />
          </SelectPicker>
          <TouchableOpacity onPress={scheduleShutdown} style={style.newPlaylistFormButton}>
            <Text style={style.newPlaylistFormButtonText}>Xác nhận</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default MusicPlayer;

const style = StyleSheet.create({

  newPlaylistForm: {
    alignItems: 'center',
    backgroundColor: '#330066',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
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


  container: {
    flex: 1,
    backgroundColor: '#555',
  },
  maincontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    width: width,
    alignItems: 'center',
    paddingVertical: 15,
    borderTopColor: '#393E46',
  },
  bottomIconWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  imageWrapper: {
    width: 300,
    height: 340,
    marginBottom: 25,
  },
  musicImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  elevatison: {
    elevatison: 5,
    shadowColor: '#ccc',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
  songTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  songArtist: {
    fontSize: 16,
    fontWeight: '300',
  },
  songContent: {
    textAlign: 'center',
    color: '#EEEEEE',
  },
  progressbar: {
    width: 350,
    height: 40,
    margin: 25,
    flexDirection: 'row',
  },
  propressLabelText: {
    color: '#EEEEEE',
    fontWeight: '500',
  },
  progressLevelDuration: {
    width: 370,
    paddingLeft: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  musicControlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 15,
  },
  mainImageWrapper: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    alignSelf: 'flex-start',
    height: 50,
    width: 200,
    color: '#EEEEEE',
  },
  message: {
    fontSize: 26,
    color: '#EEEEEE',
    marginBottom: 10,
  },
});
