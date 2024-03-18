import React, {  } from "react";

import { View, Text, StyleSheet, TouchableOpacity, StyleProp, ViewStyle, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import databaseMethods from "../../../services/databaseMethods";
import { useAuth } from "../../../Components/ContextComopnents/AuthContext";
import { isUserLoggedIn } from "../../../types";
import CardWrapper from "../../../Components/CardWrap";
import styles from "../Both/StyleHome";
import Stack from "../../../Components/Stack";

type Props = NativeStackScreenProps<RootStackParamList, 'ClientHome'>;

const HomeClient: React.FC<Props> = ({ navigation }) => {
    const userSchema = useAuth();

    if (!isUserLoggedIn(userSchema)) {
        navigation.navigate('GetStarted');
        return <Text>User is not logged in</Text>;
    }

    const { data } = userSchema;

    const activeCardStyle = true ? "#fdba74" : "#fed7aa"

    return (
        <ScrollView>
                <View style={{backgroundColor: "#f0f9ff"}}>
                    <Stack>
                        <Text style={{...styles.title}}>Wolcome {data?.name}</Text>
                        <Text style={{fontSize: 20, color: "#0891b2", fontWeight: "bold"}}>Where focus goes energy flows</Text>
                    </Stack>
                    <Stack styleOption={{gap: 32}}>
                    <CardWrapper styleOption={{backgroundColor: "#fdba74", shadowColor: "#431407"}}>
                        <TouchableOpacity style={styles.gap2} onPress={() => navigation.navigate('ClientWorkouts')}>
                            <Text style={{...styles.title2, color: "#431407"}}>START A WORKOUT</Text>
                            <Text style={{color: "#431407"}}>
                                Start a new workout or continue an existing one
                            </Text>
                        </TouchableOpacity>
                    </CardWrapper>
                    
                    <CardWrapper>
                        <TouchableOpacity style={styles.gap2} onPress={() => navigation.navigate('ClientWorkouts')}>
                            <Text style={styles.title2}>Client Workouts</Text>
                            <Text>
                                View your workouts and create new ones as well as view your progress
                            </Text>
                        </TouchableOpacity>
                    </CardWrapper>

                    <CardWrapper>
                        <TouchableOpacity style={styles.gap2} onPress={() => navigation.navigate('ClientProperties')}>
                            <Text style={styles.title2}>Client Properties</Text>
                            <Text>
                                Update your personal information
                            </Text>
                        </TouchableOpacity>
                    </CardWrapper>

                    <CardWrapper styleOption={{justifyContent: "space-evenly", backgroundColor: "transparent"}}>
                        <TouchableOpacity style={styles.gap2} onPress={databaseMethods.logout}>
                            <Text style={styles.alertText}>Log Out</Text>
                        </TouchableOpacity>
                    </CardWrapper>
                    </Stack>
                </View>
        </ScrollView>
    );
}

// background: rgb(37,99,235);
// background: linear-gradient(45deg, rgba(37,99,235,1) 5%, rgba(234,88,12,1) 65%, rgba(21,128,61,1) 100%);


export default HomeClient;