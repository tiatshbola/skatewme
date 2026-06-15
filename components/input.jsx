import { View, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { hp } from '../helpers/common'
import { theme } from '../constants/theme'

{/* reusable text box - optional icon on the left, rest of the props go to the TextInput */}
const Input = (props) => {
  const { icon, containerStyles, inputRef, ...rest } = props

  return (
    <View style={[styles.container, containerStyles]}>
      {/* show the icon first if one was passed in */}
      {icon && icon}
      <TextInput
        style={{ flex: 1 }}
        placeholderTextColor="black"
        ref={inputRef}
        {...rest}
      />
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: hp(7.2),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.4,
    borderColor: 'black',
    borderRadius: 30,
    borderCurve: 'continuous',
    paddingHorizontal: 18,
    gap: 12,
  },
})