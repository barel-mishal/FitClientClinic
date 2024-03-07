import React, { useState } from "react";
import { StyleSheet, TextInput, Button, ScrollView, Text, TextInputBase, View } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../App";
import { ClientRegisterForm, TypeClientRegisterData, ClientRegisterData, makeIssue, GENDER_OPTIONS, ACTIVITY_LEVEL_OPTIONS, TypeClientProperties } from "../../types";
import databaseMethods from "../../services/databaseMethods";
import * as v from "valibot";
import RadioButton from "../../Components/RadioComponent";
import { DocumentPickerResult } from "expo-document-picker";
import FileUpload from "../../Components/FileUploadComponent";
import OpenURLButton from "../../Components/GoToSite";
import CustomSelectInput from "../../Components/PickerComponent";

type Props = NativeStackScreenProps<RootStackParamList, 'SignupClient'>;

const SignupClient = ({ navigation }: Props) => {
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [form, setForm] = useState<Partial<TypeClientProperties>>();

  // Function to handle input change
  const handleChange = (name: string, value: string | [string, string, string] | number) => {
    setForm(prev => ({ ...(prev ?? {}), [name]: value }));
  };

  const handleSubmit = () => {
    const parsed = v.safeParse(ClientRegisterData, form);
    if (parsed.success) databaseMethods.register(parsed.output);
    else setMessage(makeIssue(parsed.issues));
  };

  const updateGoal = (index: number, text: string) => {
    const updatedGoals: [string, string, string] = form?.goals ? [...form?.goals] : ["", "", ""];
    updatedGoals[index] = text;
    handleChange('goals', updatedGoals);
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
      <Text>Weight (kg)</Text>
      <TextInput style={styles.input} placeholder="78" onChangeText={text => handleChange('weight', parseFloat(text))} keyboardType="numeric" value={form?.weight?.toString()}/>
      <Text>Age</Text>
      <TextInput style={styles.input} placeholder="24" onChangeText={text => handleChange('age', parseFloat(text))} keyboardType="numeric" value={form?.age?.toString()}/>
      <Text>Height (cm)</Text>
      <TextInput style={styles.input} placeholder="170" onChangeText={text => handleChange('height', parseFloat(text))} keyboardType="numeric" value={form?.height?.toString()}/>
      <Text>Define Your Goals</Text>
      <TextInput
        style={styles.input}
        placeholder="Goal 1"
        onChangeText={(text) => updateGoal(0, text)}
        value={form?.goals ? form.goals[0] : ""}
      />
      <TextInput
        style={styles.input}
        placeholder="Goal 2"
        onChangeText={(text) => updateGoal(1, text)}
        value={form?.goals ? form.goals[1] : ""}
      />
      <TextInput
        style={styles.input}
        placeholder="Goal 3"
        onChangeText={(text) => updateGoal(2, text)}
        value={form?.goals ? form.goals[2] : ""}
      />
      <RadioButton onPress={(value) => handleChange("gender", value)} options={GENDER_OPTIONS} />
      <View>
        <CustomSelectInput onSelect={(value) => handleChange("activityLevel", value.value)} options={ACTIVITY_LEVEL_OPTIONS}/>
      </View>
        <TextInput style={styles.input} placeholder="Medical Certificate URL" onChangeText={text => handleChange('MedicalCertificate', text)} />
      <View>
        <Text>Medical Certificate</Text>
          <FileUpload onFileUpload={function (file: DocumentPickerResult): void {
            throw new Error("Function not implemented.");
          } } label={"Upload Medical Certificat"} 
          />
        <Text>Please upload your medical certificate if you do not have one please go to this link to create one </Text>
        <OpenURLButton url={"https://google.com"} children={"Please go to this site"}  />
      </View>
      <TextInput style={styles.input} placeholder="Training Experience" onChangeText={text => handleChange('trainingExperience', text)} value={form?.trainingExperience}/>
      <TextInput style={styles.input} placeholder="Ideal Training Frequency" onChangeText={text => handleChange('idealTrainingFrequency', text)} value={form?.idealTrainingFrequency}/>
      <TextInput style={styles.input} placeholder="Ideal Training Duration" onChangeText={text => handleChange('idealTrainingDuration', text)} value={form?.idealTrainingDuration}/>
      <TextInput style={styles.input} placeholder="Ideal Training Time" onChangeText={text => handleChange('idealTrainingTime', text)} value={form?.idealTrainingTime}/>
      <TextInput style={styles.input} placeholder="Injuries" onChangeText={text => handleChange('injuries', text)} value={form?.injuries}/>
      
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
