import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {Button} from 'react-native-paper';

const HomeScreen = ({navigation}: any) => {
  const [input, setInput] = useState<any>('');
  const [error, setError] = useState<Boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const Api = axios.create({
    baseURL: 'https://api.nasa.gov/',
  });

  const getRandomAsteroidData = () => {
    setLoading(true);
    Api.get(`neo/rest/v1/neo/browse?api_key=DEMO_KEY`)
      .then((response: any) => {
        const randomId = Math.floor(
          Math.random() * response.data.near_earth_objects.length,
        );
        navigation.navigate('Asteroid_Screen', {
          input: response.data.near_earth_objects[randomId].id,
        });
      })
      .catch((error: any) => setError(true))
      .finally(() => setLoading(false));
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.Heading}> NASA App </Text>
      </View>
      <TextInput
        style={styles.textInput}
        placeholder="Enter Asteroid ID"
        value={input}
        onChangeText={text => setInput(text)}
        placeholderTextColor="skyblue"
        keyboardType="numeric"
      />
      <Button
        mode="contained"
        uppercase={false}
        disabled={!input}
        theme={{colors: {primary: '#4169e1'}}}
        style={{margin: 20}}
        onPress={() => navigation.navigate('Asteroid_Screen', {input})}>
        <Text style={{color: 'white'}}> Submit </Text>
      </Button>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button
          mode="contained"
          disabled={loading}
          uppercase={false}
          theme={{colors: {primary: '#4169e1'}}}
          style={{margin: 20}}
          onPress={() => getRandomAsteroidData()}>
          <Text style={{color: 'white'}}> Random Asteroid </Text>
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fffa',
    justifyContent: 'center',
    alignItems: 'center',
  },

  Heading: {
    color: 'black',
    fontSize: 25,
    paddingBottom: 230,
    //paddingTop: 50,
    //margin: 10,
  },

  textInput: {
    borderWidth: 2,
    borderColor: '#777',
    borderRadius: 16,
    padding: 8,
    margin: 10,
    width: 350,
    height: 50,
  },
});

export default HomeScreen;
