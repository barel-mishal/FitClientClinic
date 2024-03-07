import React, { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { Profile, UserAction, UserSchema } from '../../types';


const AuthContext = createContext<UserSchema>({
    user: null
});

export const useAuth = () => useContext(AuthContext);


const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<UserSchema['user'] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const profile: Profile = {
        id: '',
        name: '',
        email: '',
        phone: '',
        role: 'client',
        password: '',
        trainerId: ''
    }

    const userAction: UserAction = {
        deleteUser: (id: string) => { },
        updateUser: (id: string, user: UserSchema['user']) => { },
        addUser: (user: UserSchema['user']) => { },
        getUser: (id: string) => currentUser!,
        getUserProfile: (id: string) => profile,
        logout: () => auth().signOut(),
    }




    return (
        <AuthContext.Provider value={{ user: currentUser, profile, userAction }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;