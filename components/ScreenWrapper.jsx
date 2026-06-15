import { View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useUser } from '../context/UserContext'

{/* every screen sits inside this keeps content below the notch and sets the bg colour */}
const ScreenWrapper = ({ children, bg }) => {
  const { top } = useSafeAreaInsets()
  const { darkMode } = useUser()

  {/* push content down past the status bar/notch, fall back to 30 if theres no inset */}
  const paddingTop = top > 0 ? top + 5 : 30
  {/* use the colour i pass in, otherwise dark or white depending on the toggle */}
  const backgroundColor = bg || (darkMode ? '#111' : '#fff')

  return (
    <View style={{ flex: 1, paddingTop, backgroundColor }}>
      {children}
    </View>
  )
}

export default ScreenWrapper