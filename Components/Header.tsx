import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { useNavigation } from '@react-navigation/native';

function Header() {
    const navigation = useNavigation() as { navigate: (arg0: string) => void };
    
    return <View style={styles.header}>
        <Text style={styles.headerText}>Move</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}><Text style={styles.loginText}>login</Text></TouchableOpacity>
    </View>    
  }

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#f0f9ff",
        height: 70,
        justifyContent: "space-between",
        alignItems: "flex-end",
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#082f49"
    },
    loginText: {
        fontSize: 20,
        color: "#082f49",
        fontWeight: "100",
        textDecorationLine: "underline"
    }
})
export default Header;

  