import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { styles, colors } from '../styles/styles';
import { GYMS } from '../data/gyms';
import { useUserLocation, addDistances } from '../services/location';
import { askGymAssistant } from '../services/openai';

// Forslag brugeren kan trykke på, hvis de ikke ved, hvad de skal spørge om.
const SUGGESTIONS = [
  'Hvad er det billigste gym med sauna?',
  'Jeg er studerende og vil ikke have binding. Hvad passer til mig?',
  'Hvilket gym tæt på mig er bedst til holdtræning?',
];

// AI-rådgiver: brugeren skriver sine ønsker, og ChatGPT anbefaler et gym ud fra GymFindrs data.
// Kan åbnes fra Home (tom) eller fra GymDetail (med et spørgsmål om det valgte gym).
export default function AiAssistantScreen({ navigation, route }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState(route.params?.question ?? '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { coords } = useUserLocation();
  const headerHeight = useHeaderHeight();

  const gyms = addDistances(GYMS, coords);

  // Knap: sender spørgsmålet (og hele samtalen indtil nu) til ChatGPT og viser svaret.
  const sendMessage = async (text) => {
    const question = text.trim();
    if (!question || loading) return;

    const newMessages = [...messages, { role: 'user', content: question }];
    setMessages(newMessages);
    setInput('');
    setError(null);
    setLoading(true);
    try {
      const answer = await askGymAssistant(newMessages, gyms);
      setMessages([...newMessages, { role: 'assistant', content: answer }]);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // Finder de gyms, AI'en nævner i sit svar, så man kan trykke direkte videre til dem.
  const mentionedGyms = (text) => gyms.filter((gym) => text.includes(gym.name));

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={headerHeight}
    >
      <ScrollView style={styles.screen} contentContainerStyle={styles.chatContent}>
        <Text style={styles.title}>AI-rådgiver</Text>
        <Text style={styles.subtitle}>
          Fortæl hvad du leder efter, så finder AI'en det gym der passer dig – inkl. gebyrer og binding.
        </Text>

        {/* Forslag vises kun, før samtalen er startet */}
        {messages.length === 0 && (
          <View style={styles.facilityPillRow}>
            {SUGGESTIONS.map((suggestion) => (
              <Pressable key={suggestion} style={styles.pill} onPress={() => sendMessage(suggestion)}>
                <Text style={styles.pillText}>{suggestion}</Text>
              </Pressable>
            ))}
          </View>
        )}

        {/* Samtalen: brugerens beskeder til højre, AI'ens til venstre */}
        {messages.map((message, index) => (
          <View
            key={index}
            style={[styles.bubble, message.role === 'user' ? styles.bubbleUser : styles.bubbleAi]}
          >
            <Text style={message.role === 'user' ? styles.bubbleUserText : styles.bubbleText}>
              {message.content}
            </Text>
            {message.role === 'assistant' && (
              <View style={styles.facilityPillRow}>
                {mentionedGyms(message.content).map((gym) => (
                  <Pressable
                    key={gym.id}
                    style={[styles.pill, styles.pillSelected]}
                    onPress={() => navigation.navigate('GymDetail', { gym })}
                  >
                    <Text style={[styles.pillText, styles.pillTextSelected]}>Se {gym.name} →</Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>
        ))}

        {loading && <ActivityIndicator color={colors.primary} style={styles.loader} />}
        {error && <Text style={styles.errorText}>⚠️ {error}</Text>}
      </ScrollView>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.textInput}
          value={input}
          onChangeText={setInput}
          placeholder="Fx: Billigt gym med pool tæt på mig"
          placeholderTextColor={colors.subtext}
          multiline
        />
        <Pressable
          style={[styles.sendButton, loading && styles.buttonDisabled]}
          onPress={() => sendMessage(input)}
          disabled={loading}
        >
          <Text style={styles.primaryButtonText}>Send</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
