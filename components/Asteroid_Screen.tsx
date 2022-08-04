import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import axios from 'axios';

interface Info {
  name: string[];
  nasa_jpl_url: string[];
  is_potentially_hazardous_asteroid: boolean;
}

const Asteroid_Screen = ({route}: any) => {
  const [asteroidData, setAsteroidData] = useState<Info>();
  const [error, setError] = useState<Boolean>(false);
  //const [loading, setLoading] = useState<boolean>(false);

  const Input = route.params.input;

  const Api = axios.create({
    baseURL: 'https://api.nasa.gov/',
  });

  const getAsteroidData = () => {
    Api.get(
      `neo/rest/v1/neo/${Input}?api_key=0Al5dqlPwyipcT4BgpPgXJEnVrhDbMF4dWDcoOQD`,
    )
      .then((response: any) => setAsteroidData(response.data))
      .catch((error: any) => setError(true));
  };

  useEffect(() => {
    getAsteroidData();
  }, []);

  // console.log('Asteroid data :', asteroidData);

  return (
    <View style={styles.Container}>
      {error && <Text style={styles.errorText}>Please Enter a valid ID..</Text>}
      <Text style={styles.text1}> Name: {asteroidData?.name} </Text>
      <Text style={styles.text1}> URL: {asteroidData?.nasa_jpl_url}</Text>
      <Text style={styles.text1}>
        {' '}
        is_potentially_hazardous_asteroid :
        {asteroidData?.is_potentially_hazardous_asteroid ? 'True' : 'False'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f5fffa',
  },

  text1: {
    fontSize: 23,
    textAlign: 'center',
    color: '#ff8c00',
    marginBottom: 50,
    fontWeight: 'bold',
    fontStyle: 'italic',
    letterSpacing: 1,
  },

  text2: {
    fontSize: 30,
    textAlign: 'center',
    color: '#ff8c00',
    marginBottom: 50,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },

  errorText: {color: 'red', fontSize: 15, padding: 20, margin: 20},
});

export default Asteroid_Screen;
