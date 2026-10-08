// Al styling ligger samlet her og bruges af App.js og de fem screens.
import { StyleSheet } from 'react-native';

// Farver samlet ét sted, så hele appen bruger de samme.
export const colors = {
  background: '#0F172A',
  card: '#1E293B',
  primary: '#22C55E',
  text: '#F8FAFC',
  subtext: '#94A3B8',
  border: '#334155',
  accent: '#F59E0B',
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

  // --- Listen på HomeScreen ---
  list: {
    marginTop: 16,
  },
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

  // --- Knapper ---
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
    marginTop: 12,
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

  // --- GymDetailScreen, tilbud og tom liste ---
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
  offerBadge: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 4,
  },
  offerBanner: {
    backgroundColor: colors.accent,
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  offerText: {
    color: colors.background,
    fontWeight: '700',
    fontSize: 14,
  },
  feeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  feeLabel: {
    color: colors.subtext,
    fontSize: 14,
  },
  feeValue: {
    color: colors.text,
    fontWeight: '600',
    fontSize: 14,
  },

  // --- Fælles hjælpe-styles ---
  flex: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centerText: {
    textAlign: 'center',
  },
  lastButton: {
    marginBottom: 40,
  },
  buttonDisabled: {
    opacity: 0.5,
  },

  // --- HomeScreen: placering og knaprække ---
  locationText: {
    fontSize: 12,
    color: colors.subtext,
    marginTop: -8,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  buttonRowItem: {
    flex: 1,
    alignItems: 'center',
  },

  // --- MapScreen ---
  mapScreen: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  mapHint: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    backgroundColor: colors.card,
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  mapHintText: {
    color: colors.text,
    fontSize: 13,
    textAlign: 'center',
  },

  // --- AiAssistantScreen ---
  chatContent: {
    paddingBottom: 24,
  },
  bubble: {
    borderRadius: 14,
    padding: 12,
    marginTop: 12,
    maxWidth: '90%',
  },
  bubbleUser: {
    backgroundColor: colors.primary,
    alignSelf: 'flex-end',
  },
  bubbleAi: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    alignSelf: 'flex-start',
  },
  bubbleText: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
  },
  bubbleUserText: {
    color: colors.background,
    fontSize: 14,
    fontWeight: '600',
  },
  loader: {
    marginTop: 16,
  },
  errorText: {
    color: '#F87171',
    marginTop: 16,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    padding: 12,
    paddingBottom: 28,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  textInput: {
    flex: 1,
    maxHeight: 100,
    backgroundColor: colors.background,
    color: colors.text,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sendButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
