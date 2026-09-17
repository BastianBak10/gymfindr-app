import { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { styles } from '../styles/styles';
import { ALL_FACILITIES } from '../data/gyms';

// De tre muligheder man kan sortere efter. "key" bruges i koden, "label" er teksten i UI'et.
const SORT_OPTIONS = [
  { key: 'distance', label: 'Distance' },
  { key: 'price', label: 'Price' },
  { key: 'rating', label: 'Rating' },
];

// FilterScreen lader brugeren vælge sortering + faciliteter, og sender
// valget tilbage til HomeScreen, når man trykker "Apply".
export default function FilterScreen({ navigation, route }) {
  // Starter med det valg brugeren kom fra (route.params), ellers "distance" som standard.
  const [sortBy, setSortBy] = useState(route.params?.sortBy ?? 'distance');
  const [selectedFacilities, setSelectedFacilities] = useState(
    route.params?.selectedFacilities ?? []
  );

  // Tilføjer/fjerner én facilitet fra listen af valgte faciliteter, når man trykker på en pille.
  const toggleFacility = (facility) => {
    setSelectedFacilities((prev) =>
      prev.includes(facility)
        ? prev.filter((f) => f !== facility) // var allerede valgt -> fjern
        : [...prev, facility] // ikke valgt endnu -> tilføj
    );
  };

  // Navigerer tilbage til Home og sender de valgte filtre med som parametre.
  // HomeScreen læser dem igen via route.params.
  const applyFilters = () => {
    navigation.navigate('Home', { sortBy, selectedFacilities });
  };

  return (
    <ScrollView style={styles.screen}>
      <Text style={styles.title}>Filters & Sort</Text>
      <Text style={styles.subtitle}>Choose how to sort gyms and which facilities matter to you.</Text>

      {/* Sorterings-pillerne: farves grønne (pillSelected) når det er den valgte mulighed */}
      <Text style={styles.sectionLabel}>Sort by</Text>
      <View style={styles.sortOptionRow}>
        {SORT_OPTIONS.map((option) => (
          <Pressable
            key={option.key}
            style={[styles.pill, sortBy === option.key && styles.pillSelected]}
            onPress={() => setSortBy(option.key)}
          >
            <Text style={[styles.pillText, sortBy === option.key && styles.pillTextSelected]}>
              {option.label}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Facilitets-pillerne: man kan vælge flere ad gangen (multi-select) */}
      <Text style={styles.sectionLabel}>Facilities</Text>
      <View style={styles.facilityPillRow}>
        {ALL_FACILITIES.map((facility) => {
          const selected = selectedFacilities.includes(facility);
          return (
            <Pressable
              key={facility}
              style={[styles.pill, selected && styles.pillSelected]}
              onPress={() => toggleFacility(facility)}
            >
              <Text style={[styles.pillText, selected && styles.pillTextSelected]}>
                {facility}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Knap-krav: sender valgt sortering/filter tilbage til HomeScreen via navigation */}
      <Pressable style={styles.primaryButton} onPress={applyFilters}>
        <Text style={styles.primaryButtonText}>Apply</Text>
      </Pressable>
    </ScrollView>
  );
}
