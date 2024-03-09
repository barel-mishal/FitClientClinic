


import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../App";
import { Trainer, TypeTrainerRegisterData, initialTrainerForm } from "../../types";
import FileUpload from "../../Components/FileUploadComponent";
import OpenURLButton from "../../Components/GoToSite";

type Props = NativeStackScreenProps<RootStackParamList, 'SignupTrainer'>;

const SignupTrainer = ({navigation}: Props) => {
  const [trainerInfo, setTrainerInfo] = useState<Partial<TypeTrainerRegisterData>>(initialTrainerForm);

  // Function to handle input change
  const handleChange = (name: string, value: string | [string, string, string] | number) => {
    setTrainerInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log(trainerInfo);
    
  }

  
  return (
    <View style={styles.container}>
      <Text>Signup Trainer</Text>
      <TextInput
        placeholder="Name"
        style={styles.input}
        value={trainerInfo.name}
        onChangeText={(value) => handleChange('name', value)}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={trainerInfo.email}
        onChangeText={(value) => handleChange('email', value)}
      />
      <TextInput
        placeholder="Phone"
        style={styles.input}
        value={trainerInfo.phone}
        onChangeText={(value) => handleChange('phone', value)}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={trainerInfo.password}
        onChangeText={(value) => handleChange('password', value)}
      />
      <View>
        <Text>Certifications</Text>
          <FileUpload onFileUpload={function (file): void {
            throw new Error("Function not implemented.");
          } } label={"Upload Certifications"}
          />
        <Text>Please upload your certifications if you do not have one please go to this link to create one </Text>
        <OpenURLButton url={"https://google.com"} children={"Please go to this site"}  />
      </View>
      <TextInput
        placeholder="Years of Experience"
        style={styles.input}
        value={trainerInfo.yearsOfExperience?.toString()}
        onChangeText={(value) => handleChange('yearsOfExperience', parseFloat(value))}
      />

       <Button title="Submit" onPress={() => console.log(trainerInfo)} />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    display: 'flex',
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 6,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  }
  });
  

export default SignupTrainer;