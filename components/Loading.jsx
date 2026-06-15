import { StyleSheet, View, ActivityIndicator } from 'react-native'
import React from 'react'

{/* just the spinning circle for when something is loading */}
const Loading = ({
  size = 'large',
  color = '#000',
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})