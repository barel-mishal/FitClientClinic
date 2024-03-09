import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { useNavigation } from '@react-navigation/native';

function Header() {
    const navigation = useNavigation() as { navigate: (arg0: string) => void };
    
    return <View style={styles.header}>
        <Text style={styles.headerText}>Fit Client Clinic</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}><Text>login</Text></TouchableOpacity>
    </View>    
  }

const styles = StyleSheet.create({
    header: {
        backgroundColor: "white",
        height: 60,
        justifyContent: "space-between",
        alignItems: "flex-end",
        flexDirection: "row",
        paddingHorizontal: 5
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold"
    }
})
export default Header;

  