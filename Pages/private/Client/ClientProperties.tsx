import React, { useState } from "react";
import { StyleSheet, TextInput, Button, ScrollView, Text, View, Pressable, Modal } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../../App";
import { makeIssue, GENDER_OPTIONS, ACTIVITY_LEVEL_OPTIONS, InputClientProperties, Client, ClientPersonalFitnessInfo, ClientProfile, calcAge, parseFirebaseTimestamp } from "../../../types";
import databaseMethods from "../../../services/databaseMethods";
import * as v from "valibot";
import RadioButton from "../../../Components/RadioComponent";
import CustomSelectInput from "../../../Components/PickerComponent";
import { useAuth } from "../../../Components/ContextComopnents/AuthContext";
import MedicalCertificateUploader from "../../../Components/MedicalCertificateUploader";
import Toast from "react-native-toast-message";
import { useQuery } from "react-query";
import MyPDFViewer from "../../../Components/MyPDFViewer";
import { FontAwesome } from "@expo/vector-icons";
import BirthdateSelector from "../../../Components/BirthdateSelector";

type Props = NativeStackScreenProps<RootStackParamList, 'ClientProperties'>;

const SignupClient = ({ navigation }: Props) => {
  const a = useAuth();
  if (!a.user || a?.data?.role !== "client") return <Text>Not Authenticated</Text>;

  const [form, setForm] = useState<Partial<InputClientProperties>>({
    name: a.data.name,
    email: a.data.email,
    phone: a.data.phone?.toString(),
    trainerPhone: a.data?.trainerPhone?.toString(),
    trainerId: a.data?.trainerId,
    clientId: a.user.uid,
    userId: a.user.uid,
    role: a.data.role,
    weight: a.data?.weight,
    age: a.data?.age,
    height: a.data?.height,
    goals: a.data?.goals,
    activityLevel: a.data?.activityLevel,
    gender: a.data?.gender,
    MedicalCertificate: a.data?.MedicalCertificate,
    trainingExperience: a.data?.trainingExperience,
    idealTrainingFrequency: a.data?.idealTrainingFrequency,
    idealTrainingDuration: a.data?.idealTrainingDuration,
    idealTrainingTime: a.data?.idealTrainingTime,
    injuries: a.data?.injuries,
    currentProgramId: a.data?.currentProgramId,
    birthdate: parseFirebaseTimestamp(a.data?.birthdate as unknown as { seconds: number } | undefined),
  });

  const {data: trainer, isLoading: isloadingTrainer, error: errorTrainer } = useQuery(["trainer", form.trainerId], () => form?.trainerId ? databaseMethods.getUserProfile(form?.trainerId) : null);
  // Function to handle input change
  const handleChange = (name: keyof typeof form, value: string | [string, string, string] | number | Date, onChange?: () => void) => {
    setForm(prev => ({ ...(prev ?? {}), [name]: value }));
    if (onChange)
    onChange();
  };
  const handleSubmit = async () => {
    const parsed = v.safeParse(v.partial(ClientPersonalFitnessInfo), form);
    const parsed2 = v.safeParse(v.omit(ClientProfile, ["role"]), form);
    
    if (parsed.success && parsed2.success) {
      const age = parsed.output.birthdate ? calcAge(parsed.output.birthdate) : undefined;
      const id = parsed2?.output?.trainerPhone 
      ? await databaseMethods.validateTrainerPhoneAndGetId(parsed2?.output?.trainerPhone)
      : undefined;   
      
      console.log("\n\n\n\n\n", parsed2.output, id)
      databaseMethods.addOrUpdateClientFitnessInfo({...parsed?.output, clientId: a?.user?.uid, age});
      const result = id 
      ? {...parsed2?.output, role: "client" as Client, trainerId: id} 
      : {...parsed2?.output, role: "client" as Client, trainerId: undefined};


      databaseMethods.updateClientProfile(a.user, result);
      
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
    } else if (!parsed2.success) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: makeIssue(parsed2.issues),
        visibilityTime: 4000,
        autoHide: true,
      });
      return 
    }

    navigation.navigate('ClientHome');
  };

  const updateGoal = (index: number, text: string) => {
    const updatedGoals: [string, string, string] = form?.goals ? [...form?.goals] : ["", "", ""];
    updatedGoals[index] = text;
    handleChange('goals', updatedGoals);
  };

  const handleWhenAddedMedicalCert = () => {
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Success',
        text2: 'Medical Certificate Uploaded',
        visibilityTime: 4000,
        autoHide: true,
      });
  }

  const [visible, setVisible] = useState(false);
  const [birthdayVisible, setBirthdayVisible] = useState(false);
  
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
          <Text style={styles.inputTitle}>Trainer Certified</Text>
          <Pressable onPress={() => setVisible(true)}>
            <Text style={styles.linkText}>View Trainer Certification</Text>
          </Pressable>
          <Modal visible={visible} animationType="slide" style={{position: "relative"}}>
            <Pressable style={{position: "absolute", zIndex:1000, backgroundColor: "#075985", padding: 30, borderRadius: 80, margin: 10, bottom: 0}} onPress={() => setVisible(false)}>
              <FontAwesome name="close" size={20} color="#fff" />
            </Pressable>
            <MyPDFViewer uri={isloadingTrainer ? "" : (trainer?.role === "trainer" ? trainer.certification : "")} />
          </Modal>
        </View>
        <View style={styles.space2}>
          <Text style={styles.inputTitle}>Trainer ID (Phone Number)</Text>
          <TextInput style={styles.input} placeholder="Trainer ID (if any)" onChangeText={text => handleChange('trainerPhone', text)} value={form?.trainerPhone}/>
        </View>
        <View style={styles.space2}>
          <Text style={styles.inputTitle}>Weight (kg)</Text>
          <TextInput style={styles.input} placeholder="78" onChangeText={text => handleChange('weight', parseFloat(text))} keyboardType="numeric" value={renderNumberAsString(form?.weight)}/>
        </View>
        <View style={styles.space2}>
          <Text style={styles.inputTitle}>Age</Text>
          <Text style={styles.inputTitle}>
            {form?.birthdate ? calcAge(form.birthdate) : form?.age}
          </Text>

        </View>
        <View style={{display: "flex", flexDirection: "row", gap: 3}}>
          <Text style={styles.inputTitle}>Birthday: </Text>
          <Pressable style={{backgroundColor:  "#075985", padding: 3, borderRadius: 4}} onPress={() => setBirthdayVisible(true)}><Text style={{color: "white"}}>{form.birthdate?.toISOString().split("T")[0] ?? "Click to add a birthday"}</Text></Pressable>
        </View>
        {birthdayVisible && <BirthdateSelector initialBirthdate={form.birthdate} onBirthdateChange={(date) => handleChange('birthdate', date)} />}
         {birthdayVisible && <Pressable style={{backgroundColor:  "#059669", padding: 3, borderRadius: 4}} onPress={() => setBirthdayVisible(false)}><Text style={{color: "white", textAlign: "center", fontWeight: "bold"}}>Close and Save Calender Selectore</Text></Pressable>}

        <View style={styles.space2}>
          <Text style={styles.inputTitle}>Height (cm)</Text>
          <TextInput style={styles.input} placeholder="170" onChangeText={text => handleChange('height', parseFloat(text))} keyboardType="numeric" value={renderNumberAsString(form?.height)}/>
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
          <CustomSelectInput onSelect={(value) => handleChange("activityLevel", value.value)} options={ACTIVITY_LEVEL_OPTIONS} selected={form.activityLevel as any}/>
        </View>
        <View style={styles.space2}>
          <Pressable onPress={() => navigation.navigate("TrainerCreateProgram")}>
            <Text style={styles.inputTitle}>Upload Your Medical Certificate</Text>
          </Pressable>
          <MedicalCertificateUploader onHandleChange={(uri) => handleChange("MedicalCertificate", uri, handleWhenAddedMedicalCert)} medicalCertificate={form?.MedicalCertificate} />
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

        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

function renderNumberAsString(num: number | undefined) {
  if (!num) return "";
  const numStr = num?.toString();
  if (!numStr) return "";
  if (isNaN(num)) return "";
  return numStr 
}

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
});

export default SignupClient;
