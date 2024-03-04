import React from "react";
import { StyleSheet, View, Text, TouchableOpacity} from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, 'SignupClient'>;

const SignupClient = ({navigation}: Props) => {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Client</Text>
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
  

export default SignupClient;