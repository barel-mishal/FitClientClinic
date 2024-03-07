import {FirebaseAuthTypes} from '@react-native-firebase/auth';
type pages = 
'home'
 | 'landing'
 | 'login'
 | 'register'
 | '404'
 | 'profile'
 | 'appointment'
 | 'fitness-program'
 | 'workout'
export type Trainer = 'trainer';
export type Client = 'client';

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
});

// ----------------- User -----------------
type User = FirebaseAuthTypes.User;

export type UserAction = {
    deleteUser: (id: string) => void;
    updateUser: (id: string, User: User) => void;
    addUser: (user: User) => void;
    getUser: (id: string) => User;
    login: (email: string, password: string) => void;
    logout: () => void;
}

export type UserSchema = {
    user: User;
    userAction: UserAction;
    profile: Profile
} | {
    user: null
}

// ----------------- Firestore -----------------
type FireStoreMethods = {
    getUsers: () => User[]
    register: (form: RegisterForm) => void;
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
    gender: 'Female' | 'Male';
    activityLevel: 'Sedentary' | 'Lightly Active' | 'Moderately Active' | 'Very Active';
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


type ClientForm = PersonalInfo & PersonalFitnessInfo & {
    role: Client
    trainerId?: string;
};

type TrainerForm = PersonalInfo & {
    role: Trainer
    certification?: Certification; // photo url
    yearsOfExperience?: number;
}

export type RegisterForm = {
    client: ClientForm;
    trainer: TrainerForm;
}



// ***************** UI Types *****************
enum PageType {
    landing = 'landing', // done
    login = 'login', 
    register = 'register', // on going
    home_client = 'home_client',
    home_trainer = 'home_trainer',
    appointment_trainer = 'appointment_trainer',
    program_trainer = 'program_trainer',
    workout_client = 'workout_client',
    workout_summary = 'workout_summary',
    not_found = '404',
}
enum PageAuth {
    public = 'public',
    private = "private"
}

type Certification = string;

type Page = {
    type: PageType.appointment_trainer;
    data: {
        appointment: Appointment;
        user: User;
    },
    auth: PageAuth.private
} | {
    type: PageType.program_trainer;
    data: {
        fitnessProgram: FitnessProgram;
        user: User;
    },
    auth: PageAuth.private
} | {
    type: PageType.workout_client;
    data: {
        workout: Workout;
        user: User;
    },
    auth: PageAuth.private
} | {
    type: PageType.workout_summary;
    data: {
        workoutSummary: WorkoutSummary;
        user: User;
    },
    auth: PageAuth.private
} | {
    type: PageType.home_client;
    data: {
        user: User;
        lastFitnessProgram: FitnessProgram;
        nextAppointment: Appointment;
        trainerDetails: ProfileDetail;
    },
    auth: PageAuth.private
} | {
    type: PageType.home_trainer;
    data: {
        user: User;
        clients: User[];
        appointments: Appointments;
        createFitnessProgram: () => void;
        createAppointment: () => void;
    },
    auth: PageAuth.private
} | {
    type: PageType.landing;
    auth: PageAuth.public
} | {
    type: PageType.login;
    auth: PageAuth.public
} | {
    type: PageType.register;
    inputs: RegisterForm;
    auth: PageAuth.public
} | {
    type: PageType['404'];
    auth: PageAuth.public
}


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


// ***************** Constants *****************
export const genderOptions = [
    { label: 'Female', value: 'female' },
    { label: 'Male', value: 'male' },
]

export const activityLevelOptions = [
    { label: 'Sedentary', value: 'sedentary' },
    { label: 'Lightly Active', value: 'lightlyActive' },
    { label: 'Moderately Active', value: 'moderatelyActive' },
    { label: 'Very Active', value: 'veryActive' },
]

export const initialClientForm: Partial<RegisterForm[Client]> = {
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'client',
    trainerId: '',
    age: 0,
    weight: 0,
    height: 0,
    goals: ['', '', ''],
    gender: undefined,
    activityLevel: undefined,
    MedicalCertificate: '',
    trainingExperience: '',
    idealTrainingFrequency: '',
    idealTrainingDuration: '',
    idealTrainingTime: '',
    injuries: '',
  }

export const initialTrainerForm: Partial<RegisterForm[Trainer]> = {
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'trainer',
    certification: '',
    yearsOfExperience: 0,
  }