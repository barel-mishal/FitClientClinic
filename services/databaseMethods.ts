import { Client, ClientData, ClientRegisterForm, Profile, Role, UserSchema } from '../types';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const databaseMethods = {
  login: async (email: string, password: string) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      console.log("User logged in successfully");
      // Navigate app main screen here
    } catch (error) {
      console.error("Login error: ", error);
      // Handle errors here, such as showing a notification to the user
    }
  },

  register: async (form: ClientRegisterForm) => {
    try {
        const userCredential = await auth().createUserWithEmailAndPassword(form.email, form.password);
        const user = userCredential.user;
        
        // Separate profile creation into its own function for clarity.
        await createProfile(user, form);

        return user;
    } catch (error) {
        // Consolidate error handling
        handleRegistrationError(error);
        return null;
    }
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


async function createProfile(user: FirebaseAuthTypes.User, form: ClientRegisterForm) {
  try {
      await firestore().collection('profile').doc(user.uid).set({
          name: form.name,
          role: form.role,
          email: form.email,
          phone: form.phone,
          trainerId: form.trainerId,
          userId: user.uid,
      });
  } catch (error) {
      console.error("Error adding profile: ", error);
      // Separating user cleanup into its own function for clarity.
      await cleanupUser(user);
  }
}

async function cleanupUser(user: FirebaseAuthTypes.User) {
  try {
      await user.delete();
      console.log("User deleted");
  } catch (error) {
      console.error("Error deleting user: ", error);
  }
}

function handleRegistrationError(error: any) {
  if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
  } else if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
  } else {
      console.error(error);
  }
}

export default databaseMethods;
