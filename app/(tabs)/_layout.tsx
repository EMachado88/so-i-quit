import {Tabs} from 'expo-router';
import React from 'react';

import {HapticTab} from '@/components/haptic-tab';
import {IconSymbol} from '@/components/ui/icon-symbol';
import {themes} from '@/constants/theme';
import {useColorScheme} from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: themes[colorScheme].colors.primary,
        headerShown: false,
        tabBarButton: HapticTab,
        sceneStyle: {
          paddingTop: 40,
          backgroundColor: themes[colorScheme].colors.background
        },
        tabBarStyle: {
          height: 80,
          paddingTop: 15,
          backgroundColor: themes[colorScheme].colors.inverseOnSurface,
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Stats',
          tabBarIcon: ({color}) => <IconSymbol size={28} name="trophy.fill" color={color}/>,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({color}) => <IconSymbol size={28} name="gear" color={color}/>,
        }}
      />
    </Tabs>
  );
}
