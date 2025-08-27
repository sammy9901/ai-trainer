import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { scheduleDailyReminder } from '../../src/services/notifications';
import { useProfileStore } from '../../src/stores/profile';

export default function SettingsScreen() {
  const reset = useProfileStore((s) => s.resetProfile);
  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: '600' }}>Settings</Text>
      <Button title="Schedule Daily Reminder (8:00)" onPress={async () => {
        const id = await scheduleDailyReminder(8, 0);
        Alert.alert('Reminder', id ? `Scheduled ${id}` : 'Permission denied');
      }} />
      <Button title="Reset Onboarding" onPress={() => reset()} />
    </View>
  );
}

