import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING, BORDERRADIUS } from '../theme/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CARD_WIDTH = Dimensions.get('window').width * 0.32;

const FavoriteScreen = ({ navigation }) => {
  const [favoriteSongs, setFavoriteSongs] = useState([]);

  const loadFavoriteSongs = async () => {
    try {
      const favoriteSongs = await AsyncStorage.getItem('favoriteSongs');
      if (favoriteSongs !== null) {
        setFavoriteSongs(JSON.parse(favoriteSongs));
        console.log("asdasda")
      }
    } catch (error) {
      console.error('Failed to load favorite songs', error);
      console.log("2")
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadFavoriteSongs();
    }, [])
  );

  const renderSong = ({ item: song }) => (
    
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 3, y: 3 }}
      style={styles.CardLinearGradientContainer}
      
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
    >
      <ImageBackground
          source={{ uri: song.thumbnail }}
        style={styles.CardImageBG}
        resizeMode="cover"
      />
      <Text style={styles.CardTitle}>{song.name}</Text>
      <Text style={styles.CardSubtitle}>{song.artists_names}</Text>
      <View style={styles.CardFooterRow}>
        <Text style={styles.CardPriceCurrency}>
          <Text style={styles.CardPrice}>{song.listenCount}</Text>
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Details', { song });
          }}
        >
          <Icon
            color={COLORS.primaryWhiteHex}
            name={'eye'}
            size={FONTSIZE.size_18}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );

  return (
    <View style={styles.container}>
    <View >
    <Text  style={styles.title} >Danh sách bài hát yêu thích </Text>
    </View>
    <View >
      <FlatList
        data={favoriteSongs}
        renderItem={renderSong}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
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
  },
  CardImageBG: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    borderRadius: BORDERRADIUS.radius_20,
    marginBottom: SPACING.space_15,
    overflow: 'hidden',
  },
  CardTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_10,
  },
  CardSubtitle: {
    fontFamily: FONTFAMILY.poppins_light,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_10,
  },
  title: {
    fontFamily: FONTFAMILY.poppins_light,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_20,
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
});

export default FavoriteScreen;
