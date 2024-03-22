import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import { RootStackParamList } from "../../../App";
import { useAuth } from "../../../Components/ContextComopnents/AuthContext";
import ClientView from "../../../Components/ClientView";
import databaseMethods from "../../../services/databaseMethods";
import { useQuery } from "react-query";
import ClientWorkoutView from "../../../Components/ClientWorkoutView";

type Props = NativeStackScreenProps<RootStackParamList, 'TrainerClient'>;

const TrainerClient: React.FC<Props> = ({ navigation, route: { params: {id}} }) => {
    const auth = useAuth();
    if (!auth.user || auth.data.role !== "trainer") return <View></View>;
    const { data: workouts, error, isLoading } = useQuery(
        ['workouts', id], 
        () => databaseMethods.getUserClientWorkouts(id),
    );
    const c = auth.data.clients.find((c) => c.userId! === id);
    console.log(workouts)
    return <>
    <ClientView client={c} />
    <ClientWorkoutView workouts={workouts} />
    </>;
}

export default TrainerClient;


