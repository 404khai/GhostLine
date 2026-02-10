import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface CyberpunkAvatarProps {
  uri: string;
  size?: number;
  online?: boolean;
}

export const CyberpunkAvatar: React.FC<CyberpunkAvatarProps> = ({ uri, size = 60, online = false }) => {
  const strokeWidth = 2;
  const radius = size / 2;
  const innerRadius = radius - strokeWidth - 2;

  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      {/* Neon Ring */}
      <Svg height={size} width={size} style={StyleSheet.absoluteFill}>
        <Circle
          cx={radius}
          cy={radius}
          r={radius - 1}
          stroke="#39FF14"
          strokeWidth={strokeWidth}
          strokeDasharray={online ? undefined : "10, 5"} // Dashed if offline/default, solid if online
          fill="none"
          opacity={0.8}
        />
      </Svg>
      
      {/* Image */}
      <Image
        source={{ uri }}
        style={{
          width: innerRadius * 2,
          height: innerRadius * 2,
          borderRadius: innerRadius,
        }}
      />
      
      {/* Online Dot */}
      {online && (
        <View style={[styles.onlineDot, { bottom: 0, right: 0 }]} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  onlineDot: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#39FF14',
    borderWidth: 2,
    borderColor: 'black',
  }
});
