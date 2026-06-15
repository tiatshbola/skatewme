import { useState } from 'react'
import { View, Text, Pressable, TextInput, StyleSheet, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import ScreenWrapper from '../components/ScreenWrapper'
import BackButton from '../components/BackButton'

{/* forgot password screen - not wired to a real backend, just fakes the email for now */}
const ForgotPassword = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')

  {/*   send a reset email then pop a confirmation and go back */}
  const sendReset = () => {
    if (!email) {
      Alert.alert('Forgot password', 'Please enter your email')
      return
    }
    Alert.alert(
      'Check your inbox',
      'An email has been sent to reset your password.',
      [{ text: 'OK', onPress: () => router.back() }]
    )
  }

  return (
    <ScreenWrapper>
      <View style={styles.container}>

        <View style={styles.header}>
          <BackButton router={router} />
          <Text style={styles.title}>Forgot Password</Text>
        </View>

        <Text style={styles.subtitle}>
          Enter the email associated with your account and we'll send you a link to reset your password.
        </Text>

        {/* email box they type into */}
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputBox}>
          <Ionicons name="mail-outline" size={20} color="#888" />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor="#888"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <Pressable style={styles.button} onPress={sendReset}>
          <Text style={styles.buttonText}>Send reset link</Text>
        </Pressable>

      </View>
    </ScreenWrapper>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 22, paddingTop: 10 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
  title: { fontSize: 22, fontWeight: '600' },
  subtitle: { fontSize: 14, color: '#888', lineHeight: 20, marginBottom: 24 },
  label: { fontSize: 13, fontWeight: '500', color: '#888', marginBottom: 8 },
  inputBox: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 12,
    marginBottom: 24,
  },
  input: { flex: 1, fontSize: 15, color: '#000' },
  button: {
    backgroundColor: '#ff7a00',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 15, fontWeight: '600' },
})