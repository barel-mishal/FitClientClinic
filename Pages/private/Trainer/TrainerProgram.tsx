import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { RootStackParamList } from "../../../App";
import { Entypo } from '@expo/vector-icons';
import { useAuth } from "../../../Components/ContextComopnents/AuthContext";
import databaseMethods from "../../../services/databaseMethods";
import { Duration, FitnessPrograms, formatDuration } from "../../../types";

type Props = NativeStackScreenProps<RootStackParamList, 'TrainerProgram'>;

const TrainerProgram: React.FC<Props> = ({ navigation, route: { params: {id}} }) => {
    const auth = useAuth();
    if (!auth.user) return <View></View>;
    const program = databaseMethods.getTrainerProgram(auth.user.uid, id);
    return <RenderProgram program={program} />
}

/*
This component is used to render the program details for the trainer
To avoid fetching the program each time it change state 
*/
export const RenderProgram = ({ program }: { program: FitnessPrograms[number] }) => {

    const [exerciseIndex, setExerciseIndex] = useState(0);


    const handleNextExercise = () => {
        if (exerciseIndex < program.exercises.length - 1) {
          setExerciseIndex(exerciseIndex + 1);
        }
      }
    const handlePreviousExercise = () => {
        if (exerciseIndex > 0) {
          setExerciseIndex(exerciseIndex - 1);
        }
      }

    const exercise = program.exercises[exerciseIndex];

    return (
        <View style={styles.container}>
        {/* Render each exercise */}
    
        <View key={exercise.id} style={styles.exerciseContainer}>
            <Text style={styles.exerciseTitle}>{exercise.name}</Text>
            <Text style={styles.exerciseDescription}>{exercise.description}</Text>

            {exercise.exerciseStructure.reps[0]?.repetitionType === "time" ? (
                <View style={styles.exerciseDetail}>
                    <Text style={styles.exerciseSet}>Time</Text>
                    <RenderClock duration={exercise.exerciseStructure.reps[0].duration} />
                </View>
            ) : (
                <View style={styles.exerciseDetail}>
                    <Text style={styles.exerciseSet}>{exercise.exerciseStructure.sets} Set</Text>
                    <Text style={styles.exerciseDuration}>{exercise.exerciseStructure.reps[0].numberOfReps}</Text>
                </View>
            )}
            {/* Exercise Image - Placeholder for now */}
            {/* <Image source={{ uri: exercise.imgUrl }} style={styles.exerciseImage} /> */}
        </View>
    
  
        {/* Footer navigation buttons */}
        <View style={styles.navigation}>
          <TouchableOpacity onPress={() => { handlePreviousExercise() }}>
            <Text style={styles.navText}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { handleNextExercise() }}>
            <Text style={styles.navText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
}

export const RenderClock = ({ duration }: { duration: Duration }) => {
    const oneSecondRef = useRef(1);
    const [timeLeft, setTimeLeft] = useState<string>(formatDuration(duration));
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
    useEffect(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      intervalRef.current = setInterval(() => {
        setTimeLeft(() => {
            const time = formatDuration(duration, `${oneSecondRef.current}s`);
            oneSecondRef.current += 1;
            return time;
        });
      }, 1000);
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }, [duration, oneSecondRef.current]);
  
    return <Text style={styles.exerciseDuration}>{timeLeft}</Text>
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: Dimensions.get('window').height,
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


