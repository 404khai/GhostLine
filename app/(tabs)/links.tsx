import { CyberpunkAvatar } from '@/components/cyberpunk/CyberpunkAvatar';
import { CyberpunkButton } from '@/components/cyberpunk/CyberpunkButton';
import { CyberpunkChatRow } from '@/components/cyberpunk/CyberpunkChatRow';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

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
      
      <View style={styles.hero}>
        <View style={styles.heroTop}>
          <View>
            <Text style={styles.protocol}>Protocol: GhostLine v.4.0.2</Text>
            <Text style={styles.heroTitle}>
              PEERS <Text style={styles.heroTitleAccent}>ONLINE</Text>
            </Text>
          </View>
          <View style={styles.heroRight}>
            <Text style={styles.sysReady}>SYS_READY</Text>
            <Text style={styles.ipAddr}>192.168.0.254</Text>
          </View>
        </View>
        <View style={styles.heroMeter}>
          <View style={styles.meterLine} />
          <View style={styles.meterDot} />
          <View style={[styles.meterLine, { width: 48 }]} />
        </View>
      </View>

      <View style={styles.netBar}>
        <Text style={styles.netBarText}>Grid Status: Active</Text>
        <Text style={styles.netBarText}>• 10.4 kb/s</Text>
        <Text style={styles.netBarText}>Uptime: 04:12:44</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
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
                {!story.isAdd && <Text style={{ fontSize: 10, color: '#00E5FF', fontFamily: 'monospace' }}>12ms</Text>}
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>ACTIVE FEEDS</Text>
          <Ionicons name="ellipsis-horizontal" size={20} color={Colors.cyberpunk.text} />
        </View>

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

      <View style={styles.fabContainer}>
         <CyberpunkButton 
            label="INITIATE LINK" 
            value="LINK" 
            onPress={() => router.push('/modal/new-chat')} 
            style={{ width: '100%' }} 
         />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cyberpunk.background,
  },
  hero: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#0c0d14',
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  protocol: {
    color: 'rgba(0,229,255,0.6)',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 3,
    fontWeight: '700',
  },
  heroTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  heroTitleAccent: {
    color: Colors.cyberpunk.primary,
  },
  heroRight: {
    alignItems: 'flex-end',
  },
  sysReady: {
    color: Colors.cyberpunk.warning,
    fontSize: 12,
    fontFamily: 'monospace',
  },
  ipAddr: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 10,
    fontFamily: 'monospace',
  },
  heroMeter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  meterLine: {
    height: 2,
    flex: 1,
    backgroundColor: 'rgba(0,25,255,0.4)',
  },
  meterDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.cyberpunk.primary,
  },
  netBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: 'rgba(0,25,255,0.2)',
    backgroundColor: 'rgba(0,25,255,0.1)',
  },
  netBarText: {
    fontSize: 10,
    color: 'rgba(0,229,255,0.8)',
    fontWeight: '700',
    textTransform: 'uppercase',
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
