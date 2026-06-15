import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'

import React from 'react'

{/* my black pill button, pass it a title and what to do onPress */}
{/* buttonStyle/textStyle let me override the look when i need to */}
const Button = ({
  title = '',
  buttonStyle,
  textStyle,
  loading = false,
  onPress = () => {},
}) => {

  {/* while loading is true show a spinner and block taps, otherwise show the title */}
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      style={[styles.button, buttonStyle, loading && styles.buttonDisabled]}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={[styles.text, textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({

  button: {
    backgroundColor: '#000',
    paddingVertical: 18,
    borderRadius: 35,
    alignItems: 'center',
    width: '100%',
  },

  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  buttonDisabled: {
    opacity: 0.6,
  },

})