import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import { RootStackParamList } from "../../../App";
import { useAuth } from "../../../Components/ContextComopnents/AuthContext";
import databaseMethods from "../../../services/databaseMethods";
import RenderProgram from "../../../Components/ProgramView";
import { FitnessProgramOutput } from "../../../types";

type Props = NativeStackScreenProps<RootStackParamList, 'TrainerProgram'>;

const TrainerProgram: React.FC<Props> = ({ navigation, route: { params: {id}} }) => {
    const auth = useAuth();
    if (!auth.user || auth.data.role !== "trainer") return <View></View>;
    const p = auth.data.programs.filter((p) => p.id! === id);
    
    return <RenderProgram program={p[0] as FitnessProgramOutput} />;
}



export default TrainerProgram;


