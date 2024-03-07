import React, { useState } from "react";
import { StyleSheet, TextInput, Button, ScrollView, Text } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../App";
import { ClientRegisterForm, TypeClientRegisterData, ClientRegisterData } from "../../types";
import databaseMethods from "../../services/databaseMethods";
import * as v from "valibot";

type Props = NativeStackScreenProps<RootStackParamList, 'SignupClient'>;

const SignupClient = ({ navigation }: Props) => {
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [form, setForm] = useState<Partial<TypeClientRegisterData>>({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'client',
    trainerId: '',
  });

  // Function to handle input change
  const handleChange = (name: string, value: string | [string, string, string] | number) => {
    setForm(prev => ({ ...(prev ?? {}), [name]: value }));
  };

  const handleSubmit = () => {
    const form2 = v.safeParse(ClientRegisterData, form);
    if (form2.success) databaseMethods.register(form2.output);
    const issue = form2.issues?.at(0);
    setMessage(`${issue?.path?.at(0)?.key} ${issue?.message}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Signup Client</Text>
      <TextInput style={styles.input} placeholder="Name" onChangeText={text => handleChange('name', text)} value={form?.name}/>
      <TextInput style={styles.input} placeholder="Email" onChangeText={text => handleChange('email', text)}  value={form?.email}/>
      <TextInput style={styles.input} placeholder="Phone" onChangeText={text => handleChange('phone', text)} value={form?.phone}/>
      <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} onChangeText={text => handleChange('password', text)} value={form?.password}/>
      <TextInput style={styles.input} placeholder="Trainer ID (if any)" onChangeText={text => handleChange('trainerId', text)} value={form?.trainerId}/>
      <Text style={styles.errorMessage}>{message}</Text>
      {/* <TextInput style={styles.input} placeholder="Age" onChangeText={text => handleChange('age', parseFloat(text))} keyboardType="numeric" value={form.age?.toString()}/>
      <TextInput style={styles.input} placeholder="Weight (kg)" onChangeText={text => handleChange('weight', parseFloat(text))} keyboardType="numeric" value={form.weight?.toString()}/>
      <TextInput style={styles.input} placeholder="Height (cm)" onChangeText={text => handleChange('height', parseFloat(text))} keyboardType="numeric" value={form.height?.toString()}/> */}
      {/* <TextInput style={styles.input} placeholder="Goal 1" onChangeText={text => handleChange('goals', [text, form.goals![1], form.goals![2]])} value={form.goals![0]}/>
      <TextInput style={styles.input} placeholder="Goal 2" onChangeText={text => handleChange('goals', [form.goals![0], text, form.goals![2]])} value={form.goals![1]}/>
      <TextInput style={styles.input} placeholder="Goal 3" onChangeText={text => handleChange('goals', [form.goals![0], form.goals![1], text])} value={form.goals![2]}/> */}
      {/* <RadioButton onPress={(value) => handleChange("gender", value)} options={genderOptions} /> */}
      {/* <View>
        <CustomSelectInput onSelect={(value) => handleChange("activityLevel", value.value)} options={activityLevelOptions}/>
      </View> */}
        {/* <TextInput style={styles.input} placeholder="Medical Certificate URL" onChangeText={text => handleChange('MedicalCertificate', text)} /> */}
      {/* <View>
        <Text>Medical Certificate</Text>
          <FileUpload onFileUpload={function (file: DocumentPickerResult): void {
            throw new Error("Function not implemented.");
          } } label={"Upload Medical Certificat"} 
          />
        <Text>Please upload your medical certificate if you do not have one please go to this link to create one </Text>
        <OpenURLButton url={"https://google.com"} children={"Please go to this site"}  />
      </View> */}
      {/* <TextInput style={styles.input} placeholder="Training Experience" onChangeText={text => handleChange('trainingExperience', text)} value={form.trainingExperience}/>
      <TextInput style={styles.input} placeholder="Ideal Training Frequency" onChangeText={text => handleChange('idealTrainingFrequency', text)} value={form.idealTrainingFrequency}/>
      <TextInput style={styles.input} placeholder="Ideal Training Duration" onChangeText={text => handleChange('idealTrainingDuration', text)} value={form.idealTrainingDuration}/>
      <TextInput style={styles.input} placeholder="Ideal Training Time" onChangeText={text => handleChange('idealTrainingTime', text)} value={form.idealTrainingTime}/> */}
      {/* <TextInput style={styles.input} placeholder="Injuries" onChangeText={text => handleChange('injuries', text)} value={form.injuries}/> */}
      
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
  }
});

export default SignupClient;
