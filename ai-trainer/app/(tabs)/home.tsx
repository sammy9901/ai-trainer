import React from 'react';
import { View, Text, Button } from 'react-native';
import { useProfileStore } from '../../src/stores/profile';
import { useWorkoutStore } from '../../src/stores/workout';
import { generateWorkoutPlan } from '../../src/services/ai';

export default function HomeScreen() {
  const profile = useProfileStore((s) => s.userProfile);
  const setPlan = useWorkoutStore((s) => s.setPlan);
  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: '600' }}>Welcome back{profile ? `, goal: ${profile.primaryGoal}` : ''}</Text>
      <Button
        title="Generate Workout Plan"
        onPress={async () => {
          if (!profile) return;
          const plan = await generateWorkoutPlan(profile);
          setPlan(plan);
        }}
      />
    </View>
  );
}

