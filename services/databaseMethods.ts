import { OutputClientRegister, OutputTrainerRegister, TypeCientProfile, TypeClientPersonalFitnessInfo, InputClientRegister, InputTrainerRegister, TrainerProperties, TypeTrainerProfile, OutputCientProfile } from '../types';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { newProgram } from '../Pages/private/Trainer/TrainerPrograms';

const databaseMethods = {
  login,
  register,
  getUsers: async (role: string, id: string) => {

  },
  getUserProfile,
  logout: userSignOut,
  addOrUpdateClientFitnessInfo,
  getUserProperties,
  getTrainerProgram,
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


async function register(form: OutputClientRegister | OutputTrainerRegister) {
  try {
      const userCredential = await auth().createUserWithEmailAndPassword(form.email, form.password)
      const user = userCredential.user;
      
      await createProfile(user, form as OutputClientRegister | TypeTrainerProfile);

      return user;
  } catch (error) {
      handleRegistrationError(error);
      return null;
  }
}

async function createClientProfile(user: FirebaseAuthTypes.User, form: OutputClientRegister) {
  try {
      await firestore().collection<OutputCientProfile & { userId: string }>('profile').doc(user.uid).set({
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

async function createTrainerProfile(user: FirebaseAuthTypes.User, form: TypeTrainerProfile) {
  try {
      await firestore().collection<TypeTrainerProfile & { userId: string }>('profile').doc(user.uid).set({
          name: form.name,
          role: form.role,
          email: form.email,
          phone: form.phone,
          userId: user.uid,
          certification: form.certification || "",
          yearsOfExperience: form.yearsOfExperience,
      });
  } catch (error) {
      console.error("Error adding profile: ", error);
      // Separating user cleanup into its own function for clarity.
      await cleanupUser(user);
  }
}

async function createProfile(user: FirebaseAuthTypes.User, form: OutputClientRegister | TypeTrainerProfile) {
  switch (form.role) {
      case "client":
          await createClientProfile(user, form);
          break;
      case "trainer":
          await createTrainerProfile(user, form);
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

async function getUserProperties(id: FirebaseAuthTypes.User["uid"])  {
  const profile = await getUserProfile(id);
  const isClient = profile?.role === "client";
  const fitness = isClient ? await getUserClientFitnessInfo(id) : {};
  const parsed = isClient ?  { ...profile, ...fitness } : { ...profile, appoinments: [], programs: [] };
  console.log(JSON.stringify(parsed, null, 2))
  if (parsed) return parsed;
  else throw new Error("Error parsing client properties");
}

export type ReturnUserProerties = Awaited<ReturnType<typeof getUserProperties>>;

function getTrainerProgram(trainerId: string, programId: string) {
  return newProgram()
  // const docRef = firestore().collection('TrainerPrograms').doc(trainerId).collection('programs').doc(programId);
  // const doc = await docRef.get();

  // if (doc.exists) {
  //   const data = doc.data();
  //   return data;
  // } else {
  //   console.log("No program found for this trainer");
  //   return undefined;
  // }
}

export default databaseMethods;
