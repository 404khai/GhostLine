import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, Image } from 'react-native';
import Svg, { Path, Rect, Defs, LinearGradient, Stop } from 'react-native-svg';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

export default function GhostlineSplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const borderAnim = useRef(new Animated.Value(0)).current;

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
      Animated.timing(borderAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true, // SVG props aren't native-animatable usually, but we can animate opacity/transform
      })
    ]).start();
  }, []);

  // Neon Green Color
  const neonGreen = '#39FF14'; 
  
  // Frame path logic
  // A rectangle with cut corners and some "tech" indentations
  const inset = 20;
  const cornerSize = 40;
  const sideDetailSize = 100; // Length of the side detail
  
  // We'll just draw a responsive path based on width/height
  const w = width - inset * 2;
  const h = height - inset * 2;

  // Simple path: 
  // Top Left (rounded) -> Top Right (rounded)
  // Right side: straight -> indent -> straight
  // Bottom Right (rounded) -> Bottom Left (rounded)
  // Left side: straight -> indent -> straight
  
  // SVG Path Command construction
  const pathData = `
    M ${cornerSize} 0
    L ${w - cornerSize} 0
    Q ${w} 0 ${w} ${cornerSize}
    L ${w} ${h * 0.2}
    L ${w - 20} ${h * 0.25} 
    L ${w - 20} ${h * 0.45}
    L ${w} ${h * 0.5}
    L ${w} ${h - cornerSize}
    Q ${w} ${h} ${w - cornerSize} ${h}
    L ${cornerSize} ${h}
    Q 0 ${h} 0 ${h - cornerSize}
    L 0 ${h * 0.8}
    L 20 ${h * 0.75}
    L 20 ${h * 0.65}
    L 0 ${h * 0.6}
    L 0 ${cornerSize}
    Q 0 0 ${cornerSize} 0
    Z
  `;

  return (
    <View style={styles.container}>
      <StatusBar style="light" hidden />
      
      {/* Background Scanlines */}
      <View style={styles.scanlines}>
        {[...Array(40)].map((_, i) => (
          <View key={i} style={styles.scanline} />
        ))}
      </View>

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
                 {/* Glow Effect Layer */}
                 <Path 
                    d={pathData} 
                    stroke={neonGreen} 
                    strokeWidth={6} 
                    fill="none" 
                    opacity={0.3}
                 />
                 {/* Main Line */}
                 <Path 
                    d={pathData} 
                    stroke={neonGreen} 
                    strokeWidth={2} 
                    fill="none" 
                 />
                 
                 {/* Extra Tech Details */}
                 {/* Right Side Detail */}
                 <Path 
                    d={`M ${w-10} ${h*0.25 + 10} L ${w-10} ${h*0.45 - 10}`}
                    stroke={neonGreen}
                    strokeWidth={1}
                    fill="none"
                 />
                 
                 {/* Left Side Detail */}
                 <Path 
                    d={`M 10 ${h*0.6 + 10} L 10 ${h*0.75 - 10}`}
                    stroke={neonGreen}
                    strokeWidth={1}
                    fill="none"
                 />
            </View>
          </Svg>
        </View>

        {/* Content */}
        <View style={styles.contentContainer}>
            {/* Logo */}
            <View style={styles.logoContainer}>
                <Image 
                    source={require('@/assets/images/logo.jpeg')} 
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
    backgroundColor: '#050505',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanlines: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-around',
    opacity: 0.1,
  },
  scanline: {
    height: 1,
    backgroundColor: '#39FF14',
    width: '100%',
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
    shadowColor: '#39FF14',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 10, // Android
    // Add a border or glow container if needed
  },
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: 20, // slightly rounded
  },
  title: {
    color: '#39FF14',
    fontSize: 48,
    fontFamily: 'PixelifySans_400Regular', // Will need to ensure this matches the loaded font name
    letterSpacing: 8,
    textShadowColor: 'rgba(57, 255, 20, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  }
});
