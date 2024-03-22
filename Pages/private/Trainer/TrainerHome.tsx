import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";

import { View, Text, Button, TouchableOpacity, ScrollView } from "react-native";
import { RootStackParamList } from "../../../App";
import databaseMethods from "../../../services/databaseMethods";
import CardWrapper from "../../../Components/CardWrap";
import styles from "../Both/StyleHome";
import { useAuth } from "../../../Components/ContextComopnents/AuthContext";
import { isUserLoggedIn } from "../../../types";
import { firstCharUpperCase } from "./TrainerPrograms";


type Props = NativeStackScreenProps<RootStackParamList, 'TrainerHome'>;

const TrainerHome: React.FC<Props> = ({ navigation }) => {
    const userSchema = useAuth();

    if (!isUserLoggedIn(userSchema)) {
        return <Text>User is not logged in</Text>;
    }

    const { data } = userSchema;


    return (
        <ScrollView>

        <View style={{...styles.container, padding: 16}}>
            <Text style={styles.title}>Wolcome Coach {firstCharUpperCase(data?.name)}</Text>
            <CardWrapper styleOption={{}}>
                <TouchableOpacity style={styles.gap2} onPress={() => navigation.navigate('TrainerClients')}>
                    <Text style={styles.title2}>Clients</Text>
                    <Text>
                        View your clients and create new ones
                    </Text>
                </TouchableOpacity>
            </CardWrapper>
            <CardWrapper styleOption={{}}>
                <TouchableOpacity style={styles.gap2} onPress={() => navigation.navigate('TrainerCreateProgram')}>
                    <Text style={styles.title2}>Create Program</Text>
                    <Text>
                        Create a new program for your clients
                    </Text>
                </TouchableOpacity>
            </CardWrapper>
            <CardWrapper styleOption={{}}>
                <TouchableOpacity style={styles.gap2} onPress={() => navigation.navigate('TrainerPrograms')}>
                    <Text style={styles.title2}>Your Programs</Text>
                    <Text>
                        View your programs and create new ones
                    </Text>
                </TouchableOpacity>
            </CardWrapper>
            <CardWrapper styleOption={{}}>
                <TouchableOpacity style={styles.gap2} onPress={() => navigation.navigate('TrainerAppointments')}>
                    <Text style={styles.title2}>Appointments</Text>
                    <Text>
                        View your appointments and create new ones
                    </Text>
                </TouchableOpacity>
            </CardWrapper>

            <CardWrapper styleOption={{justifyContent: "space-evenly", backgroundColor: "transparent"}}>
                <TouchableOpacity style={styles.gap2} onPress={() => {
                    userSchema.signOut();
                }}>
                    <Text style={styles.alertText}>Log Out</Text>
                </TouchableOpacity>
            </CardWrapper>        
        </View>
        </ScrollView>
    );
}

export default TrainerHome;