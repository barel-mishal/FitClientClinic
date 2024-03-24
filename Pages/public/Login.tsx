import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from "react-native"
import databaseMethods from "../../services/databaseMethods";
import { AntDesign } from "@expo/vector-icons";

const init = {
    trainer: {
        email: "barel.trianer@mail.com",
        password: "Google",
    },
    client: {
        email: "mishal.barel@mail.com",
        password: "google",
    }
}

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [message, setMessage] = useState<string | undefined>(undefined);
    const login = async () => setMessage(await databaseMethods.login(email, password));
    const isExampleClient = init.client.email === email;
    const isExampleTrainer = init.trainer.email === email;
    const onSelectedClientExampleStyle = isExampleClient ? {...styles.buttonLight, borderWidth: 0} : styles.button;
    const onSelectedClientExampleTextStyle = isExampleClient ? styles.buttonTextLight : styles.buttonText;
    const onSelectedTrainerExampleStyle = isExampleTrainer ? {...styles.buttonLight, borderWidth: 0} : styles.button;
    const onSelectedTrainerExampleTextStyle = isExampleTrainer ? styles.buttonTextLight : styles.buttonText;
    return (
        <View style={styles.container}>
            <View style={styles.stack}>
                <Text style={styles.title}>Move</Text>
                <Text style={styles.subTitle}>Connect With Your Fitness</Text>
            </View>
            <View style={styles.stackHorizontal}>
                <TouchableOpacity style={onSelectedTrainerExampleStyle} onPress={async () => {
                    setEmail(init.trainer.email);
                    setPassword(init.trainer.password);
                } }>
                    <View style={styles.horizantlView}>
                        <Text style={onSelectedTrainerExampleTextStyle}>Trainer Example</Text>
                        {isExampleTrainer && <AntDesign name="check" size={16} color="#0369a1" />}
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={onSelectedClientExampleStyle} onPress={async () => {
                    setEmail(init.client.email);
                    setPassword(init.client.password);
                } }>
                    <View style={styles.horizantlView}>
                        <Text style={onSelectedClientExampleTextStyle}>Client Example</Text>
                        {isExampleClient && <AntDesign name="check" size={16} color="#0369a1" />}
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.stack}>
                <TextInput style={styles.inputStyle} value={email} onChangeText={(t) => setEmail(t)} />
                <TextInput style={styles.inputStyle} secureTextEntry value={password} onChangeText={(t) => setPassword(t)} />
            </View>

            <View style={styles.stack}>
            <TouchableOpacity 
            style={styles.button}
            onPress={async () => setMessage(await databaseMethods.login(email, password))}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <Text style={styles.message}>{message}</Text>
            </View>

        </View>
    )
}

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f0f9ff",
        height: Dimensions.get("window").height,
    },
    message: {
        color: "red",
        height: 60,
    },
    button: {
        backgroundColor: "#0c4a6e",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderColor: "#082f49",
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 8,
        alignSelf: "baseline",
    },
    buttonText: {
        color: "#f0f9ff",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16
    },
    inputStyle: {
        borderColor: "#7dd3fc",
        borderStyle: "solid",
        borderWidth: 1,
        fontSize: 24,
        borderRadius: 8,
        padding: 12,
        fontWeight: "300"
    },
    stack: {
        marginVertical: 20,
        marginHorizontal: 16,
        display: "flex",
        gap: 16,
    },
    stackHorizontal: {
        display: "flex",
        flexDirection: "row",
        gap: 16,
        justifyContent: "space-around",
        marginVertical: 20,
    },
    horizantlView: {
        display: "flex",
        flexDirection: "row",
        gap: 8,
        justifyContent: "space-around",
        alignItems: "center",
    },
    buttonLight: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderColor: "#0369a1",
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 8,
        alignSelf: "baseline",
    },
    buttonTextLight: {
        color: "#0369a1",
        textAlign: "center",
        fontWeight: "300",
        fontSize: 16
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#0c4a6e",
    },
    subTitle: {
        fontSize: 24,
        fontWeight: "300",
        color: "#0c4a6e",
    }

})

export default Login
