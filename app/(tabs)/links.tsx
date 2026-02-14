import { CyberpunkAvatar } from '@/components/cyberpunk/CyberpunkAvatar';
import { CyberpunkButton } from '@/components/cyberpunk/CyberpunkButton';
import { CyberpunkChatRow } from '@/components/cyberpunk/CyberpunkChatRow';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Mock Data
const user1 = require('@/assets/images/user1.jpeg');
const user2 = require('@/assets/images/user2.jpeg');
const user3 = require('@/assets/images/user3.jpeg');
const user4 = require('@/assets/images/user4.jpeg');
const user5 = require('@/assets/images/user5.jpeg');
const user6 = require('@/assets/images/user6.jpg');


const STORIES = [
  { id: '1', name: 'Add Story', isAdd: true },
  { id: '2', name: 'Terry', source: user1 },
  { id: '3', name: 'Zoe', source: user2 },
  { id: '4', name: 'AX', source: user3 },
  { id: '5', name: 'Craig', source: user4 },
];

const CHATS = [
  { id: '1', name: 'Terry Curtis', message: 'Found a gig for cheap chrome...', time: '02:11', unread: 2, source: user1 },
  { id: '2', name: 'Zoe Zaine', message: 'New Sandevistans incoming 4pm..', time: '02:11', unread: 0, source: user2 },
  { id: '3', name: 'AX', message: 'Gotta tread carefully choom...', time: '02:11', unread: 2, source: user3 },
  { id: '4', name: 'Rhea M', message: 'The Endministrator has files...', time: '02:11', unread: 0, source: user5 },
  { id: '5', name: 'The Wasp', message: 'Implants arrived in one piece, b...', time: '02:11', unread: 0, source: user6 },
  
];

export default function ChatsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>LINKS</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={24} color={Colors.cyberpunk.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Stories Section (Now Proximity/Active) */}
        <View style={styles.storiesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }}>
            {STORIES.map((story, index) => (
              <View key={story.id} style={styles.storyItem}>
                {story.isAdd ? (
                  <CyberpunkAvatar size={60} backgroundColor="#0A0B10">
                    <Ionicons name="add" size={30} color="#00E5FF" />
                  </CyberpunkAvatar>
                ) : (
                  <CyberpunkAvatar source={story.source!} size={60} online={true} />
                )}
                <Text style={styles.storyName}>{story.name}</Text>
                {/* Latency indicator */}
                {!story.isAdd && <Text style={{ fontSize: 10, color: '#00E5FF', fontFamily: 'monospace' }}>12ms</Text>}
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Chats Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>ACTIVE FEEDS</Text>
          <Ionicons name="ellipsis-horizontal" size={20} color={Colors.cyberpunk.text} />
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
              avatarSource={chat.source}
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
    color: '#00E5FF',
    fontSize: 24,
    fontFamily: 'Doto_700Bold',
  },
  searchButton: {
    padding: 5,
  },
  storiesContainer: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  storyItem: {
    alignItems: 'center',
    marginRight: 15,
  },
  storyName: {
    color: 'white',
    fontSize: 12,
    marginTop: 5,
    fontFamily: 'Tektur_400Regular',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    color: '#666',
    fontSize: 14,
    fontFamily: 'Doto_700Bold',
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
