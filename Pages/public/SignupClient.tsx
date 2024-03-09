import React, { useState } from "react";
import { StyleSheet, TextInput, Button, ScrollView, Text, TextInputBase } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../App";
import { ClientRegisterForm, TypeClientRegisterData, ClientRegisterData, makeIssue } from "../../types";
import databaseMethods from "../../services/databaseMethods";
import * as v from "valibot";

type Props = NativeStackScreenProps<RootStackParamList, 'SignupClient'>;

const SignupClient = ({ navigation }: Props) => {
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [form, setForm] = useState<Partial<TypeClientRegisterData>>();

  // Function to handle input change
  const handleChange = (name: string, value: string | [string, string, string] | number) => {
    setForm(prev => ({ ...(prev ?? {}), [name]: value }));
  };

  const handleSubmit = () => {
    const parsed = v.safeParse(ClientRegisterData, form);
    if (parsed.success) databaseMethods.register(parsed.output);
    else setMessage(makeIssue(parsed.issues));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Signup Client</Text>
      <Text style={styles.inputTitle}>Your name</Text>
      <TextInput style={styles.input} placeholder="Name" onChangeText={text => handleChange('name', text)} value={form?.name}/>
      <Text style={styles.inputTitle}>Email</Text>
      <TextInput style={styles.input} placeholder="Email" secureTextEntry={false} onChangeText={text => handleChange('email', text)}  value={form?.email}/>
      <Text style={styles.inputTitle}>Phone</Text>
      <TextInput style={styles.input} placeholder="Phone" onChangeText={text => handleChange('phone', text)} value={form?.phone}/>
      <Text style={styles.inputTitle}>Password</Text>
      <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} onChangeText={text => handleChange('password', text)} value={form?.password}/>
      <Text style={styles.inputTitle}>Trainer ID (Phone Number)</Text>
      <TextInput style={styles.input} placeholder="Trainer ID (if any)" onChangeText={text => handleChange('trainerId', text)} value={form?.trainerId}/>
      <Text style={styles.errorMessage}>{message}</Text>

      <Button title="Signup" onPress={handleSubmit} />
    </ScrollView>
  );
};

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
    height: 17,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignupClient;
