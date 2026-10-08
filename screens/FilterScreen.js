import { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { styles } from '../styles/styles';
import { ALL_FACILITIES } from '../data/gyms';
import { saveFilters, clearFilters, DEFAULT_FILTERS } from '../services/storage';

const SORT_OPTIONS = [
  { key: 'distance', label: 'Distance' },
  { key: 'price', label: 'Price' },
  { key: 'rating', label: 'Rating' },
];

// Lader brugeren vælge sortering og faciliteter, gemmer valget og sender det tilbage til Home.
export default function FilterScreen({ navigation, route }) {
  // Starter med de valg, Home sendte med.
  const initial = route.params?.filters ?? DEFAULT_FILTERS;
  const [sortBy, setSortBy] = useState(initial.sortBy);
  const [selectedFacilities, setSelectedFacilities] = useState(initial.selectedFacilities);

  // Vælger eller fravælger en facilitet.
  const toggleFacility = (facility) => {
    setSelectedFacilities((prev) =>
      prev.includes(facility) ? prev.filter((f) => f !== facility) : [...prev, facility]
    );
  };

  // Knap: gemmer valgene på telefonen (så de huskes, når appen lukkes) og går tilbage til Home.
  const applyFilters = async () => {
    const filters = { sortBy, selectedFacilities };
    await saveFilters(filters);
    navigation.popTo('Home', { filters });
  };

  // Knap: sletter de gemte valg og går tilbage til Home med standardvalgene.
  const resetFilters = async () => {
    await clearFilters();
    navigation.popTo('Home', { filters: DEFAULT_FILTERS });
  };

  return (
    <ScrollView style={styles.screen}>
      <Text style={styles.title}>Filters & Sort</Text>
      <Text style={styles.subtitle}>
        Choose how to sort gyms and which facilities matter to you. Your choices are saved.
      </Text>

      {/* Man kan kun vælge én sortering ad gangen */}
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

      {/* Man kan vælge flere faciliteter ad gangen */}
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

      <Pressable style={styles.primaryButton} onPress={applyFilters}>
        <Text style={styles.primaryButtonText}>Apply</Text>
      </Pressable>
      <Pressable style={styles.secondaryButton} onPress={resetFilters}>
        <Text style={[styles.secondaryButtonText, styles.centerText]}>Nulstil filtre</Text>
      </Pressable>
    </ScrollView>
  );
}
