import { View, Text, Pressable, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

function AddCityScreen() {
    const navigation = useNavigation();
    const [cityName, setCityName] = useState('');

    return (
      <View>
        <Text>Add City</Text>
        <TextInput placeholder='Enter a city' onChangeText={setCityName} />

        <Text>{cityName}</Text>

        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text>Go back</Text>
        </Pressable>
      </View>
    );
}

export default AddCityScreen;