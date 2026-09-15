import { View, Text, Pressable, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function AddCityScreen() {
    const navigation = useNavigation();

    return (
      <View>
        <Text>Add City</Text>
        <TextInput placeholder='Enter a city' />

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