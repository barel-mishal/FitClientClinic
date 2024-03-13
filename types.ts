import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import * as v from "valibot";
import { ReturnUserProerties } from './services/databaseMethods';



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
export type Duration = `${number}m` | `${number}h` | `${number}s`;

type RepetitionByTime = {
    repetitionType: 'time';
    duration: Duration;
}

type RepetitionByReps = {
    repetitionType: 'reps';
    numberOfReps: number;
    repDuration: Duration;
}

type Repetition = (RepetitionByTime | RepetitionByReps);

type ExerciseStructure = {
    id: string;
    sets: number;
    estimatedDuration: Duration;
    reps: Repetition[]
};

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
    duration: Duration
    exercises: Exercise[];
    trainerId: string;
}

export type FitnessPrograms = FitnessProgram[];

type FitnessProgramAction = {
    deleteFitnessProgram: (id: string) => void;
    updateFitnessProgram: (id: string, fitnessProgram: FitnessProgram) => void;
    addFitnessProgram: (fitnessProgram: FitnessProgram) => void;
    getFitnessProgram: (id: string) => FitnessProgram;
    getFitnessPrograms: () => FitnessPrograms;
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

export const SIXTY = 60;

// ***************** Util *****************
const NumberSchema = v.transform(v.string([v.toTrimmed(), v.decimal()]), (input) => {
    return parseInt(input);
  });

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

export function isUserLoggedIn(userSchema: UserSchema): userSchema is { user: FirebaseAuthTypes.User, data: ReturnUserProerties } {
    return userSchema.user !== null;
}

/**
 * @description - format the duration and substruct the substruct from the duration
 * @param duration - string with the format "mm:ss"
 * @param substruct - string with the format "mm:ss"
 * @returns string with the format "hh:mm"
 * @example
 * formatDuration("01:30") // "01:30"
 * // You can use secound argument also
 * formatDuration("30:00", "3s") // "29:57"
*/
export const formatDuration = (duration: Duration, substruct: `${number}s` = "0s"): `${string}:${string}` => {
    const s = duration.includes('h') ? parseInt(duration) * SIXTY * SIXTY : duration.includes('m') ? parseInt(duration) * SIXTY : parseInt(duration);
    const currentSecound = s - parseInt(substruct);
    return `${Math.floor(currentSecound/60).toString().padStart(2, "0")}:${(currentSecound%60).toString().padEnd(2, "0")}`;
};


// ***************** Schemas *****************
export const CientProfile = v.object({
    name: v.string(),
    email: v.string(),
    phone: NumberSchema,
    role: v.literal('client'),
    trainerId: v.optional(NumberSchema),
    userId: v.optional(v.string()),
});

export type TypeCientProfile = v.Input<typeof CientProfile>;
export type OutputCientProfile = v.Output<typeof CientProfile>;

export const ClientRegisterData = v.merge([
    v.object({password: v.string([v.minLength(6)])}),
    CientProfile
]);

export type InputClientRegister = v.Input<typeof ClientRegisterData>;
export type OutputClientRegister = v.Output<typeof ClientRegisterData>;
// export type ResultTypeClientRegisterSchema = v.TypedSchemaResult<typeof ClientRegisterData>;

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

export type InputClientProperties = v.Input<typeof ClientProperties>;

export const TrainerProfile = v.object({
    name: v.string([v.minLength(2)]),
    email: v.string([v.email()]),
    phone: NumberSchema,
    role: v.literal('trainer'),
    certification: v.string([v.minLength(1)]),
    yearsOfExperience: NumberSchema,
    userId: v.optional(v.string()),
})

const ClientWorkout = v.object({})

export type TypeTrainerProfile = v.Input<typeof TrainerProfile>

export const TrainerRegisterData = v.merge([
    TrainerProfile,

    v.object({ password: v.string([v.minLength(6)]) }),
]);

export type InputTrainerRegister = v.Input<typeof TrainerRegisterData>;
export type OutputTrainerRegister = v.Output<typeof TrainerRegisterData>;

const TrinerClientAppointment = v.object({});

const TrainerProgram = v.object({});

export const TrainerProperties = v.intersect([
    TrainerProfile,
    v.object({
        appointments: v.array(v.partial(TrinerClientAppointment)),
        programs: v.array(v.partial(TrainerProgram)),
    })
]);


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
    data: ReturnUserProerties,
} | {
    user: null
}


// ^^^^^^^^ JUST HELPFULL SCHEMA TO DESIGN THE APPLICATION ^^^^^^^^
type PAGES = {
    public: any;
    trainer: {
        appoitments: {
            funcs: {
                createAppointment: () => {} // bring me to a page form to fill the details
                deleteAppointment: () => {} // delete the appointment
                updateFutureAppointment: () => {} // bring me to a page form to fill the details
                getAllAppointments: () => {} // bring me to a page with all the appointments
            }
            page: {
                clientId: string,
                comment: string,
                programId: string, // the simpliest program (name, duration, exercises, sets, reps, duration, repetitionType)
                date: string;   
            }[]
        },
        trinees: {
            page: {
                name: string;
                email: string;
                appoitments: {}[]
                workouts: {}[],
                currentProgramId: string;
            }[]
        };
        proggrames: {
            funcs: {
                createNewProgram: () => {};
                deleteProgram: () => {};
                updateProgram: () => {};
                getAllPrograms: () => {};
            };
            page: {
            exercises: {}[];
            estimatedDurationMin: number;
            }[]
        };
    },
    client: {
        workouts: {
            funcs: {
                deleteWorkout: () => {};
                addWorkout: () => {};
                updateWorkout: () => {};
                getAllWorkouts: () => {};
            }, 
            page: {}[]
        };
        heartRateInWorkOuts: {
            funcs: {
                syncWithHealthKit: () => {};
            },
            page: {
                date: string;
                heartRate: number;
            }[]
        }[];
        appointments: {
            funcs: {
                createAppointment: () => {};
                deleteAppointment: () => {};
                updateFutureAppointment: () => {};
                getAllAppointments: () => {};
            };
            page: {
                clientId: string;
                comment: string;
                programId: string, // the simpliest program (name, duration, exercises, sets, reps, duration, repetitionType)
                date: string;   
            }[]
        };
        }[];
        currentProgramId: string;
    }
