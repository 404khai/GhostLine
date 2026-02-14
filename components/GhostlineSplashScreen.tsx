import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

export default function GhostlineSplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Neon Green Color
  const neonGreen = '#00E5FF'; 
  
  // Dimensions
  const inset = 15;
  const w = width - inset * 2;
  const h = height - inset * 2;
  const cornerRadius = 30;

  // Trapezium/Bracket Logic
  // Right Bracket: Located around 20% down
  const rStart = h * 0.15;
  const rEnd = h * 0.45;
  const rDepth = 25; // How deep the shape goes

  // Left Bracket: Located around 70% down (asymmetrical)
  const lStart = h * 0.65;
  const lEnd = h * 0.85;
  const lDepth = 25;

  // SVG Path Construction
  const pathData = `
    M ${cornerRadius} 0
    L ${w - cornerRadius} 0
    Q ${w} 0 ${w} ${cornerRadius}
    L ${w} ${rStart}
    L ${w - 10} ${rStart + 10}
    L ${w - rDepth} ${rStart + 25}
    L ${w - rDepth} ${rEnd - 25}
    L ${w - 10} ${rEnd - 10}
    L ${w} ${rEnd}
    L ${w} ${h - cornerRadius}
    Q ${w} ${h} ${w - cornerRadius} ${h}
    L ${cornerRadius} ${h}
    Q 0 ${h} 0 ${h - cornerRadius}
    L 0 ${lEnd}
    L 10 ${lEnd - 10}
    L ${lDepth} ${lEnd - 25}
    L ${lDepth} ${lStart + 25}
    L 10 ${lStart + 10}
    L 0 ${lStart}
    L 0 ${cornerRadius}
    Q 0 0 ${cornerRadius} 0
    Z
  `;

  // Inner decoration lines for the handles (to make them look like "buttons" or "vents")
  const rightDecor = `
    M ${w - rDepth + 5} ${rStart + 30}
    L ${w - rDepth + 5} ${rEnd - 30}
  `;
  
  const leftDecor = `
    M ${lDepth - 5} ${lStart + 30}
    L ${lDepth - 5} ${lEnd - 30}
  `;

  return (
    <View style={styles.container}>
      <StatusBar style="light" hidden />
      
      {/* NO Scanlines - Removed as requested */}

      <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }], flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
        {/* Neon Border SVG */}
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          <Svg width={width} height={height} style={styles.svg}>
            <Defs>
                <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0" stopColor={neonGreen} stopOpacity="1" />
                    <Stop offset="1" stopColor={neonGreen} stopOpacity="0.5" />
                </LinearGradient>
            </Defs>
            
            <View style={{ transform: [{ translateX: inset }, { translateY: inset }] }}>
                 {/* Glow Effect Layer (Thicker, Transparent) */}
                 <Path 
                    d={pathData} 
                    stroke={neonGreen} 
                    strokeWidth={8} 
                    fill="none" 
                    opacity={0.2}
                 />
                 {/* Main Line */}
                 <Path 
                    d={pathData} 
                    stroke={neonGreen} 
                    strokeWidth={3} 
                    fill="none" 
                 />
                 
                 {/* Decorative Inner Lines for the Trapeziums */}
                 <Path 
                    d={rightDecor}
                    stroke={neonGreen}
                    strokeWidth={2}
                    fill="none"
                    opacity={0.8}
                 />
                 <Path 
                    d={leftDecor}
                    stroke={neonGreen}
                    strokeWidth={2}
                    fill="none"
                    opacity={0.8}
                 />
            </View>
          </Svg>
        </View>

        {/* Content */}
        <View style={styles.contentContainer}>
            {/* Logo */}
            <View style={styles.logoContainer}>
                <Image 
                    source={require('@/assets/images/logo.png')} 
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>
            
            {/* Text */}
            <Text style={styles.title}>GHOSTLINE</Text>
        </View>

      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0B10',
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  logoContainer: {
    width: 150,
    height: 150,
    marginBottom: 40,
    shadowColor: '#00E5FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 10, 
  },
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  title: {
    color: '#00E5FF',
    fontSize: 48,
    fontFamily: 'PixelifySans_400Regular',
    letterSpacing: 8,
    textShadowColor: 'rgba(0, 229, 255, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  }
});
