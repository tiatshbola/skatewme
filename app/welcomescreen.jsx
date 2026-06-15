import {
  View,
  StyleSheet,
  Image,
  Text,
  Pressable,
} from 'react-native'

import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { useRouter } from 'expo-router'

import ScreenWrapper from '../components/ScreenWrapper'
import Button from '../components/Button'

{/* the very first screen people see, logo and the two ways in */}
const WelcomeScreen = () => {

  const router = useRouter()

  return (
    <ScreenWrapper bg="white">
      <StatusBar style="dark" />

      <View style={styles.container}>

        {/* the skatewme logo sitting in the middle */}
        <View style={styles.logoWrap}>
          <Image
            style={styles.welcomeImage}
            resizeMode="contain"
            source={require('../assets/images/SKATEWMELOGO.png')}
          />
        </View>

        {/* bottom bit ,  get started goes to sign up, or login if they're already a member */}
        <View style={styles.bottomContainer}>

          <Button
            title="Get Started"
            onPress={() => router.push('/signUp')}
          />

          <View style={styles.bottomTextContainer}>
            <Text style={styles.loginText}>
              Already have an account?
            </Text>

            <Pressable onPress={() => router.push('/login')}>
              <Text style={styles.signupText}>
                Login
              </Text>
            </Pressable>
          </View>

        </View>

      </View>
    </ScreenWrapper>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 40,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },

  logoWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  welcomeImage: {
      width: '100%',
  aspectRatio: 1,
  },

  bottomContainer: {
    width: '100%',
    gap: 12,
  },

  bottomTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    marginBottom: 10,
  },

  loginText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
  },

  signupText: {
    textAlign: 'center',
    color: '#ff7a00',
    fontSize: 16,
    fontWeight: 'bold',
  },

})