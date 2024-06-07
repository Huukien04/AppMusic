import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome5';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING, BORDERRADIUS } from '../theme/theme';
import songs from './PlayMusic/model/Data';

const DetailsScreen = ({ navigation, route }) => {
  const { song } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const loadFavoriteStatus = async () => {
      try {
        const favoriteSongs = await AsyncStorage.getItem('favoriteSongs');
        if (favoriteSongs !== null) {
          const favorites = JSON.parse(favoriteSongs);
          const isFav = favorites.some(favSong => favSong.id === song.id);
          setIsFavorite(isFav);
        }
      } catch (error) {
        console.error('Failed to load favorite status', error);
      }
    };

    loadFavoriteStatus();
  }, [song.id]);

  const toggleFavourite = async () => {
    try {
      const favoriteSongs = await AsyncStorage.getItem('favoriteSongs');
      let favorites = favoriteSongs ? JSON.parse(favoriteSongs) : [];

      if (isFavorite) {
        favorites = favorites.filter(favSong => favSong.id !== song.id);
      } else {
        favorites.push(song);
      }

      await AsyncStorage.setItem('favoriteSongs', JSON.stringify(favorites));
      setIsFavorite(!isFavorite);
      navigation.navigate('Favorite', { refresh: true }); // trigger refresh in FavoriteScreen
    } catch (error) {
      console.error('Failed to toggle favorite status', error);
    }
  };

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <ImageBackground
          source={{ uri: song.thumbnail }}
          style={styles.ImageBackground}
          resizeMode="cover"
        >
          <TouchableOpacity onPress={() => navigation.pop()} style={styles.BackButton}>
            <Text style={styles.BackButtonText}>Back</Text>
          </TouchableOpacity>
          <View style={styles.FavoriteButtonContainer}>
            <TouchableOpacity onPress={toggleFavourite}>
              <IconFontAwesome 
                name='heart' 
                size={24} 
                color={isFavorite ? 'red' : '#00FF00'} 
              />
            </TouchableOpacity>
          </View>
          <View style={styles.ImageOverlay}>
            <Text style={styles.InfoTitle}>{song.name}</Text>
            <Text style={styles.Subtitle}>{song.singer}</Text>
          </View>
        </ImageBackground>
        <Text style={styles.DescriptionText}>{song.lyric}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  ImageBackground: {
    height: 300,
    justifyContent: 'flex-end',
  },
  ImageOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: SPACING.space_16,
  },
  BackButton: {
    position: 'absolute',
    top: SPACING.space_16,
    left: SPACING.space_16,
    padding: SPACING.space_8,
    backgroundColor: COLORS.primaryGreyHex,
    borderRadius: BORDERRADIUS.radius_8,
  },
  BackButtonText: {
    color: COLORS.primaryWhiteHex,
  },
  FavoriteButtonContainer: {
    position: 'absolute',
    top: SPACING.space_16,
    right: SPACING.space_16,
    alignSelf: 'flex-end',
  },
  InfoTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_10,
  },
  Subtitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.secondaryLightGreyHex,
    marginBottom: SPACING.space_20,
  },
  DescriptionText: {
    letterSpacing: 0.6,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_30,
  },
});

export default DetailsScreen;
