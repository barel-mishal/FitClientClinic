import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import * as v from "valibot";
import { DurationFormatter } from './Components/RenderClock';
import { FinishWorkoutType } from './Components/ProgramViewTrack';


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

export type DeepKeys<T> = T extends object 
  ? { [K in keyof T]-?: K extends string 
      ? T[K] extends object 
        ? `${K}` | `${K}.${DeepKeys<T[K]>}` 
        : `${K}` 
      : never 
    }[keyof T] 
  : never
;

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

export const createRandomId = () => Math.random().toString(36).substring(7);

export const uniqueId = (ids: string[]) => {
    let id = createRandomId();
    while (ids.includes(id)) {
        id = createRandomId();
    }
    return id;
}

export type StringfyValues<T> = {
    [P in keyof T]: string;
}

export const maybeString = <T,>(value: T) => {
    return value ? value : '';
}

export function parseFirebaseTimestamp(timestamp: { seconds: number } | null | undefined) {
    if (!timestamp) return undefined;
    if (typeof timestamp.seconds === 'number') {
      // Create a new date object using seconds multiplied by 1000 to convert to milliseconds
      return new Date(timestamp.seconds * 1000);
    }
  }
  

export const calcAge = (birthdate: Date) => {
    const ageDiffMs = Date.now() - birthdate?.getTime();
    const ageDate = new Date(ageDiffMs);
    return Math.abs(ageDate?.getUTCFullYear() - 1970);
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

export const firstCharUpperCase = (str: string | undefined) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatDateTimeRange(startDate: number, endDate: number, locale = 'en-US') {
    const fullDateTimeOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };

    const formatter = new Intl.DateTimeFormat(locale, fullDateTimeOptions);
    const formatter2 = new Intl.DateTimeFormat(locale, timeOptions);
    const formattedStartDate = formatter.format(startDate);
    const formattedEndDate = formatter2.format(endDate);

    return `${formattedStartDate} - ${formattedEndDate}`;
  }
export const calculateDuration = (start: number, end: number) => {
    return (end - start) / 1000 / 60;
}

export const durationToMin = (duration: Duration) => {
    if (duration.includes('h')) {
        return parseInt(duration) * SIXTY;
    }
    if (duration.includes('m')) {
        return parseInt(duration);
    }
    if (duration.includes('s')) {
        return parseInt(duration) / SIXTY;
    }
    return 0;
}

export const calcBMI = (weight: number, height: number) => {
    if (height > 3) height = height / 100;
    return (weight / (height * height)).toFixed(2);
}

export const calcScore = (workout: FinishWorkoutType) => {
    const completedExercises = workout?.completedExercises?.length ?? 0; // Fallback to 0 if undefined
    const totalExercises = workout?.exercises?.length ?? 0;
    const workoutDuration = calculateDuration(workout?.startTime, workout?.endTime);
    const goalDuration = durationToMin(workout?.duration as Duration);
    
    // Calculate scores, ensuring no division by zero
    const durationScore = goalDuration > 0 ? (workoutDuration / goalDuration) * 100 : 0;
    const exerciseScore = totalExercises > 0 ? (completedExercises / totalExercises) * 100 : 0;

    // Weights
    const weightedDurationScore = durationScore * 0.3; 
    const weightedExerciseScore = exerciseScore * 0.7;

    // Calculate final score
    const finalScore = Math.ceil(weightedDurationScore + weightedExerciseScore);
    return finalScore;
};

/**
 * @description - Format the duration and substruct the substruct from the duration
 * @param duration - string with the format "mm:ss"
 * @param substruct - string with the format "mm:ss"
 * @returns string with the format "hh:mm"
 * @example
 * formatDuration("01:30") // "01:30"
 * // You can use secound argument also
 * formatDuration("30:00", "3s") // "29:57"
*/
export const formatTimerDuration: DurationFormatter = ({step = "0s", duration}: {step: `${number}s`, duration: Duration}): `${string}:${string}` => {
    const s = duration.includes('h') ? parseInt(duration) * SIXTY * SIXTY : duration.includes('m') ? parseInt(duration) * SIXTY : parseInt(duration);
    const currentSecound = s - parseInt(step);
    return `${Math.floor(currentSecound/60).toString().padStart(2, "0")}:${(currentSecound%60).toString().padEnd(2, "0")}`;
};
export const formatClockDuration: DurationFormatter = ({step = "0s", duration}: {step: `${number}s`, duration: Duration}): `${string}:${string}` => {
    return `${Math.floor(parseInt(step)/60).toString().padStart(2, "0")}:${(parseInt(step)%60).toString().padStart(2, "0")}`;
};

// ----------------- Fitness Program -----------------
export type Duration = `${number}m` | `${number}h` | `${number}s`;


const ExerciseSchema = v.object({
    id: v.string(),
    name: v.string(),
    description: v.string(),
    imgUrl: v.optional(v.string()),
    urlExample: v.optional(v.string()),
    sets: NumberSchema,
    estimatedDuration: v.string(),
    reps: v.optional(NumberSchema),
    repetitionType: v.union([v.literal('time'), v.literal('reps')]),
    time: v.optional(v.string([v.regex(/^\d+(m|h|s)$/)])),
    weight: v.optional(NumberSchema),
});

export type Exercise = v.Input<typeof ExerciseSchema>;

export const FitnessProgramSchema = v.object({
    id: v.optional(v.string()),
    name: v.string(),
    description: v.string(),
    duration: v.string(),
    exercises: v.array(v.partial(ExerciseSchema)),
    trainerId: v.string(),
    clientId: v.optional(v.string()),
});

export type FitnessProgram = v.Input<typeof FitnessProgramSchema>;
export type FitnessProgramOutput = v.Output<typeof FitnessProgramSchema>;



// ***************** Schemas *****************
export const profileSchema = v.object({
    name: v.string([v.minLength(2)]),
    email: v.string([v.email()]),
    phone: v.string(),
    userId: v.optional(v.string()),
})

export const ClientProfile = v.merge([
    profileSchema,
    v.object({
    role: v.literal('client'),
    trainerPhone: v.optional(v.string()),
    userId: v.optional(v.string()),
    trainerId: v.optional(v.string()),
})])


export type TypeCientProfile = v.Input<typeof ClientProfile>;
export type OutputCientProfile = v.Output<typeof ClientProfile>;

export const ClientRegisterData = v.merge([
    v.object({password: v.string([v.minLength(6)])}),
    ClientProfile
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
    currentProgramId: v.optional(v.string()),
    clientId: v.optional(v.string()),
    birthdate: v.optional(v.date()),
});

export type TypeClientPersonalFitnessInfo = v.Input<typeof ClientPersonalFitnessInfo>;
export type OutputClientPersonalFitnessInfo = v.Output<typeof ClientPersonalFitnessInfo>;

export const ClientProperties = v.intersect([
    v.partial(ClientProfile), 
    v.partial(ClientPersonalFitnessInfo)
]);

export type InputClientProperties = v.Input<typeof ClientProperties>;
export type OutputClientProperties = v.Output<typeof ClientProperties>;

export const TrainerProfile = v.merge([
    profileSchema,
    v.object({
    role: v.literal('trainer'),
    certification: v.optional(v.string([v.minLength(1)])),
    yearsOfExperience: NumberSchema,
    userId: v.optional(v.string()),
})]);

export type TypeTrainerProfile = v.Input<typeof TrainerProfile>
export type OutputTrainerProfile = v.Output<typeof TrainerProfile>

export const TrainerRegisterData = v.merge([
    TrainerProfile,
    v.object({ password: v.string([v.minLength(6)]) }),
]);

export type InputTrainerRegister = v.Input<typeof TrainerRegisterData>;
export type OutputTrainerRegister = v.Output<typeof TrainerRegisterData>;

const TrinerClientAppointment = v.object({});

export const TrainerProperties = v.intersect([
    TrainerProfile,
    v.object({
        appointments: v.array(v.partial(TrinerClientAppointment)),
        programs: v.array(v.partial(FitnessProgramSchema)),
        clients: v.array(ClientProperties),
    })
]);

export type TypeTrainerProperties = v.Input<typeof TrainerProperties>;
export type ReturnTrainerProerties = v.Output<typeof TrainerProperties>;

export const ProfileSchema = v.union([ClientProfile, TrainerProfile]);
export type ProfileSchema = v.Input<typeof ProfileSchema>;
export type ProfileSchemaOutput = v.Output<typeof ProfileSchema>;

export const userPropertiesSchema = v.union([ClientProperties, TrainerProperties]);
export type TypeUserPropertiesSchema = v.Input<typeof userPropertiesSchema>;
export type ReturnUserProerties = v.Output<typeof userPropertiesSchema>;

// ----------------- User -----------------
export type User = FirebaseAuthTypes.User;

export type UserSchema = {
    user: User;
    data: ReturnUserProerties,
    signOut: () => void;
    deleteTrainerClient: (id: string) => void;
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
