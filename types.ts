import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import * as v from "valibot";



// ***************** Roles *****************
export type Trainer = 'trainer';
export type Client = 'client';
export type Role = Trainer | Client;

// ***************** Data Types *****************
// ----------------- Appointment -----------------
type Appointment = {
    id: string;
    date: string;
    duration: number;
    clientId: string;
    trainerId: string;
    fitnessProgramId: string;
}

type Appointments = Appointment[];

type AppointmentAction = {
    deleteAppointment: (id: string) => void;
    updateAppointment: (id: string, appointment: Appointment) => void;
    addAppointment: (appointment: Appointment) => void;
    getAppointments: () => Appointments;
}

// ----------------- Fitness Program -----------------
type Repetition = ({
    repetitionType: 'time';
    duration: number;
} | {
    repetitionType: 'reps';
    numberOfReps: number;
    repDuration: number;
});

type ExerciseStructure = {
    id: string;
    sets: number;
    estimatedDuration: number;
} & Repetition[];

type Exercise = {
    id: string;
    name: string;
    description: string;
    exerciseStructure: ExerciseStructure;
    imgUrl?: string;
    urlExample?: string;
}

type FitnessProgram = {
    id: string;
    name: string;
    description: string;
    duration: number;
    exercises: Exercise[];
    trainerId: string;
    clientId: string;
}

type FitnessPrograms = FitnessProgram[];

type FitnessProgramAction = {
    deleteFitnessProgram: (id: string) => void;
    updateFitnessProgram: (id: string, fitnessProgram: FitnessProgram) => void;
    addFitnessProgram: (fitnessProgram: FitnessProgram) => void;
    getFitnessProgram: (id: string) => FitnessProgram;
    getFitnessPrograms: () => FitnessPrograms;
}

type FitnessProgramSchema = {
    fitnessProgramAction: FitnessProgramAction;
    FitnessPrograms: FitnessPrograms;
}

// ----------------- Profile -----------------
type ProfileDetail = {
    name: string;
    email: string;
    phone: string;
}
export type Profile = (ProfileDetail & {
    id: string;
    password: string;
}) & ({
    role: Trainer
} | {
    role: Client
    trainerId: string | undefined;
    fitness: PersonalFitnessInfo;
});


// ----------------- Firestore -----------------
export type DatabaseMethods = {
    getUsers: (role: Trainer, id: string) => User[]
    register: (form: ClientData | Trainer) => void;
    login: (email: string, password: string) => void;
    addUser: (user: User) => void;
};

// ----------------- Workout -----------------
type Workout = {
    id: string;
    clientId: string;
    trainerId: string;
    fitnessProgramId: string;
    date: string;
    duration: number;
    exercises: Exercise[];
    heartRateHealthKit?: any;
}

type Workouts = Workout[];

type WorkoutAction = {
    deleteWorkout: (id: string) => void;
    updateWorkout: (id: string, workout: Workout) => void;
    addWorkout: (workout: Workout) => void;
    getWorkout: (id: string) => Workout;
    getWorkouts: () => Workouts;
}

type WorkoutState = Workout | undefined;

type WorkoutSummary = {
    id: string;
    clientName: string;
    trainerName: string;
    fitnessProgramId: string;
    score: number;
    date: string;
    duration: number;
    exercisesCompletion: Exercise[];
    heartRateHealthKit?: any;
}

type WorkoutSchema = {
    workoutAction: WorkoutAction;
    workouts: Workouts;
    workout: WorkoutState;
    workoutSummary: WorkoutSummary;
}

// ***************** Form For Clients Data *****************
type PersonalFitnessInfo = {
    age: number;
    weight: number;
    height: number;
    goals: [string, string, string];
    gender: 'female' | 'male';
    activityLevel: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active';
    MedicalCertificate: string; // photo url or file
    trainingExperience: string;
    idealTrainingFrequency: string;
    idealTrainingDuration: string;
    idealTrainingTime: string;
    injuries: string;
}

type PersonalInfo = {
    name: string;
    email: string;
    phone: string;
    password: string;
}

export type ClientData = PersonalInfo & Partial<PersonalFitnessInfo> & {
    role: Client
    trainerId?: string;
}

export type ClientRegisterForm = PersonalInfo & {
    role: Client
    trainerId?: string;
}

type TrainerForm = PersonalInfo & {
    role: Trainer
    certification?: Certification; // photo url
    yearsOfExperience?: number;
}
type Certification = string;



// ***************** Util *****************
export type StringfyValues<T> = {
    [P in keyof T]: string;
}

export const maybeString = <T,>(value: T) => {
    return value ? value : '';
}

export const maybeNumber = (value: string) => {
    return value ? parseInt(value) : 0;
}

export const maybeUndefined = <T,>(value: T) => {
    return value ? value : undefined;
}

export const convertUndefined = <T,>(action: (value: T) => string) => (value: T) => {
    return value ? value : action(value);
}

export const makeIssue = (issues: v.SchemaIssues) => {
    const issue = issues?.at(0);
    return `${issue?.path?.at(0)?.key} ${issue?.message}`

}

export function isUserLoggedIn(userSchema: UserSchema): userSchema is { user: FirebaseAuthTypes.User, data: TypeClientProperties } {
    return userSchema.user !== null;
}


// ***************** Constants *****************
export const GENDER_OPTIONS = [
    { label: 'Female', value: 'female' },
    { label: 'Male', value: 'male' },
]

export const ACTIVITY_LEVEL_OPTIONS = [
    { label: 'Sedentary', value: 'sedentary' },
    { label: 'Lightly Active', value: 'lightly_active' },
    { label: 'Moderately Active', value: 'moderately_active' },
    { label: 'Very Active', value: 'very_active' },
]

// ***************** Schemas *****************
export const CientProfile = v.object({
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    role: v.literal('client'),
    trainerId: v.optional(v.string())
});

export type TypeCientProfile = v.Input<typeof CientProfile>

export const ClientRegisterData = v.merge([
    v.object({password: v.string([v.minLength(6)])}),
    CientProfile
]);

export type TypeClientRegisterData = v.Input<typeof ClientRegisterData>

export const ClientPersonalFitnessInfo = v.object({
    age: v.number(),
    weight: v.number(),
    height: v.number(),
    goals: v.tuple([v.string(), v.string(), v.string()]),
    gender: v.union([v.literal('female'), v.literal('male')]),
    activityLevel: v.union([
        v.literal('sedentary'),
        v.literal('lightly_active'),
        v.literal('moderately_active'),
        v.literal('very_active'),
    ]),
    MedicalCertificate: v.string(), // photo url or file
    trainingExperience: v.string(),
    idealTrainingFrequency: v.string(),
    idealTrainingDuration: v.string(),
    idealTrainingTime: v.string(),
    injuries: v.string(),
});

export type TypeClientPersonalFitnessInfo = v.Input<typeof ClientPersonalFitnessInfo>;

export const ClientProperties = v.intersect([
    v.partial(CientProfile), 
    v.partial(ClientPersonalFitnessInfo)
]);

export type TypeClientProperties = v.Input<typeof ClientProperties>;

// ----------------- User -----------------
type User = FirebaseAuthTypes.User;

export type UserAction = {
    getUser: (id: string) => User;
    getUserProfile: (id: string) => Profile;
    logout: () => void;
    deleteUser: (id: string) => void;
}

export type UserSchema = {
    user: User;
    data: TypeClientProperties,
} | {
    user: null
}

// ***************** Initial Values *****************


export const initialTrainerForm: Partial<TrainerForm> = {
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'trainer',
    certification: '',
    yearsOfExperience: 0,
  }

export const TrainerProfile = v.object({
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    role: v.literal('trainer'),
    certification: v.string(),
    yearsOfExperience: v.number(),
});

export type TypeTrainerProfile = v.Input<typeof TrainerProfile>

export const TrainerRegisterData = v.merge([
    v.object({password: v.string([v.minLength(6)])}),
    TrainerProfile
]);

export type TypeTrainerRegisterData = v.Input<typeof TrainerRegisterData>
