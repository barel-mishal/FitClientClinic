import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect } from "react";

import { Text, StyleSheet, View } from "react-native";
import { RootStackParamList } from "../App";
import databaseMethods from "../services/databaseMethods";
import RenderProgramTrack, { ProgramState } from "./ProgramViewTrack";
import LoadingComp from "./LoadingComp";

export type ComponentState = {
    data: null, 
    state: "loading", 
    error: null
} | {
    data: null, 
    state: "error", 
    error: {
        message: string
}} | {
    data: ProgramState, 
    state: "success", 
    error: null
};

interface UserProgramProps {
    programId: string;
    trainerId: string;
    userId: string;
    navigation: NativeStackNavigationProp<RootStackParamList, "ClientWorkout", undefined>
}

const UserProgarmStart: React.FC<UserProgramProps> = ({programId, trainerId, userId, navigation}) => {
    const [program, setProgram] = React.useState<ComponentState>();
    useEffect(() => {
        setProgram({
            data: null,
            state: "loading",
            error: null,
        });
        databaseMethods
        .getTrainerProgram(trainerId, programId)
        .then((res) => {
            const ps: Partial<ProgramState> = {
                ...res,
                state: "start",
                workoutTime: "1s",
                completedExercises: [] as string[],
                clientId: userId!,
                startTime: Date.now(),
            };
            setProgram({
                data: ps as ProgramState,
                state: "success",
                error: null,
            });
        })
        .catch((err) => {
            console.error(err);
            setProgram({
                data: null,
                state: "error",
                error: {message: "An error occured while fetching the program"},
            });
        }).finally(() => {;
    });
    }, []);

    return (
        <>
            {program?.state === "loading" && <View style={styles.container}><LoadingComp /></View>}
            {program?.state === "error" && <Text>{program.error?.message}</Text>}
            {program?.state === "success" && <RenderProgramTrack program={program.data} navigation={navigation} />}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f9ff",   
    },
});

export default UserProgarmStart;


