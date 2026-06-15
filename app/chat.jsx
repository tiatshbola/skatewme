import { useState } from 'react'
import { View, Text, Image, Pressable, TextInput, ScrollView, StyleSheet, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import * as ImagePicker from 'expo-image-picker'
import ScreenWrapper from '../components/ScreenWrapper'
import BackButton from '../components/BackButton'
import { useTheme } from '../context/UserContext'

{/* the actual chat screen you land on from the messages list */}
const Chat = () => {
  const router = useRouter()
  {/* name comes in from the route so i know whose chat to show */}
  const { name } = useLocalSearchParams()
  const { bg, text, mutedText, darkMode } = useTheme()
  const [input, setInput] = useState('')

  {/* profile info for each person so tapping the header can open their details page */}
  const profiles = {
    'Sain Na Liu': { title: 'Sain Na Liu', subtitle: '@ForTheGirls_SK8', location: 'North London', joined: '2023', skateLevel: 'Advanced', description: 'London roller, all-girls skate sessions, always down for Friday socials.', buttonText: 'Friends', accentColor: '#ff7a00' },
    'Tim Donald': { title: 'Tim Donald', subtitle: '@aresenal_skater56', location: 'South London', joined: '1996', skateLevel: 'Intermediate', description: 'South London skater, Arsenal fan, been on the rink since 96.', buttonText: 'Friends', accentColor: '#ff7a00' },
    'Jess Mason': { title: 'Jess Mason', subtitle: '@jess.mason', location: 'East London', joined: '2022', skateLevel: 'Beginner', description: 'Roller, event host, lover of group socials.', buttonText: 'Friends', accentColor: '#ff7a00' },
    'Beginner Skate Session': { title: 'Beginner Skate Session', subtitle: 'Community', location: 'London, UK', description: 'A friendly community for beginner skaters. Easy weekly sessions to learn the basics, all welcome.', buttonText: 'View group', accentColor: '#8a6e6e' },
    'SE Skaters': { title: 'SE Skaters', subtitle: 'Event organiser', location: 'South East London', description: 'Hosts casual evening skates around South London. £3 entry.', buttonText: 'View events', accentColor: '#7c3aed' },
  }

  const statuses = { 'Beginner Skate Session': '20 people active', 'SE Skaters': '12 people active' }

  {/* fake message history for each chat, keyed by name. new messages get added onto here */}
  const [messages, setMessages] = useState({
    'Sain Na Liu': [
      { text: 'Hey! You coming to the South London Skate?', sender: 'them' },
      { text: 'Yeah definitely! What time?', sender: 'me' },
      { text: 'Meeting at Burgess Park around 7pm', sender: 'them' },
      { text: 'Perfect, see you there', sender: 'me' },
      { text: 'see you Saturday! bring sunscreen', sender: 'them' },
    ],
    'Tim Donald': [
      { text: 'you joining the night skate?', sender: 'them' },
      { text: 'Yeah definitely! What time?', sender: 'me' },
      { text: '7pm at Burgess Park', sender: 'them' },
    ],
    'Beginner Skate Session': [
      { text: 'Welcome to the group!', sender: 'them' },
      { text: 'Is this session ok for total beginners?', sender: 'me' },
      { text: 'Definitely! we start with the basics every week', sender: 'them' },
      { text: 'Perfect, see you Saturday', sender: 'me' },
    ],
    'SE Skaters': [
      { text: 'Hey Sk8er, our session is commencing tomorrow', sender: 'them' },
      { text: 'Meeting at Burgess Park around 7pm', sender: 'them' },
    ],
    'Jess Mason': [
      { text: 'Hey hun, me and Tim are going to skate tomorrow at Burgess Park around 7, you down?', sender: 'me' },
      { text: 'thanks for the invite! i will see what i can do', sender: 'them' },
    ],
  })

  {/* just the messages for the person the user is chatting to */}
  const currentMessages = messages[name] || []

  {/* add users typed message to the bottom of this chat */}
  const sendMessage = () => {
    if (!input.trim()) return
    setMessages({ ...messages, [name]: [...(messages[name] || []), { text: input, sender: 'me' }] })
    setInput('')
  }

  {/* open the photo library and send whatever they pick as an image message */}
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    })
    if (!result.canceled) {
      setMessages({ ...messages, [name]: [...(messages[name] || []), { imageUri: result.assets[0].uri, sender: 'me' }] })
    }
  }

  {/* tapping the name at the top opens that person's profile */}
  const openProfile = () => {
    const profile = profiles[name]
    if (profile) router.push({ pathname: '/details', params: profile })
  }

  {/* long pressing a message lets you report it , for safety */}
  const reportMessage = () => {
    Alert.alert(
      'Message options',
      undefined,
      [
        { text: 'Report message', style: 'destructive', onPress: () => Alert.alert('Reported', 'Thanks. Our team will review this message.') },
        { text: 'Cancel', style: 'cancel' },
      ]
    )
  }

  const themBubbleBg = darkMode ? '#2a2a2a' : '#f5f5f5'
  const themBubbleColor = darkMode ? '#fff' : '#000'
  const inputBg = darkMode ? '#222' : '#f5f5f5'
  const borderColor = darkMode ? '#222' : '#eee'

  return (
    <ScreenWrapper>
      <View style={[styles.container, { backgroundColor: bg }]}>

        <View style={[styles.header, { borderBottomColor: borderColor }]}>
          <BackButton router={router} />
          <Pressable style={styles.profileTap} onPress={openProfile}>
            <View style={[styles.avatar, { backgroundColor: '#d4c4b8' }]} />
            <View style={styles.headerText}>
              <Text style={[styles.name, { color: text }]}>{name}</Text>
              <Text style={styles.activeStatus}>{statuses[name] || 'Active now'}</Text>
            </View>
          </Pressable>
        </View>

        {/* all the message bubbles - mine go orange on the right, theirs grey on the left */}
        <ScrollView style={styles.messages} contentContainerStyle={styles.messagesContent}>
          {currentMessages.map((msg, i) => (
            <Pressable
              key={i}
              onLongPress={reportMessage}
              style={[styles.bubbleRow, { justifyContent: msg.sender === 'me' ? 'flex-end' : 'flex-start' }]}
            >
              {msg.imageUri ? (
                <Image source={{ uri: msg.imageUri }} style={styles.bubbleImage} />
              ) : (
                <Text style={[
                  styles.bubble,
                  msg.sender === 'me'
                    ? styles.bubbleMe
                    : { backgroundColor: themBubbleBg, color: themBubbleColor, borderBottomLeftRadius: 4 }
                ]}>
                  {msg.text}
                </Text>
              )}
            </Pressable>
          ))}
        </ScrollView>

        {/* bottom bar , plus button for photos, text box, and the send button */}
        <View style={[styles.inputBar, { borderTopColor: borderColor }]}>
          <Pressable onPress={pickImage}>
            <Ionicons name="add" size={26} color={mutedText} />
          </Pressable>
          <TextInput
            style={[styles.input, { backgroundColor: inputBg, color: text }]}
            placeholder="Type a message..."
            placeholderTextColor={mutedText}
            value={input}
            onChangeText={setInput}
          />
          <Pressable style={styles.sendButton} onPress={sendMessage}>
            <Ionicons name="send" size={18} color="#fff" />
          </Pressable>
        </View>

      </View>
    </ScreenWrapper>
  )
}

export default Chat

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 0.5 },
  profileTap: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  avatar: { width: 36, height: 36, borderRadius: 18 },
  headerText: { flex: 1 },
  name: { fontSize: 16, fontWeight: '600' },
  activeStatus: { fontSize: 11, color: '#22c55e' },
  messages: { flex: 1 },
  messagesContent: { padding: 16, gap: 8 },
  bubbleRow: { flexDirection: 'row' },
  bubble: { maxWidth: '75%', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 18, fontSize: 14, lineHeight: 20 },
  bubbleMe: { backgroundColor: '#ff7a00', color: '#fff', borderBottomRightRadius: 4 },
  bubbleImage: { width: 200, height: 200, borderRadius: 18 },
  inputBar: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 14, paddingVertical: 10, borderTopWidth: 0.5 },
  input: { flex: 1, borderRadius: 22, paddingHorizontal: 16, paddingVertical: 10, fontSize: 14 },
  sendButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#ff7a00', alignItems: 'center', justifyContent: 'center' },
})