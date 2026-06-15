import { useState } from 'react'
import { View, Text, Pressable, ScrollView, StyleSheet, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import ScreenWrapper from '../../components/ScreenWrapper'
import Avatar from '../../components/Avatar'
import { useUser } from '../../context/UserContext'

const Profile = () => {
  const router = useRouter()
  const { user, logOut, darkMode, toggleDarkMode } = useUser()
  const [notifications, setNotifications] = useState(true)

  {/* their header colour, falls back to red if they somehow dont have one */}
  const headerColor = user?.headerColor || '#ef4444'

  {/* swap the colours depending on dark mode */}
  const bg = darkMode ? '#111' : '#fff'
  const text = darkMode ? '#fff' : '#000'
  const mutedText = darkMode ? '#aaa' : '#888'

  {/* pop up an are you sure before actually logging out */}
  const confirmLogout = () => {
    Alert.alert('Log out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log out',
        style: 'destructive',
        onPress: () => {
          logOut()
          router.replace('/welcomescreen')
        },
      },
    ])
  }

  return (
    <ScreenWrapper>
      <ScrollView style={{ backgroundColor: bg }} contentContainerStyle={styles.scroll}>

        <Text style={[styles.pageTitle, { color: text }]}>Profile</Text>

        {/* red banner with the avatar sitting over it, tap to edit */}
        <Pressable onPress={() => router.push('/EditProfile')}>
          <View style={[styles.banner, { backgroundColor: headerColor }]} />
          <View style={styles.avatarRow}>
            <Avatar uri={user?.avatarUri} name={user?.name || 'Guest'} size={72} style={styles.avatarBorder} />
          </View>
          <View style={styles.nameRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.name, { color: text }]}>{user?.name || 'Guest'}</Text>
              <Text style={[styles.email, { color: mutedText }]}>{user?.email || ''}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={mutedText} />
          </View>
        </Pressable>

        <Text style={[styles.sectionLabel, { color: mutedText }]}>General settings</Text>

        {/* dark mode toggle - this is the switch that flips the whole app */}
        <View style={styles.row}>
          <Ionicons name="moon-outline" size={22} color={text} style={styles.rowIcon} />
          <Text style={[styles.rowLabel, { color: text }]}>Dark mode</Text>
          <Pressable
            style={[styles.toggle, darkMode && styles.toggleOn]}
            onPress={toggleDarkMode}
          >
            <View style={[styles.toggleDot, darkMode && styles.toggleDotOn]} />
          </Pressable>
        </View>

        {/* notifications toggle - just on/off for now */}
        <View style={styles.row}>
          <Ionicons name="notifications-outline" size={22} color={text} style={styles.rowIcon} />
          <Text style={[styles.rowLabel, { color: text }]}>Notifications</Text>
          <Pressable
            style={[styles.toggle, notifications && styles.toggleOn]}
            onPress={() => setNotifications(!notifications)}
          >
            <View style={[styles.toggleDot, notifications && styles.toggleDotOn]} />
          </Pressable>
        </View>

        {/* accessibility, not built yet so it just shows a coming soon tag */}
        <View style={styles.row}>
          <Ionicons name="accessibility-outline" size={22} color={text} style={styles.rowIcon} />
          <Text style={[styles.rowLabel, { color: text }]}>Accessibility</Text>
          <View style={styles.soonBadge}>
            <Text style={styles.soonText}>Coming soon</Text>
          </View>
        </View>

        {/*  about page and the log out button */}
        <Text style={[styles.sectionLabel, { color: mutedText, marginTop: 20 }]}>Other</Text>

        <Pressable style={styles.row} onPress={() => router.push('/about')}>
          <Ionicons name="help-circle-outline" size={22} color={text} style={styles.rowIcon} />
          <Text style={[styles.rowLabel, { color: text }]}>About app</Text>
          <Ionicons name="chevron-forward" size={18} color={mutedText} />
        </Pressable>

        <Pressable style={styles.row} onPress={confirmLogout}>
          <Ionicons name="log-out-outline" size={22} color="#ef4444" style={styles.rowIcon} />
          <Text style={[styles.rowLabel, { color: '#ef4444' }]}>Log out</Text>
          <Ionicons name="chevron-forward" size={18} color="#ef4444" />
        </Pressable>

      </ScrollView>
    </ScreenWrapper>
  )
}

export default Profile

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 18, paddingTop: 14, paddingBottom: 100 },
  pageTitle: { fontSize: 28, fontWeight: '600', marginBottom: 18 },
  banner: { height: 64, borderRadius: 16 },
  avatarRow: { paddingHorizontal: 6, marginTop: -36 },
  avatarBorder: { borderWidth: 3, borderColor: '#fff' },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 6, marginTop: 10, marginBottom: 26 },
  soonBadge: { backgroundColor: '#ffe2c2', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  soonText: { color: '#c2660a', fontSize: 12, fontWeight: '600' },
  name: { fontSize: 16, fontWeight: '500' },
  email: { fontSize: 13, marginTop: 2 },
  sectionLabel: { fontSize: 13, fontWeight: '500', marginBottom: 6 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14 },
  rowIcon: { width: 32 },
  rowLabel: { flex: 1, fontSize: 14 },
  toggle: { width: 40, height: 22, borderRadius: 11, backgroundColor: '#e0e0e0', padding: 2, justifyContent: 'center' },
  toggleOn: { backgroundColor: '#ff7a00' },
  toggleDot: { width: 18, height: 18, borderRadius: 9, backgroundColor: '#fff' },
  toggleDotOn: { alignSelf: 'flex-end' },
})