import { View, Text, ScrollView, Pressable, StyleSheet, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { useRouter } from 'expo-router'
import ScreenWrapper from '../../components/ScreenWrapper'
import { useTheme } from '../../context/UserContext'

{/* messages tab for active friends across the top then a list of chats */}
const Forum = () => {
  const router = useRouter()
  const { text, mutedText, inputBg, card } = useTheme()

  {/* track which chats have been opened, hides the unread dot after */}
  const [sainRead, setSainRead] = useState(false)
  const [timRead, setTimRead] = useState(false)
  const [query, setQuery] = useState('')
  {/* true if theres no search or the name contains what they typed */}
  const matches = (n) => !query || n.toLowerCase().includes(query.toLowerCase())

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.scroll}>

        <View style={styles.header}>
          <Text style={[styles.title, { color: text }]}>Messages</Text>
        </View>

        {/* search box to filter the chats by name, easer for yser to find people */}
        <View style={[styles.searchBar, { backgroundColor: inputBg }]}>
          <Ionicons name="search" size={20} color={mutedText} />
          <TextInput
            style={[styles.searchInput, { color: text }]}
            placeholder="Search messages"
            placeholderTextColor={mutedText}
            value={query}
            onChangeText={setQuery}
          />
        </View>

        {/* row of friends who are online, green dot if they're active inspo by whatsapp */}
        <Text style={[styles.activeLabel, { color: mutedText }]}>Active now</Text>
        <View style={styles.activeRow}>
          {[
            { name: 'Sain', color: '#d4c4b8', online: true },
            { name: 'Tim', color: '#c4d4e8', online: true },
            { name: 'Jess', color: '#d4e8c4', online: true },
            { name: 'Maya', color: '#e8d4c4', online: false },
          ].map(({ name, color, online }) => (
            <View key={name} style={styles.activeItem}>
              <View style={styles.activeAvatarWrap}>
                <View style={[styles.activeAvatar, { backgroundColor: color }]} />
                {online && <View style={styles.onlineDot} />}
              </View>
              <Text style={[styles.activeName, { color: text }]}>{name}</Text>
            </View>
          ))}
        </View>

        {/* each chat row, only shows if it matches the search. tapping marks it read and opens the chat */}
        {matches('Sain Na Liu') && (
          <Pressable style={styles.convoRow} onPress={() => { setSainRead(true); router.push({ pathname: '/chat', params: { name: 'Sain Na Liu' } }) }}>
            <View style={[styles.convoAvatar, { backgroundColor: '#d4c4b8' }]} />
            <View style={styles.convoText}>
              <View style={styles.convoNameRow}>
                <Text style={[styles.convoName, { color: text }]}>Sain Na Liu</Text>
                <Text style={[styles.convoTime, !sainRead && styles.unreadTime, sainRead && { color: mutedText }]}>2m</Text>
              </View>
              <Text style={[styles.convoPreview, { color: mutedText }]} numberOfLines={1}>see you Saturday! bring sunscreen</Text>
            </View>
            {!sainRead && <View style={styles.unreadDot} />}
          </Pressable>
        )}

        {matches('Tim Donald') && (
          <Pressable style={styles.convoRow} onPress={() => { setTimRead(true); router.push({ pathname: '/chat', params: { name: 'Tim Donald' } }) }}>
            <View style={[styles.convoAvatar, { backgroundColor: '#c4d4e8' }]} />
            <View style={styles.convoText}>
              <View style={styles.convoNameRow}>
                <Text style={[styles.convoName, { color: text }]}>Tim Donald</Text>
                <Text style={[styles.convoTime, !timRead && styles.unreadTime, timRead && { color: mutedText }]}>14m</Text>
              </View>
              <Text style={[styles.convoPreview, { color: mutedText }]} numberOfLines={1}>you joining the night skate?</Text>
            </View>
            {!timRead && <View style={styles.unreadDot} />}
          </Pressable>
        )}

        {matches('Beginner Skate Session') && (
          <Pressable style={styles.convoRow} onPress={() => router.push({ pathname: '/chat', params: { name: 'Beginner Skate Session' } })}>
            <View style={[styles.convoIconBlock, { backgroundColor: '#8a6e6e' }]}>
              <Ionicons name="people" size={22} color="#fff" />
            </View>
            <View style={styles.convoText}>
              <View style={styles.convoNameRow}>
                <Text style={[styles.convoName, { color: text }]}>Beginner Skate Session</Text>
                <Text style={[styles.convoTime, { color: mutedText }]}>1h</Text>
              </View>
              <Text style={[styles.convoPreview, { color: mutedText }]} numberOfLines={1}>First session is Saturday — all welcome!</Text>
            </View>
          </Pressable>
        )}

        {matches('SE Skaters') && (
          <Pressable style={styles.convoRow} onPress={() => router.push({ pathname: '/chat', params: { name: 'SE Skaters' } })}>
            <View style={[styles.convoIconBlock, { backgroundColor: '#7c3aed' }]}>
              <Ionicons name="calendar" size={22} color="#fff" />
            </View>
            <View style={styles.convoText}>
              <View style={styles.convoNameRow}>
                <Text style={[styles.convoName, { color: text }]}>SE Skaters</Text>
                <Text style={[styles.convoTime, { color: mutedText }]}>3h</Text>
              </View>
              <Text style={[styles.convoPreview, { color: mutedText }]} numberOfLines={1}>New event: South London Skate</Text>
            </View>
          </Pressable>
        )}

        {matches('Jess Mason') && (
          <Pressable style={styles.convoRow} onPress={() => router.push({ pathname: '/chat', params: { name: 'Jess Mason' } })}>
            <View style={[styles.convoAvatar, { backgroundColor: '#d4e8c4' }]} />
            <View style={styles.convoText}>
              <View style={styles.convoNameRow}>
                <Text style={[styles.convoName, { color: text }]}>Jess Mason</Text>
                <Text style={[styles.convoTime, { color: mutedText }]}>yesterday</Text>
              </View>
              <Text style={[styles.convoPreview, { color: mutedText }]} numberOfLines={1}>thanks for the invite!</Text>
            </View>
          </Pressable>
        )}

      </ScrollView>
    </ScreenWrapper>
  )
}

export default Forum


const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 18, paddingTop: 14, paddingBottom: 100 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  title: { fontSize: 28, fontWeight: '600' },
  searchBar: { flexDirection: 'row', alignItems: 'center', borderRadius: 18, paddingHorizontal: 16, paddingVertical: 8, gap: 14, marginBottom: 10 },
  searchInput: { flex: 1, fontSize: 16, paddingVertical: 12 },
  activeLabel: { fontSize: 15, fontWeight: '500', marginTop: 8, marginBottom: 12 },
  activeRow: { flexDirection: 'row', gap: 18, marginBottom: 18 },
  activeItem: { alignItems: 'center' },
  activeAvatarWrap: { width: 60, height: 60, position: 'relative' },
  activeAvatar: { width: 60, height: 60, borderRadius: 30 },
  onlineDot: { position: 'absolute', bottom: 0, right: 0, width: 14, height: 14, borderRadius: 7, backgroundColor: '#22c55e', borderWidth: 2, borderColor: '#fff' },
  activeName: { fontSize: 13, marginTop: 6 },
  convoRow: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 16 },
  convoAvatar: { width: 60, height: 60, borderRadius: 30 },
  convoIconBlock: { width: 60, height: 60, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  convoText: { flex: 1 },
  convoNameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  convoName: { fontSize: 16, fontWeight: '600' },
  convoTime: { fontSize: 13 },
  unreadTime: { color: '#ff7a00', fontWeight: '500' },
  convoPreview: { fontSize: 14, marginTop: 2 },
  unreadDot: { width: 11, height: 11, borderRadius: 5.5, backgroundColor: '#ff7a00' },
})