import React from 'react';
import { View, Text } from 'react-native';
import { useWorkoutStore } from '../../src/stores/workout';
import { VictoryChart, VictoryLine, VictoryTheme } from '../../src/components/VictoryShim';

export default function ProgressScreen() {
  const logs = useWorkoutStore((s) => s.logs);
  const data = logs.map((l, idx) => ({ x: idx + 1, y: l.repsCompleted || 0 }));
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>Progress</Text>
      {data.length > 0 ? (
        <VictoryChart theme={VictoryTheme.material}>
          <VictoryLine data={data} />
        </VictoryChart>
      ) : (
        <Text>No logs yet.</Text>
      )}
    </View>
  );
}

