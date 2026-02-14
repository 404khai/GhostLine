import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

import { CyberpunkTabBar } from '@/components/cyberpunk/CyberpunkTabBar';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      tabBar={props => <CyberpunkTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        // We can keep these for reference, but CustomTabBar uses its own logic
        tabBarActiveTintColor: '#00E5FF',
        tabBarInactiveTintColor: '#444',
      }}>
      
      {/* Index - Redirect/Hidden */}
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />

      {/* 1. LINKS */}
      <Tabs.Screen
        name="links"
        options={{
          title: 'LINKS',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "chatbubbles" : "chatbubbles-outline"} size={24} color={color} />
          ),
        }}
      />

      {/* 2. GRID */}
      <Tabs.Screen
        name="grid"
        options={{
          title: 'GRID',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "grid" : "grid-outline"} size={24} color={color} />
          ),
        }}
      />

      {/* 3. DROP */}
      <Tabs.Screen
        name="drop"
        options={{
          title: 'DROP',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "cube" : "cube-outline"} size={24} color={color} />
          ),
        }}
      />

      {/* 4. SIGNAL */}
      <Tabs.Screen
        name="signal"
        options={{
          title: 'SIGNAL',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "radio" : "radio-outline"} size={24} color={color} />
          ),
        }}
      />

      {/* 5. TERMINAL */}
      <Tabs.Screen
        name="terminal"
        options={{
          title: 'TERM',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "terminal" : "terminal-outline"} size={24} color={color} />
          ),
        }}
      />

    </Tabs>
  );
}
