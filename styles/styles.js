// Styling-krav: al styling ligger samlet i denne separate fil
// og importeres ind i App.js og de tre screens (Home, Filter, GymDetail).
import { StyleSheet } from 'react-native';

// Farvepalette samlet ét sted, så hele appen bruger de samme farver konsekvent.
export const colors = {
  background: '#0F172A',
  card: '#1E293B',
  primary: '#22C55E',
  text: '#F8FAFC',
  subtext: '#94A3B8',
  border: '#334155',
};

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.subtext,
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  // --- Gym-kortet i listen på HomeScreen ---
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  cardAddress: {
    fontSize: 13,
    color: colors.subtext,
    marginTop: 2,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  distance: {
    fontSize: 13,
    color: colors.subtext,
  },
  facilityPillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 6,
  },
  pill: {
    backgroundColor: colors.border,
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  pillSelected: {
    backgroundColor: colors.primary,
  },
  pillText: {
    fontSize: 12,
    color: colors.text,
  },
  pillTextSelected: {
    color: colors.background,
    fontWeight: '600',
  },

  // --- Knapper (bruges på tværs af alle tre screens) ---
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButtonText: {
    color: colors.background,
    fontWeight: '700',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: colors.card,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryButtonText: {
    color: colors.text,
    fontWeight: '600',
  },

  // --- FilterScreen ---
  sectionLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    marginTop: 20,
    marginBottom: 10,
  },
  sortOptionRow: {
    flexDirection: 'row',
    gap: 10,
  },

  // --- GymDetailScreen ---
  detailAddress: {
    fontSize: 15,
    color: colors.subtext,
    marginBottom: 16,
  },
  detailPrice: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 16,
  },
  emptyText: {
    color: colors.subtext,
    textAlign: 'center',
    marginTop: 40,
  },
});
