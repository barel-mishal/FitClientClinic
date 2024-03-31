import React, { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { Dimensions, Text, View } from 'react-native';
import { ReturnUserProerties, type UserSchema } from '../../types';
import databaseMethods from '../../services/databaseMethods';

const AuthContext = createContext<UserSchema>({
    user: null
});
 
export const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<UserSchema['user'] | null>(null);
    const [profile, setProfile] = useState<ReturnUserProerties>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged((user) => {
            if (user) databaseMethods
                .getUserProperties(user?.uid)
                .then((profile) => {
                    setProfile(profile);
                    setCurrentUser(user);
                })
                .catch((error) => {console.error('error getting user properties', error);})
        });
        setLoading(false);
        return () => {
            unsubscribe();
        } 
    }, []);

    const signOut = () => {
        auth()
            .signOut()
            .then(() => {
                setCurrentUser(null);
            });
    };

    const deleteTrainerClient = (userId: string) => {
        if (!profile) return console.error("Profile is not defined");
        if (profile.role !== "trainer") return console.error("User is not a trainer");  
        databaseMethods.deleteTrainerClient(userId)
        .then(() => {
            console.log("User deleted successfully");
            setProfile((prev) => {
                if (!prev || prev.role !== "trainer") {
                    return prev;
                }
                const clients = prev.clients?.filter((c) => c.userId !== userId);
                return {...prev, clients}
            })
        })
        .catch((error) => {
            console.error("Error deleting user", error);
        })
    }


    return (
        <AuthContext.Provider value={(currentUser && profile) ? { user: currentUser, data: profile, signOut, deleteTrainerClient } : { user: null }}>
            {!loading ? children : <View style={{display: "flex", height: Dimensions.get("window").height, width: Dimensions.get("window").width, justifyContent: "center", alignItems: "center"}}><Text >loading...</Text></View>}
        </AuthContext.Provider>
    );
};

export default AuthProvider;