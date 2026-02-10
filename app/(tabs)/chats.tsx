import { CyberpunkAvatar } from '@/components/cyberpunk/CyberpunkAvatar';
import { CyberpunkButton } from '@/components/cyberpunk/CyberpunkButton';
import { CyberpunkChatRow } from '@/components/cyberpunk/CyberpunkChatRow';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Mock Data
const STORIES = [
  { id: '1', name: 'Add Story', isAdd: true },
  { id: '2', name: 'Terry', uri: 'https://i.pravatar.cc/150?u=a042581f4e29026024d' },
  { id: '3', name: 'Craig', uri: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
  { id: '4', name: 'Roger', uri: 'https://i.pravatar.cc/150?u=a04258114e29026302d' },
  { id: '5', name: 'Nolan', uri: 'https://i.pravatar.cc/150?u=a04258114e29026708c' },
];

const CHATS = [
  { id: '1', name: 'Angel Curtis', message: 'Please help me find a good monitor for t...', time: '02:11', unread: 2, uri: 'https://i.pravatar.cc/150?u=a042581f4e29026024d' },
  { id: '2', name: 'Zaire Dorwart', message: 'Gacor pisan kang', time: '02:11', unread: 0, uri: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
  { id: '3', name: 'Kelas Malam', message: 'Bima : No one can come today?', time: '02:11', unread: 2, uri: 'https://i.pravatar.cc/150?u=a04258114e29026302d' },
  { id: '4', name: 'Jocelyn Gouse', message: 'You\'re now an admin', time: '02:11', unread: 0, uri: 'https://i.pravatar.cc/150?u=a04258114e29026708c' },
  { id: '5', name: 'Jaylon Dias', message: 'Buy back 10k gallons, top up credit, b...', time: '02:11', unread: 0, uri: 'https://i.pravatar.cc/150?u=a048581f4e29026701d' },
  { id: '6', name: 'Chance Rhiel Madsen', message: 'Thank you mate!', time: '02:11', unread: 2, uri: 'https://i.pravatar.cc/150?u=a042581f4e29026024d' },
];

export default function ChatsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>GHOSTLINE</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Stories Section */}
        <View style={styles.storiesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }}>
            {STORIES.map((story, index) => (
              <View key={story.id} style={styles.storyItem}>
                {story.isAdd ? (
                  <View style={styles.addStoryCircle}>
                    <Ionicons name="add" size={30} color="black" />
                  </View>
                ) : (
                  <CyberpunkAvatar uri={story.uri!} size={60} online={true} />
                )}
                <Text style={styles.storyName}>{story.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Chats Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>CHATS</Text>
          <Ionicons name="ellipsis-horizontal" size={20} color="#666" />
        </View>

        {/* Chats List */}
        <View style={styles.listContainer}>
          {CHATS.map((chat) => (
            <CyberpunkChatRow
              key={chat.id}
              name={chat.name}
              message={chat.message}
              time={chat.time}
              unreadCount={chat.unread}
              avatarUri={chat.uri}
              onPress={() => router.push({ pathname: '/chat/[id]', params: { id: chat.id } })}
            />
          ))}
        </View>
      </ScrollView>

      {/* Floating Action Button (New Chat) */}
      <View style={styles.fabContainer}>
         <CyberpunkButton 
            label="NEW CHAT" 
            value="INIT" 
            onPress={() => router.push('/modal/new-chat')} 
            style={{ width: '100%' }} // Let it take width but aligned right
         />
      </View>
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
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  headerTitle: {
    color: '#39FF14',
    fontSize: 28,
    fontFamily: 'PixelifySans_700Bold',
    letterSpacing: 2,
  },
  searchButton: {
    padding: 5,
  },
  storiesContainer: {
    marginBottom: 20,
  },
  storyItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  addStoryCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#39FF14',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#39FF14',
    marginBottom: 5,
  },
  storyName: {
    color: 'white',
    marginTop: 5,
    fontSize: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    color: '#666',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  listContainer: {
    paddingBottom: 20,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    left: 20,
    alignItems: 'flex-end',
  }
});
