import React from "react";
import { StyleSheet, View, Text, TouchableOpacity} from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, 'GetStarted'>;

const OnBoarding = ({navigation}: Props) => {
  return (
    <View style={styles.container}>
    <Text style={styles.title}>Select Your Path</Text>
    <Text style={styles.subtitle}>Are you joining as a fitness professional or looking for personal training?</Text>
    
    <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate("SignupTrainer")}>
        <Text style={styles.optionText}>I'm a Trainer</Text>
        <Text style={styles.optionSubtext}>Onboarding for fitness professionals</Text>
    </TouchableOpacity>
    
    <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate("SignupClient")}>
        <Text style={styles.optionText}>I'm a Client</Text>
        <Text style={styles.optionSubtext}>Onboarding for clients seeking personal training</Text>
    </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#000',
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 16,
      color: '#666',
      textAlign: 'center',
      marginBottom: 20,
    },
    optionButton: {
      backgroundColor: '#f0f0f0',
      borderRadius: 10,
      padding: 15,
      marginBottom: 15,
      width: '100%',
      alignItems: 'center',
    },
    optionText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#000',
    },
    optionSubtext: {
      fontSize: 14,
      color: '#666',
    },
  });
  

export default OnBoarding;