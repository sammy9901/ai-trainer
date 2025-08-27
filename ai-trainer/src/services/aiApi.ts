import { apiClient } from './api';
import type { UserProfile, WorkoutPlan } from '../types';

export async function generatePlanViaApi(profile: UserProfile): Promise<WorkoutPlan> {
  const { data } = await apiClient.post<WorkoutPlan>('/generate-workout', profile);
  return data;
}

