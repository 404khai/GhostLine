import { CyberpunkAvatar } from '@/components/cyberpunk/CyberpunkAvatar';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Mock Messages
const INITIAL_MESSAGES = [
  { id: '1', text: 'Hi, Asal', sender: 'them', time: 'Today' },
  { id: '2', text: 'How do you buy "nice" stuff?', sender: 'them', time: '' },
  { id: '3', text: 'Please help me find a good monitor for the design', sender: 'them', time: '' },
  { id: '4', text: 'What should i call u?', sender: 'me', time: '', isReply: true, replyTo: 'Zaire Dorwart' },
  { id: '5', text: 'Hi, Asal', sender: 'me', time: '' },
];

export default function ChatDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);

  // Reaction Menu Data
  const REACTIONS = ['🔥', '🙌', '😭', '🙈', '🙏', '😠'];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        
        <View style={styles.headerInfo}>
          <CyberpunkAvatar uri={`https://i.pravatar.cc/150?u=a042581f4e29026024d`} size={40} online={true} />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.headerName}>Zaire Dorwart</Text>
            <Text style={styles.headerStatus}>Online</Text>
          </View>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="videocam-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="call-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages */}
      <ScrollView contentContainerStyle={styles.messagesContainer}>
        <Text style={styles.dateSeparator}>Today</Text>
        
        {messages.map((msg) => (
          <TouchableOpacity 
            key={msg.id} 
            onLongPress={() => setSelectedMessage(msg.id)}
            activeOpacity={0.9}
            style={[
              styles.messageRow, 
              msg.sender === 'me' ? styles.myMessageRow : styles.theirMessageRow
            ]}
          >
            {msg.sender === 'them' && (
               <View style={{marginRight: 10, alignSelf: 'flex-end'}}>
                 <CyberpunkAvatar uri={`https://i.pravatar.cc/150?u=a042581f4e29026024d`} size={30} />
               </View>
            )}
            
            <View style={[
              styles.bubble, 
              msg.sender === 'me' ? styles.myBubble : styles.theirBubble,
              selectedMessage === msg.id && styles.selectedBubble
            ]}>
              {msg.isReply && (
                <View style={styles.replyContainer}>
                   <View style={styles.replyBar} />
                   <Text style={styles.replyName}>{msg.replyTo}</Text>
                   <Text style={styles.replyText}>What should i call u?</Text>
                </View>
              )}
              <Text style={[
                styles.messageText, 
                msg.sender === 'me' ? styles.myMessageText : styles.theirMessageText
              ]}>
                {msg.text}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.attachButton}>
          <Ionicons name="add" size={24} color={Colors.cyberpunk.primary} />
        </TouchableOpacity>
        <TextInput 
          style={styles.input} 
          placeholder="Type a message..." 
          placeholderTextColor="#666"
        />
        <TouchableOpacity style={styles.sendButton}>
           <Ionicons name="send" size={20} color="black" />
        </TouchableOpacity>
      </View>

      {/* Reaction / Action Menu Modal Overlay */}
      {selectedMessage && (
        <View style={StyleSheet.absoluteFill}>
           <TouchableOpacity 
             style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.8)'}} 
             activeOpacity={1}
             onPress={() => setSelectedMessage(null)}
           >
              {/* Positioned near bottom for demo, ideally calculated based on measure */}
              <View style={styles.contextMenu}>
                  {/* Selected Message Preview */}
                  <View style={[styles.bubble, styles.theirBubble, {marginBottom: 10}]}>
                     <Text style={styles.theirMessageText}>
                       Please help me find a good monitor for the design
                     </Text>
                  </View>

                  {/* Menu Box */}
                  <View style={styles.menuBox}>
                      <Text style={styles.menuLabel}>React</Text>
                      <View style={styles.reactionRow}>
                        {REACTIONS.map(r => (
                          <TouchableOpacity key={r} style={styles.reactionItem}>
                            <Text style={{fontSize: 24}}>{r}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                      
                      <View style={styles.divider} />
                      
                      <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuItemText}>Copy</Text>
                        <Ionicons name="copy-outline" size={20} color="white" />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuItemText}>Reply</Text>
                        <Ionicons name="arrow-undo-outline" size={20} color="white" />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuItemText}>Forward</Text>
                        <Ionicons name="arrow-redo-outline" size={20} color="white" />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.menuItem}>
                        <Text style={[styles.menuItemText, {color: '#FF3939'}]}>Delete</Text>
                        <Ionicons name="trash-outline" size={20} color="#FF3939" />
                      </TouchableOpacity>
                  </View>
              </View>
           </TouchableOpacity>
        </View>
      )}
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
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  backButton: {
    marginRight: 10,
  },
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerStatus: {
    color: '#39FF14',
    fontSize: 12,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 15,
  },
  iconButton: {
    padding: 5,
  },
  messagesContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  dateSeparator: {
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 12,
  },
  messageRow: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  myMessageRow: {
    justifyContent: 'flex-end',
  },
  theirMessageRow: {
    justifyContent: 'flex-start',
  },
  bubble: {
    padding: 12,
    borderRadius: 15,
    maxWidth: '75%',
  },
  theirBubble: {
    backgroundColor: '#1a1a1a',
    borderTopLeftRadius: 5,
  },
  myBubble: {
    backgroundColor: '#F0B90B', // Gold/Yellowish accent from image
    borderTopRightRadius: 5,
  },
  selectedBubble: {
    borderWidth: 1,
    borderColor: '#39FF14',
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  theirMessageText: {
    color: '#ddd',
  },
  myMessageText: {
    color: 'black',
    fontWeight: '500',
  },
  replyContainer: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 5,
    paddingLeft: 10,
    marginBottom: 5,
    borderRadius: 5,
    borderLeftWidth: 2,
    borderLeftColor: 'black',
  },
  replyBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: 'black',
  },
  replyName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.6)',
  },
  replyText: {
    fontSize: 10,
    color: 'rgba(0,0,0,0.6)',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#111',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  attachButton: {
    padding: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#222',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: 'white',
    marginHorizontal: 10,
  },
  sendButton: {
    backgroundColor: '#39FF14',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Context Menu Styles
  contextMenu: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
  },
  menuBox: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
  },
  menuLabel: {
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  reactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  reactionItem: {
    padding: 5,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: '#000',
  }
});
