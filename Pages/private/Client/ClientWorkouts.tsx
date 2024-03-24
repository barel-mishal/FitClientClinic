import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";

import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { RootStackParamList } from "../../../App";
import { useAuth } from "../../../Components/ContextComopnents/AuthContext";
import { useQuery } from "react-query";
import databaseMethods from "../../../services/databaseMethods";
import { Duration, calculateDuration, durationToMin, formatDateTimeRange } from "../../../types";
import { FinishWorkoutType } from "../../../Components/ProgramViewTrack";
import ViewWorkoutsComp from "../../../Components/ViewWorkoutsComp";

type Props = NativeStackScreenProps<RootStackParamList, 'ClientWorkouts'>;

const ClientWorkouts: React.FC<Props> = () => {
    const u = useAuth();
    return <ViewWorkoutsComp user={u}  />;
}

export default ClientWorkouts;