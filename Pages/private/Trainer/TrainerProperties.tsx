import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, Button, ScrollView, Text, View, Pressable } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../../App";
import { makeIssue, GENDER_OPTIONS, ACTIVITY_LEVEL_OPTIONS, Client, ClientPersonalFitnessInfo, ClientProfile, InputTrainerRegister, TypeTrainerProperties, TrainerProfile, TypeTrainerProfile } from "../../../types";
import databaseMethods from "../../../services/databaseMethods";
import * as v from "valibot";
import RadioButton from "../../../Components/RadioComponent";
import CustomSelectInput from "../../../Components/PickerComponent";
import { useAuth } from "../../../Components/ContextComopnents/AuthContext";
import MedicalCertificateUploader from "../../../Components/MedicalCertificateUploader";
import Toast from "react-native-toast-message";

type Props = NativeStackScreenProps<RootStackParamList, 'TrainerProperties'>;

const TrainerProperties = ({ navigation }: Props) => {
  const a = useAuth();


  if (!a.user || a?.data?.role !== "trainer") return <Text>Not Authenticated</Text>;
  const [form, setForm] = useState<Partial<TypeTrainerProfile>>({
    name: a.data.name,
    email: a.data.email,
    phone: a.data.phone?.toString(),
    role: "trainer",
    certification: a.data.certification,
    yearsOfExperience: a.data.yearsOfExperience?.toString(),
    userId: a.user.uid,
  });
  // Function to handle input change
  const handleChange = (name: keyof typeof form, value: string | [string, string, string] | number, onChange?: () => void) => {
    setForm(prev => ({ ...(prev ?? {}), [name]: value }));
    if (onChange)
    onChange();
  };

  const handleSubmit = async () => {
    const parsed = v.safeParse(v.partial(TrainerProfile), form);
    
    if (parsed.success) {
      databaseMethods.updateTrainerProfile(parsed.output);
      
    } else if (!parsed.success) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: makeIssue(parsed.issues),
        visibilityTime: 4000,
        autoHide: true,
      });
      return 
    }

    navigation.navigate('TrainerHome');
  };

  const handleWhenAddedCert = () => {
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Success',
        text2: 'Certificate Uploaded',
        visibilityTime: 4000,
        autoHide: true,
      });
  }

  console.log(form);
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
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
          <Text style={styles.inputTitle}>Years of Experience</Text>
          <TextInput style={styles.input} placeholder="24" onChangeText={text => handleChange('yearsOfExperience', parseFloat(text))} keyboardType="numeric" value={form?.yearsOfExperience?.toString()}/>
        </View>
        <View style={styles.space2}>
          <Pressable onPress={() => navigation.navigate("TrainerCreateProgram")}>
            <Text style={styles.inputTitle}>Certification</Text>
          </Pressable>
          <MedicalCertificateUploader onHandleChange={(uri) => handleChange("certification", uri, handleWhenAddedCert)} medicalCertificate={form?.certification} />
        </View>

        <Button title="Submit" onPress={handleSubmit} />
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
    gap: 20,
    backgroundColor: '#f0f9ff',
  },
  input: {
    borderWidth: 1,
    borderColor: "rgba(8, 47, 73, 0.3)",
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
    fontSize: 30,
    fontWeight: 'bold',
    color: "#082f49"
  },
  inputTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#075985"
  },
  columnsDisplay: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
    
  },
  space2: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  }
});

const styles2 = StyleSheet.create({
  space2: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#075985",
    marginBottom: 10,
  },
  description: {
    color: "#0369a1",
    fontSize: 14,
    lineHeight: 20,
  },
  linkText: {
    color: '#0ea5e9',
    fontSize: 16,
    fontWeight: "600",
    fontStyle: "italic",
    textDecorationLine: "underline",
    textAlign: "center",
    marginVertical: 10,
  },
  // ... other styles remain unchanged
});

export default TrainerProperties 
