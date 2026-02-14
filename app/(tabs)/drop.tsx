import { CyberpunkButton } from '@/components/cyberpunk/CyberpunkButton';
import { CyberpunkDangerBox } from '@/components/cyberpunk/CyberpunkDangerBox';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DropScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>DROP</Text>
        <Ionicons name="cube-outline" size={24} color="#39FF14" />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.infoSection}>
            <Text style={styles.description}>
                EPHEMERAL CONTENT HUB.
                DATA HERE IS VOLATILE.
            </Text>
        </View>

        <CyberpunkDangerBox 
            title="DEAD DROP #921"
            content="Encrypted payload available for 10:00 mins."
        />

        <View style={styles.actions}>
            <CyberpunkButton label="SELF-DESTRUCT MSG" onPress={() => {}} />
            <View style={{ height: 10 }} />
            <CyberpunkButton label="UPLOAD TIMED FILE" onPress={() => {}} variant="default" />
        </View>

        <View style={styles.logContainer}>
            <Text style={styles.logTitle}>RECENT ACTIVITY</Text>
            <Text style={styles.logEntry}>[14:02] Audio note expired</Text>
            <Text style={styles.logEntry}>[13:55] Image burned (1 view)</Text>
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
  infoSection: {
    marginBottom: 20,
  },
  description: {
    fontFamily: 'Tektur_400Regular',
    color: '#aaa',
    fontSize: 14,
    textAlign: 'center',
  },
  actions: {
    marginVertical: 20,
  },
  logContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: 'rgba(0, 240, 255, 0.05)',
  },
  logTitle: {
    fontFamily: 'GeistPixelSquare',
    color: Colors.cyberpunk.primary,
    marginBottom: 10,
    fontSize: 16,
  },
  logEntry: {
    fontFamily: 'monospace',
    color: '#666',
    marginBottom: 5,
  },
});
