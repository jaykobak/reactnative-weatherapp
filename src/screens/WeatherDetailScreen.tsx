import { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { WeatherDetailScreenProps } from '../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';

function WeatherDetailScreen({ route }: WeatherDetailScreenProps) {
    const navigation = useNavigation();

    // Get the city name
    const { cityName } = route.params;
    const [weatherData, setWeatherData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    async function getWeather() {
      try {
        // Get latitude and longitude from geocoding api
        const geocodingEndpoint = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`;
        const response = await fetch(geocodingEndpoint);
        const data = await response.json();

        const latitude = data.results[0].latitude;
        const longitude = data.results[0].longitude;

        // Get the weather from open meteo api
        const weatherEndpoint = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`;
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
              <Pressable>
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
              <Text style={styles.subtext}>Live weather conditions</Text>
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