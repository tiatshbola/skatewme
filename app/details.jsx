import { useState } from 'react'
import { View, Text, Pressable, ScrollView, StyleSheet, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import ScreenWrapper from '../components/ScreenWrapper'
import BackButton from '../components/BackButton'
import { useTheme } from '../context/UserContext'

{/* one reusable details page - works for people, groups and events */}
{/* whatever gets passed in through the route params decides what shows */}
const Details = () => {
  const router = useRouter()
  const { bg, text, mutedText } = useTheme()

  {/* pull all the bits out of the route params some are optional*/}
  const {
    title, subtitle, description, buttonText, accentColor, location, date, joined, skateLevel,
    joinedLabel, joinedColor, showExtras,
  } = useLocalSearchParams()

  const [requested, setRequested] = useState(false)

  {/* if the subtitle says "Hosted by" it's an event, so the labels change to suit */}
  const isEvent = subtitle && subtitle.includes('Hosted by')
  const membersLabel = isEvent ? 'Going' : 'Members'
  const eventsLabel = isEvent ? 'Schedule' : 'Upcoming events'
  const rulesLabel = isEvent ? 'What to bring' : 'Guidelines'

  {/* the three-dot menu in the corner , report or block */}
  const showReportMenu = () => {
    Alert.alert(
      'Report',
      `What would you like to do with ${title}?`,
      [
        { text: 'Report user', style: 'destructive', onPress: () => Alert.alert('Reported', 'Thanks. Our team will review this account.') },
        { text: 'Block', style: 'destructive', onPress: () => Alert.alert('Blocked', `${title} has been blocked.`) },
        { text: 'Cancel', style: 'cancel' },
      ]
    )
  }

  return (
    <ScreenWrapper>
      <ScrollView style={{ backgroundColor: bg }} contentContainerStyle={styles.container}>

        <View style={styles.topRow}>
          <BackButton router={router} />
          <View style={{ flexDirection: 'row', gap: 14 }}>
            {joined ? (
              <Pressable onPress={() => router.push('/forum')}>
                <Ionicons name="chatbubble-ellipses-outline" size={26} color={text} />
              </Pressable>
            ) : null}
            <Pressable onPress={showReportMenu}>
              <Ionicons name="ellipsis-horizontal" size={26} color={text} />
            </Pressable>
          </View>
        </View>

        {/* big coloured banner up top, colour comes from whatever opened this page */}
        <View style={[styles.hero, { backgroundColor: accentColor || '#8a6e6e' }]} />

        {/* title plus all the little detail lines - each only shows if it was passed in */}
        <View style={styles.titleBlock}>
          <Text style={[styles.title, { color: text }]}>{title}</Text>
          {subtitle ? <Text style={[styles.subtitle, { color: mutedText }]}>{subtitle}</Text> : null}
          {location ? <Text style={[styles.subtitle, { color: mutedText }]}>{location}</Text> : null}
          {date ? <Text style={[styles.subtitle, { color: mutedText }]}>{date}</Text> : null}
          {joined ? <Text style={[styles.subtitle, { color: mutedText }]}>Joined: {joined}</Text> : null}
          {skateLevel ? <Text style={[styles.subtitle, { color: mutedText }]}>Skate level: {skateLevel}</Text> : null}
        </View>

        <Text style={[styles.description, { color: text }]}>{description}</Text>

        {/* only events and groups show the extra sections, plain profiles skip all this */}
        {showExtras && (
          <>
            {/* row of member avatars with a +45 at the end */}
            <Text style={[styles.sectionTitle, { color: text }]}>{membersLabel}</Text>
            <View style={styles.membersRow}>
              {['#d4c4b8', '#c4d4e8', '#d4e8c4', '#e8d4c4', '#c4e8e0'].map((c, i) => (
                <View key={i} style={[styles.memberAvatar, { backgroundColor: c }]} />
              ))}
              <View style={[styles.memberMore, { backgroundColor: mutedText }]}>
                <Text style={styles.memberMoreText}>+45</Text>
              </View>
            </View>

            {/* schedule for events, or upcoming events for a group - different content either way */}
            <Text style={[styles.sectionTitle, { color: text }]}>{eventsLabel}</Text>
            {isEvent ? (
              <>
                <View style={[styles.eventMini, { borderColor: mutedText }]}>
                  <Ionicons name="time-outline" size={22} color="#ff7a00" />
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.eventMiniTitle, { color: text }]}>7:00 PM · Meet up</Text>
                    <Text style={[styles.eventMiniMeta, { color: mutedText }]}>Gear check, intros</Text>
                  </View>
                </View>
                <View style={[styles.eventMini, { borderColor: mutedText }]}>
                  <Ionicons name="time-outline" size={22} color="#ff7a00" />
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.eventMiniTitle, { color: text }]}>7:30 PM · Roll out</Text>
                    <Text style={[styles.eventMiniMeta, { color: mutedText }]}>Group skate begins</Text>
                  </View>
                </View>
                <View style={[styles.eventMini, { borderColor: mutedText }]}>
                  <Ionicons name="time-outline" size={22} color="#ff7a00" />
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.eventMiniTitle, { color: text }]}>9:00 PM · Wind down</Text>
                    <Text style={[styles.eventMiniMeta, { color: mutedText }]}>Hang and chat</Text>
                  </View>
                </View>
              </>
            ) : (
              <>
                <View style={[styles.eventMini, { borderColor: mutedText }]}>
                  <Ionicons name="calendar" size={22} color="#7c3aed" />
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.eventMiniTitle, { color: text }]}>Saturday Group Skate</Text>
                    <Text style={[styles.eventMiniMeta, { color: mutedText }]}>Sat 2pm · Burgess Park</Text>
                  </View>
                </View>
                <View style={[styles.eventMini, { borderColor: mutedText }]}>
                  <Ionicons name="calendar" size={22} color="#7c3aed" />
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.eventMiniTitle, { color: text }]}>Beginner-Friendly Lesson</Text>
                    <Text style={[styles.eventMiniMeta, { color: mutedText }]}>Wed 6pm · Hyde Park</Text>
                  </View>
                </View>
              </>
            )}

            {/*  event details, what to bring to or the group guidelines */}
            <Text style={[styles.sectionTitle, { color: text }]}>{rulesLabel}</Text>
            {isEvent ? (
              <>
                <Text style={[styles.ruleItem, { color: mutedText }]}>• Skates and protective gear.</Text>
                <Text style={[styles.ruleItem, { color: mutedText }]}>• Lights or reflective gear if after dark.</Text>
                <Text style={[styles.ruleItem, { color: mutedText }]}>• Water bottle.</Text>
                <Text style={[styles.ruleItem, { color: mutedText }]}>• Good vibes.</Text>
              </>
            ) : (
              <>
                <Text style={[styles.ruleItem, { color: mutedText }]}>• Be kind, no harassment.</Text>
                <Text style={[styles.ruleItem, { color: mutedText }]}>• Wear protective gear at events.</Text>
                <Text style={[styles.ruleItem, { color: mutedText }]}>• No promotional spam.</Text>
                <Text style={[styles.ruleItem, { color: mutedText }]}>• Respect everyone's skill level.</Text>
              </>
            )}
          </>
        )}

        {/* main action button, join to requested */}
        <Pressable
          style={[styles.button, requested && { backgroundColor: joinedColor || '#8a6e6e' }]}
          onPress={() => buttonText === 'Join' && setRequested(true)}
        >
          <Text style={styles.buttonText}>
            {requested ? (joinedLabel || 'Requested to join') : buttonText}
          </Text>
        </Pressable>

      </ScrollView>
    </ScreenWrapper>
  )
}

export default Details

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 40, gap: 16, minHeight: '100%' },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  hero: { height: 180, borderRadius: 16 },
  titleBlock: { gap: 4 },
  title: { fontSize: 40, fontWeight: 'bold' },
  subtitle: { fontSize: 20 },
  description: { fontSize: 15, lineHeight: 22 },
  sectionTitle: { fontSize: 17, fontWeight: '600', marginTop: 8 },
  membersRow: { flexDirection: 'row', gap: 8 },
  memberAvatar: { width: 40, height: 40, borderRadius: 20 },
  memberMore: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  memberMoreText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  eventMini: { flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 1, borderRadius: 12, padding: 12 },
  eventMiniTitle: { fontSize: 14, fontWeight: '600' },
  eventMiniMeta: { fontSize: 13, marginTop: 2 },
  ruleItem: { fontSize: 14, lineHeight: 22 },
  button: { backgroundColor: '#ff7a00', paddingVertical: 14, borderRadius: 14, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#fff', fontSize: 15, fontWeight: '600' },
})