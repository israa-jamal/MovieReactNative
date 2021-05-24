import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
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
  const apiKey = 'd222a0eb7c07fbec1861a7da1dd94b6c'
  const dbURL = 'https://api.themoviedb.org/3/movie/550?'
  const navigation = useNavigation();
  function onSubmitEditing() {
    navigation.navigate('Results')
  }
  function search() {
    axios(dbURL + "api_key=" + apiKey + "query=" + state.searchText).then(({ data }) => {
      let results = data.Search
      setState(prevState => {
        return {...prevState, results: results}
      })
    })
  }
  const [state, setState] = useState ({
    searchText: '',
    results: {}
  })
  return (
    <View style={styles.container}>
      <Text >Enter a Movie Name....</Text>
      <TextInput
        style={{
          padding: 8,
          backgroundColor: '#f5f5f5'
        }}
        value = {state.s}
        returnKeyType='search'
        onSubmitEditing={search}
        onChangeText={text => setState( previousState => {
          return{...previousState, searchText: text}
        })} />
        <Button title="Go to Results" 
        onPress={onSubmitEditing}
        />
    </View>
  );
};
const ResultsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>ResultsScreen</Text>
    </View>
  );
};
const MovieScreen = () => {
  return (
    <View style={styles.container}>
      <Text>MovieScreen</Text>
    </View>
  );
};

//MARK:- Styles

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
