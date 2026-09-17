import { View, Text, FlatList, Pressable } from 'react-native';
import { styles } from '../styles/styles';
import { GYMS } from '../data/gyms';

const DEFAULT_SORT = 'distance';

// HomeScreen viser listen af gyms. navigation bruges til at skifte screen,
// route giver adgang til de parametre FilterScreen har sendt tilbage (sortBy/selectedFacilities).
export default function HomeScreen({ navigation, route }) {
  // Sorterings-/filter-valg kommer fra FilterScreen via navigation-parametre.
  // "?? DEFAULT_SORT" bruges som fallback, hvis man ikke har været på FilterScreen endnu.
  const sortBy = route.params?.sortBy ?? DEFAULT_SORT;
  const selectedFacilities = route.params?.selectedFacilities ?? [];

  // Laver en kopi af GYMS, så vi ikke sorterer/ændrer i det oprindelige array.
  let gyms = [...GYMS];

  // Behold kun gyms der har ALLE de valgte faciliteter.
  if (selectedFacilities.length > 0) {
    gyms = gyms.filter((gym) =>
      selectedFacilities.every((f) => gym.facilities.includes(f))
    );
  }

  // Sortér efter det valgte kriterie (pris, rating eller afstand).
  gyms.sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return a.distanceKm - b.distanceKm;
  });

  // renderGym bestemmer hvordan ét enkelt gym skal tegnes i FlatList'en.
  // Knap-krav: hvert gym-kort er tryk-bart og navigerer til detalje-siden.
  // Vi sender hele "item" (gym-objektet) med som parameter, så GymDetailScreen kan bruge det.
  const renderGym = ({ item }) => (
    <Pressable
      style={styles.card}
      onPress={() => navigation.navigate('GymDetail', { gym: item })}
    >
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardAddress}>{item.address}</Text>
      {/* Lille badge så man kan se tilbud direkte i listen, uden at åbne detalje-siden */}
      {item.offer && <Text style={styles.offerBadge}>🔥 Offer available</Text>}
      <View style={styles.cardRow}>
        <Text style={styles.price}>{item.price} kr/md</Text>
        <Text style={styles.distance}>{item.distanceKm.toFixed(1)} km away</Text>
      </View>
      <View style={styles.facilityPillRow}>
        {item.facilities.map((f) => (
          <View key={f} style={styles.pill}>
            <Text style={styles.pillText}>{f}</Text>
          </View>
        ))}
      </View>
    </Pressable>
  );

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>GymFindr</Text>
      <Text style={styles.subtitle}>Gyms near you, sorted and filtered your way.</Text>

      {/* Knap-krav: knap med funktion - navigerer til FilterScreen */}
      <Pressable
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('Filters', { sortBy, selectedFacilities })}
      >
        <Text style={styles.secondaryButtonText}>
          Filters & Sort ({sortBy}
          {selectedFacilities.length > 0 ? `, ${selectedFacilities.length} facilities` : ''})
        </Text>
      </Pressable>

      {/* Liste-krav: FlatList viser alle gyms som en scrollbar liste.
          - data: selve arrayet der skal vises
          - keyExtractor: giver React en unik nøgle pr. element (bedre performance)
          - renderItem: funktionen der tegner hvert element (renderGym ovenfor)
          - ListEmptyComponent: vises i stedet for listen, hvis "gyms" er tom */}
      <FlatList
        data={gyms}
        keyExtractor={(item) => item.id}
        renderItem={renderGym}
        style={{ marginTop: 16 }}
        ListEmptyComponent={<Text style={styles.emptyText}>No gyms match your filters.</Text>}
      />
    </View>
  );
}
