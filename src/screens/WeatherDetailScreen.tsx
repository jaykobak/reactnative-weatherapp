import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { WeatherDetailScreenProps } from '../navigation/AppNavigator';

function WeatherDetailScreen({ route }: WeatherDetailScreenProps) {
    // Get the city name
    const { cityName } = route.params;
    const [weatherData, setWeatherData] = useState(null);

    async function getWeather() {
        // Get latitude and longitude from geocoding api
        const geocodingEndpoint = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`;
        const response = await fetch(geocodingEndpoint);
        const data = await response.json();
        
        const latitude = data.results[0].latitude;
        const longitude = data.results[0].longitude;

        // Get the weather from open meteo api
        const weatherEndpoint = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`;
        const weatherResponse = await fetch(weatherEndpoint);
        const weatherDat = await weatherResponse.json();

        setWeatherData(weatherDat.current);
    };

    useEffect(() => {
        getWeather();
    }, [])

    return (
        <View>
            <Text>{ JSON.stringify(weatherData) }</Text>
        </View>
    );
}

export default WeatherDetailScreen;

// https://api.open-meteo.com/v1/forecast?latitude=6.5244&longitude=3.3792&current=temperature_2m,relative_humidity_2m,wind_speed_10m