import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, Image,TouchableHighlight } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios'


export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Results" component={ResultsScreen} />
        <Stack.Screen name="Details" component={MovieScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

//MARK:- Screens
const SearchScreen = () => {
  const apiKey = 'b3070a5d3abfb7c241d2688d066914e7'
  const dbURL = 'https://api.themoviedb.org/3/search/movie?'
  async function search() {
  }

  const navigation = useNavigation();

  function getMovies() {
    axios(dbURL + "api_key=" + apiKey + "&query=" + state.searchText + "&language=en-US&page=1").then(({ data }) => {
      let results : Result[] = data.results
      navigation.navigate('Results', {
        result: results
      })
    }).catch(error => {
      console.log(error)
    })

  }
  const [state, setState] = useState({
    searchText: '',
    results: []
  })
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Enter a Movie Name....</Text>
      <TextInput
        style={{
          padding: 8,
          backgroundColor: '#f5f5f5'
        }}
        value={state.searchText}
        returnKeyType='search'
        onSubmitEditing={
          getMovies
        }
        onChangeText={text => setState(previousState => {
          return { ...previousState, searchText: text }
        })} />
      <Button title="Go to Results"
        onPress={getMovies}
      />
    </View>
  );
};
const ResultsScreen = (props : any) => {
  const navigation = useNavigation();

  let response : Result[] = props.route.params.result
  function navigateToDetials(movie: Result) {
    navigation.navigate('Details', {movie: movie})
  }
  return (
    <View style={styles.container}>
      <ScrollView>
       {
         response.map(movie => (
          <TouchableHighlight onPress={function h() {
            navigation.navigate('Details', {movie: movie})
          }} >
          <View key={movie.id}
          
          >
            <Image
            source = {{uri: 'https://image.tmdb.org/t/p/w300' + movie.poster_path}}
            style = {{width : 300, height: 300}}
            />
            <Text style={styles.text}>{movie.title}</Text>
          </View>
          </TouchableHighlight>
       ))
       }
      </ScrollView>
    </View>
  );
};
const MovieScreen = (props : any) => {
  const movie : Result = props.route.params.movie
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{movie.title}</Text>
    </View>
  );
};

//MARK:- Styles

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: 'white'
  },
  movieCell: {

  }
});

export interface Result {
  id: number;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
}


