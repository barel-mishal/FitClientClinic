import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { RenderClock } from "./RenderClock";
import { Duration, FitnessProgramOutput } from "../types";

/*
This component is used to render the program details for the trainer
To avoid fetching the program each time it change state 
*/
const RenderProgram = ({ program }: { program: FitnessProgramOutput }) => {

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

            {exercise?.repetitionType === "time" ? (
                <View style={styles.exerciseDetail}>
                    <Text style={styles.exerciseSet}>Time</Text>
                    <RenderClock duration={exercise?.time as Duration ?? "0s"} styleText={styles.exerciseDuration} />
                </View>
            ) : (
                <View style={styles.exerciseDetail}>
                    <Text style={styles.exerciseSet}>{exercise?.sets} Set</Text>
                    <Text style={styles.exerciseDuration}>{exercise?.reps && exercise?.repetitionType}</Text>
                </View>
            )}
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


export default RenderProgram;