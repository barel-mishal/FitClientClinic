import { useReducer, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Button, ScrollView, ScrollViewBase, ScrollViewComponent } from "react-native";
import { RenderClock } from "./RenderClock";
import { Duration, FitnessProgramOutput, formatClockDuration } from "../types";
import { AntDesign } from "@expo/vector-icons";


export type ProgramState = Required<FitnessProgramOutput> & ({
  state: "start";
  workoutTime: Duration;
  completedExercises: Array<string>;
} | {
  state: "stop";
  workoutTime: Duration;
  completedExercises: Array<string>;
} | {
  state: "pause";
  workoutTime: Duration;
  completedExercises: Array<string>;
} | {
  state: "finish";
  workoutTime: Duration;
  message: string;
  completedExercises: Array<string>;
} | {
  state: "on",
  workoutTime: Duration,
  completedExercises: Array<string>;
});

export type ProgramActions = {
  type: "start" | "stop" | "pause" | "finish" | "on";
  payload?: Duration;
  message?: string;
};

const programActions = (state: ProgramState, action: ProgramActions): ProgramState => {
  switch (action.type) {
    case "start":
      return {
        ...state,
        state: "start",
        workoutTime: action.payload ?? "0s",
      };
    case "stop":
      return {
        ...state,
        state: "stop",
        workoutTime: action.payload ?? "0s",
      };
    case "pause":
      return {
        ...state,
        state: "pause",
        workoutTime: action.payload ?? "0s",
      };
    case "finish":
      return {
        ...state,
        state: "finish",
        workoutTime: action.payload ?? "0s",
        message: action.message ?? "Workout Finished",
      };
    case "on":
      console.log("on");
      return {
        ...state,
        state: "on",
        workoutTime: action.payload ?? "0s",
      };
    default:
      return state;
  }
}

/*
  This component is used to render the program track
  It will render the current exercise and the time left for the exercise
  It will also allow the user to navigate between exercises
*/
const RenderProgramTrack: React.FC<{program: ProgramState}> = ({ program }) => {
    // useReducer to manage the state of the program
    const [state, dispatch] = useReducer(programActions, program);

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
        <>
        
        {state.state === "start" && <StartWorkout program={state} dispatch={dispatch} />}
        {state.state === "on" && <OnWorkout {...state} />}
        {state.state === "pause" && <PuseWorkout {...state} />}
        {state.state === "finish" && <FinishWorkout {...state} />}
        {state.state === "stop" && <FinishWorkout {...state} />}

        {/* <RenderClock duration={state.workoutTime} styleText={styles.exerciseDuration} formatDuration={formatClockDuration} /> */}
        {/* <RenderClock duration={workoutTime} styleText={styles.exerciseDuration} formatDuration={formatClockDuration} />
    
        <View key={exercise.id} style={styles.exerciseContainer}>
            <Text style={styles.exerciseTitle}>{exercise.name}</Text>
            <Text style={styles.exerciseDescription}>{exercise.description}</Text>

            {exercise?.repetitionType === "time" ? (
                <View style={styles.exerciseDetail}>
                    <Text style={styles.exerciseSet}>Time</Text>
                    <RenderClock duration={exercise?.time as Duration ?? "0s"} styleText={styles.exerciseContainer} formatDuration={formatClockDuration} />
                </View>
            ) : (
                <View style={styles.exerciseDetail}>
                    <Text style={styles.exerciseSet}>{exercise?.sets} Set</Text>
                    <Text style={styles.exerciseDuration}>{exercise?.reps && exercise?.repetitionType}</Text>
                </View>
            )}
        </View> */}
    
  
        {/* <View style={styles.navigation}>
          <TouchableOpacity onPress={() => { handlePreviousExercise() }}>
            <Text style={styles.navText}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { handleNextExercise() }}>
            <Text style={styles.navText}>Next</Text>
          </TouchableOpacity>
        </View> */}
      </>
    )
}


export const StartWorkout: React.FC<{program: ProgramState, dispatch: React.Dispatch<ProgramActions>}> = ({dispatch, program}) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#0c4a6e" }}>
      <View style={{ flex: 1, maxHeight: Dimensions.get('window').height / 3, justifyContent: "center" }}>
        <View style={{...stylesStartWorkout.stacHorizental, marginTop: 50}}>
          <Text style={{fontSize: 40, fontWeight: "bold", ...styles.sky50}}>{program.name}</Text>
          <AntDesign name="questioncircle" size={24} color="#f0f9ff" />
        </View>

        <View style={stylesStartWorkout.stack}>
          <Text style={{fontSize: 16, fontWeight: "200", color: "#bae6fd"}}>Description</Text>
          <Text style={{...styles.sky50, fontSize: 24}}>{program.description}</Text>
        </View>
      </View>

      <ScrollView style={{ flex: 1, backgroundColor: "#f0f9ff", padding: 16, borderRadius: 16, marginHorizontal: 20 }}>
        <Text style={{fontSize: 16, fontWeight: "200", color: "#0c4a6e", marginBottom: 20}}>Exercises</Text>
        <View style={{display: "flex", gap: 8}}>
          {program.exercises.reverse().map((e, i) => {
            const n = i + 1;
            const textReps = e.repetitionType === "time" ? formatClockDuration(e.time as Duration ?? "") : `${e.sets}x${e.reps}`;
            return (
              <View key={e.id} style={{ flexDirection: "row", gap: 4 }}>
                <Text style={{color: "#082f49"}}>{n}.</Text>
                <Text style={{color: "#082f49"}}>{e.name}</Text>
                <Text style={{color: "#082f49"}}>{textReps}</Text>
              </View>
            )
          })}
        </View>
      </ScrollView>
      <View style={{ marginHorizontal: 20, marginBottom: 20, marginTop: 10 }}>
        <TouchableOpacity
          onPress={() => dispatch({type: "on"})}
          activeOpacity={0.8} // Slight opacity change on press for better feedback
          style={{ backgroundColor: "#fde68a", alignItems: "center", padding: 10, borderRadius: 16 }}
        >
          <Text style={{ color: "#78350f", fontSize: 32 }}>Start</Text>
        </TouchableOpacity>
  </View>
    </View>
  )
};

export const OnWorkout: React.FC<ProgramState> = ({}) => {
  return (
    <View>
      <Text style={styles.sky50}>On Workout</Text>
    </View>
  )
}

export const PuseWorkout: React.FC<ProgramState> = ({}) => {
  return (
    <View>
      <Text>Pause Workout</Text>
    </View>
  )
}

export const FinishWorkout: React.FC<ProgramState> = ({}) => {
  return (
    <View>
      <Text>Finish Workout</Text>
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
    sky50: {
      color: '#f0f9ff',
    },

  });

export const stylesStartWorkout = StyleSheet.create({
  stacHorizental: {
    marginVertical: 20,
    marginHorizontal: 16,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  stack: {
    marginVertical: 20,
    marginHorizontal: 16,
    display: "flex",
    gap: 6,
  }
  
});


export default RenderProgramTrack;