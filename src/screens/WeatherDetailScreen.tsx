import { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { WeatherDetailScreenProps } from '../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';

function getWeatherDescription(code : number) {
  if (code === 0) {
    return 'Clear sky';
  }

  if (code === 1 || code === 2 || code === 3) {
    return 'Cloudy';
  }

  if (code === 45 || code === 48) {
    return 'Foggy';
  }

  if (code >= 51 && code <= 57) {
    return 'Drizzle';
  }

  if (code >= 61 && code <= 67) {
    return 'Rain';
  }

  if (code >= 71 && code <= 77) {
    return 'Snow';
  }

  if (code >= 80 && code <= 82) {
    return 'Rain showers';
  }

  if (code >= 85 && code <= 86) {
    return 'Snow showers';
  }

  if (code >= 95) {
    return 'Thunderstorm';
  }

  return 'Unknown';
}

function WeatherDetailScreen({ route }: WeatherDetailScreenProps) {
    const navigation = useNavigation();

    // Get the city name
    const { cityName, latitude, longitude } = route.params;
    const [weatherData, setWeatherData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    async function getWeather() {
      // Set is Loading to true at the beginning
      setIsLoading(true);
      setError('');

      try {
        // Get latitude and longitude from geocoding api
        let cityLatitude = latitude;
        let cityLongitude = longitude;

        if (cityLatitude === undefined || cityLongitude === undefined) {
          const geocodingEndpoint = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`;
          const response = await fetch(geocodingEndpoint);
          const data = await response.json();

          cityLatitude = data.results[0].latitude;
          cityLongitude = data.results[0].longitude;
        }

        // Get the weather from open meteo api
        const weatherEndpoint = `https://api.open-meteo.com/v1/forecast?latitude=${cityLatitude}&longitude=${cityLongitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`;
        const weatherResponse = await fetch(weatherEndpoint);
        const weatherDat = await weatherResponse.json();

        setWeatherData(weatherDat.current);
      } catch {
        setError('Failed to load weather');
      } finally {
        setIsLoading(false);
      }
    }

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.screenContainer}>
      <View style={styles.card}>
        {isLoading ? (
          <View style={styles.centerBox}>
            <Text style={styles.loadingText}>Weather loading...</Text>
          </View>
        ) : error ? (
          <View style={styles.centerBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : (
          <>
            {/* Header */}
            <View style={styles.headerRow}>
              <Pressable
                onPress={() =>
                  navigation.goBack()
                }
              >
                <Text style={styles.backArrow}>←</Text>
              </Pressable>
              <Text style={styles.headerTitle}>{cityName}</Text>
              <Pressable onPress={ getWeather }>
                <Text style={styles.refreshIcon}>↻</Text>
              </Pressable>
            </View>

            <View style={styles.divider} />

            {/* Weather Graphic */}
            <View style={styles.weatherInfoContainer}>
              <View style={[ styles.sunCircle, { backgroundColor: '#F5A623' } ]} />
              <Text style={styles.temperatureText}>
                {weatherData?.temperature_2m}°C
              </Text>
              <Text style={styles.subtext}>{getWeatherDescription(weatherData?.weather_code)}</Text>
            </View>

            {/* Bottom Boxes */}
            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>
                  {weatherData?.relative_humidity_2m}%
                </Text>
                <Text style={styles.statLabel}>Humidity</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>
                  {weatherData?.wind_speed_10m} km/h
                </Text>
                <Text style={styles.statLabel}>Wind</Text>
              </View>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#E8ECF4',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  card: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 28,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },

  centerBox: {
    paddingVertical: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadingText: {
    fontSize: 16,
    color: '#6B7280',
  },

  errorText: {
    fontSize: 16,
    color: '#EF4444',
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  backArrow: {
    fontSize: 22,
    color: '#16181D',
    fontWeight: 'bold',
    marginRight: 15,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#16181D',
    flex: 1,
  },

  refreshIcon: {
    fontSize: 20,
    color: '#16181D',
    fontWeight: 'bold',
  },

  divider: {
    height: 1,
    backgroundColor: '#E3E7EE',
    marginBottom: 30,
  },

  weatherInfoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },

  sunCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 20,
  },

  temperatureText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#16181D',
    marginBottom: 8,
  },

  subtext: {
    fontSize: 14,
    color: '#6B7280',
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  statBox: {
    flex: 1,
    backgroundColor: '#F0F3F8',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginHorizontal: 6,
  },

  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#16181D',
    marginBottom: 4,
  },

  statLabel: {
    fontSize: 13,
    color: '#6B7280',
  },
});

export default WeatherDetailScreen;