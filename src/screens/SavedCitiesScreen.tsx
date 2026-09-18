import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type CityProps = {
  cName: string;
  cTemp: string;
  cColor: string;
  onPress: () => void;
};

function SavedCitiesScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [cities, setCities] = useState([
    { id: 1, name: 'Lisbon', color: '#F5A623' },
    { id: 2, name: 'Tokyo', color: '#94A3B8' },
    { id: 3, name: 'Austin', color: '#3B82F6' },
  ]);
  const [temperatures, setTemperatures] = useState({});

  async function loadCities() {
    const savedCities = await AsyncStorage.getItem('savedCities');

    console.log(savedCities)

    if (savedCities) {
      const parsedCities = JSON.parse(savedCities);

      setCities(parsedCities);

      loadTemperatures(parsedCities);

      console.log(temperatures)
    }
  };

  // Get the temperatures from the weather api
  async function loadTemperatures(cities) {
    const newTemperatures = {};

    for (const city of cities) {
      try {
        const geocodingEndpoint =
          `https://geocoding-api.open-meteo.com/v1/search?name=${city.name}&count=1`;

        const response = await fetch(geocodingEndpoint);
        const data = await response.json();

        const latitude = data.results[0].latitude;
        const longitude = data.results[0].longitude;

        const weatherEndpoint =
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`;

        const weatherResponse = await fetch(weatherEndpoint);
        const weatherData = await weatherResponse.json();

        newTemperatures[city.name] =
          weatherData.current.temperature_2m;
      } catch {
        newTemperatures[city.name] = null;
      }
    }

    setTemperatures(newTemperatures);
  }

  useFocusEffect(
    useCallback(() => {
      loadCities();
    }, [])
  );

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      {/* White card */}
      <View style={styles.card}>
        {/* Card title */}
        <View style={styles.wrapper}>
          <Text style={styles.title}>Saved cities</Text>
          <Pressable
            style={styles.blueDot}
            onPress={() => {
              navigation.navigate('AddCity');
            }}
          >
            <Text style={styles.subtitle}>+</Text>
          </Pressable>
        </View>

        {/* Divider */}
        <View style={[styles.divider, { marginBottom: 15 }]} />

        {/* City rows */}
        {cities.map(city => {
          return (
            <City
              key={city.id}
              cName={city.name}
              cTemp={temperatures[city.name]}
              cColor={city.color}
              onPress={() => {
                navigation.navigate('WeatherDetail', { cityName: city.name });
              }}
            />
          );
        })}
      </View>
    </View>
  );
}

function City({ cName, cTemp, cColor, onPress }: CityProps) {
  return (
    <Pressable style={styles.cityRow} onPress={onPress}>
      <View style={[styles.dot, { backgroundColor: cColor }]} />
      <Text style={styles.cityName}>{cName}</Text>
      <Text style={styles.temperature}>{cTemp}°C</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F3F8',
    paddingHorizontal: 30,
    justifyContent: 'center',
  },

  card: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 25,
    padding: 20,
    paddingBottom: 30,
  },

  wrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  title: {
    color: '#16181D',
    fontSize: 30,
    fontWeight: 'bold',
  },

  blueDot: {
    backgroundColor: '#2563EB',
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  subtitle: {
    color: 'white',
    fontSize: 32,
    includeFontPadding: false,
  },

  divider: {
    backgroundColor: '#E3E7EE',
    height: 2.5,
    width: '100%',
    borderRadius: 20,
  },

  cityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },

  dot: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    marginRight: 18,
  },

  cityName: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#16181D',
    flex: 1,
  },

  temperature: {
    color: '#6B7280',
    fontSize: 18,
  },
});

export default SavedCitiesScreen;
