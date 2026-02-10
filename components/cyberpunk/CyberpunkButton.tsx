import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

interface CyberpunkButtonProps {
  style?: ViewStyle;
  label?: string;
  value?: string;
  onPress?: () => void;
}

export const CyberpunkButton: React.FC<CyberpunkButtonProps> = ({
  style,
  label = "DATA SCAN",
  value = "17%",
  onPress
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[styles.container, style]}>
        {/* Main Bar */}
        <View style={styles.barContainer}>
            {/* Background Shape */}
            <View style={StyleSheet.absoluteFill}>
                 <Svg height="100%" width="100%">
                    <Path 
                        d="M 10 0 L 100% 0 L 100% 100% L 20 100% L 0 70% L 0 10 Z" 
                        fill="#333" 
                        stroke="white" 
                        strokeWidth={1} 
                    />
                 </Svg>
            </View>
            
            <View style={styles.content}>
                <Text style={styles.label}>{label}</Text>
                <View style={styles.valueBox}>
                    <Text style={styles.valueText}>{value}</Text>
                </View>
            </View>
        </View>
        
        {/* Loading Bar underneath */}
        <View style={styles.loaderContainer}>
             <View style={styles.loaderBar} />
             {/* Dashed part */}
             <View style={styles.dashedPart}>
                 {[...Array(8)].map((_, i) => (
                     <View key={i} style={styles.dash} />
                 ))}
             </View>
        </View>

        {/* Connection Line */}
        <View style={styles.connectionLine}>
             <Svg height={20} width={100}>
                 <Path d="M 100 0 L 80 15 L 0 15" stroke="white" strokeWidth={1} fill="none" />
                 <Rect x={-2} y={13} width={4} height={4} fill="white" />
             </Svg>
        </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '100%',
    alignItems: 'flex-end', // Align to right usually for this shape
  },
  barContainer: {
    height: 40,
    width: 200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10,
  },
  label: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  valueBox: {
    backgroundColor: 'white',
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  valueText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 12,
  },
  loaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginRight: 0,
    width: 200,
    justifyContent: 'flex-end',
  },
  loaderBar: {
    height: 6,
    width: 100,
    backgroundColor: 'white',
    marginRight: 5,
  },
  dashedPart: {
    flexDirection: 'row',
  },
  dash: {
    width: 4,
    height: 6,
    backgroundColor: '#666',
    marginLeft: 2,
  },
  connectionLine: {
      position: 'absolute',
      bottom: -15,
      right: 180,
  }
});
