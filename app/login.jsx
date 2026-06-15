import { useRef, useState } from 'react'
import { Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import ScreenWrapper from '../components/ScreenWrapper'
import BackButton from '../components/BackButton'
import { useRouter } from 'expo-router'
import { hp } from '../helpers/common'
import Input from '../components/input'
import Icon from '../assets/icons'
import Button from '../components/Button'
import { useUser } from '../context/UserContext'

{/* login screen for people who already signed up */}
const Login = () => {
  const router = useRouter()
  const { logIn } = useUser()
  {/* refs again so the boxes don't re-render on every key press */}
  const emailRef = useRef('')
  const passwordRef = useRef('')
  const [loading, setLoading] = useState(false)
  {/* holds the message we show on screen when something is wrong */}
  const [error, setError] = useState('')

  {/* check the fields then try to log them in */}
  const onSubmit = () => {
    const email = emailRef.current
    const password = passwordRef.current

    {/* wipe any old error before the system checks again */}
    setError('')

    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email')
      return
    }
    if (password.length <= 6) {
      setError('Password must be more than 6 characters')
      return
    }

    {/* show the button as busy while system checks the login */}
    setLoading(true)
    const success = logIn(email, password)
    if (success) {
      router.replace('/home')
    } else {
      {/* no match, stop the spinner and show the message on screen */}
      setLoading(false)
      setError('Invalid email or password')
    }
  }

  return (
    <ScreenWrapper bg="white">
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <BackButton router={router} />

        <View style={styles.titleBlock}>
          <Text style={styles.welcomeText}>Hey,</Text>
          <Text style={styles.welcomeText}>Welcome Back</Text>
        </View>

        {/* email + password boxes, login button, and the forgot password link */}
        <View style={styles.form}>
          <Text style={styles.subtitle}>Please login to continue</Text>
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
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Button title="Login" loading={loading} onPress={onSubmit} />

          <Pressable onPress={() => router.push('/ForgotPassword')}>
            <Text style={{ color: '#ff7a00', fontSize: 14, fontWeight: '600', textAlign: 'center' }}>
              Forgot password?
            </Text>
          </Pressable>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <Pressable onPress={() => router.push('/signUp')}>
            <Text style={[styles.footerText, { color: '#ff7a00', fontWeight: '700' }]}>Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default Login

const styles = StyleSheet.create({
  container: { flex: 1, gap: 22, paddingHorizontal: 22 },
  titleBlock: { marginTop: 10 },
  welcomeText: { fontSize: hp(5), fontWeight: '800', color: '#000', lineHeight: hp(5.5) },
  subtitle: { fontSize: hp(1.6), color: 'gray', marginBottom: 4 },
  form: { gap: 16 },
  footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5 },
  footerText: { textAlign: 'center', color: 'gray', fontSize: hp(1.6) },
  errorText: { color: '#ef4444', fontSize: hp(1.6), textAlign: 'center' },
})