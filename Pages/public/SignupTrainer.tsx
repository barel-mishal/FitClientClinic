


import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button, ScrollView, Pressable } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../App";
import { TrainerRegisterData, InputTrainerRegister, makeIssue } from "../../types";
import databaseMethods from "../../services/databaseMethods";
import * as v from "valibot";
import Toast from 'react-native-toast-message'


type Props = NativeStackScreenProps<RootStackParamList, 'SignupTrainer'>;

const SignupTrainer = ({navigation}: Props) => {
  
  const [form, setForm] = useState<Partial<InputTrainerRegister>>({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'trainer',
    certification: undefined,
    yearsOfExperience: "",
  });

  // Function to handle input change
  const handleChange = (name: string, value: string | [string, string, string]) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const parsed = v.safeParse(TrainerRegisterData, form);
    if (parsed.success) databaseMethods.register(parsed.output);
    else {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: makeIssue(parsed.issues),
        visibilityTime: 4000,
        autoHide: true,
      });
    }
  };
  
  return (
    <ScrollView >
      <View style={styles.container}>
        <Text style={{fontSize: 30, fontWeight: "600", color: "#082f49"}}>Signup Trainer</Text>
        <View style={{display: "flex", gap: 4}}>
          <Text style={{fontSize: 16, color: "#0284c7", fontWeight: "500"}}>Your name</Text>
          <TextInput
            placeholder="Eli Mor"
            style={styles.input}
            value={form.name}
            onChangeText={(value) => handleChange('name', value)}
            cursorColor={"#0c4a6e"}
            selectionColor={"#0284c7"}
          />
        </View>
        <View style={{display: "flex", gap: 4}}>
          <Text style={{fontSize: 16, color: "#0284c7", fontWeight: "500"}}>Email</Text>
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={form.email}
            onChangeText={(value) => handleChange('email', value)}
            cursorColor={"#0c4a6e"}
            selectionColor={"#0284c7"}
          />
        </View>
        <View style={{display: "flex", gap: 4}}>
          <Text style={{fontSize: 16, color: "#0284c7", fontWeight: "500"}}>Phone</Text>
          <TextInput
            placeholder="Phone"
            style={styles.input}
            value={form.phone}
            onChangeText={(value) => handleChange('phone', value)}
            cursorColor={"#0c4a6e"}
            selectionColor={"#0284c7"}
          />
        </View>
        <View style={{display: "flex", gap: 4}}>
          <Text style={{fontSize: 16, color: "#0284c7", fontWeight: "500"}}>Password</Text>
          <TextInput
            placeholder="Password"
            style={styles.input}
            value={form.password}
            onChangeText={(value) => handleChange('password', value)}
            cursorColor={"#0c4a6e"}
            selectionColor={"#0284c7"}
            secureTextEntry={true} 
          />
        </View>
        <View style={{display: "flex", gap: 4}}>
          <Text style={{fontSize: 16, color: "#0284c7", fontWeight: "500"}}>Years of Experience</Text>
          <TextInput
            placeholder="Years of Experience"
            style={styles.input}
            value={form.yearsOfExperience?.toString()}
            onChangeText={(value) => handleChange('yearsOfExperience', value)}
          />
        </View>
        <Pressable onPress={handleSubmit} style={{ backgroundColor: "#0c4a6e", padding: 10, borderRadius: 6, }}>
          <Text style={{fontSize: 16, color: "#f0f9ff", textAlign: "center", fontWeight: "700"}}>Submit</Text>
        </Pressable>
      </View>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    display: 'flex',
    gap: 20,
    backgroundColor: "#f0f9ff",
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(125, 211, 252, 0.5)',
    padding: 10,
    borderRadius: 6,
    color: "#082f49",
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
});
  

export default SignupTrainer;