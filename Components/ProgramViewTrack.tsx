import React, { useEffect, useReducer, useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, ScrollView, Pressable, Easing, useAnimatedValue, Image } from "react-native";
import { RenderClock } from "./RenderClock";
import { Duration, FitnessProgramOutput, formatClockDuration, formatTimerDuration } from "../types";
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from "@react-native-community/blur";
import { Modal } from "react-native-paper";
import { useElapsedTime } from "./temp";
import ConfettiCannon from 'react-native-confetti-cannon';
import databaseMethods from "../services/databaseMethods";

export type FinishWorkoutType = Required<FitnessProgramOutput> & {
  state: "finish";
  workoutTime: Duration;
  message: string;
  completedExercises: Array<string>;
  endTime: number;
  startTime: number;
  saved: boolean
};

export type InitialProgramState = Required<FitnessProgramOutput> & {
  workoutTime: Duration;
  completedExercises: Array<string>;
  startTime: number;
};

export type ProgramState = (
  Required<FitnessProgramOutput> 
  & InitialProgramState) 
  & ({
    state: "start";
  } 
  | {
    state: "stop";
  } 
  | {
    state: "on",
  } 
  | {
    state: "exercise",
  }
  | FinishWorkoutType 
);

export type ProgramActions = {
  type: ProgramState["state"];
  payload?: Duration;
  message?: string;
} | {
  type: "completedExercise";
  payload?: ProgramState["exercises"][number]["id"];
  message?: string;
} | {
  type: "saved";
  payload: boolean;
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
    case "finish":
      return {
        ...state,
        state: "finish",
        workoutTime: action.payload ?? "0s",
        message: action.message ?? "Workout Finished",
        endTime: Date.now(),
        saved: false
      };
    case "saved":
      if (state.state !== "finish") return state;
      return {
        ...state,
        saved: action.payload,
      };
    case "on":
      return {
        ...state,
        state: "on",
        workoutTime: action.payload ?? "0s",
      };
    case "exercise":
      return {
        ...state,
        state: "exercise",
        workoutTime: action.payload ?? "0s",
      };
    case "completedExercise": {
      const exs = state["exercises"]
      .filter(e => e.id === action.payload)
      .map(e => e.id as string);
      return {
        ...state,
        completedExercises: state.completedExercises.concat(exs)
      }
    }; 
    default:
      return state;
  }
}

const RenderProgramTrack: React.FC<{program: ProgramState, navigate: () => void}> = ({ program, navigate }) => {
    // useReducer to manage the state of the program. 
    // This simplifies the state management and makes it easier to manage the state of the program.
    const [state, dispatch] = useReducer(programActions, program);
    return (
        <>
        {state.state === "start" && <StartWorkout program={state} dispatch={dispatch} />}
        {state.state === "on" && <OnWorkout program={state} dispatch={dispatch} />}
        {state.state === "finish" && <FinishWorkout program={state} navigate={navigate} />}
      </>
    )
}


export const StartWorkout: React.FC<{program: ProgramState, dispatch: React.Dispatch<ProgramActions>}> = ({dispatch, program}) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#0c4a6e" }}>
      <View style={{ flex: 1, maxHeight: Dimensions.get('window').height / 3, justifyContent: "center" }}>
        <View style={{...stylesStartWorkout.stacHorizental, marginTop: 50}}>
          <Text style={{fontSize: 40, fontWeight: "bold", ...styles.sky50}}>{program.name}</Text>
          {/* <AntDesign name="questioncircle" size={24} color="#f0f9ff" /> */}
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
            const textReps = e.repetitionType === "time" ? formatClockDuration({step: "0s", duration: e.time as Duration}) : `${e.sets}x${e.reps}`;
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

export const OnWorkout: React.FC<{program: ProgramState, dispatch: React.Dispatch<ProgramActions>}> = ({program, dispatch}) => {
  const exercises = program?.exercises;
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const elapsed = useElapsedTime(true)
  const [paused, setPaused] = useState(false);
  const exercise = exercises[exerciseIndex];
  const [modalVisible, setModalVisible] = useState(false);

  const isCompleted = program.completedExercises.includes(exercise?.id ?? "");
  const exerciseLeft = exercises.length - program.completedExercises.length;
  const isFinished = exerciseLeft === 0;

  const handleNextExercise = () => {
    dispatch({type: "completedExercise", payload: exercise.id})
    const leftExercisesIndex = exercises.findIndex(e => !program.completedExercises.includes(e.id ?? "") && e.id !== exercise.id);
    if (leftExercisesIndex > -1) {
      setExerciseIndex(leftExercisesIndex);
    } else {
      dispatch({type: "finish", message: "Workout Finished"});
    }
  };

  const handlePreviousExercise = () => {
    if (exerciseIndex > 0) {
      setExerciseIndex(exerciseIndex - 1);
    }
  };

  const selectExerciseAndClose = (index: number) => {
    setExerciseIndex(index);
    setModalVisible(!modalVisible)
  }

  useEffect(() => {
    if (modalVisible) {
      setPaused(true);
    } else {
      setPaused(false);
    }
    
  }, [modalVisible]);

  

  return (
    <>

    <View style={stylesOnWorkOut.container} key={exercise.id}> 
      
      <View style={stylesOnWorkOut.header}>
        <View style={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "flex-start" }}>
          <Text style={{fontSize: 12}}>{formatClockDuration({step: `${Math.round(elapsed.elapsedTime/1000)}s`, duration: "0s"})}</Text>
          <Text style={{ ...stylesOnWorkOut.headerText, fontWeight: "600", color: "#082f49" }}>Full Body Work Out</Text>
        </View>
        <TouchableOpacity style={[{ ...stylesOnWorkOut.button }, isFinished ? {borderColor: "#065f46"} : {borderColor: "#f43f5e"}]} onPress={handleNextExercise}>
          <Text style={[{ fontSize: 20, textAlign: "center", fontWeight: "300" }, isFinished ? {color: "#065f46"} : {color: '#f43f5e'}]}>Finish</Text>
        </TouchableOpacity>
      </View>
      
      <View style={{...stylesOnWorkOut.content, justifyContent: "space-between"}}>
        <View>
          <View style={{display: "flex", flexDirection: "row", gap: 10}}>
            <Image source={{ uri: exercise?.imgUrl }} style={{ width: 60, height: 60, borderRadius: 10 }} />
            
            <View style={{ flexGrow: 1}}>
              <View style={{ flexDirection: "row", alignItems: "baseline", justifyContent: "space-between" }}>
                <Text style={[stylesOnWorkOut.mainTitle]}>{exercise?.name}</Text>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <Feather name="list" size={24} color="#082f49" />
                </TouchableOpacity>
              </View>
              <Text style={stylesOnWorkOut.description}>{exercise?.description}</Text>
            </View>
          </View>  
        
        {
          exercise.repetitionType === "time" ?
          <View style={stylesOnWorkOut.timerContainer}>
            <View style={stylesOnWorkOut.setContent}>
              <AntDesign name="retweet" size={24} color="#082f49" />
              <Text style={stylesOnWorkOut.sets}>1 Set</Text>
            
            </View>
              <Pressable onPress={() => setPaused(!paused)}>
                <View style={[stylesOnWorkOut.timer]}>
                  {paused && <>
                    <AntDesign name="playcircleo" size={60} color="#f0f9ff" style={[{position: "absolute", zIndex: 100}]} />
                    <BlurView
                      style={{ width: 170, height: 170, borderRadius: 170 / 2, zIndex: 60, position: "absolute" }}
                      blurType="light"
                      blurAmount={3}
                    />
                  </>
                  }
                  <View style={stylesOnWorkOut.timerContent}>
                    <View style={stylesOnWorkOut.timerTextWrapper}>
                      <AntDesign name="pause" size={24} color="#f0f9ff" />
                      <Text style={stylesOnWorkOut.timerTextSmall}>Time</Text>
                    </View>
                  <RenderClock 
                  key={exerciseIndex}
                  duration={exercise.time as Duration ?? "0s"} 
                  styleText={stylesOnWorkOut.timerText} 
                  formatDuration={formatTimerDuration} stop={paused} />
                  </View>
                </View>
              </Pressable>
          </View> : 
          <View style={[{justifyContent: "center", flexDirection: "row", display: "flex", alignItems: "baseline", gap: 3}]}>
            <Text style={[{fontSize: 24, fontWeight: "700"}]}>{exercise?.sets} (Set)</Text>
            <Text style={[{fontSize: 20, fontWeight: "700"}]}>:</Text>
            <Text style={[{fontSize: 40, fontWeight: "700"}]}>{exercise?.reps} (Reps)</Text>
          </View>
        }
        </View>
        
        <View style={stylesOnWorkOut.navigation}>
          <TouchableOpacity 
          onPress={() => handlePreviousExercise()}
          style={stylesOnWorkOut.button}>
            <Text style={stylesOnWorkOut.buttonText}>Previous</Text>
          </TouchableOpacity>
          <Text style={{fontSize: 20, color: "#082f49"}}>{exerciseLeft}/{exercises.length}</Text>
          <TouchableOpacity 
          onPress={() => handleNextExercise()}
          style={{...stylesOnWorkOut.button, borderColor: "#082f49", backgroundColor: "#0c4a6e"}}>
            <View style={{display: "flex", flexDirection: "row", gap: 10, alignItems: "center",}}>
              {isCompleted ? 
              <Feather name="check-square" size={24} color="#f0f9ff" />
              :
              <Feather name="square" size={24} color="#f0f9ff" /> 
              }
              <Text style={{...stylesOnWorkOut.buttonText, color: "#f0f9ff", fontWeight: "500"}} >& {isFinished ? "Finish" : "Next"}</Text>
            </View>
          </TouchableOpacity>
        </View>

      </View>

      <Modal
          key={"modal"}
          visible={modalVisible}
          // theme={{ colors: { background: "transparent" } }}
          style={[stylesModal.centeredView, {zIndex: 10000, height: Dimensions.get("window").height}]}
          onDismiss={() => setModalVisible(false)}
          
          >
            <ScrollView>
              <View style={stylesModal.centeredView}>
                <View style={stylesModal.modalView}>
                  <View style={{display: "flex", flexDirection: "row", gap: 20, alignItems: "flex-end"}}>
                    <Text style={{marginBottom: 10, fontSize: 24}}>Exercises</Text>
                    <Pressable
                      style={[stylesModal.button, stylesModal.buttonClose]}
                      onPress={() => setModalVisible(!modalVisible)}>
                      <Text style={stylesModal.textStyle}>Hide Modal</Text>
                    </Pressable>
                  </View>
                  <View style={{display: "flex", gap: 16, marginTop: 32}}>
                  {exercises.map((e, i) => {
                    const n = i + 1;
                    const textReps = e.repetitionType === "time" ? formatClockDuration({duration: e.time as Duration ?? "0s", step: "0s"}) : `${e.sets}x${e.reps}`;
                    return (
                      <Pressable key={e.id} style={{ flexDirection: "row", gap: 4 }} onPress={() => selectExerciseAndClose(i)}>
                        <View key={e.id} style={{ flexDirection: "row", gap: 7, backgroundColor: "#082f49", padding: 12, borderRadius: 12 }}>
                          <Text style={{color: "#f0f9ff", fontSize: 16}}>{n}.</Text>
                          <Text style={{color: "#f0f9ff", fontSize: 16}}>{e.name}</Text>
                          <Text style={{color: "#f0f9ff", fontSize: 16}}>{textReps}</Text>
                        </View>
                      </Pressable>
                    )
                  })}
                  </View>
                </View>
              </View>
            </ScrollView>
      </Modal>

    </View>
    </>
  )
};

export const FinishWorkout: React.FC<{program: FinishWorkoutType, navigate: () => void}> = ({ program, navigate }) => {
  const parentSize = { height: 400, width: Dimensions.get("window").width - 40 };
  const rotation = useAnimatedValue(30);
  const confettiRef = useRef<ConfettiCannon>(null);
  const [countDown, setCountDown] = useState(5);
  const [workoutUpdated, setWorkoutUpdated] = useState(false);

  useEffect(() => {
    databaseMethods.addFitnessClientWorkout(program).finally(() => setWorkoutUpdated(true));
  }, [program]);

  useEffect(() => {
    if (countDown > 0) {
      const interval = setInterval(() => setCountDown(count => count - 1), 1000);
      return () => clearInterval(interval);
    } else if (workoutUpdated) {
      navigate();
    }
  }, [countDown, workoutUpdated, navigate]);

  useEffect(() => {
    Animated.timing(rotation, {
      toValue: 10, duration: 1000, useNativeDriver: true, easing: Easing.inOut(Easing.ease), delay: 500,
    }).start(() => confettiRef.current?.start());
  }, []);

  const rotationInterpolate = rotation.interpolate({ inputRange: [0, 30], outputRange: ['0deg', '30deg'] });

  return (
    <View style={{ backgroundColor: "#f0f9ff", height: Dimensions.get("screen").height, alignItems: "center", justifyContent: "center" }}>
      <View style={{ backgroundColor: "white", borderRadius: 24, padding: 24, position: "relative", ...parentSize }}>
        <Text style={{ fontSize: 50, fontWeight: "bold", color: "#075985" }}>
          {"You've reached the finish line! Great workout!"}
        </Text>
        <Animated.View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, alignItems: "center", justifyContent: "center", transform: [{ rotate: rotationInterpolate }], zIndex: -1 }}>
          <MaterialCommunityIcons name="arm-flex" size={200} color="#bae6fd" style={{ opacity: 0.7 }} />
        </Animated.View>
        <ConfettiCannon count={50} origin={{ x: -10, y: 0 }} ref={confettiRef} />
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#075985" }}>
          {`Congratulations! Let's move to your workout history. 😊 [${countDown}]`}
        </Text>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
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

export const stylesOnWorkOut = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f9ff',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 10,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "#082f49",
  },
  description: {
    fontSize: 18,
    marginBottom: 20,
    color: "#082f49"
  },
  timerContainer: {
    alignItems: 'center',
    display: 'flex',
    gap: 10,
  },
  sets: {
    fontSize: 16,
    marginBottom: 10,
    color: "#082f49"
  },
  timer: {
    width: 170,
    height: 170,
    borderRadius: 170/2,
    backgroundColor: '#075985',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  timerTextWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    width: '100%',
  },
  timerContent: {
    width: 100,
    height: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 32,
    color: '#f0f9ff',
    fontWeight: 'bold',
  },
  timerTextSmall: {
    fontSize: 16,
    color: '#f0f9ff',
    fontWeight: '500',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    alignItems: 'center',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
  },
  setContent: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

const stylesModal = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});


export default RenderProgramTrack;