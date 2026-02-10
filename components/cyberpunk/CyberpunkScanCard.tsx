import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import Svg, { Circle, Line, Polyline } from 'react-native-svg';

interface CyberpunkScanCardProps {
  style?: ViewStyle;
  title?: string;
  content?: string;
}

export const CyberpunkScanCard: React.FC<CyberpunkScanCardProps> = ({
  style,
  title = "DATA SCAN",
  content = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat."
}) => {
  return (
    <View style={[styles.container, style]}>
      {/* Left Target Graphic */}
      <View style={styles.leftGraphic}>
        <Svg width={80} height={150}>
           {/* Target Circle */}
           <Circle cx={30} cy={80} r={15} stroke="white" strokeWidth={2} fill="none" />
           <Circle cx={30} cy={80} r={5} fill="#333" />
           {/* Crosshairs */}
           <Line x1={10} y1={80} x2={50} y2={80} stroke="white" strokeWidth={1} />
           <Line x1={30} y1={60} x2={30} y2={100} stroke="white" strokeWidth={1} />
           {/* Diagonal ticks around circle */}
           <Line x1={20} y1={70} x2={15} y2={65} stroke="white" strokeWidth={1} />
           <Line x1={40} y1={90} x2={45} y2={95} stroke="white" strokeWidth={1} />
           
           {/* Connecting Line to the text box */}
           {/* Starts from target, goes right, then up/down to the box */}
           {/* The image shows a line going from the target right, then angling up to the box header */}
           <Polyline 
             points="45,80 60,80 80,40" 
             fill="none" 
             stroke="white" 
             strokeWidth={1} 
           />
        </Svg>
      </View>

      {/* Main Content Box */}
      <View style={styles.contentBox}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>{title}</Text>
          {/* Diagonal Stripes underneath title */}
          <View style={styles.stripesContainer}>
            {[...Array(12)].map((_, i) => (
              <View key={i} style={styles.stripe} />
            ))}
          </View>
        </View>

        <Text style={styles.bodyText}>
          {content}
        </Text>
        
        {/* Decorative corner lines for the text box */}
        <View style={styles.cornerDecor} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 10,
  },
  leftGraphic: {
    width: 80,
    height: 150,
    justifyContent: 'center', // Align roughly with text
    marginTop: -20, // Adjust to align connection line
  },
  contentBox: {
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: 'white',
    paddingLeft: 10,
    paddingTop: 10,
    marginTop: 20, // Offset to match the line coming from bottom-left
  },
  header: {
    marginBottom: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 2,
  },
  stripesContainer: {
    flexDirection: 'row',
    height: 6,
    overflow: 'hidden',
  },
  stripe: {
    width: 4,
    height: 10,
    backgroundColor: '#666',
    marginRight: 2,
    transform: [{ skewX: '-30deg' }],
  },
  bodyText: {
    color: '#aaa',
    fontSize: 10,
    lineHeight: 14,
    fontFamily: 'monospace',
  },
  cornerDecor: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 10,
    height: 1,
    backgroundColor: 'white',
  }
});
