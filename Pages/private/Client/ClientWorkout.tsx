import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";

import { Text, StyleSheet } from "react-native";
import { RootStackParamList } from "../../../App";
import databaseMethods from "../../../services/databaseMethods";
import RenderProgramTrack, { ProgramState } from "../../../Components/ProgramViewTrack";
import { useAuth } from "../../../Components/ContextComopnents/AuthContext";


export type PropsClientWorkout = NativeStackScreenProps<RootStackParamList, 'ClientWorkout'>;



type ComponentState = {
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

const ClientWorkout: React.FC<PropsClientWorkout> = ({navigation, route: {params: {programId, trainerId}}}) => {
    const u = useAuth();
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
            setProgram({
                data: {
                    ...res,
                    state: "start",
                    workoutTime: "1s",
                    completedExercises: [] as string[],
                    message: "You have completed the program",
                    userId: u?.user?.uid,
                } as ProgramState,
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
        });
    }, []);
    return (
        <>
            {program?.state === "loading" && <Text>Loading...</Text>}
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
    },
});

export default ClientWorkout;