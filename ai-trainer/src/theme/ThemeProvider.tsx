import React from 'react';
import { useColorScheme } from 'react-native';
import { Slot } from 'expo-router';

type Props = {
  colorScheme?: 'light' | 'dark';
  children?: React.ReactNode;
};

export function ThemeProvider({ colorScheme, children }: Props) {
  const scheme = colorScheme || useColorScheme() || 'light';
  const backgroundColor = scheme === 'dark' ? '#0B0B0C' : '#FFFFFF';
  const textColor = scheme === 'dark' ? '#EDEDED' : '#111827';
  return (
    <React.Fragment>
      <Slot />
    </React.Fragment>
  );
}

