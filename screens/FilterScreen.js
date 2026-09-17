import { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { styles } from '../styles/styles';
import { ALL_FACILITIES } from '../data/gyms';

const SORT_OPTIONS = [
  { key: 'distance', label: 'Distance' },
  { key: 'price', label: 'Price' },
  { key: 'rating', label: 'Rating' },
];

export default function FilterScreen({ navigation, route }) {
  const [sortBy, setSortBy] = useState(route.params?.sortBy ?? 'distance');
  const [selectedFacilities, setSelectedFacilities] = useState(
    route.params?.selectedFacilities ?? []
  );

  const toggleFacility = (facility) => {
    setSelectedFacilities((prev) =>
      prev.includes(facility)
        ? prev.filter((f) => f !== facility)
        : [...prev, facility]
    );
  };

  const applyFilters = () => {
    navigation.navigate('Home', { sortBy, selectedFacilities });
  };

  return (
    <ScrollView style={styles.screen}>
      <Text style={styles.title}>Filters & Sort</Text>
      <Text style={styles.subtitle}>Choose how to sort gyms and which facilities matter to you.</Text>

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
    </ScrollView>
  );
}
