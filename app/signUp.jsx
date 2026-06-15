import { useRef, useState } from 'react'
import { Pressable, StatusBar, StyleSheet, Text, View, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import ScreenWrapper from '../components/ScreenWrapper'
import BackButton from '../components/BackButton'
import { useRouter } from 'expo-router'
import { hp } from '../helpers/common'
import Input from '../components/input'
import Icon from '../assets/icons'
import Button from '../components/Button'
import { useUser } from '../context/UserContext'

{/* make a new account screen */}
const SignUp = () => {
  const router = useRouter()
  const { signUp } = useUser()
  {/* using refs instead of state so typing doesnt re-render the whole form every keystroke */}
  const nameRef = useRef('')
  const emailRef = useRef('')
  const passwordRef = useRef('')
  const [loading, setLoading] = useState(false)
  {/* whether theyve ticked the 18+ and terms box - cant sign up without it */}
  const [agreed, setAgreed] = useState(false)

{/* runs when they hit sign up - check everything's filled in properly first */}
const onSubmit = () => {
  const name = nameRef.current
  const email = emailRef.current
  const password = passwordRef.current

  {/* none of the boxes can be empty */}
  if (!name || !email || !password) {
    Alert.alert('Sign up', 'Please fill in all fields')
    return
  }
  if (name.length <= 1) {
    Alert.alert('Sign up', 'Name must be more than 1 character')
    return
  }
  if (!email.includes('@')) {
    Alert.alert('Sign up', 'Please enter a valid email')
    return
  }
  if (password.length <= 6) {
    Alert.alert('Sign up', 'Password must be more than 6 characters')
    return
  }
  {/* they have to tick the box to confirm 18+ and agree to the terms */}
  if (!agreed) {
    Alert.alert('Sign up', 'Please confirm you are 18 or over and agree to the Terms & Conditions')
    return
  }
  {/* all good - make the account and drop them on the home tab */}
  signUp(name, email, password)
  router.replace('/home')
}

  return (
    <ScreenWrapper bg="white">
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <BackButton router={router} />

        <View style={styles.titleBlock}>
          <Text style={styles.welcomeText}>Let's,</Text>
          <Text style={styles.welcomeText}>Get Started</Text>
        </View>

        {/* the three boxes plus the sign up button */}
        <View style={styles.form}>
          <Text style={styles.subtitle}>
            Please fill in the details to create an account
          </Text>
          <Input
            icon={<Icon name="user" size={26} />}
            placeholder="Enter your name"
            onChangeText={(value) => (nameRef.current = value)}
          />
          <Input
            icon={<Icon name="mail" size={26} />}
            placeholder="Enter your email"
            onChangeText={(value) => (emailRef.current = value)}
          />
          <Input
            icon={<Icon name="lock" size={26} />}
            placeholder="Enter your password"
            secureTextEntry
            onChangeText={(value) => (passwordRef.current = value)}
          />

          {/* tick box to confirm 18+ and agree - tapping the link opens the about/terms page */}
          <View style={styles.agreeRow}>
            <Pressable
              onPress={() => setAgreed(!agreed)}
              style={[styles.checkbox, agreed && styles.checkboxOn]}
            >
              {agreed ? <Ionicons name="checkmark" size={14} color="#fff" /> : null}
            </Pressable>
            <Text style={styles.agreeText}>
              I confirm I'm 18 or over and agree to the{' '}
              <Text style={styles.link} onPress={() => router.push('/about')}>Terms & Conditions</Text>.
            </Text>
          </View>

          <Button title="Sign Up" loading={loading} onPress={onSubmit} />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account!</Text>
          <Pressable onPress={() => router.push('/login')}>
            <Text style={[styles.footerText, { color: '#ff7a00', fontWeight: '700' }]}>Login</Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default SignUp

const styles = StyleSheet.create({
  container: { flex: 1, gap: 22, paddingHorizontal: 22 },
  titleBlock: { marginTop: 10 },
  welcomeText: { fontSize: hp(5), fontWeight: '800', color: '#000', lineHeight: hp(5.5) },
  subtitle: { fontSize: hp(1.6), color: 'gray', marginBottom: 4 },
  form: { gap: 16 },
  agreeRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  checkbox: { width: 22, height: 22, borderRadius: 6, borderWidth: 1.5, borderColor: '#888', alignItems: 'center', justifyContent: 'center' },
  checkboxOn: { backgroundColor: '#ff7a00', borderColor: '#ff7a00' },
  agreeText: { flex: 1, fontSize: hp(1.5), color: 'gray' },
  link: { color: '#ff7a00', fontWeight: '700' },
  footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5 },
  footerText: { textAlign: 'center', color: 'gray', fontSize: hp(1.6) },
})