import { useState } from 'react'
import { View, Text, Pressable, StyleSheet, TextInput, Alert, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import ScreenWrapper from '../components/ScreenWrapper'
import BackButton from '../components/BackButton'
import { useUser } from '../context/UserContext'

{/* change password screen - three boxes: current, new, confirm */}
const ChangePassword = () => {
  const router = useRouter()
  const { changePassword } = useUser()
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')

  {/* make sure everything's filled and the two new ones match before saving */}
  const save = () => {
    if (!current || !next || !confirm) {
      Alert.alert('Change password', 'Please fill in all fields')
      return
    }
    if (next !== confirm) {
      Alert.alert('Change password', 'New passwords do not match')
      return
    }
    {/* changePassword only works if they got their current password right */}
    const success = changePassword(current, next)
    if (success) {
      Alert.alert('Password changed', 'Your password has been updated')
      router.back()
    } else {
      Alert.alert('Change password', 'Current password is incorrect')
    }
  }

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.scroll}>

        <View style={styles.header}>
          <BackButton router={router} />
          <Text style={styles.title}>Change Password</Text>
        </View>

        <Text style={styles.label}>Current Password</Text>
        <View style={styles.inputBox}>
          <Ionicons name="lock-closed-outline" size={20} color="#888" />
          <TextInput
            style={styles.input}
            value={current}
            onChangeText={setCurrent}
            placeholder="Enter current password"
            secureTextEntry
          />
        </View>

        <Text style={styles.label}>New Password</Text>
        <View style={styles.inputBox}>
          <Ionicons name="lock-closed-outline" size={20} color="#888" />
          <TextInput
            style={styles.input}
            value={next}
            onChangeText={setNext}
            placeholder="Enter new password"
            secureTextEntry
          />
        </View>

        <Text style={styles.label}>Confirm New Password</Text>
        <View style={styles.inputBox}>
          <Ionicons name="lock-closed-outline" size={20} color="#888" />
          <TextInput
            style={styles.input}
            value={confirm}
            onChangeText={setConfirm}
            placeholder="Confirm new password"
            secureTextEntry
          />
        </View>

        <Pressable style={styles.saveButton} onPress={save}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </Pressable>

      </ScrollView>
    </ScreenWrapper>
  )
}

export default ChangePassword

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 18, paddingTop: 10, paddingBottom: 40 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
  title: { fontSize: 22, fontWeight: '600' },
  label: { fontSize: 13, fontWeight: '500', color: '#888', marginBottom: 8, marginTop: 14 },
  inputBox: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 10,
  },
  input: { flex: 1, fontSize: 15, color: '#000' },
  saveButton: {
    backgroundColor: '#ff7a00', paddingVertical: 14, borderRadius: 14,
    alignItems: 'center', marginTop: 30,
  },
  saveButtonText: { color: '#fff', fontSize: 15, fontWeight: '600' },
})