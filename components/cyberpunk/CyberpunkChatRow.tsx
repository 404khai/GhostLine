import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '@/constants/theme';
import { CyberpunkAvatar } from './CyberpunkAvatar';

interface CyberpunkChatRowProps {
  name: string;
  message: string;
  time: string;
  avatarSource: any; // Changed from avatarUri to allow local requires
  unreadCount?: number;
  onPress: () => void;
}

export const CyberpunkChatRow: React.FC<CyberpunkChatRowProps> = ({
  name,
  message,
  time,
  avatarSource,
  unreadCount = 0,
  onPress
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.container}>
      {unreadCount > 0 && <View style={styles.leftBar} />}
      {/* Avatar */}
      <CyberpunkAvatar source={avatarSource} size={50} online={true} />

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
        <Text style={styles.message} numberOfLines={1}>{message}</Text>
      </View>

      {/* Unread Badge */}
      {unreadCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{unreadCount}</Text>
        </View>
      )}
      
      {/* Bottom Border Line */}
      <View style={styles.borderLine} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'relative',
  },
  leftBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: Colors.cyberpunk.warning,
  },
  content: {
    flex: 1,
    marginLeft: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  name: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Tektur_700Bold',
  },
  time: {
    color: '#666',
    fontSize: 12,
    fontFamily: 'PixelifySans_700Bold',
  },
  message: {
    color: '#aaa',
    fontSize: 14,
    fontFamily: 'GeistPixelSquare',
  },
  badge: {
    backgroundColor: Colors.cyberpunk.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  badgeText: {
    color: Colors.cyberpunk.background,
    fontSize: 10,
    fontWeight: 'bold',
  },
  borderLine: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 85, // Start after avatar
    height: 1,
    backgroundColor: '#333',
  }
});
