import React, { useState } from "react";
import { StyleSheet, TextInput, Button, ScrollView, Text, View } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../../App";
import { makeIssue, GENDER_OPTIONS, ACTIVITY_LEVEL_OPTIONS, InputClientProperties, Client, ClientPersonalFitnessInfo, ClientProfile } from "../../../types";
import databaseMethods from "../../../services/databaseMethods";
import * as v from "valibot";
import RadioButton from "../../../Components/RadioComponent";
import { DocumentPickerResult } from "expo-document-picker";
import FileUpload from "../../../Components/FileUploadComponent";
import OpenURLButton from "../../../Components/GoToSite";
import CustomSelectInput from "../../../Components/PickerComponent";
import { useAuth } from "../../../Components/ContextComopnents/AuthContext";

type Props = NativeStackScreenProps<RootStackParamList, 'ClientProperties'>;

const SignupClient = ({ navigation }: Props) => {
  const a = useAuth();
  if (!a.user || a?.data?.role !== "client" as Client) return <Text>Not Authenticated</Text>;
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [form, setForm] = useState<Partial<InputClientProperties>>({
    name: a.data.name,
    email: a.data.email,
    phone: a.data.phone?.toString(),
    trainerPhone: a.data?.trainerPhone?.toString(),
    weight: a.data?.weight,
    age: a.data?.age,
    height: a.data?.height,
    goals: a.data?.goals,
    activityLevel: a.data?.activityLevel,
    gender: a.data?.gender,
    trainingExperience: a.data?.trainingExperience,
    idealTrainingFrequency: a.data?.idealTrainingFrequency,
    idealTrainingDuration: a.data?.idealTrainingDuration,
    idealTrainingTime: a.data?.idealTrainingTime,
    injuries: a.data?.injuries,
  });

  // Function to handle input change
  const handleChange = (name: string, value: string | [string, string, string] | number) => {
    setForm(prev => ({ ...(prev ?? {}), [name]: value }));
  };

  const handleSubmit = async () => {
    const parsed = v.safeParse(v.omit(ClientPersonalFitnessInfo, ["MedicalCertificate"]), form);
    const parsed2 = v.safeParse(v.omit(ClientProfile, ["role"]), form);
    
    if (parsed.success && parsed2.success) {
      const id = parsed2?.output?.trainerPhone 
      ? await databaseMethods.validateTrainerPhoneAndGetId(parsed2?.output?.trainerPhone) 
      : undefined;      
      databaseMethods.addOrUpdateClientFitnessInfo(parsed.output);
      const result = id 
      ? {...parsed2.output, role: "client" as Client, trainerId: id} 
      : {...parsed2.output, role: "client" as Client};
      databaseMethods.updateClientProfile(a.user, result);
    } else if (!parsed.success) {
      setMessage(makeIssue(parsed.issues))
    } else if (!parsed2.success) {
      setMessage(makeIssue(parsed2.issues))
    }
  };

  const updateGoal = (index: number, text: string) => {
    const updatedGoals: [string, string, string] = form?.goals ? [...form?.goals] : ["", "", ""];
    updatedGoals[index] = text;
    handleChange('goals', updatedGoals);
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Signup Client</Text>
        <View style={{ marginTop: 16, display: 'flex', gap: 20 }}>
        <View style={styles.space2}>
          <Text style={styles.inputTitle}>Your name</Text>
          <TextInput style={styles.input} placeholder="Shalom" onChangeText={text => handleChange('name', text)} value={form?.name}/>
        </View>
        <View style={styles.space2}>
          <Text style={styles.inputTitle}>Email</Text>
          <TextInput style={styles.input} placeholder="shalom@mail.co.il" secureTextEntry={false} onChangeText={text => handleChange('email', text)}  value={form?.email}/>
        </View>
        <View style={styles.space2}>
          <Text style={styles.inputTitle}>Phone</Text>
          <TextInput style={styles.input} placeholder="0509041212" onChangeText={text => handleChange('phone', text)} value={form?.phone}/>
        </View>
        <View style={styles.space2}>
          <Text style={styles.inputTitle}>Trainer ID (Phone Number)</Text>
          <TextInput style={styles.input} placeholder="Trainer ID (if any)" onChangeText={text => handleChange('trainerPhone', text)} value={form?.trainerPhone}/>
        </View>
        <View style={styles.space2}>
          <Text style={styles.inputTitle}>Weight (kg)</Text>
          <TextInput style={styles.input} placeholder="78" onChangeText={text => handleChange('weight', parseFloat(text))} keyboardType="numeric" value={form?.weight?.toString()}/>
        </View>
        <View style={styles.space2}>
          <Text style={styles.inputTitle}>Age</Text>
          <TextInput style={styles.input} placeholder="24" onChangeText={text => handleChange('age', parseFloat(text))} keyboardType="numeric" value={form?.age?.toString()}/>
        </View>
        <View style={styles.space2}>
          <Text style={styles.inputTitle}>Height (cm)</Text>
          <TextInput style={styles.input} placeholder="170" onChangeText={text => handleChange('height', parseFloat(text))} keyboardType="numeric" value={form?.height?.toString()}/>
        </View>
        <View style={styles.space2}>
          <Text style={styles.inputTitle}>Define Your Goals</Text>
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
        </View>
        <View style={styles.space2}>
          <Text style={styles.inputTitle}>Gender</Text>
          <View style={styles.columnsDisplay}>
            <RadioButton onPress={(value) => handleChange("gender", value)} options={GENDER_OPTIONS} val={form.gender} />
          </View>
        </View>
        <View style={styles.space2}>
          <Text style={styles.inputTitle}>Activity Level</Text>
          <CustomSelectInput onSelect={(value) => handleChange("activityLevel", value.value)} options={ACTIVITY_LEVEL_OPTIONS}/>
        </View>
        <View style={styles.space2}>
          <Text style={styles.inputTitle}>Medical Certificate</Text>    
          <View style={styles.space2}>
            <FileUpload onFileUpload={function (file: DocumentPickerResult): void {
                throw new Error("Function not implemented.");
              } } label={"Upload Medical Certificat"} 
              />
            <Text>Please upload your medical certificate if you do not have one please go to this link to create one </Text>
            <OpenURLButton url={"https://google.com"} children={"Please go to this site"} />
          </View>
        </View>
        <View style={styles.space2}>
          <Text style={styles.inputTitle}>Training Experience</Text>
          <TextInput style={styles.input} placeholder="Training Experience" onChangeText={text => handleChange('trainingExperience', text)} value={form?.trainingExperience}/>
        </View>
        <View style={styles.space2}>
          <Text style={styles.inputTitle}>Ideal Training Frequency</Text>
          <TextInput style={styles.input} placeholder="Ideal Training Frequency" onChangeText={text => handleChange('idealTrainingFrequency', text)} value={form?.idealTrainingFrequency}/>
        </View>
        <View style={styles.space2}>
          <Text style={styles.inputTitle}>Ideal Training Duration</Text>
          <TextInput style={styles.input} placeholder="Ideal Training Duration" onChangeText={text => handleChange('idealTrainingDuration', text)} value={form?.idealTrainingDuration}/>
        </View>
        <View style={styles.space2}>
          <Text style={styles.inputTitle}>Ideal Training Time</Text>
          <TextInput style={styles.input} placeholder="Ideal Training Time" onChangeText={text => handleChange('idealTrainingTime', text)} value={form?.idealTrainingTime}/>
        </View>
        <View style={styles.space2}>
          <Text style={styles.inputTitle}>Injuries</Text>
          <TextInput style={styles.input} placeholder="Injuries" onChangeText={text => handleChange('injuries', text)} value={form?.injuries}/>
        </View >
        <Text style={styles.errorMessage}>{message}</Text>

        <Button title="Signup" onPress={handleSubmit} />
      </View>
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
  columnsDisplay: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  space2: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  }
});

export default SignupClient;
