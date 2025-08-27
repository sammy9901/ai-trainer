export type FitnessGoal =
  | 'weight_loss'
  | 'muscle_gain'
  | 'endurance'
  | 'general_health';

export type FitnessLevel = 'beginner' | 'intermediate' | 'advanced';

export interface UserProfile {
  age: number;
  gender: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  heightCm: number;
  weightKg: number;
  fitnessLevel: FitnessLevel;
  healthConditions: string[];
  workoutPreferences: string[]; // e.g., HIIT, strength, cardio, yoga
  availableEquipment: string[]; // e.g., dumbbells, bands, bodyweight
  timeAvailabilityMinutes: number; // per session
  primaryGoal: FitnessGoal;
}

export interface WorkoutExercise {
  id: string;
  name: string;
  targetMuscleGroup: string;
  sets: number;
  reps: number;
  restSeconds: number;
  demoUrl?: string; // could be image or video URL
}

export interface WorkoutDay {
  date: string; // ISO date
  exercises: WorkoutExercise[];
}

export interface WorkoutPlan {
  id: string;
  createdAt: string; // ISO date
  goal: FitnessGoal;
  difficulty: FitnessLevel;
  days: WorkoutDay[]; // usually 3-6 per week
}

export interface WorkoutLogEntry {
  exerciseId: string;
  dateTime: string; // ISO timestamp
  weightKg?: number;
  repsCompleted?: number;
  notes?: string;
}

export interface WorkoutStateSnapshot {
  plan: WorkoutPlan | null;
  logs: WorkoutLogEntry[];
}

