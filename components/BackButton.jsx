import { Pressable, StyleSheet } from 'react-native'
import React from 'react'

import Icon from '../assets/icons'
import { useRouter } from 'expo-router'
import { theme } from '../constants/theme'

{/* little back arrow i reuse on most screens, just sends you back one page */}
const BackButton = ({ size = 26 }) => {

  const router = useRouter()

  return (
    <Pressable onPress={() => router.back()} style={styles.button}>
      <Icon
        name="arrowLeft"
        strokeWidth={2.5}
        size={size}
        color={"black"}
      />
    </Pressable>
  )
}

export default BackButton

const styles = StyleSheet.create({

    button:{

        alignSelf: 'flex-start',
        padding: 5,
        borderRadius: 12,
        backgroundColor: 'rgba(0,0,0,0.07)',
        marginTop: -20,
        marginLeft: 10,

    }


}
)