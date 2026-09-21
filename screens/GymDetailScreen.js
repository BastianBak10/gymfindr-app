import { View, Text, Pressable, ScrollView, Linking, Alert } from 'react-native';
import { styles } from '../styles/styles';

// Åbner gymmets hjemmeside og viser en fejl, hvis linket ikke kan åbnes
// (fx manglende browser-app), i stedet for at fejle stille.
function openGymWebsite(url) {
  Linking.openURL(url).catch((error) => {
    Alert.alert('Kunne ikke åbne linket', error.message);
  });
}

// Viser detaljer for ét gym, som Home sender med via route.params.
export default function GymDetailScreen({ route }) {
  const { gym } = route.params;

  return (
    <ScrollView style={styles.screen}>
      <Text style={styles.title}>{gym.name}</Text>
      <Text style={styles.detailAddress}>{gym.address}</Text>
      <Text style={styles.detailPrice}>{gym.price} kr/md</Text>

      {/* Vises kun, hvis gymmet har et tilbud */}
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

      <Text style={styles.sectionLabel}>Rating</Text>
      <Text style={styles.subtitle}>{'★'.repeat(Math.round(gym.rating))} ({gym.rating})</Text>

      {/* Gebyrer og binding samlet, så man ser de ekstra udgifter ud over månedsprisen */}
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

      {/* Knap: åbner gymmets hjemmeside (affiliate-link, hvor GymFindr tjener en kommission) */}
      <Pressable style={styles.primaryButton} onPress={() => openGymWebsite(gym.website)}>
        <Text style={styles.primaryButtonText}>Sign up</Text>
      </Pressable>
    </ScrollView>
  );
}
