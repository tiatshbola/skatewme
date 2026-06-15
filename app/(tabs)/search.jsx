import { useState } from 'react'
import { View, Text, ScrollView, Pressable, StyleSheet, TextInput, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import ScreenWrapper from '../../components/ScreenWrapper'
import Avatar from '../../components/Avatar'
import { useTheme } from '../../context/UserContext'

const Search = () => {
  const router = useRouter()
  const { text, mutedText, inputBg } = useTheme()
  const [query, setQuery] = useState('')

  {/* everything you can search for - parks, events, groups and people */}
  const all = [
    {
      name: 'Burgess Park', meta: 'Camberwell · Skate park',
      icon: 'leaf', color: '#22c55e',
      onPress: () => router.push('/park'),
    },
    {
      name: 'Hyde Park', meta: 'Central London · Skate spot',
      icon: 'leaf', color: '#22c55e',
      onPress: () => Alert.alert('Coming soon', 'Detail page for Hyde Park is on the way.'),
    },
    {
      name: 'Crystal Palace Park', meta: 'South London · Skate spot',
      icon: 'leaf', color: '#22c55e',
      onPress: () => Alert.alert('Coming soon', 'Detail page for Crystal Palace is on the way.'),
    },
    {
      name: 'Clapham Common', meta: 'South London · Skate spot',
      icon: 'leaf', color: '#22c55e',
      onPress: () => Alert.alert('Coming soon', 'Detail page for Clapham is on the way.'),
    },
    {
      name: 'Friday Night Roll', meta: 'Event · this weekend',
      icon: 'calendar', color: '#7c3aed',
      onPress: () => router.push({ pathname: '/details', params: {
        title: 'Friday Night Roll', subtitle: 'Hosted by Roll London',
        location: 'Burgess Park, Camberwell', date: 'Fri Dec 5, 7pm',
        description: 'Weekly Friday night skate around South London. Lights, music, vibes. All levels welcome.',
        buttonText: 'Going · £5', accentColor: '#7c3aed', showExtras: 'true',
      }}),
    },
    {
      name: 'Roller Derby UK', meta: 'Community · 230 members',
      icon: 'people', color: '#8a6e6e',
      onPress: () => router.push({ pathname: '/details', params: {
        title: 'Roller Derby UK', subtitle: 'Community', location: 'London, UK',
        description: "The UK's biggest roller derby community. 230+ members, monthly bouts, training sessions across London.",
        buttonText: 'Join', joinedLabel: 'Joined', joinedColor: '#22c55e',
        accentColor: '#8a6e6e', showExtras: 'true',
      }}),
    },
    {
      name: 'Beginner Skate Session', meta: 'Community · 150 members',
      icon: 'people', color: '#8a6e6e',
      onPress: () => router.push({ pathname: '/details', params: {
        title: 'Beginner Skate Session', subtitle: 'Community', location: 'London, UK',
        description: 'A friendly community for beginner skaters. 150+ members, easy weekly sessions to learn the basics, all welcome.',
        buttonText: 'Join', accentColor: '#8a6e6e',
      }}),
    },
    {
      name: 'Skate Soho', meta: 'Community · 80 members',
      icon: 'people', color: '#8a6e6e',
      onPress: () => Alert.alert('Coming soon', 'Detail page for Skate Soho is on the way.'),
    },
    {
      name: 'Jess Mason', meta: 'Roller · @jess.mason',
      icon: null, color: '#d4c4b8',
      onPress: () => router.push({ pathname: '/details', params: {
        title: 'Jess Mason', subtitle: '@jess.mason', location: 'East London',
        joined: '2022', skateLevel: 'Beginner',
        description: 'Roller, event host, lover of group socials.',
        buttonText: 'Friends', accentColor: '#ff7a00',
      }}),
    },
    {
      name: 'Sain Na Liu', meta: 'Roller · @ForTheGirls_SK8',
      icon: null, color: '#d4c4b8',
      onPress: () => router.push({ pathname: '/details', params: {
        title: 'Sain Na Liu', subtitle: '@ForTheGirls_SK8', location: 'North London',
        joined: '2023', skateLevel: 'Advanced',
        description: 'London roller, all-girls skate sessions, always down for Friday socials.',
        buttonText: 'Friends', accentColor: '#ff7a00',
      }}),
    },
    {
      name: 'Tim Donald', meta: 'Roller · @aresenal_skater56',
      icon: null, color: '#c4d4e8',
      onPress: () => router.push({ pathname: '/details', params: {
        title: 'Tim Donald', subtitle: '@aresenal_skater56', location: 'South London',
        joined: '1996', skateLevel: 'Intermediate',
        description: 'South London skater, Arsenal fan, been on the rink since 96.',
        buttonText: 'Friends', accentColor: '#ff7a00',
      }}),
    },
    {
      name: 'Jam Skaters', meta: 'Community · 140 members',
      icon: 'people', color: '#8a6e6e',
      onPress: () => router.push({ pathname: '/details', params: {
        title: 'Jam Skaters', subtitle: 'Community', location: 'London, UK',
        description: 'A community for dance and freestyle skaters. 140+ members, weekly jam sessions, all levels welcome.',
        buttonText: 'Join', joinedLabel: 'Joined', joinedColor: '#22c55e',
        accentColor: '#8a6e6e', showExtras: 'true',
      }}),
    },
    {
      name: 'Casual Skaters', meta: 'Community · 310 members',
      icon: 'people', color: '#8a6e6e',
      onPress: () => router.push({ pathname: '/details', params: {
        title: 'Casual Skaters', subtitle: 'Community', location: 'London, UK',
        description: 'Laid-back social skating, no pressure. 310+ members, relaxed weekend meet-ups across London.',
        buttonText: 'Join', joinedLabel: 'Joined', joinedColor: '#22c55e',
        accentColor: '#8a6e6e', showExtras: 'true',
      }}),
    },
  ]

  {/* only search once they've typed something, match on the name */}
  const filtered = query
    ? all.filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
    : []

  {/* hand picked few to show when the box is empty */}
  const trending = [all[4], all[5], all[8], all[0]] /* friday night roll, derby uk, jess, burgess */

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

        {/* the search box - little x on the right shows once you type */}
        <View style={[styles.searchBar, { backgroundColor: inputBg }]}>
          <Ionicons name="search" size={18} color={mutedText} />
          <TextInput
            style={[styles.searchInput, { color: text }]}
            placeholder="Search skaters, places, groups..."
            placeholderTextColor={mutedText}
            value={query}
            onChangeText={setQuery}
          />
          {query.length > 0 && (
            <Pressable onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={18} color={mutedText} />
            </Pressable>
          )}
        </View>

        {/* if they've typed something show the results, otherwise show the default page below */}
        {query.length > 0 ? (
          <>
            <Text style={[styles.sectionTitle, { color: text, marginTop: 20, marginBottom: 12 }]}>
              {filtered.length} result{filtered.length === 1 ? '' : 's'}
            </Text>
            {filtered.map(({ icon, color, name, meta, onPress }) => (
              <Pressable key={name} style={styles.trendingRow} onPress={onPress}>
                {icon
                  ? <View style={[styles.iconBlock, { backgroundColor: color, borderRadius: 10 }]}>
                      <Ionicons name={icon} size={18} color="#fff" />
                    </View>
                  : <Avatar name={name} size={48} />}
                <View style={styles.trendingText}>
                  <Text style={[styles.trendingTitle, { color: text }]}>{name}</Text>
                  <Text style={[styles.trendingMeta, { color: mutedText }]}>{meta}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={mutedText} />
              </Pressable>
            ))}
            {filtered.length === 0 && (
              <Text style={[styles.noResults, { color: mutedText }]}>
                Nothing matches "{query}" — try a different search.
              </Text>
            )}
          </>
        ) : (
          <>
            {/* default view when the box is empty - recent search pills */}
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: text }]}>Recent Searches</Text>
              <Pressable><Text style={[styles.clearText, { color: mutedText }]}>Clear</Text></Pressable>
            </View>

            <View style={styles.pillsRow}>
              {['Mum Skate', 'Skating 25+', 'North London', 'Skate Events London', 'Burgess Park'].map(p => (
                <Pressable key={p} style={[styles.pill, { borderColor: mutedText }]} onPress={() => setQuery(p)}>
                  <Text style={[styles.pillText, { color: text }]}>{p}</Text>
                </Pressable>
              ))}
            </View>

            {/* trending - just the few i picked out up top */}
            <View style={styles.trendingHeader}>
              <Ionicons name="trending-up" size={16} color="#ff7a00" />
              <Text style={[styles.sectionTitle, { color: text }]}>Trending Now</Text>
            </View>

            {trending.map(({ icon, color, name, meta, onPress }) => (
              <Pressable key={name} style={styles.trendingRow} onPress={onPress}>
                {icon
                  ? <View style={[styles.iconBlock, { backgroundColor: color, borderRadius: 10 }]}>
                      <Ionicons name={icon} size={18} color="#fff" />
                    </View>
                  : <Avatar name={name} size={48} />}
                <View style={styles.trendingText}>
                  <Text style={[styles.trendingTitle, { color: text }]}>{name}</Text>
                  <Text style={[styles.trendingMeta, { color: mutedText }]}>{meta}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={mutedText} />
              </Pressable>
            ))}
          </>
        )}

      </ScrollView>
    </ScreenWrapper>
  )
}

export default Search

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 100 },
  searchBar: { flexDirection: 'row', alignItems: 'center', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 8, gap: 12 },
  searchInput: { flex: 1, fontSize: 16, paddingVertical: 12 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 28, marginBottom: 14 },
  sectionTitle: { fontSize: 18, fontWeight: '600' },
  clearText: { fontSize: 14 },
  pillsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pill: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 16, borderWidth: 1 },
  pillText: { fontSize: 14 },
  trendingHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 28, marginBottom: 14 },
  trendingRow: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 14 },
  iconBlock: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  trendingText: { flex: 1 },
  trendingTitle: { fontSize: 16, fontWeight: '600' },
  trendingMeta: { fontSize: 13 },
  noResults: { fontSize: 14, marginTop: 20, textAlign: 'center' },
})