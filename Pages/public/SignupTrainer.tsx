


import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../App";
import { TrainerRegisterData, InputTrainerRegister, makeIssue } from "../../types";
import FileUpload from "../../Components/FileUploadComponent";
import OpenURLButton from "../../Components/GoToSite";
import databaseMethods from "../../services/databaseMethods";
import * as v from "valibot";

type Props = NativeStackScreenProps<RootStackParamList, 'SignupTrainer'>;

const SignupTrainer = ({navigation}: Props) => {
  
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [form, setForm] = useState<Partial<InputTrainerRegister>>({
    name: 'barel',
    email: 'barel.trianer@mail.com',
    phone: '0509042020',
    password: 'sgslkfj',
    role: 'trainer',
    certification: '',
    yearsOfExperience: "8",
  });

  // Function to handle input change
  const handleChange = (name: string, value: string | [string, string, string]) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };


  const handleSubmit = () => {
    const parsed = v.safeParse(TrainerRegisterData, form);
    if (parsed.success) databaseMethods.register(parsed.output);
    else setMessage(makeIssue(parsed.issues));
  };
  
  return (
    <View style={styles.container}>
      <Text>Signup Trainer</Text>
      <TextInput
        placeholder="Name"
        style={styles.input}
        value={form.name}
        onChangeText={(value) => handleChange('name', value)}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={form.email}
        onChangeText={(value) => handleChange('email', value)}
      />
      <TextInput
        placeholder="Phone"
        style={styles.input}
        value={form.phone}
        onChangeText={(value) => handleChange('phone', value)}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={form.password}
        onChangeText={(value) => handleChange('password', value)}
      />
      <View>
        <Text>Certifications</Text>
          
        <Text>Please upload your certifications if you do not have one please go to this link to create one </Text>
        <OpenURLButton url={"https://google.com"} children={<Text>"Please go to this site"</Text>}  />
      </View>
      <TextInput
        placeholder="Years of Experience"
        style={styles.input}
        value={form.yearsOfExperience?.toString()}
        onChangeText={(value) => handleChange('yearsOfExperience', value)}
      />
      <Text style={styles.errorMessage}>{message}</Text>

       <Button title="Submit" onPress={handleSubmit} />
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
  },
  errorMessage: {
    color: 'red',
    height: 40,
    flexWrap: 'wrap',
    display: 'flex',
  },
  });
  

export default SignupTrainer;