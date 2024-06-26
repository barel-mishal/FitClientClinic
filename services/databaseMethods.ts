import { OutputClientRegister, OutputTrainerRegister, TypeClientPersonalFitnessInfo, TypeTrainerProfile, OutputCientProfile, ProfileSchemaOutput, ReturnUserProerties, FitnessProgram, FitnessProgramOutput, OutputClientPersonalFitnessInfo, OutputTrainerProfile } from '../types';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { FinishWorkoutType } from '../Components/ProgramViewTrack';
import { DocumentPickerResult } from 'expo-document-picker';
import storage from '@react-native-firebase/storage';
import { Asset } from 'react-native-image-picker';

export const COLLECTIONS = {
  PROFILE: 'profile',
  CLIENT_FITNESS_INFO: 'ClientFitnessInfo',
  FITNESS_PROGRAMS: 'FitnessPrograms',
  FITNESS_WORKOUTS: 'FitnessWorkouts',
};

const databaseMethods = {
  login,
  register,
  getUserProfile,
  updateClientProfile,
  addOrUpdateClientFitnessInfo,
  getUserProperties,
  getTrainerProgram,
  validateTrainerPhoneAndGetId,
  addOrUpdateFitnessProgram,
  getAllTrainerClients,
  getUserClientFitnessInfo,
  assignProgramToClients,
  getAllTrainerPrograms,
  getAllTrainerClientsWithFitnessInfo,
  addFitnessClientWorkout,
  getUserClientWorkouts,
  deleteTrainerClient,
  getAllClientWorkouts,
  uploadFileAndSaveLink,
  deleteTrainerProgram,
  deleteWorkout,
  uploadImageAndSaveLink,
  updateTrainerProfile,
}

// Asynchronously uploads a file and saves its download link.
async function uploadFileAndSaveLink(file: DocumentPickerResult | null)  {
  console.log('Uploading file...', file);
  // Check if there's no file or if the operation was canceled.
  if (!file || file.canceled) {
    console.log('No file to upload.');
    return null;
  }

  // Extract the URI and name from the file's first asset.
  const { uri, name } = file.assets[0];

  // Define the storage reference path.
  const storageRef = storage().ref(`uploads/${name}`);

  try {
    // Upload the file to Firebase Storage.
    console.log('Uploading file to Firebase Storage...', uri);
    await storageRef.putFile(uri);

    // Retrieve the download URL.
    const url = await storageRef.getDownloadURL();

    // Save the download URL in Firestore.
    const linkRef = await firestore().collection('fileLinks').add({
      filename: name,
      url,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });

    console.log(`File uploaded and URL stored in Firestore: ${linkRef.id}`);
    return url; 
  } catch (error) {
    console.error(error);
    return null; 
  }
};

async function uploadImageAndSaveLink(image: Asset[] | undefined) {
  if (!image) {
    console.log('No image to upload.');
    return null;
  }

  const { uri } = image[0];
  if (!uri) {
    console.log('No image URI to upload.');
    return null;
  }
  const filename = uri.split('/').pop();
  

  const storageRef = storage().ref(`images/${filename}`);

  try {
    await storageRef.putFile(uri);

    const url = await storageRef.getDownloadURL();

    const linkRef = await firestore().collection('imageLinks').add({
      filename,
      url,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });

    console.log(`Image uploaded and URL stored in Firestore: ${linkRef.id}`);
    return url;
  } catch (error) {
    console.error(error);
    return null;
  }
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
    // TAKE CERTIFICATION INTO ACCOUNT FOR TRAINER USING URL
    // THEN ADD THE URL TO THE TRAINER PROFILE
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
          ...form,
          userId: user.uid,
      });
  } catch (error) {
      console.error("Error adding profile: ", error);
      // Separating user cleanup into its own function for clarity.
      await cleanupUser(user);
  }
}

async function updateClientProfile(user: FirebaseAuthTypes.User, form: OutputCientProfile) {
  try {
      await firestore().collection<OutputCientProfile & { userId: string }>('profile').doc(user.uid).set({
          ...form,  
          userId: user.uid,
      });
      console.log("Profile updated successfully");
  } catch (error) {
      console.error("Error adding profile: ", error);
      // Separating user cleanup into its own function for clarity.
      await cleanupUser(user);
  }
}

async function validateTrainerPhoneAndGetId(phone: string) {
  try {
      // Query profiles where the role is 'trainer' and the phone number matches the input
      const docRef = firestore().collection('profile').where('role', '==', 'trainer').where('phone', '==', phone);
      const snapshot = await docRef.get();

      // Check if any documents are found
      if (!snapshot.empty) {
          // Assuming phone numbers are unique, we take the first document
          const trainerDoc = snapshot.docs[0];
          console.log(`Phone number belongs to a trainer with ID: ${trainerDoc.id}`);
          return trainerDoc.id;  // Return the trainer's ID
      } else {
          console.log("Phone number not found among trainers");
          
          return false;  // Return false if no trainer is found
      }
  } catch (error) {
      console.error("Error validating trainer phone number and getting ID: ", error);
      throw error;
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


async function getUserProfile(uid: FirebaseAuthTypes.User["uid"]): Promise<ProfileSchemaOutput | undefined> {
  try {
      // Reference to the user's profile document
      const docRef = firestore().collection<ProfileSchemaOutput>('profile').doc(uid);
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

async function addOrUpdateClientFitnessInfo(fitnessInfo: Partial<TypeClientPersonalFitnessInfo>) {
  const user = auth().currentUser;

  if (!user || !user.uid) {
    console.log('No authenticated user found.');
    return;
  }

  console.log('Adding or updating fitness info:', fitnessInfo, 'for user:', user.uid);

  // Remove properties with undefined values
  const sanitizedFitnessInfo = Object.entries(fitnessInfo).reduce((acc, [key, value]) => {
    if (value !== undefined) {
      acc[key] = value;
    }
    return acc;
  }, {});



  try {
    console.log('Adding or updating fitness info:', JSON.stringify(sanitizedFitnessInfo, null, 2), 'for user:', user.uid);
    await firestore()
      .collection('ClientFitnessInfo')
      .doc(user.uid)
      .set(sanitizedFitnessInfo, { merge: true });
      
    console.log('Fitness info added or updated successfully.');
  } catch (error) {
    console.error('Error adding or updating fitness info:', error);
  }
};



async function getAllTrainerClientsWithFitnessInfo(trainerId: string) {
  try {
    const clientsSnapshot = await firestore().collection<OutputCientProfile>('profile').where('trainerId', '==', trainerId).get();
    const clientsData = await Promise.all(clientsSnapshot.docs.map(async (doc) => {
      const clientData = doc.data();
      const fitnessInfoSnapshot = await firestore().collection<OutputClientPersonalFitnessInfo>('ClientFitnessInfo').where('clientId', '==', doc.id).get();
      const fitnessInfoData = fitnessInfoSnapshot.docs[0]?.data();
      
      // Combine client data with their fitness info
      return { ...clientData, ...fitnessInfoData || {} };
    }));

    return clientsData;
  } catch (error) {
    console.error("Error fetching clients and their fitness info: ", error);
    throw error;
  }
}

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

async function getAllTrainerClients(trainerId: string) {
  try {
    const clients = await firestore().collection('profile').where('trainerId', '==', trainerId).get();
    return clients.docs.map(doc => doc.data());
  } catch (error) {
    console.error("Error fetching clients: ", error);
    throw error;
  }
}

async function getUserProperties(id: FirebaseAuthTypes.User["uid"]): Promise<ReturnUserProerties | undefined>  {
  const profile = await getUserProfile(id);

  console.log({profile, id})
  const isClient = profile?.role === "client";
  const fitness = isClient ? await getUserClientFitnessInfo(id) : {};
  const clients = !isClient ? await getAllTrainerClientsWithFitnessInfo(id) : [];
  if (profile?.role === "trainer") {
    return { 
      ...profile, 
      appointments: [], 
      programs: await getAllTrainerPrograms(id), 
      clients 
    }
  } else if (profile?.role === "client") return { 
    ...profile, 
    ...fitness 
  };
  else throw new Error("Error parsing client properties");
};

async function addOrUpdateFitnessProgram(program: FitnessProgramOutput) {
  let programRef;
  const { id, ...programData } = program; // Destructure to separate `id` from the rest of the program data

  if (id) {
    // If id is defined, use it to reference an existing document
    programRef = firestore().collection('FitnessPrograms').doc(id);
  } else {
    // If id is undefined, create a reference for a new document
    programRef = firestore().collection('FitnessPrograms').doc();
  }

  try {
    if (id && (await programRef.get()).exists) {
      await programRef.update(programData);
      console.log(`Fitness program ${id ? id : programRef.id} updated successfully`);
    } else {
      await programRef.set({ ...programData, id: programRef.id }); // Ensure id is included in the document
      console.log(`Fitness program ${programRef.id} added successfully`);
    }
  } catch (error) {
    console.error('Error adding/updating fitness program:', error);
    throw error; // Re-throw to handle it according to the app's policy
  }

  return programRef.id;
}
async function addFitnessClientWorkout(workout: FinishWorkoutType) {
  let programRef;

  programRef = firestore().collection<FinishWorkoutType>('FitnessWorkouts').doc();

  try {
    await programRef.set({ ...workout, id: programRef.id }); // Ensure id is included in the document
    console.log(`Fitness workout ${programRef.id} added successfully`);
  } catch (error) {
    console.error('Error adding/updating fitness program:', error);
    throw error; 
  }

  return programRef.id;
}

async function getUserClientWorkouts(uid: FirebaseAuthTypes.User["uid"]) {
  try {
    const workouts = await firestore().collection<FinishWorkoutType>('FitnessWorkouts').where('clientId', '==', uid).get();
    return workouts.docs.map(doc => doc.data());
  } catch (error) {
    console.error("Error fetching workouts: ", error);
    throw error;
  }
}


async function getTrainerProgram(trainerId: string, id: string) {
  try {
    // Attempt to fetch the program by its id
    const programRef = firestore().collection<Required<FitnessProgramOutput>>('FitnessPrograms').doc(id);
    const doc = await programRef.get();

    if (!doc.exists) {
      console.log("No such fitness program found");
      return null;  // No program found
    }

    const programData = doc.data();

    // If trainerId is necessary for validation, ensure the program belongs to the trainer
    if (programData && programData.trainerId === trainerId) {
      console.log("Program found:", programData);
      return programData;  // Return the program data
    } else {
      console.log("This program does not belong to the specified trainer");
      return null;  // Program does not belong to the trainer or missing trainerId in programData
    }
  } catch (error) {
    console.error("Error fetching trainer's program: ", error);
    throw error;  // Re-throw to handle it according to the app's policy
  }
}

async function assignProgramToClients(programId: string, userIds: string[]) {
  const batch = firestore().batch(); // Use a batch to perform all updates in a single operation

  userIds.forEach(userId => {
    const userFitnessInfoRef = firestore().collection('ClientFitnessInfo').doc(userId);
    batch.update(userFitnessInfoRef, { currentProgramId: programId });
  });

  try {
    await batch.commit(); // Commit the batch
    console.log(`Program ${programId} assigned to clients successfully.`);
  } catch (error) {
    console.error('Error assigning program to clients:', error);
    throw error; // Re-throw to handle it according to the app's policy
  }
}

async function getAllTrainerPrograms(trainerId: string) {
  try {
    const programs = await firestore().collection<Required<FitnessProgramOutput>>('FitnessPrograms').where('trainerId', '==', trainerId).get();
    return programs.docs.map(doc => doc.data());
  } catch (error) {
    console.error("Error fetching programs: ", error);
    throw error;
  }
}

async function deleteTrainerClient(clientId: string) {
  try {
    // Fetch the client's profile document
    const clientProfileRef = firestore().collection('profile').doc(clientId);

    // Update the document by removing the trainerId
    await clientProfileRef.update({
      trainerId: firestore.FieldValue.delete(), // This removes the field from the document
    });

    console.log(`Trainer ID removed from client ${clientId} successfully.`);
  } catch (error) {
    console.error("Error removing trainer ID from client: ", error);
    throw error; 
    
  }
}

async function getAllClientWorkouts(clientId: string) {
  try {
    // Query the FitnessWorkouts collection for workouts associated with the clientId
    const workoutsQuerySnapshot = await firestore().collection('FitnessWorkouts').where('clientId', '==', clientId).get();

    if (workoutsQuerySnapshot.empty) {
      console.log(`No workouts found for client ${clientId}`);
      return []; // Return an empty array if no workouts found
    }

    // Map over the documents to extract workout data
    const workouts = workoutsQuerySnapshot.docs.map(doc => ({
      id: doc.id, // Include the document ID (workout ID)
      ...doc.data(), // Spread the document data
    }));

    console.log(`Retrieved workouts for client ${clientId}:`, workouts);
    return workouts; // Return the array of workouts
  } catch (error) {
    console.error("Error retrieving client workouts: ", error);
    throw error; 
  }
}

async function deleteTrainerProgram(programId: string) {
  try {
    // Reference the program document
    const programRef = firestore().collection('FitnessPrograms').doc(programId);

    // Delete the document
    await programRef.delete();

    console.log(`Program ${programId} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting program: ", error);
    throw error; 
  }
}

async function deleteWorkout(workoutId: string) {
  try {
    // Reference the workout document
    const workoutRef = firestore().collection('FitnessWorkouts').doc(workoutId);

    // Delete the document
    await workoutRef.delete();

    console.log(`Workout ${workoutId} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting workout: ", error);
    throw error; 
  }
}

async function updateTrainerProfile(form: Partial<OutputTrainerProfile>) {
  const user = auth().currentUser;

  if (!user) {
    console.log('No authenticated user found');
    return;
  }

  try {
    await firestore().collection<Partial<OutputTrainerProfile> & { userId: string }>('profile').doc(user.uid).set({
      ...form,
      userId: user.uid,
    });
    console.log('Profile updated successfully');
  } catch (error) {
    console.error('Error updating profile:', error);
  }
}




export default databaseMethods;
