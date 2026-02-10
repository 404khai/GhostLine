import React from 'react';
import { ImageSourcePropType, StyleSheet, View } from 'react-native';
import Svg, { ClipPath, Defs, Path, Rect, Image as SvgImage } from 'react-native-svg';

interface CyberpunkAvatarProps {
  source?: ImageSourcePropType | string; // Optional now
  size?: number;
  online?: boolean;
  children?: React.ReactNode;
  backgroundColor?: string;
}

export const CyberpunkAvatar: React.FC<CyberpunkAvatarProps> = ({ source, size = 60, online = false, children, backgroundColor = 'transparent' }) => {
  // Convert uri string to object if needed for SvgImage?
  // SvgImage href accepts string (uri) or number (require) directly in newer versions, 
  // or {uri: string} object.
  // We'll normalize it if it exists.
  const imageSource = source ? (typeof source === 'string' ? { uri: source } : source) : null;
  
  // Unique ID for clip path to avoid conflicts
  const clipId = `clip-${Math.random().toString(36).substr(2, 9)}`;

  // Design Constants
  // The frame is roughly rectangular with cut corners.
  // We want to scale the path to the size.
  // Since path data with percentages is flaky on native, we construct the path string dynamically.
  
  const w = size;
  const h = size; // Keeping it square for avatar usage, or we could support aspect ratio.
                  // Most chat avatars are square. The reference image is portrait. 
                  // If we use square, we just compress the height.
                  // Let's stick to square for consistency in lists, but the design will look "techy".

  const cut = size * 0.15; // 15% corner cut
  const strokeWidth = 2;
  const color = "#39FF14"; // Cyan/Blue from the image

  // Shape Logic
  // Main octagon-like shape (chamfered box)
  // M cut,0 L w-cut,0 L w,cut L w,h-cut L w-cut,h L cut,h L 0,h-cut L 0,cut Z
  const mainPath = `
    M ${cut} 0 
    L ${w - cut} 0 
    L ${w} ${cut} 
    L ${w} ${h - cut} 
    L ${w - cut} ${h} 
    L ${cut} ${h} 
    L 0 ${h - cut} 
    L 0 ${cut} 
    Z
  `;

  // Corner Brackets (The "Clips")
  // Top-Left
  const tlBracket = `M 0 ${cut*2} L 0 ${cut} L ${cut} 0 L ${cut*2} 0`;
  // Top-Right
  const trBracket = `M ${w - cut*2} 0 L ${w - cut} 0 L ${w} ${cut} L ${w} ${cut*2}`;
  // Bottom-Right
  const brBracket = `M ${w} ${h - cut*2} L ${w} ${h - cut} L ${w - cut} ${h} L ${w - cut*2} ${h}`;
  // Bottom-Left
  const blBracket = `M ${cut*2} ${h} L ${cut} ${h} L 0 ${h - cut} L 0 ${h - cut*2}`;

  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
        <Defs>
          <ClipPath id={clipId}>
            <Path d={mainPath} />
          </ClipPath>
        </Defs>

        {/* Background Fill (if no source or if background color needed behind) */}
        <Path d={mainPath} fill={backgroundColor} />

        {/* The Image masked by the shape */}
        {imageSource && (
          <SvgImage
            x="0"
            y="0"
            width={size}
            height={size}
            preserveAspectRatio="xMidYMid slice"
            href={imageSource}
            clipPath={`url(#${clipId})`}
          />
        )}

        {/* Inner Border (Thin) */}
        <Path
          d={mainPath}
          stroke={color}
          strokeWidth={1}
          fill="none"
          opacity={0.5}
        />

        {/* Corner Brackets (Thicker, brighter) */}
        <Path d={tlBracket} stroke={color} strokeWidth={2} fill="none" />
        <Path d={trBracket} stroke={color} strokeWidth={2} fill="none" />
        <Path d={brBracket} stroke={color} strokeWidth={2} fill="none" />
        <Path d={blBracket} stroke={color} strokeWidth={2} fill="none" />

      </Svg>

      {/* Children (Icon, etc.) */}
      {children && (
        <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
            {children}
        </View>
      )}

      {/* Online Indicator - Updated to be a small diamond or rect to match theme */}
      {online && (
        <View style={styles.onlineBadge}>
            <Svg width={14} height={14}>
                <Rect x={2} y={2} width={10} height={10} fill="#39FF14" stroke="black" strokeWidth={2} transform="rotate(45, 7, 7)" />
            </Svg>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  onlineBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 14,
    height: 14,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
