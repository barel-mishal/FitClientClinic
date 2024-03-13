import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useReducer } from "react";
import { View, Text, StyleSheet, Button } from 'react-native';
import { RootStackParamList } from "../../../App";
import ImageUpload from "../../../Components/ImageUploadComponent";
import { FitnessProgram } from "../../../types";


type Props = NativeStackScreenProps<RootStackParamList, 'TrainerCreateProgram'>;

interface ProgramState {
  program: Partial<FitnessProgram>
  currentExerciseIndex: number;
  updateProgram: (program: FitnessProgram, key: keyof FitnessProgram, value: FitnessProgram[keyof FitnessProgram]) => Partial<FitnessProgram>;
  currentExercise: Partial<FitnessProgram['exercises'][number]> | undefined;
}

const initialState: ProgramState = { 
    program: {}, 
    currentExerciseIndex: 0,
    updateProgram: (program: FitnessProgram, key: keyof FitnessProgram, value: FitnessProgram[keyof FitnessProgram]) => {
        const newProgram = { ...program, [key]: value };
        return newProgram;
    },
    currentExercise: undefined
};

function reducer(state: ProgramState, action: { type: string; payload?: any }) {
  switch (action.type) {
    case 'NEXT_EXERCISE':
      return state;
    case 'PREV_EXERCISE':
      return state;
    case 'ADD_EXERCISE':
        return state;
    case 'UPDATE_EXERCISE':
      // TODO: Implement functionality to add a new exercise
      return state;
    default:
      return state;
  }
}

const TrainerCreateFitnessProgram: React.FC<Props> = ({ navigation }) => {
        // const auth = useAuth();
    // if (!auth.user) return <View></View>;
    // const program = databaseMethods.getTrainerProgram(auth.user.uid, id);
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <View style={styles.container}>
      {/* Display current exercise */}
      {/* <ExerciseDetail exercise={state?.program?.exercises[state.currentExerciseIndex]} /> */}

      {/* Navigation buttons */}
      <View style={styles.navigation}>
        <Button title="Back" onPress={() => dispatch({ type: 'PREV_EXERCISE' })} />
        <Button title="Add New Exercise" onPress={() => dispatch({ type: 'ADD_EXERCISE' })} />
        <Button title="Next" onPress={() => dispatch({ type: 'NEXT_EXERCISE' })} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // styles for your container
  },
  navigation: {
    // styles for your navigation buttons
  },
});



export const ExerciseDetail = ({ exercise }: { exercise: any }) => {
    if (!exercise) {
      return <Text>No exercise selected</Text>;
    }
  
    return (
      <View style={styles2.container}>
        <Text style={styles2.title}>{exercise.name}</Text>
        <Text>{exercise.description}</Text>
        <ImageUpload /> {/* imageUrl={exercise.imgUrl} />  Utilize your existing ImageUpload component */}
        {/* TODO: Include other elements like CustomSelectInput, RadioButton as needed */}
      </View>
    );
  };
  
  const styles2 = StyleSheet.create({
    container: {
      // styles for your exercise detail container
    },
    title: {
      // styles for your exercise title
    },
    // Add more styles as needed
  });
  
  
  
  

export default TrainerCreateFitnessProgram;


