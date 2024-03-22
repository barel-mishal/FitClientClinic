import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { OutputClientProperties } from "../types";


import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign, Entypo, FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, "TrainerClients", undefined>;
    client: OutputClientProperties
}

// const TrainerClientCard: React.FC<Props> = ({ navigation, client }) => {
//     return (
//         <TouchableOpacity onPress={() => { navigation.navigate("TrainerClient", {id: client?.userId as string})} }>
//             {/* Redesign this page */}
//             <View style={styles.programCard}>
//                 {/* 
//                 ציון מתאמן,
//                  תוכנית שלו לראות אותה,
//                  מטרות ויעדים,
//                  זמן אימון ממוצע,
//                  פרטי התקשרות, אפשרות למחוק משתמש,
//                  לערוך תוכנית על ידי לעשות אחת חדשה ,
//                  BMI, 
//                 גיל,
//                 */}
                
//                 <View style={styles.headerRow}>
//                     <View style={styles.titleContainer}>
//                         <View style={{display: "flex", flexDirection: "row-reverse", alignItems: "center", gap: 2}}>
//                             <Text style={styles.styleName}>{client?.name}</Text>
//                             <AntDesign name="user" size={24} color="#082F49" />
//                         </View>
//                         <Text style={styles.trainerName}>{client?.email}</Text>
//                         <AntDesign name="contacts" size={24} color="#082F49" />
//                     </View>
//                     <TouchableOpacity onPress={() => {console.log("menu")}}>
//                         <Entypo name="dots-three-horizontal" size={24} color="#082F49" />
//                     </TouchableOpacity>
//                 </View>
//                 <View>
//                     <View style={styles.descriptionRow}>
//                         <Text style={styles.descriptionLabel}>Description:</Text>
//                         <View style={styles.durationContainer}>
//                             <Entypo name="time-slot" size={16} color="#082F49" />
//                             <Text style={styles.duration}>~{client?.gender}m</Text>
//                         </View>
//                     </View>
//                     <Text style={styles.descriptionText}>{client?.goals?.[0]}</Text>
//                 </View>
//             </View>
//         </TouchableOpacity>
//     );
// }


const TrainerClientCard: React.FC<Props> = ({ navigation }) => {
    const client = {
        name: "John Doe",
        email: "barel@mail.com",
        phone: "054-1234567",
        score: 9,
        description: "I am a beginner",
        currentFitnessProgramPlanName: "Weight Loss",
        avgWorkoutDuration: 30,
        numberOfWorkout: 10, 
        userId: "123"
    }

    return (
        <TouchableOpacity onPress={() => navigation.navigate("TrainerClient", {id: client.userId})}>
            <View style={styles.programCard}>
                <View style={styles.headerRow}>
                    <Text style={styles.clientName}>
                        <AntDesign name="user" size={24} color="black" /> {client.name}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, display: "flex" }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                            <MaterialIcons name="email" size={20} color="black" />
                            <Text style={styles.clientContact}>
                                {client.email}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                            <MaterialIcons name="phone" size={20} color="black" />
                            <Text style={styles.clientContact}>
                                {client.phone}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.detailsRow}>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
                        <FontAwesome name="heartbeat" size={20} color="black" />
                        <Text style={styles.clientDetails}>
                            Workout Score: {client.score}/10
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
                        <MaterialCommunityIcons name="script-text-outline" size={20} color="black" />
                        <Text style={styles.clientDetails}>
                            {client.description}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
                        <AntDesign name="staro" size={20} color="black" />
                        <Text style={styles.clientDetails}>
                            Current Program: {client.currentFitnessProgramPlanName}
                        </Text>
                    </View>
                </View>

                <View style={styles.statsRow}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <Entypo name="stopwatch" size={20} color="black" />
                        <Text style={styles.clientStats}>
                            Avg workout Duration: {client.avgWorkoutDuration} mins
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <MaterialIcons name="fitness-center" size={20} color="black" />
                        <Text style={styles.clientStats}>
                            Workouts: {client.numberOfWorkout}
                        </Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.updateButton} onPress={() => { /* Implement update functionality */ }}>
                    <MaterialIcons name="update" size={20} color="white" />
                    <Text style={styles.updateButtonText}>
                        Update Program
                    </Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};


const COLORS = {
    primary: '#082f49', // Deep blue color for text and icons
    secondary: '#4CAF50', // Green color for buttons and highlights
    background: '#f0f9ff', // Light blue for card background
    text: '#082F49', // Primary text color
  };
  
  const SPACING = {
    small: 8,
    medium: 16,
    large: 24,
  };
  
  const FONTS: StyleSheet.NamedStyles<any> = {
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    text: {
      fontSize: 16,
    },
    button: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  };
  
  const styles = StyleSheet.create({
    programCard: {
      backgroundColor: COLORS.background,
      padding: SPACING.medium,
      borderRadius: 20,
      shadowColor: '#082f49',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      display: 'flex',
        flexDirection: 'column',
        gap: 16,
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    headerRow: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: SPACING.medium,
      alignItems: 'center',
      marginBottom: SPACING.small,
    },
    clientName: {
      ...FONTS.title,
      color: COLORS.text,
      flexDirection: 'row',
      alignItems: 'center',
    },
    clientContact: {
      ...FONTS.text,
      color: COLORS.text,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: SPACING.small,
    },
    detailsRow: {
      marginTop: SPACING.small,
    },
    clientDetails: {
      ...FONTS.text,
      color: COLORS.text,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: SPACING.small,
    },
    statsRow: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: SPACING.small,
      marginTop: SPACING.small,
    },
    clientStats: {
      ...FONTS.text,
      color: COLORS.text,
      flexDirection: 'row',
      alignItems: 'center',
    },
    updateButton: {
      backgroundColor: COLORS.secondary,
      padding: SPACING.small,
      borderRadius: 10,
      flexDirection: 'row',
      gap: SPACING.small,
      marginTop: SPACING.medium,
      alignItems: 'center',
      justifyContent: 'center',
    },
    updateButtonText: {
      ...FONTS.button,
      color: '#fff',
    },
  });
  
export default TrainerClientCard;


