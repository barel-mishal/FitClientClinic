


import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, 'SignupTrainer'>;

const SignupTrainer = ({navigation}: Props) => {
  return (
    <View style={styles.container}>
    </View>

  );
}

const styles = StyleSheet.create({
    container: {

    },
  });
  

export default SignupTrainer;