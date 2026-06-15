import { useState } from 'react'
import { View, Text, Pressable, ScrollView, StyleSheet, TextInput, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import Avatar from '../components/Avatar'
import { useUser } from '../context/UserContext'

const SKATE_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Pro']

const EditProfile = () => {
  const router = useRouter()
  const { user, updateUser, darkMode } = useUser()

  {/* start the boxes off with whatever the user already has saved */}
  const [name, setName] = useState(user?.name || '')
  const [age, setAge] = useState(user?.age || '')
  const [skateLevel, setSkateLevel] = useState(user?.skateLevel || 'Beginner')

  const bg = darkMode ? '#111' : '#fff'
  const text = darkMode ? '#fff' : '#000'
  const mutedText = darkMode ? '#aaa' : '#888'
  const inputBg = darkMode ? '#222' : '#f5f5f5'

  {/* dont let them save a blank name, then go back */}
  const save = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Name cannot be empty')
      return
    }
    updateUser({ name: name.trim(), age, skateLevel })
    router.back()
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: bg }} contentContainerStyle={styles.scroll}>

      {/* top bar with back arrow */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: text }]}>Edit Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* profile pic */}
      <View style={styles.avatarSection}>
        <Avatar uri={user?.avatarUri} name={name || 'Skater'} size={96} />
      </View>

      {/* the actual form - name, age and skate level */}
      <View style={styles.fields}>

        <Text style={[styles.label, { color: mutedText }]}>Full Name</Text>
        <View style={[styles.inputRow, { backgroundColor: inputBg }]}>
          <Ionicons name="person-outline" size={20} color={mutedText} style={{ marginRight: 10 }} />
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Your name"
            placeholderTextColor={mutedText}
            style={[styles.textInput, { color: text }]}
          />
        </View>

        <Text style={[styles.label, { color: mutedText }]}>Age</Text>
        <View style={[styles.inputRow, { backgroundColor: inputBg }]}>
          <Ionicons name="calendar-outline" size={20} color={mutedText} style={{ marginRight: 10 }} />
          <TextInput
            value={age}
            onChangeText={setAge}
            placeholder="Your age"
            placeholderTextColor={mutedText}
            keyboardType="numeric"
            style={[styles.textInput, { color: text }]}
          />
        </View>

        {/* tap one of the level chips, the selected one goes orange */}
        <Text style={[styles.label, { color: mutedText }]}>Skating Level</Text>
        <View style={styles.levels}>
          {SKATE_LEVELS.map(level => (
            <Pressable
              key={level}
              style={[styles.levelChip, skateLevel === level && styles.levelChipActive]}
              onPress={() => setSkateLevel(level)}
            >
              <Text style={[styles.levelText, skateLevel === level && styles.levelTextActive]}>
                {level}
              </Text>
            </Pressable>
          ))}
        </View>

      </View>

      {/* save button at the bottom */}
      <Pressable style={styles.saveBtn} onPress={save}>
        <Text style={styles.saveBtnText}>Save Changes</Text>
      </Pressable>

    </ScrollView>
  )
}

export default EditProfile

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 22, paddingBottom: 60 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 60, marginBottom: 30 },
  headerTitle: { fontSize: 18, fontWeight: '600' },
  avatarSection: { alignItems: 'center', marginBottom: 36 },
  fields: { gap: 6 },
  label: { fontSize: 13, fontWeight: '500', marginBottom: 6, marginTop: 16 },
  inputRow: { flexDirection: 'row', alignItems: 'center', borderRadius: 14, paddingHorizontal: 16, height: 52 },
  textInput: { flex: 1, fontSize: 15 },
  levels: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 8 },
  levelChip: { paddingHorizontal: 18, paddingVertical: 10, borderRadius: 20, backgroundColor: '#f0f0f0', borderWidth: 1.5, borderColor: 'transparent' },
  levelChipActive: { backgroundColor: '#fff3e8', borderColor: '#ff7a00' },
  levelText: { fontSize: 14, color: '#888' },
  levelTextActive: { color: '#ff7a00', fontWeight: '600' },
  saveBtn: { marginTop: 40, backgroundColor: '#ff7a00', borderRadius: 16, height: 54, alignItems: 'center', justifyContent: 'center' },
  saveBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
})