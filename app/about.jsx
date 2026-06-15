import { View, Text, ScrollView, StyleSheet } from 'react-native'
import ScreenWrapper from '../components/ScreenWrapper'
import BackButton from '../components/BackButton'
import { useTheme } from '../context/UserContext'

{/* about page - just the terms & conditions text, one long scroll */}
const About = () => {
  const { bg, text, mutedText } = useTheme()

  return (
    <ScreenWrapper>
      <ScrollView style={{ backgroundColor: bg }} contentContainerStyle={styles.scroll}>

        {/* back arrow + page title */}
        <View style={styles.header}>
          <BackButton />
          <Text style={[styles.title, { color: text }]}>About App</Text>
        </View>

        <Text style={[styles.alphaNote, { color: mutedText }]}>
          Skate w Me is currently in its alpha stage. You may experience bugs, missing features, or unexpected behaviour as we continue to build and refine the experience. Thanks for being one of the first riders on board.
        </Text>

        {/* the terms - just headings and paragraphs all the way down */}
        <Text style={[styles.sectionTitle, { color: text }]}>Terms & Conditions</Text>
        <Text style={[styles.paragraph, { color: mutedText }]}>
          Welcome to Skate w Me. By using this app, you agree to the following terms.
          Skate w Me is a community platform for roller skaters in the UK to find groups, events, and other skaters in their area.
          You must be 18 or over to create an account and use Skate w Me.
        </Text>

        <Text style={[styles.sectionTitle, { color: text }]}>1. Community Guidelines</Text>
        <Text style={[styles.paragraph, { color: mutedText }]}>
          Users are expected to treat one another with respect. Harassment, discrimination, or harmful behaviour will result in account suspension. Be the kind of skater you'd want to meet at a session.
        </Text>

        <Text style={[styles.sectionTitle, { color: text }]}>2. Safety</Text>
        <Text style={[styles.paragraph, { color: mutedText }]}>
          Skate w Me is a meet-up platform. We do not organise the events ourselves and are not responsible for any injury that may occur during user-organised meet-ups. Always wear protective gear and skate at your own risk.
        </Text>

        <Text style={[styles.sectionTitle, { color: text }]}>3. Privacy</Text>
        <Text style={[styles.paragraph, { color: mutedText }]}>
          We collect basic profile information you provide (name, email, skate level, age). You can choose whether to display your age publicly. We do not share your data with third parties.
        </Text>

        <Text style={[styles.sectionTitle, { color: text }]}>4. Account</Text>
        <Text style={[styles.paragraph, { color: mutedText }]}>
          You're responsible for keeping your password secure. You can update your profile, change your password, or log out at any time from the Profile tab.
        </Text>

        <Text style={[styles.sectionTitle, { color: text }]}>Contact</Text>
        <Text style={[styles.paragraph, { color: mutedText }]}>
          Questions, feedback, or issues? Reach us at hello@skatewme.com.
        </Text>

        <Text style={[styles.footer, { color: mutedText }]}>© 2026 Skate w Me. All rights reserved.</Text>

      </ScrollView>
    </ScreenWrapper>
  )
}

export default About

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 18, paddingTop: 10, paddingBottom: 40, minHeight: '100%' },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
  title: { fontSize: 22, fontWeight: '600' },
  alphaNote: {
    fontSize: 13, lineHeight: 19, textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 24, paddingHorizontal: 10,
  },
  sectionTitle: { fontSize: 15, fontWeight: '600', marginTop: 20, marginBottom: 8 },
  paragraph: { fontSize: 14, lineHeight: 20 },
  footer: { fontSize: 12, textAlign: 'center', marginTop: 30 },
})