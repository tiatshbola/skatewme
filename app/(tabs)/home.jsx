import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import ScreenWrapper from '../../components/ScreenWrapper'
import Avatar from '../../components/Avatar'
import { useRouter } from 'expo-router'
import { useUser, useTheme } from '../../context/UserContext'

const Home = () => {
  const router = useRouter()
  const { user } = useUser()
  {/* bg/text etc come from the theme so this whole screen flips in dark mode */}
  const { bg, text, mutedText, card } = useTheme()
  const name = user?.name || ''

  return (
    <ScreenWrapper>
      <ScrollView style={{ backgroundColor: bg }} contentContainerStyle={styles.scroll}>

        {/* little avatar + users name at the top */}
        <View style={styles.topBar}>
          <View style={styles.userRow}>
            <Avatar uri={user?.avatarUri} name={name || 'Skater'} size={40} />
            <Text style={[styles.name, { color: text }]}>{name}</Text>
          </View>
        </View>

        {/* big group card, tap it to open the group details page */}
        <Text style={[styles.sectionTitle, { color: text }]}>Groups You May Like</Text>
        <Pressable
          style={styles.groupCard}
          onPress={() => router.push({ pathname: '/details', params: { title: 'Beginner Skate Session', subtitle: 'Community', location: 'London, UK', description: 'A friendly community for beginner skaters. 150+ members, easy weekly sessions, all skill levels welcome — perfect if you are just starting out.', buttonText: 'Join', accentColor: '#8a6e6e' } })}
        >
          <View style={styles.badge}>
            <Text style={styles.badgeText}>COMMUNITY</Text>
          </View>
          <Text style={styles.groupTitle}>Beginner Skate Session</Text>
          <Text style={styles.groupMeta}>150 Members • 2 Events</Text>
        </Pressable>

        {/* events you can scroll sideways through, each one opens its details */}
        <Text style={[styles.sectionTitle, { color: text }]}>Events Upcoming</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.eventsRow}>

          <Pressable style={[styles.eventTab, { backgroundColor: card, borderColor: card }]} onPress={() => router.push({ pathname: '/details', params: { title: 'South London Skate', subtitle: 'Hosted by SE Skaters', location: 'Vauxhall Sainsbury Carpark', description: 'A casual evening skate around South London. All skill levels welcome. Meet at Burgess Park, SE5.', date: '18th of June 2026', buttonText: 'Going · £3', accentColor: '#7c3aed', showExtras: 'true' } })}>
            <View style={styles.eventPic} />
            <View style={styles.eventInfo}>
              <Text style={[styles.eventTitle, { color: text }]}>South London Skate</Text>
              <Text style={[styles.eventOrganiser, { color: mutedText }]}>SE Skaters</Text>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={14} color="#ff7a00" />
                <Text style={[styles.eventRating, { color: text }]}>4.9</Text>
                <Text style={[styles.eventReviews, { color: mutedText }]}>(56)</Text>
              </View>
              <Text style={[styles.eventPrice, { color: text }]}>£3</Text>
            </View>
          </Pressable>

          <Pressable style={[styles.eventTab, { backgroundColor: card, borderColor: card }]} onPress={() => router.push({ pathname: '/details', params: { title: 'African Skaters Society', subtitle: 'Hosted by Jess Mason', location: 'East London Bethnal Green Basketball Court', description: 'Monthly meetup celebrating African skating culture. Free entry, open to everyone.', date: 'Jun 18, 2026', buttonText: 'Going · Free', accentColor: '#7c3aed', showExtras: 'true' } })}>
            <View style={[styles.eventPic, { backgroundColor: '#22c55e' }]} />
            <View style={styles.eventInfo}>
              <Text style={[styles.eventTitle, { color: text }]}>African Skaters Society</Text>
              <Text style={[styles.eventOrganiser, { color: mutedText }]}>Jess Mason</Text>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={14} color="#ff7a00" />
                <Text style={[styles.eventRating, { color: text }]}>4.7</Text>
                <Text style={[styles.eventReviews, { color: mutedText }]}>(26)</Text>
              </View>
              <Text style={[styles.eventPrice, { color: text }]}>Free</Text>
            </View>
          </Pressable>

        </ScrollView>

        {/* list of skaters , loop over them so i'm not repeating the same row */}
        <Text style={[styles.sectionTitle, { color: text }]}>Rollers</Text>

        {[
          { name: 'Sain Na Liu', handle: 'ForTheGirls_SK8', params: { title: 'Sain Na Liu', location: 'North London', joined: '2023', skateLevel: 'Advanced', description: 'London roller, all-girls skate sessions, always down for Friday socials.', buttonText: 'Friends', accentColor: '#0015ff' } },
          { name: 'Tim Donald', handle: 'aresenal_skater56', params: { title: 'Tim Donald', location: 'South London', joined: '1996', skateLevel: 'Intermediate', description: 'South London skater, Arsenal fan, been on the rink since 96.', buttonText: 'Friends', accentColor: '#00ff1e' } },
        ].map(({ name: rName, handle, params }) => (
          <Pressable key={rName} style={[styles.rollerRow, { borderColor: card }]} onPress={() => router.push({ pathname: '/details', params })}>
            <View style={styles.rollerLeft}>
              <Avatar name={rName} size={36} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.rollerName, { color: text }]}>{rName}</Text>
                <Text style={[styles.rollerHandle, { color: mutedText }]}>{handle}</Text>
              </View>
            </View>
            <View style={[styles.activityPill, { borderLeftColor: card }]}>
              <Text style={[styles.activityText, { color: text }]}>Activity</Text>
            </View>
          </Pressable>
        ))}

      </ScrollView>
    </ScreenWrapper>
  )
}

export default Home
   {/* styling for all parts mentioned, goes for all of them when it says const styles */}


const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 100, minHeight: '100%' },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 },
  userRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  name: { fontSize: 16, fontWeight: '600' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 12 },
  groupCard: { backgroundColor: '#8a6e6e', height: 140, borderRadius: 16, padding: 16, justifyContent: 'flex-end', overflow: 'hidden' },
  badge: { position: 'absolute', top: 16, left: 16, backgroundColor: 'rgba(255,255,255,0.25)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  groupTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  groupMeta: { color: 'rgba(255,255,255,0.85)', fontSize: 13, marginTop: 2 },
  eventsRow: { gap: 12, paddingRight: 20 },
  eventTab: { width: 220, borderRadius: 16, overflow: 'hidden', borderWidth: 1 },
  eventPic: { height: 120, backgroundColor: '#7c3aed' },
  eventInfo: { padding: 12, gap: 4 },
  eventTitle: { fontSize: 16, fontWeight: 'bold' },
  eventOrganiser: { fontSize: 13 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  eventRating: { fontSize: 13, fontWeight: '600' },
  eventReviews: { fontSize: 13 },
  eventPrice: { fontSize: 16, fontWeight: 'bold', marginTop: 4 },
  rollerRow: { flexDirection: 'row', alignItems: 'stretch', borderWidth: 1, borderRadius: 12, marginBottom: 10, overflow: 'hidden' },
  rollerLeft: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12 },
  rollerName: { fontSize: 15, fontWeight: 'bold' },
  rollerHandle: { fontSize: 13 },
  activityPill: { paddingHorizontal: 20, borderLeftWidth: 1, alignItems: 'center', justifyContent: 'center' },
  activityText: { fontSize: 13, fontWeight: '600' },
})