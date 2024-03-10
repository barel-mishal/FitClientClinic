import React, { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { UserSchema } from '../../types';
import databaseMethods, { ReturnUserProerties } from '../../services/databaseMethods';


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
                .getUserProperties(user.uid)
                .then((profile) => {

                    setProfile(profile);
                    setCurrentUser(user);
                
                })
                .finally(() => {
                    setLoading(false);
            });
            
        });

        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={(currentUser && profile) ? { user: currentUser, data: profile } : { user: null }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;