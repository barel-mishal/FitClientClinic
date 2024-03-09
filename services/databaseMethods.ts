import { ClientProperties, TypeCientProfile, TypeClientPersonalFitnessInfo, TypeClientRegisterData, TypeTrainerRegisterData } from '../types';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import * as v from 'valibot';


const databaseMethods = {
  login,
  register: registerClient,
  getUsers: async (role: string, id: string) => {

  },
  getUserProfile,
  logout: userSignOut,
  addOrUpdateClientFitnessInfo,
  getUserClientProperties,
}

async function login(email: string, password: string) {
  try {
    await auth().signInWithEmailAndPassword(email, password);
    return "User logged in successfully";
    // Navigate app main screen here
  } catch (error) {
    console.error("Login error: ", error);
    return `
Make sure you entered the correct email and password.
Error logging in. Please try again. Did you sign up?
  `
    // Handle errors here, such as showing a notification to the user
  }
}


async function registerClient(form: TypeClientRegisterData) {
  try {
      const userCredential = await auth().createUserWithEmailAndPassword(form.email, form.password);
      const user = userCredential.user;
      
      await createProfile(user, form);

      return user;
  } catch (error) {
      handleRegistrationError(error);
      return null;
  }
}

async function createClienrProfile(user: FirebaseAuthTypes.User, form: TypeClientRegisterData) {
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

async function createTrainerProfile(user: FirebaseAuthTypes.User, form: TypeTrainerRegisterData) {
  try {
      await firestore().collection('profile').doc(user.uid).set({
          name: form.name,
          role: form.role,
          email: form.email,
          phone: form.phone,
          userId: user.uid,
      });
  } catch (error) {
      console.error("Error adding profile: ", error);
      // Separating user cleanup into its own function for clarity.
      await cleanupUser(user);
  }
}

function createProfile(user: FirebaseAuthTypes.User, form: TypeClientRegisterData | TypeTrainerRegisterData) {
  switch (form.role) {
      case "client":
          createClienrProfile(user, form);
          break;
      case "trainer":
          createTrainerProfile(user, form);
          break;
      default:
          console.error("Invalid role");
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


async function getUserProfile(uid: FirebaseAuthTypes.User["uid"]): Promise<TypeCientProfile | undefined> {
  try {
      // Reference to the user's profile document
      const docRef = firestore().collection<TypeCientProfile>('profile').doc(uid);
      const doc = await docRef.get();

      if (doc.exists) {
          // The document data will be returned here if a document with the given UID exists
          const data = doc.data();
          return data;
      } else {
          // Handle the case where there is no document for the given UID
          console.log("No user profile found for this UID");
          return undefined;
      }
  } catch (error) {
      console.error("Error fetching user profile: ", error);
      throw error; // Re-throw the error if needed or handle it as per app's error handling policy
  }
}

async function userSignOut() {
  try {
      await auth()?.signOut();
      console.log("User signed out");
  } catch (error) {
      console.error("Error signing out: ", error);
  }
}

// Function to add/update client fitness information
async function addOrUpdateClientFitnessInfo(fitnessInfo: Omit<TypeClientPersonalFitnessInfo, "MedicalCertificate">) {
  const user = auth().currentUser;

  if (!user) {
    console.log('No authenticated user found');
    return;
  }

  try {
    // Use the user's UID as the document ID to ensure one fitness profile per user
    await firestore()
      .collection('ClientFitnessInfo')
      .doc(user.uid)
      .set(fitnessInfo);
      
    console.log('Fitness info added/updated successfully');
  } catch (error) {
    console.error('Error adding/updating fitness info:', error);
  }
};

async function getUserClientFitnessInfo(uid: FirebaseAuthTypes.User["uid"]) {
  try {
    const docRef = firestore().collection('ClientFitnessInfo').doc(uid);
    const doc = await docRef.get();

    if (doc.exists) {
      const data = doc.data();
      return data;
    } else {
      console.log("No fitness info found for this user");
      return undefined;
    }
  } catch (error) {
    console.error("Error fetching fitness info: ", error);
    throw error;
  }
}

async function getUserClientProperties(id: FirebaseAuthTypes.User["uid"])  {
  const profile = await getUserProfile(id);
  const fitness = await getUserClientFitnessInfo(id);
  const parsed = v.safeParse(ClientProperties, { ...profile, ...fitness });
  if (parsed.success) return parsed.output;
  else throw new Error("Error parsing client properties");
}


export default databaseMethods;
