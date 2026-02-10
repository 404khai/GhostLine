import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

export function CyberpunkTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const [expanded, setExpanded] = useState(false);
  const animation = useSharedValue(0);

  const toggleMenu = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const newValue = expanded ? 0 : 1;
    setExpanded(!expanded);
    animation.value = withSpring(newValue, { damping: 15, stiffness: 100 });
  };

  const currentRoute = state.routes[state.index];
  const { options: currentOptions } = descriptors[currentRoute.key];
  
  // Filter out hidden routes (like index with href: null)
  const visibleRoutes = state.routes.filter(route => {
    const { options } = descriptors[route.key];
    // @ts-ignore
    return options.href !== null && options.tabBarButton !== null && options.tabBarItemStyle?.display !== 'none';
  });

  // Routes to show in the list (excluding current one)
  const otherRoutes = visibleRoutes.filter(r => r.key !== currentRoute.key);

  return (
    <View style={styles.container}>
        {/* Expanded List */}
        <View style={styles.expandedContainer} pointerEvents="box-none">
            {otherRoutes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                // Animate items
                // Reverse index for stack effect (bottom-up)
                const reverseIndex = otherRoutes.length - 1 - index;
                
                const animatedStyle = useAnimatedStyle(() => {
                    const translateY = withSpring(expanded ? 0 : 20 * (reverseIndex + 1));
                    const opacity = withSpring(expanded ? 1 : 0);
                    const scale = withSpring(expanded ? 1 : 0.8);

                    return {
                        opacity: animation.value,
                        transform: [
                            { translateY: expanded ? 0 : 10 }, // Subtle movement
                            { scale: animation.value }
                        ],
                        // Hide when collapsed to prevent touches
                        display: expanded ? 'flex' : 'none', 
                    };
                });
                
                // We want to apply individual delays or stagger? 
                // For simplicity, let's just use the shared value. 
                // But to make them appear one by one, we might need individual values or derived values.
                // Let's stick to simple fade/scale for now.

                const isFocused = state.index === state.routes.indexOf(route);

                const onPress = () => {
                    Haptics.selectionAsync();
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                    toggleMenu(); // Close after selection
                };

                return (
                    <Animated.View key={route.key} style={[styles.menuItemContainer, animatedStyle]}>
                        <TouchableOpacity onPress={onPress} style={styles.menuItem}>
                             {/* Render Icon */}
                             {options.tabBarIcon && options.tabBarIcon({ focused: false, color: '#39FF14', size: 20 })}
                             <Text style={styles.menuLabel}>{label as string}</Text>
                        </TouchableOpacity>
                    </Animated.View>
                );
            })}
        </View>

        {/* Main Button (Current Tab) */}
        <TouchableOpacity 
            onPress={toggleMenu} 
            activeOpacity={0.8}
            style={styles.mainButton}
        >
            <View style={styles.mainButtonContent}>
                {currentOptions.tabBarIcon && currentOptions.tabBarIcon({ focused: true, color: 'black', size: 24 })}
                <Text style={styles.mainLabel}>
                    {currentOptions.title || currentRoute.name}
                </Text>
                <Ionicons name={expanded ? "chevron-down" : "chevron-up"} size={16} color="black" style={{marginLeft: 5}} />
            </View>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 40, // Lifted up a bit
        alignItems: 'center',
        justifyContent: 'flex-end',
        zIndex: 1000,
    },
    mainButton: {
        backgroundColor: '#000000ff',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderWidth: 2,
        borderColor: '#39FF14',
        elevation: 10,
        shadowColor: '#39FF14',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 15,
    },
    mainButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainLabel: {
        fontFamily: 'Doto_700Bold',
        color: '#39FF14',
        fontSize: 16,
        marginLeft: 8,
        textTransform: 'uppercase',
    },
    expandedContainer: {
        alignItems: 'center',
        marginBottom: 15,
        gap: 10,
    },
    menuItemContainer: {
        // Wrapper for animation
    },
    menuItem: {
        backgroundColor: 'rgba(10, 10, 15, 0.95)',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#39FF14',
        minWidth: 140,
        justifyContent: 'flex-start', // Align left for consistency? or center
        shadowColor: '#39FF14',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    menuLabel: {
        fontFamily: 'Doto_700Bold',
        color: '#39FF14',
        fontSize: 14,
        marginLeft: 12,
        textTransform: 'uppercase',
    },
});
