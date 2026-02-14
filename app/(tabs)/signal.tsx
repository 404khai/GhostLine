import { CyberpunkButton } from '@/components/cyberpunk/CyberpunkButton';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignalScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SIGNAL</Text>
        <Ionicons name="radio-outline" size={24} color="#39FF14" />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.alertBanner}>
            <Ionicons name="warning-outline" size={24} color="#39FF14" />
            <Text style={styles.alertText}>INCOMING TRANSMISSION DETECTED</Text>
        </View>

        <View style={styles.section}>
            <Text style={styles.sectionTitle}>CONNECTION ATTEMPTS</Text>
            
            <View style={styles.requestCard}>
                <View style={styles.requestHeader}>
                    <Text style={styles.requestName}>UNKNOWN_RELAY_44</Text>
                    <Text style={styles.requestTime}>0s ago</Text>
                </View>
                <Text style={styles.requestMeta}>Signal Strength: -42dBm</Text>
                <View style={styles.requestActions}>
                    <CyberpunkButton label="ACCEPT" onPress={() => {}} style={{ flex: 1, marginRight: 5 }} />
                    <CyberpunkButton label="DENY" onPress={() => {}} variant="default" style={{ flex: 1, marginLeft: 5 }} />
                </View>
            </View>
        </View>

        <View style={styles.section}>
            <Text style={styles.sectionTitle}>SYSTEM ALERTS</Text>
            <View style={styles.logItem}>
                <Text style={styles.logText}> Network mesh sync completed</Text>
            </View>
            <View style={styles.logItem}>
                <Text style={styles.logText}> Trust handshake initiated by Peer-9</Text>
            </View>
            <View style={styles.logItem}>
                <Text style={styles.logText}> Encryption keys rotated</Text>
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
    color: Colors.cyberpunk.primary,
  },
  content: {
    padding: 20,
  },
  alertBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 240, 255, 0.1)',
    borderWidth: 1,
    borderColor: '#39FF14',
    padding: 15,
    marginBottom: 30,
  },
  alertText: {
    fontFamily: 'Tektur_700Bold',
    color: '#39FF14',
    marginLeft: 10,
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
  requestCard: {
    borderWidth: 1,
    borderColor: '#333',
    padding: 15,
    backgroundColor: '#0a0a0a',
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  requestName: {
    fontFamily: 'Tektur_700Bold',
    color: 'white',
    fontSize: 16,
  },
  requestTime: {
    fontFamily: 'monospace',
    color: '#666',
    fontSize: 12,
  },
  requestMeta: {
    fontFamily: 'monospace',
    color: '#aaa',
    fontSize: 12,
    marginBottom: 15,
  },
  requestActions: {
    flexDirection: 'row',
  },
  logItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#111',
  },
  logText: {
    fontFamily: 'monospace',
    color: '#888',
    fontSize: 12,
  },
});
