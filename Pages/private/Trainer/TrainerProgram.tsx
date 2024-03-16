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
    if (!auth.user) return <View></View>;
    const [program, setProgram] = React.useState<Required<FitnessProgramOutput>[]>(() => {
        const program: Required<FitnessProgramOutput>[] = [] as unknown as Required<FitnessProgramOutput>[];
        databaseMethods.getTrainerProgram(auth.user.uid, id).then((p) => {
            if (p) program.push(p);
            else return []
        });
        return program;
    });
    if (program.length === 0) return <View></View>;

    
    return <RenderProgram program={program[0]} />
}



export default TrainerProgram;


