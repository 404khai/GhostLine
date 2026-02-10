import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#00f0ff',
        tabBarInactiveTintColor: '#444',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
            position: 'absolute',
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 0,
            backgroundColor: 'rgba(10, 10, 15, 0.95)',
            borderRadius: 15,
            height: 70,
            borderWidth: 1,
            borderColor: '#00f0ff',
            paddingBottom: 10,
            paddingTop: 10,
            // Shadow for glow effect
            shadowColor: '#00f0ff',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.3,
            shadowRadius: 10,
        },
        tabBarLabelStyle: {
            fontFamily: 'GeistPixelSquare',
            fontSize: 10,
            marginTop: 5,
        }
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
