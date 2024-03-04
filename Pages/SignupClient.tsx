import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, ScrollView, Text, Alert } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, 'SignupClient'>;

  // Mock function to simulate file picking
  const pickFile = () => {
    // Normally, you would use a library to pick a file and return its path or base64 representation
    Alert.alert("File picker", "File picker would be launched here.");
  };

const SignupClient = ({ navigation }: Props) => {
  const [clientInfo, setClientInfo] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'Client',
    trainerId: '',
    age: '',
    weight: '',
    height: '',
    goals: ['', '', ''],
    gender: '',
    activityLevel: '',
    MedicalCertificate: '',
    trainingExperience: '',
    idealTrainingFrequency: '',
    idealTrainingDuration: '',
    idealTrainingTime: '',
    injuries: '',
  });

  // Function to handle input change
  const handleChange = (name: string, value: string | [string, string, string]) => {
    setClientInfo(prev => ({ ...prev, [name]: value }));
  };





  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput style={styles.input} placeholder="Name" onChangeText={text => handleChange('name', text)} />
      <TextInput style={styles.input} placeholder="Email" onChangeText={text => handleChange('email', text)} />
      <TextInput style={styles.input} placeholder="Phone" onChangeText={text => handleChange('phone', text)} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} onChangeText={text => handleChange('password', text)} />
      <TextInput style={styles.input} placeholder="Trainer ID (if any)" onChangeText={text => handleChange('trainerId', text)} />
      <TextInput style={styles.input} placeholder="Age" onChangeText={text => handleChange('age', text)} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Weight (kg)" onChangeText={text => handleChange('weight', text)} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Height (cm)" onChangeText={text => handleChange('height', text)} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Goal 1" onChangeText={text => handleChange('goals', [text, clientInfo.goals[1], clientInfo.goals[2]])} />
      <TextInput style={styles.input} placeholder="Goal 2" onChangeText={text => handleChange('goals', [clientInfo.goals[0], text, clientInfo.goals[2]])} />
      <TextInput style={styles.input} placeholder="Goal 3" onChangeText={text => handleChange('goals', [clientInfo.goals[0], clientInfo.goals[1], text])} />
      {/* <TextInput style={styles.input} placeholder="Gender" onChangeText={text => handleChange('gender', text)} /> */}
      {/* <TextInput style={styles.input} placeholder="Activity Level" onChangeText={text => handleChange('activityLevel', text)} /> */}
      {/* <TextInput style={styles.input} placeholder="Medical Certificate URL" onChangeText={text => handleChange('MedicalCertificate', text)} /> */}
      <TextInput style={styles.input} placeholder="Training Experience" onChangeText={text => handleChange('trainingExperience', text)} />
      <TextInput style={styles.input} placeholder="Ideal Training Frequency" onChangeText={text => handleChange('idealTrainingFrequency', text)} />
      <TextInput style={styles.input} placeholder="Ideal Training Duration" onChangeText={text => handleChange('idealTrainingDuration', text)} />
      <TextInput style={styles.input} placeholder="Ideal Training Time" onChangeText={text => handleChange('idealTrainingTime', text)} />
      <TextInput style={styles.input} placeholder="Injuries" onChangeText={text => handleChange('injuries', text)} />
      
      <Button title="Submit" onPress={() => console.log(clientInfo)} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
});

export default SignupClient;
