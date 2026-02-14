import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
export function CyberpunkTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const [expanded, setExpanded] = useState(false);
  const animation = useSharedValue(0);

  const toggleMenu = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const newValue = expanded ? 0 : 1;
    setExpanded(!expanded);
    animation.value = withTiming(newValue, { duration: 300 });
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
                    <CyberpunkTabItem 
                        key={route.key}
                        label={label as string}
                        options={options}
                        onPress={onPress}
                        expanded={expanded}
                        reverseIndex={reverseIndex}
                        animation={animation}
                    />
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
                {currentOptions.tabBarIcon && currentOptions.tabBarIcon({ focused: true, color: Colors.cyberpunk.primary, size: 24 })}
                <Text style={styles.mainLabel}>
                    {currentOptions.title || currentRoute.name}
                </Text>
                <Ionicons name={expanded ? "chevron-down" : "chevron-up"} size={16} color={Colors.cyberpunk.primary} style={{marginLeft: 5}} />
            </View>
        </TouchableOpacity>
    </View>
  );
}

// Extracted Component to respect Rules of Hooks
const CyberpunkTabItem = ({ label, options, onPress, expanded, reverseIndex, animation }: any) => {
    const animatedStyle = useAnimatedStyle(() => {
        const translateY = interpolate(
            animation.value,
            [0, 1],
            [20 * (reverseIndex + 1), 0]
        );

        return {
            opacity: animation.value,
            transform: [
                { translateY },
            ],
        };
    });

    return (
        <Animated.View style={[styles.menuItemContainer, animatedStyle]} pointerEvents={expanded ? 'auto' : 'none'}>
            <TouchableOpacity onPress={onPress} style={styles.menuItem}>
                    {/* Render Icon */}
                    {options.tabBarIcon && options.tabBarIcon({ focused: false, color: Colors.cyberpunk.primary, size: 20 })}
                    <Text style={styles.menuLabel}>{label}</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 40, // Lifted up a bit
        left: 20,
        alignItems: 'center',
        justifyContent: 'flex-end',
        zIndex: 1000,
    },
    mainButton: {
        backgroundColor: Colors.cyberpunk.background,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderWidth: 1,
        borderColor: Colors.cyberpunk.primary,
        elevation: 10,
        shadowColor: Colors.cyberpunk.primary,
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
        color: '#00E5FF',
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
        backgroundColor: 'rgba(10, 11, 16, 0.95)',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#00E5FF',
        minWidth: 150,
        justifyContent: 'flex-start', // Align left for consistency? or center
        shadowColor: '#00E5FF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    menuLabel: {
        fontFamily: 'Doto_700Bold',
        color: Colors.cyberpunk.primary,
        fontSize: 14,
        marginLeft: 12,
        textTransform: 'uppercase',
    },
});
