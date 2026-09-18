import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function AddCityScreen() {
  const navigation = useNavigation();
  const [cityName, setCityName] = useState('');

  function generateRandomColor() {
    const colors = [
      '#F5A623',
      '#94A3B8',
      '#3B82F6',
      '#22C55E',
      '#A855F7',
      '#EF4444',
    ];

    const randomIndex = Math.floor(Math.random() * colors.length);

    return colors[randomIndex];
  }

  async function addCity() {
    if (!cityName.trim()) {
      return Alert.alert("Please enter a valid input")
    }

    const savedCities = await AsyncStorage.getItem('savedCities');

    let cities = [];

    // Check if there is content in async storage
    if (savedCities) {
      cities = JSON.parse(savedCities);
    }

    // Check if the city already exists
    for(let i = 0; i < cities.length; i++) {
      const currentCity = cities[i];

      if (currentCity.name.toLowerCase() === cityName.trim().toLowerCase()) {
        return Alert.alert("This city already exists in the list of saved cities");
      }
    }

    const newCity = {
      id: Date.now(),
      name: cityName,
      color: generateRandomColor()
    };

    cities.push(newCity);

    await AsyncStorage.setItem(
      'savedCities',
      JSON.stringify(cities),
    );

    navigation.goBack();
  }

  return (
    <View style={styles.screenContainer}>
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text style={styles.backArrow}>←</Text>
          </Pressable>
          <Text style={styles.headerTitle}>Add city</Text>
        </View>

        <View style={styles.divider} />

        {/* Input Section */}
        <Text style={styles.label}>City name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Lisbon"
          placeholderTextColor="#9CA3AF"
          onChangeText={setCityName}
        />

        {/* Primary Button */}
        <Pressable style={styles.primaryButton} onPress={addCity}>
          <Text style={styles.primaryButtonText}>Add city</Text>
        </Pressable>

        {/* "or" Divider */}
        <View style={styles.orContainer}>
          <View style={styles.orLine} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.orLine} />
        </View>

        {/* Secondary Button */}
        <Pressable style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>
            Use my current location
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#F0F3F8',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  card: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 28,
    padding: 24,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  backArrow: {
    fontSize: 22,
    color: '#16181D',
    marginRight: 15,
    fontWeight: 'bold',
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#16181D',
  },

  divider: {
    height: 1,
    backgroundColor: '#E3E7EE',
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#16181D',
    marginBottom: 20,
  },

  primaryButton: {
    backgroundColor: '#2563EB',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },

  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E3E7EE',
  },

  orText: {
    marginHorizontal: 12,
    color: '#6B7280',
    fontSize: 14,
  },

  secondaryButton: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: 'white',
  },

  secondaryButtonText: {
    color: '#16181D',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddCityScreen;
