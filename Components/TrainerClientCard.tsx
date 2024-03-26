import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { OutputClientProperties, calcBMI } from "../types";


import { View, Text, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import { AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useAuth } from "./ContextComopnents/AuthContext";

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, "TrainerClients", undefined>;
    client: OutputClientProperties
}

const TrainerClientCard: React.FC<Props> = ({ navigation, client }) => {
  const auth = useAuth()
  // TODO: HOME PAGE DEISGN START WITHSOMETHING COOL 
  // TODO: CHANGE THE NAME TO MOVE
  // TODO: EDIT PROGRAMS
  // todo: add search functionality for exercises
  // todo: exercise images upload and view
  // todo: add indication for submit in client properties
  // todo: link to google site in create program
  // todo: udpating the new program in the list of trianer after finish creating the program
  // todo: view trainer certificate and edit it user can view it also. 
  // todo: TOFES CLOSE BUTTON FIX
  // todo: when updating the properties of the client the currentProgram should be kept
  // todo: CLIENT PROPERTIES DEISGN BRITHDATE AND FILES UPLOADS
    return (
        <TouchableOpacity onPress={() => navigation.navigate("TrainerClient", {id: client?.userId ?? ""})}>
            <View style={styles.programCard}>
                <View style={styles.headerRow}>
                  <View style={{ flexDirection: 'row', display: "flex", alignItems: 'center', gap: 8 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flexGrow: 1 }}>
                      {/* Name */}
                      <AntDesign name="user" size={24} color="#082f49" />
                      <Text style={styles.clientName}>
                          {client?.name}
                      </Text>
                    </View>
                    <View>
                      <Pressable onPress={() => { (client.clientId && auth.user) && auth.deleteTrainerClient(client.clientId) }}>
                          <AntDesign name="delete" size={16} color="#f43f5e" />
                      </Pressable>
                    </View>
                </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, display: "flex" }}>
                        {/* Email */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                            <MaterialIcons name="email" size={20} color="#082f49" />
                            <Text style={styles.clientContact}>
                                {client.email}
                            </Text>
                        </View>
                        {/* Phone */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                            <MaterialIcons name="phone" size={20} color="#082f49" />
                            <Text style={styles.clientContact}>
                                {client.phone}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.detailsRow}>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
                        <MaterialCommunityIcons name="script-text-outline" size={20} color="#082f49" />
                        <Text style={styles.clientDetails}>
                            {client?.age ?? ""} years old
                        </Text>
                    </View>
                    {client?.age && (client?.age >= 18) && <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
                        <Ionicons name="ios-body-outline" size={20} color="#082f49" />
                        <Text style={styles.clientDetails}>
                          BMI: {calcBMI(client?.weight ?? 0, client?.height ?? 1)}
                        </Text>
                    </View>}                    
                </View>

                <TouchableOpacity style={styles.updateButton} onPress={() => {
                  navigation.navigate("TrainerCreateProgram")
                }}>
                    <MaterialIcons name="update" size={20} color="white" />
                    <Text style={styles.updateButtonText}>
                        New Program
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
      fontSize: 30,
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
      alignItems: 'flex-start',
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


