import { View, Text, Pressable, StyleSheet, Linking, ScrollView } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import ScreenWrapper from '../components/ScreenWrapper'
import BackButton from '../components/BackButton'

{/* the burgess park spot page, map, info and facilities for skate users. */}
const Park = () => {
  const router = useRouter()

  {/* goes to the map app for directions */}
  const openInMaps = () => {
    Linking.openURL('https://maps.apple.com/?q=Burgess+Park+London')
  }

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.scroll}>

        <View style={styles.header}>
          <BackButton router={router} />
          <Text style={styles.title}>Burgess Park</Text>
        </View>

        {/*  map with a pin dropped on the park */}
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 51.4806,
            longitude: -0.0884,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Marker
            coordinate={{ latitude: 51.4806, longitude: -0.0884 }}
            title="Burgess Park"
            description="Public skate park"
          />
        </MapView>

        {/* address, type and opening hours */}
        <View style={styles.infoBlock}>
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={20} color="#888" />
            <Text style={styles.infoText}>Albany Rd, Camberwell, London SE5 0AL</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="business-outline" size={20} color="#888" />
            <Text style={styles.infoText}>Public skate park</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={20} color="#888" />
            <Text style={styles.infoText}>Open 24 hours</Text>
          </View>
        </View>

        {/* row of little icons for what the park has */}
        <Text style={styles.sectionTitle}>Facilities</Text>
        <View style={styles.facilities}>
          <View style={styles.facility}>
            <Ionicons name="trail-sign-outline" size={22} color="#ff7a00" />
            <Text style={styles.facilityText}>Ramps</Text>
          </View>
          <View style={styles.facility}>
            <Ionicons name="git-branch-outline" size={22} color="#ff7a00" />
            <Text style={styles.facilityText}>Rails</Text>
          </View>
          <View style={styles.facility}>
            <Ionicons name="bulb-outline" size={22} color="#ff7a00" />
            <Text style={styles.facilityText}>Lights</Text>
          </View>
          <View style={styles.facility}>
            <Ionicons name="car-outline" size={22} color="#ff7a00" />
            <Text style={styles.facilityText}>Parking</Text>
          </View>
        </View>

        <Pressable style={styles.button} onPress={openInMaps}>
          <Ionicons name="navigate-outline" size={18} color="#fff" />
          <Text style={styles.buttonText}>Open in Maps</Text>
        </Pressable>

      </ScrollView>
    </ScreenWrapper>
  )
}

export default Park

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 40 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  title: { fontSize: 22, fontWeight: '600' },
  map: { width: '100%', height: 250, borderRadius: 16, marginBottom: 20 },
  infoBlock: { gap: 12, marginBottom: 24 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  infoText: { fontSize: 14, color: '#000', flex: 1 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  facilities: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  facility: { alignItems: 'center', gap: 6 },
  facilityText: { fontSize: 12, color: '#000' },
  button: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: '#ff7a00', paddingVertical: 14, borderRadius: 14,
  },
  buttonText: { color: '#fff', fontSize: 15, fontWeight: '600' },
})