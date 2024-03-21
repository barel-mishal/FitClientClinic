import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";

import { View, Text, StyleSheet, ScrollView } from "react-native";
import { RootStackParamList } from "../../../App";
import { useAuth } from "../../../Components/ContextComopnents/AuthContext";
import { useQuery } from "react-query";
import databaseMethods from "../../../services/databaseMethods";

type Props = NativeStackScreenProps<RootStackParamList, 'ClientWorkouts'>;

const ClientWorkouts: React.FC<Props> = () => {
    const u = useAuth();
    if (!u.user || u?.data?.role !== "client") return <Text>User is not logged in</Text>;
    const { data: workouts, error, isLoading } = useQuery(['workouts', u.user.uid], () => databaseMethods.getUserClientWorkouts(u.user.uid));

    if (isLoading) return <View><Text>Loading...</Text></View>;
    if (error && error instanceof Error) return <View><Text>An error occurred: {error.message}</Text></View>;

    const calcScore = (workout: any) => {
        const completedExercises = workout.completedExercises.length;
        const totalExercises = workout.exercises.length;
        return (completedExercises / totalExercises) * 100;
    }

    const calculateDuration = (start: string, end: string) => {
        // calculate the difference between the start and end time
        return 60;
    }
  
    return (
        <ScrollView>
            <View style={{padding: 16, display: "flex", gap: 24, backgroundColor: "#172554"}}>
            {workouts?.map((workout, index) => (
                <View key={index} style={styles.cardContainer}>
                    <View style={styles.timeContainer}>
                        <Text style={styles.timeText}>Start: 07:00 AM</Text>
                        <Text style={styles.timeText}>End: 08:00 AM</Text>
                    </View>
                {workout?.name && <Text style={styles.cardTitle}>{workout.name}</Text>}
                {/* score */}
                <Text style={styles.scoreText}>Score: {calcScore(workout)}</Text>
                <View style={{display: "flex", gap: 20}}>
                    <View style={styles.progressBarContainer}>
                        <View
                        style={[styles.progressBar, { width: `${calcScore(workout)}%` }]}
                        ></View>
                    </View>
                    {/* how much exercises completed */}
                    <View style={styles.warpContainer}>
                        <Text style={styles.scoreText}>Evaluation metrics</Text>
                        <Text style={styles.exercisesText}>Exercises completed: {workout?.completedExercises?.length}</Text>
                        <Text style={styles.exercisesText}>Total Exercises: {workout?.exercises?.length}</Text>
                        <Text style={styles.durationText}>Actual Duration: {calculateDuration('07:00 AM', '08:00 AM')}</Text>
                        <Text style={styles.durationText}>Goal Duration: {workout.duration}</Text>
                    </View>
                </View>
                {/*  */}
                </View>
            ))}
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
        marginBottom: 8, // space below the time container
      },
      timeText: {
        fontSize: 12,
        color: '#0284c7', // choose a color that matches your app theme
      },
      durationText: {
        fontSize: 14,
        color: '#155e75',
      },

    // ...other styles
  });

export default ClientWorkouts;