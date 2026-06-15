import { Stack } from 'expo-router'
import { View, StyleSheet } from 'react-native'
import { UserProvider, useUser } from '../context/UserContext'

{/* wraps every screen in a dark or white background so the whole app matches the toggle */}
const AppShell = () => {
  const { darkMode } = useUser()
  return (
    <View style={[styles.root, { backgroundColor: darkMode ? '#111' : '#fff' }]}>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'transparent' } }} />
    </View>
  )
}

{/* UserProvider has to go on the outside so every screen can read the logged in user */}
export default function RootLayout() {
  return (
    <UserProvider>
      <AppShell />
    </UserProvider>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1 }
})