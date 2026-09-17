import { useState } from 'react';
import { View, Text, Pressable, Alert, ScrollView } from 'react-native';
import { styles } from '../styles/styles';

// GymDetailScreen viser detaljer for ét bestemt gym.
// Gym-objektet kommer fra HomeScreen via navigation.navigate('GymDetail', { gym: item }).
export default function GymDetailScreen({ route }) {
  const { gym } = route.params;

  // Holder styr på om brugeren allerede har tilmeldt sig dette gym,
  // så vi kan vise en anden knap-tekst og undgå dobbelt-tilmelding.
  const [isSignedUp, setIsSignedUp] = useState(false);

  // Funktion knyttet til "Sign up"-knappen. I en rigtig app ville dette sende
  // en tilmeldings-forespørgsel til en server - her viser vi bare en bekræftelse.
  const signUp = () => {
    setIsSignedUp(true);
    Alert.alert(
      'Du er nu tilmeldt!',
      `Velkommen til ${gym.name}. Du kan se dine gebyrer og bindingsperiode herunder.`
    );
  };

  // Funktion knyttet til "Book a tour"-knappen - viser en simpel alert-boks.
  const bookTour = () => {
    Alert.alert('Tour requested', `We’ll let ${gym.name} know you’re interested!`);
  };

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

      {/* Knap-krav: knap med funktion - tilmelder brugeren (ikke navigation) */}
      <Pressable style={styles.primaryButton} onPress={signUp} disabled={isSignedUp}>
        <Text style={styles.primaryButtonText}>
          {isSignedUp ? 'Tilmeldt ✓' : 'Sign up'}
        </Text>
      </Pressable>

      <Pressable style={styles.secondaryButton} onPress={bookTour}>
        <Text style={styles.secondaryButtonText}>Book a tour</Text>
      </Pressable>
    </ScrollView>
  );
}
