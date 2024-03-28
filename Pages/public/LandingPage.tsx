import React, {} from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Pressable, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { RootStackParamList } from '../../App';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GradientText } from '../../Components/GradientText';

const CONTENT_SECTIONS = [
  {
    "title": "Track Your Fitness Progress with Ease",
    "paragraph": "Monitor your journey towards achieving your fitness goals with our real-time progress tracking feature. See your results alongside your trainer's guidance, allowing you to stay motivated and celebrate your achievements.",
    "bulletPoints": [
      "See your progress in real-time",
      "Stay motivated with visible results",
      "Track your progress alongside your trainer's guidance"
    ]
  },
  {
    "title": "Visualize Your Success",
    "paragraph": "Gain a deeper understanding of your fitness journey by visualizing your achievements. Our platform allows you to map key health metrics, such as heart rate, body weight, and height, against the milestones set in your trainer's personalized fitness plan.",
    "bulletPoints": [
      "Track key health metrics over time",
      "Visualize your progress against set milestones",
      "Gain a deeper understanding of your fitness journey"
    ]
  },
  {
    "title": "Never Miss a Workout",
    "paragraph": "Stay on track with your fitness goals with our convenient reminder system. Our timely reminders for your training sessions are seamlessly integrated into your calendar, ensuring effortless scheduling and adherence to your workout plan.",
    "bulletPoints": [
      "Receive timely reminders for your training sessions",
      "Easily schedule your workouts in your calendar",
      "Stay on track with your fitness goals"
    ]
  },
  {
    "title": "Optimize Your Workouts with a Smart Timer",
    "paragraph": "Elevate your exercise sessions with our innovative smart interval timer. This feature is designed to optimize your workouts by providing customized time intervals, allowing you to train more effectively and efficiently.",
    "bulletPoints": [
      "Utilize a smart interval timer for your workouts",
      "Train more effectively with customized time intervals",
      "Optimize your exercise sessions for better results"
    ]
  }
] as const; 

export type PropsLandingPage = NativeStackScreenProps<RootStackParamList, 'FitClientClinic'>;


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
          {/* <View style={styles.container} >
            <AccordionSelect options={CONTENT_SECTIONS.map(c => c.title)} onClick={() => {}} />
          </View> */}
          {/* {CONTENT_SECTIONS.map((section, index) => (
            <ScrollView style={{...styles.container, ...styles.fullScreen}} key={index} >
              <Text style={styles.title}>{section.title}</Text>
              <Text style={styles.smallTtitle}>{section.paragraph}</Text>
              <View style={styles.buttom}>
                <Button title={'Learn More'}  />
              </View>
            </ScrollView>
          ))} */}
      </ScrollView>
        </ImageBackground>

    );

  };

  const styles = StyleSheet.create({
    rootContainer: {
      paddingTop: 0,
      backgroundColor: 'rgba(224, 242, 254, 0.9)',
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