import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import Svg, { Line, Path, Polyline, Rect } from 'react-native-svg';

interface CyberpunkStatCardProps {
  style?: ViewStyle;
  value?: string; // e.g. "68%"
  label?: string; // e.g. "2049-TTR-4HF-1945"
  content?: string;
}

export const CyberpunkStatCard: React.FC<CyberpunkStatCardProps> = ({
  style,
  value = "68%",
  label = "2849-TTR-4HF-1945",
  content = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
}) => {
  const [layout, setLayout] = React.useState({ width: 0, height: 0 });

  const onLayout = (event: import('react-native').LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setLayout({ width, height });
  };

  const { width, height } = layout;

  return (
    <View style={[styles.container, style]}>
      {/* Left Icon (Diamond) */}
      <View style={styles.iconContainer}>
        <Svg width={40} height={40}>
          <Rect x={10} y={10} width={20} height={20} stroke="white" strokeWidth={1} fill="none" transform="rotate(45, 20, 20)" />
          <Rect x={15} y={15} width={10} height={10} fill="#666" transform="rotate(45, 20, 20)" />
          <Line x1={35} y1={20} x2={40} y2={20} stroke="white" strokeWidth={1} />
        </Svg>
      </View>

      {/* Main Box */}
      <View style={styles.mainBox}>
        {/* Connecting Line from Left Icon */}
        <View style={styles.connectorLine}>
            <Svg height={20} width={40}>
                <Polyline points="0,10 20,10 30,20" fill="none" stroke="white" strokeWidth={1} />
            </Svg>
        </View>

        {/* The Card Itself */}
        <View style={styles.cardContent} onLayout={onLayout}>
            {/* Top Label */}
            <Text style={styles.topLabel}>{label}</Text>
            
            <View style={styles.innerContent}>
                {/* Big Value */}
                <Text style={styles.valueText}>{value}</Text>
                
                {/* Stripes */}
                <View style={styles.stripes}>
                    {[...Array(10)].map((_, i) => (
                        <View key={i} style={styles.stripe} />
                    ))}
                </View>

                {/* Text */}
                <Text style={styles.text}>{content}</Text>
            </View>

            {/* Border with Cut Corner (Simulated with Svg absolute overlay) */}
            <View style={StyleSheet.absoluteFill} pointerEvents="none">
                {width > 0 && height > 0 && (
                  <Svg height={height} width={width}>
                      {/* Outline: 
                          Start top-left (cut), go right, down, left, up (cut)
                          We'll just draw a border with a cut at Top-Left
                      */}
                      <Path 
                          d={`M 20 0 L ${width} 0 L ${width} ${height} L 0 ${height} L 0 20 L 20 0 Z`} 
                          fill="none" 
                          stroke="white" 
                          strokeWidth={1} 
                      />
                      {/* Inner detail line */}
                      <Path 
                          d={`M 22 4 L ${width - 5} 4`} 
                          fill="none" 
                          stroke="white" 
                          strokeWidth={0.5} 
                      />
                  </Svg>
                )}
            </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  iconContainer: {
    width: 40,
    alignItems: 'center',
  },
  mainBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  connectorLine: {
    width: 30,
    height: 20,
    marginTop: 10, // Adjust vertical alignment
  },
  cardContent: {
    flex: 1,
    padding: 15,
    paddingTop: 25, // Space for the cut corner
    minHeight: 100,
    marginLeft: -5, // Pull closer to connector
  },
  topLabel: {
    position: 'absolute',
    top: -15,
    right: 0,
    color: 'white',
    fontSize: 8,
    backgroundColor: 'black',
    paddingHorizontal: 2,
  },
  innerContent: {
    // 
  },
  valueText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  stripes: {
    flexDirection: 'row',
    height: 4,
    marginVertical: 5,
    width: '60%',
  },
  stripe: {
    width: 3,
    height: 4,
    backgroundColor: '#fff',
    marginRight: 2,
    transform: [{ skewX: '-30deg' }],
  },
  text: {
    color: '#ccc',
    fontSize: 9,
    marginTop: 5,
    fontFamily: 'monospace',
  }
});
