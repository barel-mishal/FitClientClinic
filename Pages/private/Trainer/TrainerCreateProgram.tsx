import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useReducer } from "react";
import { View, Text, StyleSheet, Button, TextInput, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { RootStackParamList } from "../../../App";
import ImageUpload from "../../../Components/ImageUploadComponent";
import { FitnessProgram } from "../../../types";


type Props = NativeStackScreenProps<RootStackParamList, 'TrainerCreateProgram'>;

type Exercise = FitnessProgram['exercises'][number];
interface ProgramState {
    program: Partial<FitnessProgram>
    currentExerciseIndex: number;
    currentExercise: Partial<Exercise> | undefined;
    errorMessage: string;
    updateProgram: (program: Partial<FitnessProgram>, key: keyof FitnessProgram, value: Partial<FitnessProgram[keyof FitnessProgram]>) => Partial<FitnessProgram>;
    createNewExercise: (program: Partial<FitnessProgram>, exercise: Partial<Exercise>) => Partial<FitnessProgram>;
    newExercise: Partial<Exercise>;
    updateExercises: (exercises: Partial<Exercise>[], key: keyof Exercise, value: Partial<Exercise[keyof Exercise]>, index: number) => Partial<Exercise>[];
}

const initialState: ProgramState = { 
    program: {}, 
    currentExerciseIndex: 0,
    currentExercise: undefined,
    errorMessage: "",
    updateProgram: (program: Partial<FitnessProgram>, key: keyof FitnessProgram, value: Partial<FitnessProgram[keyof FitnessProgram]>) => {
        const newProgram = { ...program, [key]: value };
        return newProgram;
    },
    createNewExercise: (program: Partial<FitnessProgram>, exercise: Partial<Exercise>) => {
        const exercises = program.exercises ? program.exercises : [];
        const newProgram = { ...program, exercises: [exercise].concat(exercises) };
        return newProgram;
    },
    updateExercises: (exercises: Partial<Exercise>[], key: keyof Exercise, value: Partial<Exercise[keyof Exercise]>, index: number) => {
        const newExercises = exercises.map((exercise, i) => {
            if (i === index) {
                return { ...exercise, [key]: value };
            }
            return exercise;
        });
        return newExercises;
    },
    newExercise: {},
};

type Actions = {
    type: "UPDATE_PROGRAM";
    payload: {key: keyof FitnessProgram, value: FitnessProgram[keyof FitnessProgram]};
} | {
    type: "NEXT_EXERCISE";
} | {
    type: "PREV_EXERCISE";
} | {
    type: "ADD_EXERCISE";
} | {
    type: "UPDATE_EXERCISE";
    payload: {key: keyof Exercise, value: Exercise[keyof Exercise]};
};
function reducer(state: ProgramState, action: Actions) {
  switch (action.type) {
    case 'NEXT_EXERCISE':
      return state;
    case 'PREV_EXERCISE':
      return state;
    case 'ADD_EXERCISE':
        return state;
    case 'UPDATE_PROGRAM':
      // TODO: Implement functionality to add a new exercise
      return {
        ...state,
        program: state.updateProgram(state.program , action.payload.key, action.payload.value)
      };
    case 'UPDATE_EXERCISE':
      const newExercises = state.program?.exercises ? state.program?.exercises : [];
      return {
        ...state,
        program: {
          ...state.program,
          exercises: state.updateExercises(newExercises, action.payload.key, action.payload.value, state.currentExerciseIndex)
        }
      }
    default:
      return state;
  }
}

const TrainerCreateFitnessProgram: React.FC<Props> = ({ navigation }) => {
        // const auth = useAuth();
    // if (!auth.user) return <View></View>;
    // const program = databaseMethods.getTrainerProgram(auth.user.uid, id);
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleSubmit = () => {console.log(state.program)};
  const isLastExercise = state?.program?.exercises?.length ? (state?.program?.exercises?.length === state.currentExerciseIndex) : true;
  

  return (
    <ScrollView style={styles.container}>
      {/* Display current exercise */}
      {/* <ExerciseDetail exercise={state?.program?.exercises[state.currentExerciseIndex]} /> */}
      <View>
      <Button title="Submit Program" onPress={handleSubmit} />
        <Text style={styles.title}>Signup Client</Text>
        <Text style={styles.inputTitle}>Your name</Text>
        <TextInput style={styles.input} placeholder="Name" onChangeText={text => dispatch({type: "UPDATE_PROGRAM", payload: {key: "name", value: text}})} value={state.program?.name}/>
        <Text style={styles.inputTitle}>Description</Text>
        <TextInput style={styles.input} placeholder="Email" secureTextEntry={false} onChangeText={text => dispatch({type: "UPDATE_PROGRAM", payload: {key: "description", value: text}})}  value={state.program?.description}/>
        <Text style={styles.inputTitle}>Duration</Text>
        <ScrollView horizontal={true} style={styles.horizantalBlocks}>
          <TouchableOpacity style={styles.bigButton} onPress={() => dispatch({type: "UPDATE_PROGRAM", payload: {key: "duration", value: "2h"}})}>
            <Text>Hour +</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bigButton} onPress={() => dispatch({type: "UPDATE_PROGRAM", payload: {key: "duration", value: "1h"}})}>
            <Text>Hour</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bigButton} onPress={() => dispatch({type: "UPDATE_PROGRAM", payload: {key: "duration", value: "45m"}})}>
            <Text>45 minutes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bigButton} onPress={() => dispatch({type: "UPDATE_PROGRAM", payload: {key: "duration", value: "30m"}})}>
            <Text>30 minutes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bigButton} onPress={() => dispatch({type: "UPDATE_PROGRAM", payload: {key: "duration", value: "20m"}})}>
            <Text>20 minutes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bigButton} onPress={() => dispatch({type: "UPDATE_PROGRAM", payload: {key: "duration", value: "10m"}})}>
            <Text>10 minutes</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      {/* Navigation buttons */}
      <View>
        <View style={styles.navigation}>
          {!isLastExercise ? <Button title="Back" onPress={() => dispatch({ type: 'PREV_EXERCISE' })} /> : <View></View>}
          {isLastExercise
              ? 
              <Button title="Add New Exercise" onPress={() => dispatch({ type: 'ADD_EXERCISE' })} /> 
              : <Button title="Next" onPress={() => dispatch({ type: 'NEXT_EXERCISE' })} />}
        </View>
      </View>
      <View>
        {state.program?.exercises?.map((exercise, index) => {
          return (
            <View key={index}>
              <Text style={styles.title}>{exercise.name}</Text>
              <Text>{exercise.description}</Text>
              <ImageUpload /> {/* imageUrl={exercise.imgUrl} />  Utilize your existing ImageUpload component */}
              <Text style={styles.inputTitle}>Weight</Text>
              <TextInput style={styles.input} placeholder="Weight" onChangeText={text => dispatch({type: "UPDATE_EXERCISE", payload: {key: "estimatedDuration", value: text}})} value={exercise.weight?.toString()}/>
              <Text style={styles.inputTitle}>Reps</Text>
              {/* <TextInput style={styles.input} placeholder="Reps" onChangeText={text => dispatch({type: "UPDATE_EXERCISE", payload: {key: "reps", value: text}})} value={exercise.reps}/> */}
              <Text style={styles.inputTitle}>Sets</Text>
              <TextInput style={styles.input} placeholder="Sets" onChangeText={text => dispatch({type: "UPDATE_EXERCISE", payload: {key: "sets", value: text}})} value={exercise?.sets ? exercise.sets.toString() : ""}/>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // styles for your container
    display: 'flex',
    flexDirection: 'column',
    height: Dimensions.get('window').height,
  },
  navigation: {
    // styles for your navigation buttons
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    
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
    },
    bigButton: {
        backgroundColor: 'lightgrey',
        padding: 10,
        margin: 10,
        borderRadius: 6,
    },
    horizantalBlocks: {
        backgroundColor: 'lightblue',
        display: 'flex',
        flexDirection: 'row',
        width: Dimensions.get('window').width,
    },
});
  

export default TrainerCreateFitnessProgram;


