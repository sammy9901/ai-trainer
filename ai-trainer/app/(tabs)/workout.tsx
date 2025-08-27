import React from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { useWorkoutStore } from '../../src/stores/workout';
import type { WorkoutExercise } from '../../src/types';

export default function WorkoutScreen() {
  const plan = useWorkoutStore((s) => s.plan);
  const addLog = useWorkoutStore((s) => s.addLogEntry);

  if (!plan) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No plan yet. Go to Home and generate one.</Text>
      </View>
    );
  }

  const today = plan.days[0];

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 12 }}>Today: {today.date}</Text>
      <FlatList
        data={today.exercises}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ExerciseItem item={item} onComplete={() => {
          addLog({ exerciseId: item.id, dateTime: new Date().toISOString(), repsCompleted: item.reps });
        }} />}
      />
    </View>
  );
}

function ExerciseItem({ item, onComplete }: { item: WorkoutExercise; onComplete: () => void }) {
  return (
    <View style={{ padding: 12, borderWidth: 1, borderRadius: 8, marginBottom: 10 }}>
      <Text style={{ fontWeight: '600' }}>{item.name}</Text>
      <Text>{item.sets} x {item.reps} — Rest {item.restSeconds}s</Text>
      <Button title="Mark Complete" onPress={onComplete} />
    </View>
  );
}

