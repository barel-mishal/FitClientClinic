import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import {  calcScore, calculateDuration,  formatDateTimeRange } from "../types";
import { FinishWorkoutType } from "./ProgramViewTrack";
import { FontAwesome } from "@expo/vector-icons";
import databaseMethods from "../services/databaseMethods";

interface Props  {
    workouts: FinishWorkoutType[] | undefined
};

const ClientWorkouts: React.FC<Props> = ({workouts}) => {

    const sortingWorkouts = (a: FinishWorkoutType, b: FinishWorkoutType) => {
        return new Date(b.startTime).getTime() - new Date(a.startTime).getTime();
    };

    workouts?.sort(sortingWorkouts);
    
    return (
        <ScrollView style={{backgroundColor: "#f0f9ff", }}>
            <View style={{padding: 16, display: "flex", gap: 24}}>
            {workouts?.map((workout, index) => 
            <RenderWorkout workout={workout} index={index} />)}
            </View>
        </ScrollView>
      );
    };

export const RenderWorkout: React.FC<{workout: FinishWorkoutType, index: number}> = ({workout, index}) => {
  const newWorkoutToDay = new Date(workout.startTime).toDateString() === new Date().toDateString();
  return (
      <View key={index} style={[newWorkoutToDay ? stylesNew.cardContainer : styles.cardContainer]}>
          {newWorkoutToDay && <View style={{position: "absolute", backgroundColor: "#fb923c", padding: 8, borderRadius: 10, right: -6, top: -6}}><Text style={{color: "#431407", fontSize: 16}}>New</Text></View>}
          <View style={[newWorkoutToDay ? stylesNew.timeContainer : styles.timeContainer]}>
              <Text style={styles.timeText}>{formatDateTimeRange(workout.startTime, workout.endTime)}</Text>
          </View>
      {workout?.name && <Text style={[newWorkoutToDay ? stylesNew.cardTitle : styles.cardTitle]}>
          {workout.name}
          </Text>}
      {/* score */}
      <Text style={[newWorkoutToDay ? stylesNew.scoreText : styles.scoreText]}>
          Score: {calcScore(workout)}</Text>
      <View style={[{display: "flex", gap: 20}]}>
          <View style={[newWorkoutToDay ? stylesNew.progressBarContainer : styles.progressBarContainer]}>
              <View style={[newWorkoutToDay ? stylesNew.progressBar : styles.progressBar, { width: `${calcScore(workout)}%` }]}>

              </View>
          </View>
          {/* how much exercises completed */}
          <View style={[newWorkoutToDay ? stylesNew.warpContainer : styles.warpContainer]} >
              <Text style={[newWorkoutToDay ? stylesNew.cardTitle : styles.cardTitle]}>
                  Evaluation metrics</Text>
              <Text style={[newWorkoutToDay ? stylesNew.exercisesText : styles.exercisesText]}>
                  Exercises completed: {workout?.completedExercises?.length}</Text>
              <Text style={[newWorkoutToDay ? stylesNew.exercisesText : styles.exercisesText]}>Total Exercises: {workout?.exercises?.length}</Text>
              <Text style={[newWorkoutToDay ? stylesNew.durationText : styles.durationText]}>Actual Duration: {calculateDuration(workout.startTime, workout.endTime).toFixed(2)}  Minutes</Text>
              <Text style={[newWorkoutToDay ? stylesNew.durationText : styles.durationText]}>Goal Duration: {parseFloat(workout?.duration) * 60} Minutes</Text>
          </View>
      </View>
      <Pressable onPress={() => databaseMethods.deleteWorkout(workout.id)} style={{padding: 12, display: "flex", alignItems: "center", justifyContent: "center"}}>
        <FontAwesome name="trash-o" size={24} color={"#ef4444"}  />
      </Pressable>
      </View>
  )
}


const styles = StyleSheet.create({
    cardContainer: {
      backgroundColor: '#f0f9ff',
      borderRadius: 20,
      padding: 16,
      paddingBottom: 0,
      borderColor: 'rgba(2, 44, 34, 0.2)',
      borderWidth: 0.3,
      elevation: 3,
    },
    warpContainer: {
      backgroundColor: '#f0f9ff',
      borderRadius: 8,
      padding: 16,
      borderColor: 'rgba(2, 44, 34, 0.2)',
      borderWidth: 0.3,
      elevation: 3,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
      color: '#172554',
    },
    scoreText: {
      fontSize: 16,
      color: '#059669',
      fontWeight: '500',
    },
    exercisesText: {
      fontSize: 14,
      color: '#155e75',
    },
    progressBarContainer: {
      height: 20,
      backgroundColor: "rgba(2, 44, 34, 0.2)",
      borderRadius: 10,
      marginTop: 8,
    },
    progressBar: {
      height: '100%',
      borderRadius: 10,
      backgroundColor: '#059669',
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
      },
      timeText: {
        fontSize: 12,
        color: '#0284c7',
      },
      durationText: {
        fontSize: 14,
        color: '#155e75',
      },
  });

// Styles for the new workout using different colors the base color is #22c55e
const stylesNew = StyleSheet.create({
    cardContainer: {
      backgroundColor: '#f0f9ff', // Light blue, kept for contrast
      borderRadius: 20,
      padding: 16,
      shadowColor: '#172554', // Deep blue for shadow
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    warpContainer: {
      backgroundColor: '#f0f9ff', // Light blue, kept for contrast
      borderRadius: 8,
      padding: 16,
      borderColor: '#22c55e', // Base green as border color
      borderWidth: 0.3,
      elevation: 3,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
      color: '#172554', // Deep blue, for contrast and legibility
    },
    scoreText: {
      fontSize: 16,
      color: '#22c55e', // Base green for text
      fontWeight: '500',
    },
    exercisesText: {
      fontSize: 14,
      color: '#16a34a', // A darker shade of green for contrast
    },
    progressBarContainer: {
      height: 20,
      backgroundColor: "rgba(34, 197, 94, 0.2)", // Lighter shade of base green for background
      borderRadius: 10,
      marginTop: 8,
    },
    progressBar: {
      height: '100%',
      borderRadius: 10,
      backgroundColor: '#22c55e', // Base green for progress bar
    },
    timeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    timeText: {
      fontSize: 12,
      color: '#15803d', // Darker green for good readability
    },
    durationText: {
      fontSize: 14,
      color: '#16a34a', // A different shade of green for variation
    },
  });
  
export default ClientWorkouts;