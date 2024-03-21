import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";

import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { RootStackParamList } from "../../../App";
import { useAuth } from "../../../Components/ContextComopnents/AuthContext";
import { useQuery } from "react-query";
import databaseMethods from "../../../services/databaseMethods";
import { Duration, calculateDuration, durationToMin, formatDateTimeRange } from "../../../types";
import { FinishWorkoutType } from "../../../Components/ProgramViewTrack";

type Props = NativeStackScreenProps<RootStackParamList, 'ClientWorkouts'>;

const ClientWorkouts: React.FC<Props> = () => {
    const u = useAuth();
    if (!u.user || u?.data?.role !== "client") return <Text>User is not logged in</Text>;
    const { data: workouts, error, isLoading } = useQuery(
        ['workouts', u.user.uid], 
        () => databaseMethods.getUserClientWorkouts(u.user.uid), 
        { refetchOnWindowFocus: true, refetchOnMount: true, cacheTime: 0, staleTime: 0 }
    );

    if (isLoading) return <View style={{padding: 16, display: "flex", gap: 24, backgroundColor: "#172554", height: Dimensions.get("window").height}}><Text>Loading...</Text></View>;
    if (error && error instanceof Error) return <View><Text>An error occurred: {error.message}</Text></View>;

    const calcScore = (workout: FinishWorkoutType) => {
        const completedExercises = workout?.completedExercises?.length ?? 0; // Fallback to 0 if undefined
        const totalExercises = workout?.exercises?.length ?? 0;
        const workoutDuration = calculateDuration(workout?.startTime, workout?.endTime);
        const goalDuration = durationToMin(workout?.duration as Duration);
        
        // Calculate scores, ensuring no division by zero
        const durationScore = goalDuration > 0 ? (workoutDuration / goalDuration) * 100 : 0;
        const exerciseScore = totalExercises > 0 ? (completedExercises / totalExercises) * 100 : 0;
    
        // Weights
        const weightedDurationScore = durationScore * 0.3; 
        const weightedExerciseScore = exerciseScore * 0.7;
    
        // Calculate final score
        const finalScore = Math.ceil(weightedDurationScore + weightedExerciseScore);
        return finalScore;
    };
      
    return (
        <ScrollView>
            <View style={{padding: 16, display: "flex", gap: 24, backgroundColor: "#172554", height: Dimensions.get("window").height}}>
            {workouts?.map((workout, index) => {
                const newWorkoutToDay = new Date(workout.startTime).toDateString() === new Date().toDateString();
                console.log(newWorkoutToDay)
                return (
                    <View key={index} style={[newWorkoutToDay ? stylesNew.cardContainer : styles.cardContainer]}>
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
                            <Text style={[newWorkoutToDay ? stylesNew.durationText : styles.durationText]}>Actual Duration: {calculateDuration(workout.startTime, workout.endTime).toPrecision(1)}  Minutes</Text>
                            <Text style={[newWorkoutToDay ? stylesNew.durationText : styles.durationText]}>Goal Duration: {parseFloat(workout?.duration) * 60} Minutes</Text>
                        </View>
                    </View>
                    </View>
                )
            })}
            </View>
        </ScrollView>
      );
    };

const styles = StyleSheet.create({
    cardContainer: {
      backgroundColor: '#f0f9ff',
      borderRadius: 20,
      padding: 16,
      shadowColor: '#172554',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    warpContainer: {
      backgroundColor: '#f0f9ff',
      borderRadius: 8,
      padding: 16,
      borderColor: '#6ee7b7',
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