import React, { useState, useEffect } from 'react';
import { ImageBackground, Dimensions, View, Text, Button, FlatList, Image, TouchableOpacity, StyleSheet, TextInput, Alert, ScrollView } from 'react-native';
import { Backdrop, BackdropSubheader, AppBar, IconButton } from "@react-native-material/core";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome5';

import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import ImagePicker from 'react-native-image-picker';
import { useFocusEffect } from '@react-navigation/native';
const CARD_WIDTH = Dimensions.get('window').width * 0.32;




const SongItem = ({ item, navigation }) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 3, y: 3 }}
      style={styles.CardLinearGradientContainer}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Playlist', { song: item });
        }}
      >
        <ImageBackground
          source={{ uri: item.thumbnail }}
          style={styles.CardImageBG}
          resizeMode="cover"
        />
        <Text style={styles.CardTitle}>{item.name}</Text>
        <Text style={styles.CardSubtitle}>{item.artists_names}</Text>
      </TouchableOpacity>
      <View style={styles.CardFooterRow}>
        <Text style={styles.CardPriceCurrency}>
          <Text style={styles.CardPrice}>{item.content_owner}</Text>

        </Text>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Details', { song: item });
          }}
        >
          <Icon
            color={COLORS.primaryWhiteHex}
            name={'eye'}
            BGColor={COLORS.primaryOrangeHex}
            size={FONTSIZE.size_18}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const HomeScreen = ({ navigation }) => {
  const [currentSongs, setCurrentSongs] = useState([]);
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const [sortedSongs, setSortedSongs] = useState([]);
  const [currentSongsTheLoai, setCurrentSongsTheLoai] = useState([]);
  const [revealed, setRevealed] = useState(false);
  const [uniqueSingers, setUniqueSingers] = useState([]);
  const [arrsongs, setSongs] = useState();

  const [searchTerm, setSearchTerm] = useState('');
const [filteredSongs, setFilteredSongs] = useState([]);

  const [currentSongsBySinger, setCurrentSongsBySinger] = useState([]);

  const getAPISong = () => {

    return fetch('https://665640f79f970b3b36c4c7a9.mockapi.io/api/v1/ungdungnghenhac/Music').then((response) => response.json()).then((data) => {
      setSongs(data);
      extractUniqueSingers(data);
      setCurrentSongsTheLoai(data); 
        setSortedSongs(sortSongsByListenCount(data).slice(0, 4)); 
    }).catch(err => console.log(err))

  }






  const extractUniqueSingers = (songs) => {
    const singers = [...new Set(songs.map(song => song.artists_names))];
    setUniqueSingers(singers);
  };

  const handleSingerPress = (artists_names) => {
    const filteredSongs = arrsongs.filter(song => song.artists_names === artists_names);
    setCurrentSongsBySinger(filteredSongs);
  };


  const handleAllSongsPressTheLoai = () => {
    setCurrentSongsTheLoai(arrsongs);
  };

  useEffect(() => {
    handleAllSongsPressTheLoai();
    getAPISong();
    

    if (arrsongs && arrsongs.length > 0) {
      const sorted = sortSongsByListenCount(arrsongs);
      setSortedSongs(sorted.slice(0, 4));
    }
   
  }, []);

  //if (currentSongs.length > 0) {
  //   const sorted = [...currentSongs];
  //   sorted.sort((a, b) => b.listenCount - a.listenCount);
  //   setSortedSongs(sorted.slice(0, 4));
  // }
  const sortSongsByListenCount = (songs) => {
    return songs.slice().sort((a, b) => b.content_owner - a.content_owner);
  };

  const showAlert = (message) => {
    Alert.alert(
      'Thông báo',
      message,
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: false }
    );
  };

  const handleFavoritePress = (song) => {
    const isFavorite = favoriteSongs.some(favorite => favorite.id === song.id);
    if (!isFavorite) {
      const updatedFavorites = [...favoriteSongs, song];
      setFavoriteSongs(updatedFavorites);
      navigation.navigate('Favorite', { favoriteSongs: updatedFavorites });
    } else {
      showAlert('Bài hát đã có trong danh sách yêu thích');
    }
  };



  const handleAllSongsPress = () => {

     setCurrentSongsBySinger(arrsongs);
  };

  const handleSearch = (text) => {
    setSearchTerm(text);
    if (text === '') {
      setFilteredSongs([]);
      return;
    }
  
    const filtered = arrsongs.filter(
      song =>
        song.name.toLowerCase().includes(text.toLowerCase()) ||
        song.artists_names.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredSongs(filtered);
  };

    // Gửi yêu cầu tìm kiếm API
    // searchAPI(text)
    //   .then((data) => {
    //     // Xử lý dữ liệu nhận được từ API
    //     setCurrentSongs(data);
    //     console.log('Filtered Songs:', data);
    //   })
    //   .catch((error) => {
    //     // Xử lý lỗi nếu có
    //     console.error('Error searching:', error);
    //     // Xóa danh sách hiện tại nếu có lỗi
    //     setCurrentSongs([]);
    //   });



    //    const filteredSongs = arrsongs.reduce((acc, item) => {
    //   const filteredBySongName = item.songs.filter(song =>
    //     song.name.toLowerCase().includes(text.toLowerCase())
    //   );
    //   return [...acc, ...filteredBySongName];
    // }, []);

    //   setCurrentSongs(filteredSongs);
    //   console.log('Filtered Songs:', filteredSongs);
 //};


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logo}>
          <Image source={require('../assets/logo.png')} style={styles.logoImage} />
        </View>
        <Text style={styles.appTitle}>MusicApp</Text>
        <IconFontAwesome style={styles.notificationIcon} name="bell" size={24} color="white" />
      </View>

      <Backdrop
        revealed={revealed}
        style={styles.backdrop}
        header={
          <AppBar
            title={
              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Nhập từ khóa tìm kiếm"
                  // value={searchTerm}
                  onChangeText={handleSearch}
                />
                <IconButton
                  icon={props => <Icon name="magnify" {...props} />}
                  color="red"
                  onPress={() => handleSearch(searchTerm)}
                />
              </View>
            }
            transparent
            leading={props => (
              <IconButton
                icon={props => (
                  <Icon name={revealed ? "close" : "menu"} {...props} />
                )}
                onPress={() => setRevealed(prevState => !prevState)}
                {...props}
              />
            )}
          />
        }
        backLayer={
          <View style={styles.backLayer}>
            <Button
              title="Thêm bài hát"
              onPress={() => showAlert('Thêm bài hát')}
              color="#CA07B6"
            />
            <Button
              title="Thêm thể loại"
              onPress={() => showAlert('Thêm thể loại')}
              color="#CA07B6"
            />
          </View>
        }
      >

        <ScrollView style={styles.scrollView}>
          {/* <View>
            <FlatList
              horizontal
              data={arrgenre}
              style={styles.CategoryScrollViewContainer}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.CategoryScrollViewContainer}>
                  <TouchableOpacity style={styles.CategoryScrollViewItem} onPress={() => handleGenreItemPress(item)}>
                    <Text style={[styles.CategoryText, { color: COLORS.primaryOrangeHex }]}>{item.name}</Text>
                  </TouchableOpacity>
                </View>
              )}

              ListHeaderComponent={(
                <TouchableOpacity style={styles.genreItem} onPress={handleAllSongsPressTheLoai}>
                  <Text style={[styles.CategoryText, { color: COLORS.primaryOrangeHex }]}>Tất cả</Text>
                </TouchableOpacity>
              )}
            />
          </View>
          <View>
            <FlatList
              horizontal
              data={currentSongsTheLoai}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <SongItem key={item.id} item={item} onPressFavorite={handleFavoritePress} navigation={navigation} />
              )}
            />
          </View> */}

{filteredSongs.length > 0 && (
            <View style={styles.filteredSongsContainer}>
              <Text style={styles.filteredSongsTitle}>Kết quả tìm kiếm</Text>
              <FlatList
               
                data={filteredSongs}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                renderItem={({ item }) => (
                  <SongItem key={item.id} item={item} onPressFavorite={handleFavoritePress} navigation={navigation} />
                )}
              />
            </View>
          )}

          <View>
            <FlatList
              horizontal
              data={uniqueSingers}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.CategoryScrollViewContainer}>
                  <TouchableOpacity style={styles.a} onPress={() => handleSingerPress(item)}>
                    <Text style={styles.singerItem}>{item}</Text>
                  </TouchableOpacity>
                </View>
              )}
              ListHeaderComponent={(
                <TouchableOpacity style={styles.a} onPress={handleAllSongsPress}>
                  <Text style={styles.singerItem}>Tất cả</Text>
                </TouchableOpacity>
              )}
            />
          </View>


          {currentSongsBySinger.length > 0 && (
            <View>
              <Text style={styles.sortedSongsTitle}>Bài hát của {currentSongsBySinger[0].artists_names}</Text>
              <FlatList
                horizontal
                data={currentSongsBySinger}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <SongItem key={item.id} item={item} onPressFavorite={handleFavoritePress} navigation={navigation} />
                )}
              />
            </View>
          )}
          <View style={styles.sortedSongsContainer}>
            <Text style={styles.sortedSongsTitle}>Top bài hát nhiều lượt nghe nhất</Text>
            <FlatList
              horizontal
              data={sortedSongs}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <SongItem key={item.id} item={item} onPressFavorite={handleFavoritePress} navigation={navigation} />
              )}
            />
          </View>

        </ScrollView>
      </Backdrop>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  CardLinearGradientContainer: {
    padding: SPACING.space_15,
    marginRight: 20,
    marginBottom: 10,
    borderRadius: BORDERRADIUS.radius_20,
    // borderColor: '#ff0000', 
    // borderWidth: 1,
  },
  backdrop: {
    backgroundColor: COLORS.primaryBlackHex,
  },
  CardImageBG: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    borderRadius: BORDERRADIUS.radius_20,
    marginBottom: SPACING.space_15,
    overflow: 'hidden',



  },
  CardRatingContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.primaryBlackRGBA,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.space_10,
    paddingHorizontal: SPACING.space_15,
    position: 'absolute',
    borderBottomLeftRadius: BORDERRADIUS.radius_20,
    borderTopRightRadius: BORDERRADIUS.radius_20,
    top: 0,
    right: 0,
  },
  CardRatingText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
    lineHeight: 22,
    fontSize: FONTSIZE.size_14,
  },
  CardTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_10,
    width: 100,
    height: 30,
  },
  CardSubtitle: {
    fontFamily: FONTFAMILY.poppins_light,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_10,
  },
  CardFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.space_15,
  },
  CardPriceCurrency: {
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryOrangeHex,
    fontSize: FONTSIZE.size_10,
  },
  CardPrice: {
    color: COLORS.primaryWhiteHex,
  },

  CategoryScrollViewStyle: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,
  },
  CategoryScrollViewContainer: {
    paddingHorizontal: SPACING.space_15,
    marginBottom: 10,

  },
  CategoryScrollViewItem: {
    alignItems: 'center',
  },
  CategoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
  backLayer: {
    padding: 20,

    flexDirection: 'column',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    borderRadius: 25,
    paddingHorizontal: 10,

  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primaryBlackHex,
    paddingTop: 10,

  },
  logo: {
    width: 40,
    height: 40,
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  appTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  notificationIcon: {
    paddingHorizontal: 10,
  },
  scrollView: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  showSortedButton: {
    backgroundColor: '#CA07B6',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  sortedSongsContainer: {
    marginTop: 5,

    marginBottom: 90,
  },
  sortedSongsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  separator: {
    borderBottomColor: 'pink',
    borderBottomWidth: 3,
    marginVertical: 5,
  },
  a: {
    marginTop: 10,
    marginBottom: 10,
  },
  listenCount: {
    color: 'white',
    fontSize: 9,
    marginTop: 10,
  },
  singerItem: {
    color: COLORS.primaryOrangeHex

  },
  songItem: {
    backgroundColor: 'black',
    borderRadius: 10,
    marginRight: 10,
    padding: 10,
    width: 130,
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#CA07B6',
    borderWidth: 2,
    position: 'relative',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 100,
    shadowRadius: 2,
    elevation: 10,
    shadowColor: 'white',
  },
  songImage: {
    width: 50,
    height: 60,
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 100,
    shadowRadius: 2,
    elevation: 10,
    shadowColor: 'white',
  },
  songDetails: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  songName: {
    color: 'white',
    fontSize: 9,
  },
  singerName: {
    color: 'gray',
    marginTop: 5,
    fontSize: 7,
  },

  searchInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: '#CA07B6',
    borderRadius: 10,
    borderWidth: 3,
    marginTop: 10,
    paddingLeft: 10,
    color: 'white',
    marginBottom: 8,
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 15,
    fontSize: 16,

  },
  favoriteIconContainer: {
    bottom: 0,
    right: 0,
    padding: 0,
    alignSelf: 'flex-end',
  },
  filteredSongsContainer: {
    marginVertical: 20,
    
  },
  filteredSongsTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 20,
  },
});

export default HomeScreen;
