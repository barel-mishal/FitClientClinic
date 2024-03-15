import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useReducer } from "react";
import { View, Text, StyleSheet, Button, TextInput, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { RootStackParamList } from "../../../App";
import ImageUpload from "../../../Components/ImageUploadComponent";
import { FitnessProgram, createRandomId, uniqueId } from "../../../types";
import { MaterialIcons } from '@expo/vector-icons';
import RadioButton from "../../../Components/RadioComponent";
import SelectDropdown from "react-native-select-dropdown";
import { MultiSelect } from "react-native-element-dropdown";



type Props = NativeStackScreenProps<RootStackParamList, 'TrainerCreateProgram'>;

type Exercise = FitnessProgram['exercises'][number];
interface ProgramState {
    program: Partial<FitnessProgram>
    currentExercise: Partial<Exercise> | undefined;
    errorMessage: string;
    updateProgram: (program: Partial<FitnessProgram>, key: keyof FitnessProgram, value: Partial<FitnessProgram[keyof FitnessProgram]>) => Partial<FitnessProgram>;
    createNewExercise: (program: Partial<FitnessProgram>, exercise: Partial<Exercise>) => Partial<FitnessProgram>;
    newExercise: (id: string) => Partial<Exercise>;
    updateExercises: (exercises: Partial<Exercise>[], key: keyof Exercise, value: Partial<Exercise[keyof Exercise]>, index: number) => Partial<Exercise>[];
}

const initialState: ProgramState = { 
    program: {}, 
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
    newExercise: (id: string) => ({id}),
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
    payload: {key: keyof Exercise, value: Exercise[keyof Exercise], index: number};
};
function reducer(state: ProgramState, action: Actions) {
  switch (action.type) {
    case 'NEXT_EXERCISE':
      return state;
    case 'PREV_EXERCISE':
      return state;
    case 'ADD_EXERCISE':
        const isExercises = state.program?.exercises
        const ids = isExercises ? isExercises.map(e => e.id ?? "") : [];
        const id = uniqueId(ids);
        const newExercise = state.newExercise(id);
        return {
            ...state,
            program: state.createNewExercise(state.program, newExercise)
        };
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
          exercises: state.updateExercises(newExercises, action.payload.key, action.payload.value, action.payload.index)
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
  

  return (
    <ScrollView style={styles.container}>
      {/* Display current exercise */}
      {/* <ExerciseDetail exercise={state?.program?.exercises[state.currentExerciseIndex]} /> */}
      <View style={styles.containerGapPaading}>
          <Button title="Finish Creating A Program" onPress={handleSubmit} />
        
        <Text style={styles.inputTitle}>Program Name</Text>
        <TextInput style={styles.input} placeholder="Name" onChangeText={text => dispatch({type: "UPDATE_PROGRAM", payload: {key: "name", value: text}})} value={state.program?.name}/>
        <Text style={styles.inputTitle}>Description</Text>
        <TextInput style={styles.input} placeholder="Description" onChangeText={text => dispatch({type: "UPDATE_PROGRAM", payload: {key: "description", value: text}})} value={state.program?.description}/>
        <Text style={styles.inputTitle}>Client For Program</Text>
        <MultiSelect data={[ {label: "Barel"}, {label: "Eli"}, {label: "Omri"} ]} renderSelectedItem={(l) => <Text style={styles.title}>{l.label}</Text>} labelField={"label"} valueField="label" onChange={() => {}}/>
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
          {state?.program?.exercises?.length ? <Button title="Back" onPress={() => dispatch({ type: 'PREV_EXERCISE' })} /> : <View></View>}
              <Button title="Add New Exercise" onPress={() => dispatch({ type: 'ADD_EXERCISE' })} /> 
        </View>
      </View>
      <View style={styles.containerGapPaading}>
        {state.program?.exercises?.map((exercise, index) => {
          return (
            <View key={exercise.id} style={styles.containerGapPaading}>
              <Text style={styles.inputTitle}>Name</Text>
              <TextInput style={styles.input} placeholder="Jog Warm-up" onChangeText={text => dispatch({type: "UPDATE_EXERCISE", payload: {key: "name", value: text, index}})} value={exercise.name?.toString()}/>
              <Text style={styles.inputTitle}>Description</Text>
              <TextInput style={styles.input} placeholder="Description" onChangeText={text => dispatch({type: "UPDATE_EXERCISE", payload: {key: "description", value: text, index}})} value={exercise.description?.toString()}/>
              <Text style={styles.inputTitle}>Image</Text>
              <ImageUpload /> 
              <Text style={styles.inputTitle}>Weight</Text>
              <TextInput style={styles.input} placeholder="Weight" onChangeText={text => dispatch({type: "UPDATE_EXERCISE", payload: {key: "weight", value: text, index}})} value={exercise.weight?.toString()}/>
              <View>

              <Text style={styles.inputTitle}>Sets</Text>
              <ScrollView horizontal={true} >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
                  return (
                    <TouchableOpacity  key={i} style={{...styles.bigButton, width: 50, height: 50, justifyContent: "center", alignItems: "center"}} onPress={() => dispatch({type: "UPDATE_EXERCISE", payload: {key: "sets", value: i.toString(), index}})}>
                      <Text>{i}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>  
              <View style={styles.containerGapPaading}> 
                <Text style={styles.inputTitle}>Reps</Text>
                <View style={{...styles.horizantalBlocks, gap: 10}}>
                    <RadioButton onPress={() => {}} options={[{label: "Time", value: "time"}, {label: "Repition", value: "reps"}]} val={"time"} />
                </View>
                </View>
              </View>
              <Text style={styles.inputTitle}>Estimated Duration</Text>
              <TextInput style={styles.input} placeholder="Duration" onChangeText={text => dispatch({type: "UPDATE_EXERCISE", payload: {key: "estimatedDuration", value: text, index}})} value={exercise.estimatedDuration?.toString()}/>
              <Text style={styles.inputTitle}>URL Exercise Example</Text>
              <TextInput style={styles.input} placeholder="URL" onChangeText={text => dispatch({type: "UPDATE_EXERCISE", payload: {key: "urlExample", value: text, index}})} value={exercise.urlExample?.toString()}/>
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
  containerGapPaading: {
    // styles for your container
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    
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
        marginRight: 10,
        borderRadius: 6,
    },
    horizantalBlocks: {
        display: 'flex',
        flexDirection: 'row',
        width: Dimensions.get('window').width,
    },
});
  

export default TrainerCreateFitnessProgram;


