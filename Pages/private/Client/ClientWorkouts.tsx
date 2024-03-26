import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";

import { RootStackParamList } from "../../../App";
import { useAuth } from "../../../Components/ContextComopnents/AuthContext";
import ViewWorkoutsComp from "../../../Components/ViewWorkoutsComp";
import { Dimensions, Text, View } from "react-native";
import { useQuery } from "react-query";
import databaseMethods from "../../../services/databaseMethods";

type Props = NativeStackScreenProps<RootStackParamList, 'ClientWorkouts'>;

const ClientWorkouts: React.FC<Props> = () => {
    const u = useAuth();
    if (!u.user || u?.data?.role !== "client") return <Text>User is not logged in</Text>;
        const { data: workouts, error, isLoading } = useQuery(
        ['workouts', u.user.uid], 
        () => databaseMethods.getUserClientWorkouts(u.user.uid!), 
        { refetchOnWindowFocus: true, refetchOnMount: true, cacheTime: 0, staleTime: 0 }
    );
    if (isLoading) return <View style={{padding: 16, display: "flex", gap: 24, backgroundColor: "#172554", height: Dimensions.get("window").height}}><Text>Loading...</Text></View>;
    if (error && error instanceof Error) return <View><Text>An error occurred: {error.message}</Text></View>;
    return <ViewWorkoutsComp workouts={workouts} />;
}

export default ClientWorkouts;