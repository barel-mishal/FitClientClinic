import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useReducer } from "react";
import { View, Text, StyleSheet, Button, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { RootStackParamList } from "../../../App";
import ImageUpload from "../../../Components/ImageUploadComponent";
import { FitnessProgram } from "../../../types";


type Props = NativeStackScreenProps<RootStackParamList, 'TrainerCreateProgram'>;

interface ProgramState {
    program: Partial<FitnessProgram>
    currentExerciseIndex: number;
    updateProgram: (program: Partial<FitnessProgram>, key: keyof FitnessProgram, value: Partial<FitnessProgram[keyof FitnessProgram]>) => Partial<FitnessProgram>;
    currentExercise: Partial<FitnessProgram['exercises'][number]> | undefined;
    errorMessage: string;
}

const initialState: ProgramState = { 
    program: {}, 
    currentExerciseIndex: 0,
    updateProgram: (program: Partial<FitnessProgram>, key: keyof FitnessProgram, value: Partial<FitnessProgram[keyof FitnessProgram]>) => {
        const newProgram = { ...program, [key]: value };
        return newProgram;
    },
    currentExercise: undefined,
    errorMessage: ""
};

type Actions = {
    type: "UPDATE_EXERCISE";
    payload: {key: keyof FitnessProgram, value: FitnessProgram[keyof FitnessProgram]};
} | {
    type: "NEXT_EXERCISE";
} | {
    type: "PREV_EXERCISE";
} | {
    type: "ADD_EXERCISE";
};

function reducer(state: ProgramState, action: Actions) {
  switch (action.type) {
    case 'NEXT_EXERCISE':
      return state;
    case 'PREV_EXERCISE':
      return state;
    case 'ADD_EXERCISE':
        return state;
    case 'UPDATE_EXERCISE':
      // TODO: Implement functionality to add a new exercise
      return {
        ...state,
        program: state.updateProgram(state.program , action.payload.key, action.payload.value)
      };
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
      <Text style={styles.title}>Signup Client</Text>
      <Text style={styles.inputTitle}>Your name</Text>
      <TextInput style={styles.input} placeholder="Name" onChangeText={text => dispatch({type: "UPDATE_EXERCISE", payload: {key: "name", value: text}})} value={state.program?.name}/>
      <Text style={styles.inputTitle}>Description</Text>
      <TextInput style={styles.input} placeholder="Email" secureTextEntry={false} onChangeText={text => dispatch({type: "UPDATE_EXERCISE", payload: {key: "description", value: text}})}  value={state.program?.description}/>
      <Text style={styles.inputTitle}>Duration</Text>
      <ScrollView>
        <TouchableOpacity onPress={() => dispatch({type: "UPDATE_EXERCISE", payload: {key: "duration", value: "2h"}})}>
          <Text>Hour +</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch({type: "UPDATE_EXERCISE", payload: {key: "duration", value: "1h"}})}>
          <Text>Hour</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch({type: "UPDATE_EXERCISE", payload: {key: "duration", value: "45m"}})}>
          <Text>45 minutes</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch({type: "UPDATE_EXERCISE", payload: {key: "duration", value: "30m"}})}>
          <Text>30 minutes</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch({type: "UPDATE_EXERCISE", payload: {key: "duration", value: "20m"}})}>
          <Text>20 minutes</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch({type: "UPDATE_EXERCISE", payload: {key: "duration", value: "10m"}})}>
          <Text>10 minutes</Text>
        </TouchableOpacity>
      </ScrollView>
      <Text style={styles.inputTitle}>Password</Text>
      <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} onChangeText={text => handleChange('password', text)} value={form?.password}/>
      <Text style={styles.inputTitle}>Trainer ID (Phone Number)</Text>
      <TextInput style={styles.input} placeholder="Trainer ID (if any)" onChangeText={text => handleChange('trainerId', text)} value={form?.trainerId}/>
      <Text style={styles.errorMessage}>{state.errorMessage}</Text>

      <Button title="Signup" onPress={handleSubmit} />

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
    title: {
        // styles for your title
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 6,
    },
    errorMessage: {
        color: 'red',
        height: 17,
    },
    inputTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    }
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


