import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { WorkoutPlan, WorkoutLogEntry, WorkoutStateSnapshot } from '../types';

interface WorkoutState extends WorkoutStateSnapshot {
  setPlan: (plan: WorkoutPlan) => void;
  clearPlan: () => void;
  addLogEntry: (entry: WorkoutLogEntry) => void;
  clearLogs: () => void;
}

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set, get) => ({
      plan: null,
      logs: [],
      setPlan: (plan) => set({ plan }),
      clearPlan: () => set({ plan: null }),
      addLogEntry: (entry) => set({ logs: [...get().logs, entry] }),
      clearLogs: () => set({ logs: [] }),
    }),
    {
      name: 'workout-store-v1',
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
    }
  )
);

