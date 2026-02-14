import { CyberpunkButton } from '@/components/cyberpunk/CyberpunkButton';
import { CyberpunkStatCard } from '@/components/cyberpunk/CyberpunkStatCard';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function TerminalScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>TERMINAL</Text>
        <Ionicons name="terminal-outline" size={24} color={Colors.cyberpunk.primary} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.identitySection}>
            <Text style={styles.aliasLabel}>CURRENT ALIAS</Text>
            <Text style={styles.alias}>GHOST_0x44</Text>
            <Text style={styles.idHash}>ID: 8F2A-99C1-44B2</Text>
        </View>

        <View style={styles.statsRow}>
            <CyberpunkStatCard label="UPTIME" value="99.9%" />
            <View style={{ width: 10 }} />
            <CyberpunkStatCard label="SEC_LEVEL" value="HIGH" />
        </View>

        <View style={styles.menuList}>
            <View style={styles.menuItem}>
                <Text style={styles.menuText}>ENCRYPTION KEYS</Text>
                <Ionicons name="key-outline" size={20} color="#00E5FF" />
            </View>
            <View style={styles.menuItem}>
                <Text style={styles.menuText}>DEVICE PAIRING</Text>
                <Ionicons name="bluetooth-outline" size={20} color="#00E5FF" />
            </View>
            <View style={styles.menuItem}>
                <Text style={styles.menuText}>SESSION LOGS</Text>
                <Ionicons name="document-text-outline" size={20} color="#00E5FF" />
            </View>
            <View style={styles.menuItem}>
                <Text style={styles.menuText}>STEALTH MODE</Text>
                <Ionicons name="eye-off-outline" size={20} color="#00E5FF" />
            </View>
        </View>

        <View style={styles.dangerZone}>
            <CyberpunkButton label="WIPE SESSION" onPress={() => {}} style={{ borderColor: '#FFD400' }} />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cyberpunk.background,
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
    color: '#00E5FF',
  },
  content: {
    padding: 20,
  },
  identitySection: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#00E5FF',
    backgroundColor: 'rgba(0, 229, 255, 0.1)',
  },
  aliasLabel: {
    fontFamily: 'monospace',
    color: '#00E5FF',
    fontSize: 12,
  },
  alias: {
    fontFamily: 'GeistPixelSquare',
    color: 'white',
    fontSize: 32,
    marginVertical: 5,
  },
  idHash: {
    fontFamily: 'monospace',
    color: '#666',
    fontSize: 14,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  menuList: {
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  menuText: {
    fontFamily: 'Tektur_400Regular',
    color: 'white',
    fontSize: 16,
  },
  dangerZone: {
    marginTop: 20,
  },
});
