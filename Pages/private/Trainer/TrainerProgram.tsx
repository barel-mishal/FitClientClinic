import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { RootStackParamList } from "../../../App";
import { Entypo } from '@expo/vector-icons';
import { useAuth } from "../../../Components/ContextComopnents/AuthContext";
import databaseMethods from "../../../services/databaseMethods";

type Props = NativeStackScreenProps<RootStackParamList, 'TrainerProgram'>;

const TrainerProgram: React.FC<Props> = ({ navigation, route: { params: {id}} }) => {
    const auth = useAuth();
    if (!auth.user) return <View></View>;
    const program = databaseMethods.getTrainerProgram(auth.user.uid, id)
    console.log(program)

    const formatDuration = (reps) => {
        if (reps.repetitionType === 'time') {
          return `${Math.floor(parseInt(reps.duration) / 60)}:${parseInt(reps.duration) % 60}s`;
        } else {
          return `${reps.numberOfReps} reps`;
        }
      };
    
    
    return (
        <ScrollView style={styles.container}>
        {/* Render each exercise */}
        {program.exercises.map((exercise) => (
          <View key={exercise.id} style={styles.exerciseContainer}>
            <Text style={styles.exerciseTitle}>{exercise.name}</Text>
            <Text style={styles.exerciseDescription}>{exercise.description}</Text>
  
            <View style={styles.exerciseDetail}>
              <Text style={styles.exerciseSet}>{exercise.exerciseStructure.sets} Set</Text>
              <Text style={styles.exerciseDuration}>{formatDuration(exercise.exerciseStructure.reps[0])}</Text>
            </View>
  
            {/* Exercise Image - Placeholder for now */}
            {/* <Image source={{ uri: exercise.imgUrl }} style={styles.exerciseImage} /> */}
          </View>
        ))}
  
        {/* Footer navigation buttons */}
        <View style={styles.navigation}>
          <TouchableOpacity onPress={() => { /* handle previous exercise */ }}>
            <Text style={styles.navText}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { /* handle next exercise */ }}>
            <Text style={styles.navText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    exerciseContainer: {
      padding: 20,
      alignItems: 'center',
    },
    exerciseTitle: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    exerciseDescription: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 20,
    },
    exerciseDetail: {
      alignItems: 'center',
      marginBottom: 20,
    },
    exerciseSet: {
      fontSize: 18,
      fontWeight: '600',
    },
    exerciseDuration: {
      fontSize: 32,
      fontWeight: 'bold',
      marginVertical: 10,
    },
    // Add styles for exerciseImage if needed
    navigation: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 20,
    },
    navText: {
      fontSize: 18,
      color: 'blue',
    },
  });
  

export default TrainerProgram;


