import React from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useProfileStore } from '../src/stores/profile';
import type { FitnessLevel, FitnessGoal, UserProfile } from '../src/types';
import { router } from 'expo-router';

const schema = z.object({
  age: z.coerce.number().min(12).max(100),
  gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say']),
  heightCm: z.coerce.number().min(100).max(250),
  weightKg: z.coerce.number().min(30).max(300),
  fitnessLevel: z.enum(['beginner', 'intermediate', 'advanced']),
  healthConditions: z.string().optional(),
  workoutPreferences: z.string().optional(),
  availableEquipment: z.string().optional(),
  timeAvailabilityMinutes: z.coerce.number().min(10).max(180),
  primaryGoal: z.enum(['weight_loss', 'muscle_gain', 'endurance', 'general_health']),
});

type FormValues = z.infer<typeof schema>;

export default function OnboardingScreen() {
  const updateProfile = useProfileStore((s) => s.updateUserProfile);
  const setComplete = useProfileStore((s) => s.setOnboardingComplete);

  const { control, handleSubmit } = useForm<FormValues>({
    // Cast to any to avoid inference instability with zodResolver + RN 19 types
    resolver: zodResolver(schema) as any,
    defaultValues: {
      age: 25,
      gender: 'other',
      heightCm: 175,
      weightKg: 70,
      fitnessLevel: 'beginner',
      timeAvailabilityMinutes: 30,
      primaryGoal: 'general_health',
    },
  });

  const onSubmit: (values: FormValues) => void = (values) => {
    const profile: UserProfile = {
      age: values.age,
      gender: values.gender,
      heightCm: values.heightCm,
      weightKg: values.weightKg,
      fitnessLevel: values.fitnessLevel as FitnessLevel,
      healthConditions: values.healthConditions?.split(',').map((s) => s.trim()).filter(Boolean) || [],
      workoutPreferences: values.workoutPreferences?.split(',').map((s) => s.trim()).filter(Boolean) || [],
      availableEquipment: values.availableEquipment?.split(',').map((s) => s.trim()).filter(Boolean) || [],
      timeAvailabilityMinutes: values.timeAvailabilityMinutes,
      primaryGoal: values.primaryGoal as FitnessGoal,
    };
    updateProfile(profile);
    setComplete(true);
    router.replace('/(tabs)');
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 24, fontWeight: '600', marginBottom: 8 }}>Tell us about you</Text>

      <Controller name="age" control={control} render={({ field: { onChange, value } }) => (
        <TextInput placeholder="Age" keyboardType="numeric" value={String(value ?? '')} onChangeText={onChange} style={{ borderWidth: 1, padding: 8, borderRadius: 8 }} />
      )} />

      <Controller name="gender" control={control} render={({ field: { onChange, value } }) => (
        <TextInput placeholder="Gender (male/female/other/prefer_not_to_say)" value={value} onChangeText={onChange} style={{ borderWidth: 1, padding: 8, borderRadius: 8 }} />
      )} />

      <Controller name="heightCm" control={control} render={({ field: { onChange, value } }) => (
        <TextInput placeholder="Height (cm)" keyboardType="numeric" value={String(value ?? '')} onChangeText={onChange} style={{ borderWidth: 1, padding: 8, borderRadius: 8 }} />
      )} />

      <Controller name="weightKg" control={control} render={({ field: { onChange, value } }) => (
        <TextInput placeholder="Weight (kg)" keyboardType="numeric" value={String(value ?? '')} onChangeText={onChange} style={{ borderWidth: 1, padding: 8, borderRadius: 8 }} />
      )} />

      <Controller name="fitnessLevel" control={control} render={({ field: { onChange, value } }) => (
        <TextInput placeholder="Fitness Level (beginner/intermediate/advanced)" value={value} onChangeText={onChange} style={{ borderWidth: 1, padding: 8, borderRadius: 8 }} />
      )} />

      <Controller name="healthConditions" control={control} render={({ field: { onChange, value } }) => (
        <TextInput placeholder="Health conditions (comma separated)" value={value} onChangeText={onChange} style={{ borderWidth: 1, padding: 8, borderRadius: 8 }} />
      )} />

      <Controller name="workoutPreferences" control={control} render={({ field: { onChange, value } }) => (
        <TextInput placeholder="Workout preferences (comma separated)" value={value} onChangeText={onChange} style={{ borderWidth: 1, padding: 8, borderRadius: 8 }} />
      )} />

      <Controller name="availableEquipment" control={control} render={({ field: { onChange, value } }) => (
        <TextInput placeholder="Available equipment (comma separated)" value={value} onChangeText={onChange} style={{ borderWidth: 1, padding: 8, borderRadius: 8 }} />
      )} />

      <Controller name="timeAvailabilityMinutes" control={control} render={({ field: { onChange, value } }) => (
        <TextInput placeholder="Time per session (minutes)" keyboardType="numeric" value={String(value ?? '')} onChangeText={onChange} style={{ borderWidth: 1, padding: 8, borderRadius: 8 }} />
      )} />

      <Controller name="primaryGoal" control={control} render={({ field: { onChange, value } }) => (
        <TextInput placeholder="Primary goal (weight_loss/muscle_gain/endurance/general_health)" value={value} onChangeText={onChange} style={{ borderWidth: 1, padding: 8, borderRadius: 8 }} />
      )} />

      <Button title="Continue" onPress={handleSubmit(onSubmit)} />
    </ScrollView>
  );
}

