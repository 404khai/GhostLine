import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import Svg, { Line, Path } from 'react-native-svg';

interface CyberpunkDangerBoxProps {
  style?: ViewStyle;
  title?: string;
  content?: string;
}

export const CyberpunkDangerBox: React.FC<CyberpunkDangerBoxProps> = ({ 
  style, 
  title = "DANGER", 
  content = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat." 
}) => {
  const cutSize = 20;
  const strokeWidth = 2;

  return (
    <View style={[styles.container, style]}>
      {/* Background SVG Frame */}
      <View style={StyleSheet.absoluteFill}>
        <Svg height="100%" width="100%">
          {/* Main Frame Path */}
          {/* We use a path that cuts the top-left and bottom-right corners */}
          {/* Since we don't know exact width/height in SVG without onLayout, 
              we can use percentage or just use a View with borders for a simpler approach if the shape allows.
              But for angled corners, SVG with percentage is tricky because 'L 100% 100%' works but 'L 100%-20' doesn't directly.
              
              However, we can use a View-based approach with rotation for the corners, OR
              just draw a fixed size or responsive SVG if we measure layout.
              
              Let's try a responsive approach using View borders and some absolute positioned covers for the cuts.
              ACTUALLY, for a high-fidelity cyberpunk look, SVG is best.
              I will assume a fixed aspect ratio or measure it.
              
              Let's use a simple trick: 
              A View with white border.
              Two small black triangles (or background color) absolute positioned to hide the corners.
              Then draw a white line to close the cut.
           */}
           
           {/* Let's try the absolute SVG approach that renders lines based on 100% */}
           <Path
             d={`M ${cutSize} 2 L 98% 2 L 100% ${cutSize} L 100% 98% L 98% 100% L ${cutSize} 100% L 0 98% L 0 ${cutSize} Z`}
             fill="none"
             stroke="white"
             strokeWidth={strokeWidth}
             // Note: SVG paths with % are not standard in all RN versions, but react-native-svg supports some.
             // If % fails, we'll fall back to measuring. 
             // Let's use measuring wrapper.
           />
        </Svg>
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>{title}</Text>
          <View style={styles.iconContainer}>
             <Ionicons name="warning" size={20} color="black" />
          </View>
        </View>

        {/* Text Body */}
        <Text style={styles.bodyText}>
          {content}
        </Text>
      </View>

      {/* Right Side Decoration (The ladder/stripes) */}
      <View style={styles.rightDecoration}>
         {[...Array(5)].map((_, i) => (
           <View key={i} style={styles.stripe} />
         ))}
      </View>
      
      {/* Corner Pieces to simulate the cut if SVG is tricky, 
          but actually I will use a layout-aware component in the next iteration if needed. 
          For now, let's implement a 'Measurable' SVG approach or just simple absolute SVGs for corners.
      */}
      
      <CornerCut position="top-left" size={cutSize} />
      <CornerCut position="bottom-right" size={cutSize} />
      
      {/* Borders connecting the cuts */}
      {/* Top */}
      <View style={[styles.border, { top: 0, left: cutSize, right: 0, height: 2 }]} />
      {/* Bottom */}
      <View style={[styles.border, { bottom: 0, left: 0, right: cutSize, height: 2 }]} />
      {/* Left */}
      <View style={[styles.border, { top: cutSize, bottom: 0, left: 0, width: 2 }]} />
      {/* Right */}
      <View style={[styles.border, { top: 0, bottom: cutSize, right: 0, width: 2 }]} />

    </View>
  );
};

// Helper for the angled corner line
const CornerCut = ({ position, size }: { position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right', size: number }) => {
  const isTop = position.startsWith('top');
  const isLeft = position.endsWith('left');
  
  return (
    <View style={{
      position: 'absolute',
      [isTop ? 'top' : 'bottom']: 0,
      [isLeft ? 'left' : 'right']: 0,
      width: size,
      height: size,
    }}>
      <Svg height={size} width={size}>
        <Line 
          x1={isLeft ? 0 : size} 
          y1={isTop ? size : 0} 
          x2={isLeft ? size : 0} 
          y2={isTop ? 0 : size} 
          stroke="white" 
          strokeWidth={2} 
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'black', // Assuming black background for cyberpunk
    minHeight: 150,
    marginVertical: 10,
  },
  contentContainer: {
    flex: 1,
    paddingRight: 20, // Space for decoration
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingBottom: 5,
    alignSelf: 'flex-start',
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginRight: 10,
  },
  iconContainer: {
    backgroundColor: 'white',
    padding: 2,
    borderRadius: 2, // Slightly rounded or sharp
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyText: {
    color: '#ccc',
    fontSize: 10,
    lineHeight: 14,
    fontFamily: 'monospace', // Or a system font
  },
  rightDecoration: {
    position: 'absolute',
    right: 5,
    top: 20,
    bottom: 20,
    width: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  stripe: {
    width: 6,
    height: 15,
    backgroundColor: 'white',
    transform: [{ skewY: '-20deg' }], // Slight angle
    marginVertical: 2,
  },
  border: {
    position: 'absolute',
    backgroundColor: 'white',
  }
});
