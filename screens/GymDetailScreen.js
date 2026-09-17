import { View, Text, Pressable, ScrollView } from 'react-native';
import { styles } from '../styles/styles';

// GymDetailScreen viser detaljer for ét bestemt gym.
// Gym-objektet kommer fra HomeScreen via navigation.navigate('GymDetail', { gym: item }).
export default function GymDetailScreen({ route }) {
  const { gym } = route.params;

  return (
    <ScrollView style={styles.screen}>
      <Text style={styles.title}>{gym.name}</Text>
      <Text style={styles.detailAddress}>{gym.address}</Text>
      <Text style={styles.detailPrice}>{gym.price} kr/md</Text>

      {/* Tilbuds-banner - vises kun hvis gymmet har et aktivt kampagnetilbud (gym.offer) */}
      {gym.offer && (
        <View style={styles.offerBanner}>
          <Text style={styles.offerText}>🔥 {gym.offer}</Text>
        </View>
      )}

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

      {/* Gebyr-oversigt - viser de "skjulte" ekstra gebyrer udover selve månedsprisen */}
      <Text style={styles.sectionLabel}>Fees & binding</Text>
      <View style={styles.feeRow}>
        <Text style={styles.feeLabel}>Oprettelsesgebyr</Text>
        <Text style={styles.feeValue}>
          {gym.signupFee === 0 ? 'Gratis' : `${gym.signupFee} kr`}
        </Text>
      </View>
      <View style={styles.feeRow}>
        <Text style={styles.feeLabel}>Administrationsgebyr</Text>
        <Text style={styles.feeValue}>{gym.adminFee} kr/md</Text>
      </View>
      <View style={styles.feeRow}>
        <Text style={styles.feeLabel}>Bindingsperiode</Text>
        <Text style={styles.feeValue}>
          {gym.bindingMonths === 0 ? 'Ingen binding' : `${gym.bindingMonths} måneder`}
        </Text>
      </View>

      {/* Low-fi prototype: knappen har endnu ingen funktion. Idéen bag den er, at den i en
          rigtig version skal åbne gymmets hjemmeside (se "website" i data/gyms.js) via et
          affiliate-link, så GymFindr tjener en kommission pr. tilmelding. */}
      <Pressable style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>Sign up</Text>
      </Pressable>
    </ScrollView>
  );
}
