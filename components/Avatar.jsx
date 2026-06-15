import { View, Text, Image, StyleSheet } from 'react-native'

{/* colours i cycle through for the fallback avatars */}
const avatarColours = ['#ff7a00', '#7c3aed', '#22c55e', '#0ea5e9', '#ef4444', '#8a6e6e', '#d4a017', '#ec4899']

{/* turn a name into one of the colours above (same name always lands on the same one) */}
function colourFor(name = '') {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return avatarColours[Math.abs(hash) % avatarColours.length]
}

{/* grab the first letter of the first two words */}
function getInitials(name = '') {
  const letters = name.trim().split(/\s+/).slice(0, 2).map(w => w[0]?.toUpperCase() || '')
  return letters.join('') || '?'
}

const Avatar = ({ uri, name, size = 40, style }) => {
  const circle = { width: size, height: size, borderRadius: size / 2 }

  {/* if they uploaded a photo just show that */}
  if (uri) {
    return <Image source={{ uri }} style={[circle, style]} />
  }

  {/* otherwise draw a coloured circle with their initials */}
  return (
    <View style={[circle, styles.circle, { backgroundColor: colourFor(name) }, style]}>
      <Text style={[styles.initials, { fontSize: size * 0.4 }]}>{getInitials(name)}</Text>
    </View>
  )
}

export default Avatar

const styles = StyleSheet.create({
  circle: { alignItems: 'center', justifyContent: 'center' },
  initials: { color: '#fff', fontWeight: '700' },
})
