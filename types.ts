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
type Trainer = 'trainer';
type Client = 'client';

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

// ----------------- User -----------------
type UserDetail = {
    name: string;
    email: string;
    phone: string;
}
type User = (UserDetail & {
    id: string;
    password: string;
}) & ({
    role: Trainer
} | {
    role: Client
    trainerId: string | undefined;
});

type UserState = User | undefined;

type UserAction = {
    deleteUser: (id: string) => void;
    updateUser: (id: string, user: User) => void;
    addUser: (user: User) => void;
    getUser: (id: string) => User;
    getUsers: () => User[];
}

type UserSchema = {
    user: UserState;
    userAction: UserAction;
}

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

// ***************** UI Types *****************

enum PageType {
    landing = 'landing',
    login = 'login',
    register = 'register',
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
        trainerDetails: UserDetail;
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
    auth: PageAuth.public
} | {
    type: PageType['404'];
    auth: PageAuth.public
}