import React, { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { InputClientProperties, UserSchema } from '../../types';
import databaseMethods from '../../services/databaseMethods';


const AuthContext = createContext<UserSchema>({
    user: null
});

export const useAuth = () => useContext(AuthContext);


const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<UserSchema['user'] | null>(null);
    const [profile, setProfile] = useState<InputClientProperties | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    console.log('AuthContext: ', {currentUser}, {profile});

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged((user) => {
            setCurrentUser(user);
            if (user) databaseMethods.getUserClientProperties(user.uid).then((profile) => {
                setProfile(profile);
            });
            
            setLoading(false);
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