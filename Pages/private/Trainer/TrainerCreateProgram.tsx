import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useReducer, useState } from "react";
import { View, Text, StyleSheet, Button, TextInput, ScrollView, TouchableOpacity, Dimensions, ViewStyle, StyleProp } from 'react-native';
import { RootStackParamList } from "../../../App";
import ImageUpload from "../../../Components/ImageUploadComponent";
import { FitnessProgram, uniqueId } from "../../../types";
import RadioButton from "../../../Components/RadioComponent";
import { MultiSelect } from "react-native-element-dropdown";
import { useAuth } from "../../../Components/ContextComopnents/AuthContext";
import MultiSelectComponent from "../../../Components/MultiSelect";



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
  const auth = useAuth();
  if (!auth.user || auth.data.role !== "trainer") return <View></View>;
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleSubmit = () => {console.log(state.program)};
  // get all the clients from the database, and then set the state of the clients to choose from. 
  // improve the multi select to be able to select multiple clients
  const clients = auth.data.clients.filter(c => c.name || c.userId).map(c => ({label: c.name!, value: c.userId!}));
  const [selected, setSelected] = useState<string[]>([]); 
  const styleDuration = (duration: string) => {
    return state.program.duration === duration ? styles.bigButtonSelected : styles.bigButton;
  } 
  const styleSet = (set: string, id: string): StyleProp<ViewStyle> => {
    const exercise = state.program?.exercises?.find(e => e.id === id);
    const squer: StyleProp<ViewStyle> = {width: 50, height: 50, justifyContent: "center", alignItems: "center"};
    return exercise?.sets === set ? {...styles.bigButtonSelected, ...squer} : {...styles.bigButton, ...squer};
  } 

  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerGapPaading}>
        <View style={{paddingHorizontal: 10, display: "flex", gap: 30}}>
          <TouchableOpacity onPress={handleSubmit} style={{display: "flex", width: "100%" , flexDirection: "row", gap: 4, justifyContent: "center", alignItems: "center", padding: 12, marginTop: 14, borderRadius: 20, backgroundColor: "#7DD3FC", opacity: 50, }}>
              <Text style={{ fontSize: 16, fontWeight: "700", color: "#082F49" }}>Save And Close Program</Text>
          </TouchableOpacity>
          <View style={styles.containerGapPaading}>
            <Text style={styles.inputTitle}>Client For Program</Text>
            <MultiSelectComponent items={clients} selected={selected} onChange={(i) => setSelected(i)} placeholder="Select Client" />
          </View>
          <View style={styles.containerGapPaading}>
            <Text style={styles.inputTitle}>Program Name</Text>
            <TextInput style={styles.input} placeholder="Name" onChangeText={text => dispatch({type: "UPDATE_PROGRAM", payload: {key: "name", value: text}})} value={state.program?.name}/>
          </View>
          <View style={styles.containerGapPaading}>
            <Text style={styles.inputTitle}>Description</Text>
            <TextInput style={styles.input} placeholder="Description" onChangeText={text => dispatch({type: "UPDATE_PROGRAM", payload: {key: "description", value: text}})} value={state.program?.description}/>
          </View>
          <View style={styles.containerGapPaading}>
            <Text style={styles.inputTitle}>Duration</Text>
            <ScrollView horizontal={true} style={styles.horizantalBlocks}>
              <TouchableOpacity style={styleDuration("2h")} onPress={() => dispatch({type: "UPDATE_PROGRAM", payload: {key: "duration", value: "2h"}})}>
                <Text>Hour +</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styleDuration("1h")} onPress={() => dispatch({type: "UPDATE_PROGRAM", payload: {key: "duration", value: "1h"}})}>
                <Text>Hour</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styleDuration("45m")} onPress={() => dispatch({type: "UPDATE_PROGRAM", payload: {key: "duration", value: "45m"}})}>
                <Text>45 minutes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styleDuration("30m")} onPress={() => dispatch({type: "UPDATE_PROGRAM", payload: {key: "duration", value: "30m"}})}>
                <Text>30 minutes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styleDuration("20m")} onPress={() => dispatch({type: "UPDATE_PROGRAM", payload: {key: "duration", value: "20m"}})}>
                <Text>20 minutes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styleDuration("10m")} onPress={() => dispatch({type: "UPDATE_PROGRAM", payload: {key: "duration", value: "10m"}})}>
                <Text>10 minutes</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
          <View>
            <View style={styles.navigation}>
              <TouchableOpacity onPress={() => dispatch({ type: 'ADD_EXERCISE' })} style={{display: "flex" , flexDirection: "row", gap: 4, justifyContent: "center", alignItems: "center", padding: 12, marginTop: 14, borderRadius: 20, backgroundColor: "#7DD3FC", opacity: 50, }}>
                    <Text style={{ fontSize: 16, fontWeight: "700", color: "#082F49" }}>Add New Exercise</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
          {state.program?.exercises?.map((exercise, index) => {
            return (
              <View key={exercise.id} style={{...styles.containerGapPaading, paddingHorizontal: 10, paddingVertical: 15, borderColor: "#bae6fd", borderStyle: "solid", borderWidth: 2, borderRadius: 20, margin: 10}}>
                <Text style={styles.inputTitle}>Name</Text>
                <TextInput style={styles.input} placeholder="Jog Warm-up" onChangeText={text => dispatch({type: "UPDATE_EXERCISE", payload: {key: "name", value: text, index}})} value={exercise.name?.toString()}/>
                <Text style={styles.inputTitle}>Description</Text>
                <TextInput style={styles.input} placeholder="Description" onChangeText={text => dispatch({type: "UPDATE_EXERCISE", payload: {key: "description", value: text, index}})} value={exercise.description?.toString()}/>
                <Text style={styles.inputTitle}>Image</Text>
                <ImageUpload /> 
                <Text style={styles.inputTitle}>Sets</Text>
                <ScrollView horizontal={true} >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
                    return (
                      <TouchableOpacity  
                      key={i} 
                      style={styleSet(i.toString(), exercise.id!)}
                      onPress={() => dispatch({type: "UPDATE_EXERCISE", payload: {key: "sets", value: i.toString(), index}})}>
                        <Text>{i}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>  
                <View style={styles.containerGapPaading}> 
                  <Text style={styles.inputTitle}>Reps</Text>
                  <View style={{...styles.horizantalBlocks, gap: 10}}>
                      <RadioButton 
                      onPress={text => dispatch({type: "UPDATE_EXERCISE", payload: {key: "reps", value: text, index}})} 
                      options={[{label: "Time", value: "time"}, {label: "Repition", value: "reps"}]} val={"time"} />
                  </View>
                </View>
                <Text style={styles.inputTitle}>Weight</Text>
                <TextInput style={styles.input} placeholder="Weight" onChangeText={text => dispatch({type: "UPDATE_EXERCISE", payload: {key: "weight", value: text, index}})} value={exercise.weight?.toString()}/>
                
                <Text style={styles.inputTitle}>Estimated Duration</Text>
                <TextInput style={styles.input} placeholder="Duration" onChangeText={text => dispatch({type: "UPDATE_EXERCISE", payload: {key: "estimatedDuration", value: text, index}})} value={exercise.estimatedDuration?.toString()}/>
                <Text style={styles.inputTitle}>URL Exercise Example</Text>
                <TextInput style={styles.input} placeholder="URL" onChangeText={text => dispatch({type: "UPDATE_EXERCISE", payload: {key: "urlExample", value: text, index}})} value={exercise.urlExample?.toString()}/>
              </View>
            );
          })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: Dimensions.get('window').height,
    backgroundColor: '#f0f9ff',
  },
  navigation: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  containerGapPaading: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    
  },
    title: {
      fontSize: 20, fontWeight: "700", color: "#082F49"
    },
    input: {
        borderWidth: 1,
        borderColor: '#7dd3fc',
        padding: 10,
        borderRadius: 6,
    },
    errorMessage: {
        color: 'red',
        height: 17,
    },
    inputTitle: {
        fontSize: 16, fontWeight: "700", color: "#082F49" 
    },
    bigButton: {
        borderColor: '#22d3ee',
        padding: 10,
        color: "#082F49",
        marginRight: 10,
        borderRadius: 6,
        borderWidth: 2,
    },
    bigButtonSelected: {
        backgroundColor: '#22d3ee',
        padding: 10,
        marginRight: 10,
        borderRadius: 6,
        color: "#082F49",
    },
    horizantalBlocks: {
        display: 'flex',
        flexDirection: 'row',
        width: Dimensions.get('window').width,
    }
});
  

export default TrainerCreateFitnessProgram;


