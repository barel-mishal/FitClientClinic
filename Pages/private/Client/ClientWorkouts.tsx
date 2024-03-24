import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";

import { RootStackParamList } from "../../../App";
import { useAuth } from "../../../Components/ContextComopnents/AuthContext";
import ViewWorkoutsComp from "../../../Components/ViewWorkoutsComp";
import { Text } from "react-native";

type Props = NativeStackScreenProps<RootStackParamList, 'ClientWorkouts'>;

const ClientWorkouts: React.FC<Props> = () => {
    const u = useAuth();
    if (!u.user || u?.data?.role !== "client") return <Text>User is not logged in</Text>;
    return <ViewWorkoutsComp id={u.user.uid}  />;
}

export default ClientWorkouts;