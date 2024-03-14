import React, {  } from "react";

import { View, Text, StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import databaseMethods from "../../../services/databaseMethods";
import { useAuth } from "../../../Components/ContextComopnents/AuthContext";
import { isUserLoggedIn } from "../../../types";
import CardWrapper from "../../../Components/CardWrap";
import styles from "../Both/StyleHome";

type Props = NativeStackScreenProps<RootStackParamList, 'ClientHome'>;

const HomeClient: React.FC<Props> = ({ navigation }) => {
    const userSchema = useAuth();

    if (!isUserLoggedIn(userSchema)) {
        return <Text>User is not logged in</Text>;
    }

    // From this point on, TypeScript knows that userSchema is of type { user: User; profile: Profile }
    const { data } = userSchema;


    return (
            <View style={{...styles.container, padding: 16}}>
                <Text style={styles.title}>Wolcome {data?.name}</Text>
                <Text style={{fontSize: 20, color: "#082F49"}}>Where focus goes energy flows</Text>

                <CardWrapper styleOption={{backgroundColor: "#fdba74"}}>
                    <TouchableOpacity style={styles.gap2} onPress={() => navigation.navigate('ClientWorkouts')}>
                        <Text style={styles.title2}>START A WORKOUT</Text>
                        <Text>
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
            </View>
    );
}



export default HomeClient;