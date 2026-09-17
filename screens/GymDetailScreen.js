import { View, Text, Pressable, Alert, ScrollView } from 'react-native';
import { styles } from '../styles/styles';

// GymDetailScreen viser detaljer for ét bestemt gym.
// Gym-objektet kommer fra HomeScreen via navigation.navigate('GymDetail', { gym: item }).
export default function GymDetailScreen({ route }) {
  const { gym } = route.params;

  // Funktion knyttet til "Book a tour"-knappen - viser en simpel alert-boks.
  // I en rigtig app kunne dette fx sende en booking-forespørgsel til en server.
  const bookTour = () => {
    Alert.alert('Tour requested', `We’ll let ${gym.name} know you’re interested!`);
  };

  return (
    <ScrollView style={styles.screen}>
      <Text style={styles.title}>{gym.name}</Text>
      <Text style={styles.detailAddress}>{gym.address}</Text>
      <Text style={styles.detailPrice}>{gym.price} kr/md</Text>

      <Text style={styles.sectionLabel}>Facilities</Text>
      <View style={styles.facilityPillRow}>
        {gym.facilities.map((facility) => (
          <View key={facility} style={styles.pill}>
            <Text style={styles.pillText}>{facility}</Text>
          </View>
        ))}
      </View>

      {/* '★'.repeat(...) tegner ét stjerne-tegn pr. helt point i ratingen (fx 4.6 -> ★★★★★) */}
      <Text style={styles.sectionLabel}>Rating</Text>
      <Text style={styles.subtitle}>{'★'.repeat(Math.round(gym.rating))} ({gym.rating})</Text>

      {/* Knap-krav: knap med funktion - viser en alert (ikke navigation) */}
      <Pressable style={styles.primaryButton} onPress={bookTour}>
        <Text style={styles.primaryButtonText}>Book a tour</Text>
      </Pressable>
    </ScrollView>
  );
}
