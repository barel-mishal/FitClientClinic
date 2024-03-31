import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from "react-native"
import databaseMethods from "../../services/databaseMethods";
import { AntDesign } from "@expo/vector-icons";
import Toast from 'react-native-toast-message'

const init = [{
    trainer: {
        email: "barel.trianer@mail.com",
        password: "123456",
    },
    client: {
        email: "barel.client@mail.com",
        password: "123456",
    }
},
{
    trainer: {
        email: "omri.trainer@mail.com",
        password: "123456",
    },
    client: {
        email: "shahar.client@mail.com",
        password: "123456",
    },
},
{
    trainer: {
        email: "eli.trainer@mail.com",
        password: "123456",
    },
    client: {
        email: "sagi.client",
        password: "123456",
    },
}

]

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const isExampleClient = init[0].client.email === email;
    const login = async () => {
        const message = await databaseMethods.login(email, password);
        if (message.includes("successfully")) {
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Success',
                text2: message,
                visibilityTime: 4000,
                autoHide: true,
            });
        } else {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Error',
                text2: message,
                visibilityTime: 4000,
                autoHide: true,
            });
        }
    };
    const isExampleTrainer = init[0].trainer.email === email;
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
                    setEmail(init[0].trainer.email);
                    setPassword(init[0].trainer.password);
                } }>
                    <View style={styles.horizantlView}>
                        <Text style={onSelectedTrainerExampleTextStyle}>Trainer Example</Text>
                        {isExampleTrainer && <AntDesign name="check" size={16} color="#0369a1" />}
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={onSelectedClientExampleStyle} onPress={async () => {
                    setEmail(init[0].client.email);
                    setPassword(init[0].client.password);
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
            onPress={login}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
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
