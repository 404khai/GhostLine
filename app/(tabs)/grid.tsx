import { CyberpunkButton } from '@/components/cyberpunk/CyberpunkButton';
import { CyberpunkScanCard } from '@/components/cyberpunk/CyberpunkScanCard';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GridScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>GRID</Text>
        <Ionicons name="grid-outline" size={24} color="#39FF14" />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.actionsGrid}>
            <View style={styles.actionItem}>
                <View style={styles.iconCircle}>
                    <Ionicons name="qr-code-outline" size={28} color="#39FF14" />
                </View>
                <Text style={styles.actionLabel}>SCAN IDENTITY</Text>
            </View>
            <View style={styles.actionItem}>
                <View style={styles.iconCircle}>
                    <Ionicons name="people-outline" size={28} color="#39FF14" />
                </View>
                <Text style={styles.actionLabel}>NEARBY USERS</Text>
            </View>
            <View style={styles.actionItem}>
                <View style={styles.iconCircle}>
                    <Ionicons name="wifi-outline" size={28} color="#39FF14" />
                </View>
                <Text style={styles.actionLabel}>PUBLIC FREQ</Text>
            </View>
            <View style={styles.actionItem}>
                <View style={styles.iconCircle}>
                    <Ionicons name="globe-outline" size={28} color="#39FF14" />
                </View>
                <Text style={styles.actionLabel}>RELAY CHANNELS</Text>
            </View>
        </View>

        <View style={styles.section}>
            <Text style={styles.sectionTitle}>DETECTED NETWORKS</Text>
            <CyberpunkScanCard />
        </View>

        <View style={styles.section}>
            <Text style={styles.sectionTitle}>TEMPORARY ROOMS</Text>
            <View style={styles.roomCard}>
                <Text style={styles.roomName}>#NightCity_Underground</Text>
                <Text style={styles.roomMeta}>24 Users • Encrypted</Text>
                <CyberpunkButton label="JOIN" onPress={() => {}} style={{ marginTop: 10 }} />
            </View>
            <View style={{ height: 10 }} />
            <View style={styles.roomCard}>
                <Text style={styles.roomName}>#Tech_Bazaar_Open</Text>
                <Text style={styles.roomMeta}>112 Users • Public</Text>
                <CyberpunkButton label="JOIN" onPress={() => {}} variant="default" style={{ marginTop: 10 }} />
            </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerTitle: {
    fontFamily: 'Doto_700Bold',
    fontSize: 24,
    color: '#39FF14',
  },
  content: {
    padding: 20,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  actionItem: {
    width: '48%',
    backgroundColor: 'rgba(0, 240, 255, 0.05)',
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#39FF14',
  },
  actionLabel: {
    fontFamily: 'Tektur_700Bold',
    color: 'white',
    fontSize: 12,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontFamily: 'GeistPixelSquare',
    color: '#666',
    fontSize: 14,
    marginBottom: 15,
  },
  roomCard: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#0a0a0a',
  },
  roomName: {
    fontFamily: 'Tektur_700Bold',
    color: '#39FF14',
    fontSize: 16,
    marginBottom: 5,
  },
  roomMeta: {
    fontFamily: 'monospace',
    color: '#aaa',
    fontSize: 12,
  },
});
