import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { CyberpunkButton } from '@/components/cyberpunk/CyberpunkButton';

export default function NewChatModal() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Dimmed Background */}
      <TouchableOpacity 
        style={StyleSheet.absoluteFill} 
        activeOpacity={1} 
        onPress={() => router.back()}
      >
        <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.7)'}} />
      </TouchableOpacity>

      {/* Bottom Sheet Content */}
      <View style={styles.sheet}>
        <View style={styles.optionsContainer}>
          <CyberpunkButton 
             label="NEW CHAT" 
             variant="simple"
             icon={<Ionicons name="chatbubble-ellipses-outline" size={20} color="white" />}
             onPress={() => console.log('New Chat')}
             style={{ width: '100%' }}
          />
          <CyberpunkButton 
             label="NEW CONTACT" 
             variant="simple"
             icon={<Ionicons name="person-add-outline" size={20} color="white" />}
             onPress={() => console.log('New Contact')}
             style={{ width: '100%' }}
          />
          <CyberpunkButton 
             label="NEW COMMUNITY" 
             variant="simple"
             icon={<Ionicons name="people-outline" size={20} color="white" />}
             onPress={() => console.log('New Community')}
             style={{ width: '100%' }}
          />
        </View>

        <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
          <Text style={styles.cancelText}>CANCEL</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#050505',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingBottom: 40,
  },
  optionsContainer: {
    marginBottom: 20,
    gap: 10,
    alignItems: 'flex-end'
  },
  cancelButton: {
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#333',
  },
  cancelText: {
    color: '#666',
    fontWeight: 'bold',
    letterSpacing: 2,
  }
});
