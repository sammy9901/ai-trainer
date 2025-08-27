import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setItem<T>(key: string, value: T): Promise<void> {
  const serialized = JSON.stringify(value);
  await AsyncStorage.setItem(key, serialized);
}

export async function getItem<T>(key: string): Promise<T | null> {
  const raw = await AsyncStorage.getItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function removeItem(key: string): Promise<void> {
  await AsyncStorage.removeItem(key);
}

