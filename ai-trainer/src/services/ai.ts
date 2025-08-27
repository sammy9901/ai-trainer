import type { FitnessLevel, WorkoutDay, WorkoutExercise, WorkoutPlan, UserProfile } from '../types';

function selectRepsByLevel(level: FitnessLevel): number {
  switch (level) {
    case 'beginner':
      return 10;
    case 'intermediate':
      return 12;
    case 'advanced':
      return 15;
    default:
      return 10;
  }
}

function selectSetsByLevel(level: FitnessLevel): number {
  switch (level) {
    case 'beginner':
      return 3;
    case 'intermediate':
      return 4;
    case 'advanced':
      return 5;
    default:
      return 3;
  }
}

export async function generateWorkoutPlan(userProfile: UserProfile): Promise<WorkoutPlan> {
  // Placeholder local generator. Replace with API call to Python/ML backend later.
  const sets = selectSetsByLevel(userProfile.fitnessLevel);
  const reps = selectRepsByLevel(userProfile.fitnessLevel);

  const baseExercises: WorkoutExercise[] = [
    { id: 'pushups', name: 'Push-ups', targetMuscleGroup: 'Chest', sets, reps, restSeconds: 60 },
    { id: 'squats', name: 'Bodyweight Squats', targetMuscleGroup: 'Legs', sets, reps, restSeconds: 60 },
    { id: 'rows', name: 'Bent-over Rows (Band/Dumbbell)', targetMuscleGroup: 'Back', sets, reps, restSeconds: 60 },
    { id: 'plank', name: 'Plank', targetMuscleGroup: 'Core', sets: Math.max(2, sets - 1), reps: 1, restSeconds: 45 },
  ];

  const today = new Date();
  const days: WorkoutDay[] = Array.from({ length: 4 }).map((_, i) => ({
    date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + i).toISOString().slice(0, 10),
    exercises: baseExercises,
  }));

  return {
    id: `plan_${Date.now()}`,
    createdAt: new Date().toISOString(),
    goal: userProfile.primaryGoal,
    difficulty: userProfile.fitnessLevel,
    days,
  };
}

