import { Client, ClientForm, ClientRegisterForm, Profile, UserSchema } from '../types';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const databaseMethods = {
  login: async (email: string, string: string, password: string) => {
    // try {
    //   await auth.signInWithEmailAndPassword(email, password);
    //   console.log("User logged in successfully");
    //   // Navigate to your app's main screen here
    // } catch (error) {
    //   console.error("Login error: ", error);
    //   // Handle errors here, such as showing a notification to the user
    // }
  },

  register: async (form: ClientRegisterForm) => {
    const userCredential = auth()
    .createUserWithEmailAndPassword(form.email, form.password)
    .then(async (data) => {
        let user: FirebaseAuthTypes.User | null = data.user;
        firestore().collection('profile').doc(user.uid).set({
            name: form.name,
            role: form.role,
            email: form.email,
            phone: form.phone,
            trainerId: form?.trainerId,
            userId: user.uid,
        })
        .then(() => {})
        .catch((error) => {
            console.error("Error adding profile: ", error);
            auth().signOut();
            auth().currentUser?.delete().then(() => {
                console.log("User deleted");
            }).catch((error) => {
                console.error("Error deleting user: ", error);
            });
            user = null;
        });
        return user;
    })
    .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
        }
        console.error(error);
        return null
    });
    return userCredential;
  },

  getUsers: async (role: string, id: string) => {
    // try {
    //   const querySnapshot = await firestore.collection('users').where('role', '==', role).get();
    //   const users = [];
    //   querySnapshot.forEach((doc) => {
    //     if (doc.id === id) {
    //       users.push({ id: doc.id, ...doc.data() });
    //     }
    //   });
    //   console.log(users);
    //   return users;
    // } catch (error) {
    //   console.error("Error getting users: ", error);
    //   return [];
    // }
  },
}

export default databaseMethods;
