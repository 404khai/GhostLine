import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { CyberpunkButton } from '@/components/cyberpunk/CyberpunkButton';
import { CyberpunkDangerBox } from '@/components/cyberpunk/CyberpunkDangerBox';
import { CyberpunkScanCard } from '@/components/cyberpunk/CyberpunkScanCard';
import { CyberpunkStatCard } from '@/components/cyberpunk/CyberpunkStatCard';
import { ThemedText } from '@/components/themed-text';

export default function TabTwoScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Ghostline UI' }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <ThemedText type="title" style={styles.pageTitle}>Ghostline Components</ThemedText>
        
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Danger Box</ThemedText>
          <CyberpunkDangerBox />
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Scan Card</ThemedText>
          <CyberpunkScanCard />
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Stat Card</ThemedText>
          <CyberpunkStatCard />
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Action Button</ThemedText>
          <View style={{ alignItems: 'center' }}>
             <CyberpunkButton onPress={() => console.log('Scan pressed')} />
          </View>
        </View>
        
        <View style={{height: 50}} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  contentContainer: {
    padding: 20,
    paddingTop: 60,
  },
  pageTitle: {
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'monospace',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#666',
    marginBottom: 10,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
});
