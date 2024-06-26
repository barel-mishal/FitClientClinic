import React, {} from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Pressable, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { RootStackParamList } from '../../App';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GradientText } from '../../Components/GradientText';

export type PropsLandingPage = NativeStackScreenProps<RootStackParamList, 'Move'>;


const LandingPage = ({ navigation }: PropsLandingPage) => {

    return (
        <ImageBackground source={require('../../assets/Intensity_Rise_X.png')} style={styles.backgroundImage}>
      <ScrollView style={styles.rootContainer} stickyHeaderIndices={[2]}>

          <StatusBar style="auto" />
          <View  style={{...styles.MainContentContainer}}>
            <View>
              <GradientText text="Connect with your ideal fitness coach through Move:" style={styles.lightTitle} />
              <Text style={styles.title}>Where health goals meet expert guidance.</Text>
              
            </View>
            <Text style={styles.smallTtitle}>
              Move connects you with personalized fitness coaching, making it easy to find the perfect trainer for your unique goals. Whether it's weight loss, muscle building, or general fitness, we're your platform for success with professional support. Start your journey to wellness with us today.
            </Text>
            <Pressable onPress={() => navigation.navigate("GetStarted")} style={styles.buttom}>
              <Text style={styles.textPress}>Get Started</Text>
            </Pressable>
          </View>
      </ScrollView>
        </ImageBackground>

    );

  };

  const styles = StyleSheet.create({
    rootContainer: {
      paddingTop: 0,
      backgroundColor: 'rgba(224, 242, 254, 0.8)',
    },
    container: {
      display: 'flex',
      backgroundColor: '#fff',
      borderStyle: 'solid',
      borderBottomWidth: 1,
      paddingTop: 10,
      paddingBottom: 25,
    },
    MainContentContainer: {
      paddingBottom: 30,
      paddingTop: 15,
      display: 'flex',
      flexDirection: 'column',
      gap: 36
    },
    title: {
      paddingHorizontal: 10,
      fontSize: 24,
      fontWeight: '700',
      color: '#0369a1',
    },
    lightTitle: {
      paddingHorizontal: 10,
      fontSize: 50,
      fontWeight: '300',
      fontStyle: 'italic',
    },
    smallTtitle: {
      paddingHorizontal: 5,
      fontSize: 15,
      marginHorizontal: 10,
      fontWeight: '300',
      color: '#082f49',
    },
    buttom: {
      paddingHorizontal: 8,
      paddingVertical: 16,
      fontSize: 15,
      marginHorizontal: 10,
      fontWeight: '900',
      backgroundColor: '#082f49', 
      borderRadius: 30,
    },
    fullScreen: {
      height: Dimensions.get('window').height,
    },
    textPress: {
      color: '#fff',
      fontSize: 20,
      fontWeight: '900',
      textAlign: 'center',
    },
    backgroundImage: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },
  });
  

export default LandingPage;