import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { UserProfile } from '../types';

interface ProfileState {
  userProfile: UserProfile | null;
  onboardingComplete: boolean;
  updateUserProfile: (profile: UserProfile) => void;
  setOnboardingComplete: (complete: boolean) => void;
  resetProfile: () => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      userProfile: null,
      onboardingComplete: false,
      updateUserProfile: (profile) => set({ userProfile: profile }),
      setOnboardingComplete: (complete) => set({ onboardingComplete: complete }),
      resetProfile: () => set({ userProfile: null, onboardingComplete: false }),
    }),
    {
      name: 'profile-store-v1',
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
      partialize: (state) => ({
        userProfile: state.userProfile,
        onboardingComplete: state.onboardingComplete,
      }),
    }
  )
);

