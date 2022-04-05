import * as ReactYea from 'react';
import React, { useState } from 'react';
import {
  Alert,
  Button,
  TextInput,
  View,
  StyleSheet,
  AppRegistry,
  Text,
  Image,
  Pressable,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Card } from 'react-native-paper';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import triangle from './assets/signindesign.png';
import lotsoftri from './assets/searchpagedesign.png';
import searchicon from './assets/searchicon.png';
import rectangle from './assets/bottomofsearch.png';
import profiletriangles from './assets/profiletop.png';

import ResultsScreenCards from './screens/ResultsScreen.js';
import SavedArticlesCards from './screens/SavedArticlesScreen.js';

const windowWidth = Dimensions.get('window').width;

// Goals:
// - card template so it can populate as a list DONEEEE
// - separate screens into files DONEE
// - unsave articles? - technically possible - when the user clicks a button to leave the page, send all
// the articles with saved = true to hector's database

function SearchScreen({ route, navigation }) {
  const isLoggedIn = route.params;

  const [text, setText] = useState('');

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          padding: 20,
          backgroundColor: 'white',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <Button
          title={isLoggedIn ? 'Profile' : 'Sign In'}
          color="#358600"
          onPress={() =>
            navigation.navigate(isLoggedIn ? 'Profile' : 'Sign In')
          }
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Factual</Text>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Search Results', { text, isLoggedIn })
            }>
            <Image
              source={searchicon}
              style={{ width: 30, height: 32, paddingLeft: 10 }}
            />
          </TouchableOpacity>
          <Text> </Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Enter a statement to verify it"
            onChangeText={(newText) => setText(newText)}
            defaultValue={text}
          />
        </View>
        <Text
          style={{
            padding: 20,
            fontSize: 15,
            textAlign: 'center',
            fontFamily: 'Avenir-Book',
          }}>
          Questioning whether that one rumor you heard is true? Need to verify a
          quick fact?
          {'\n'}
          {'\n'}
          Factual is the app that can help you answer all your questions and
          give a reliability rating for each source too!
        </Text>
      </View>
      <View
        style={{
          padding: 20,
          backgroundColor: 'white',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Image
          source={lotsoftri}
          style={{ width: windowWidth - 40, height: 210 }}
        />
      </View>
    </SafeAreaView>
  );
}

function ResultsScreen({ route, navigation }) {
  const searchText = route.params.text;
  const isLoggedIn = route.params.isLoggedIn;

  const [text, setText] = useState('');

  const [demChecked, setDemChecked] = React.useState(false);
  const [repChecked, setRepChecked] = React.useState(false);
  const [nonParChecked, setNonParChecked] = React.useState(false);

  // {searchText}, {demChecked}, {repChecked}, {nonParChecked} to Daniel

  return (
    <SafeAreaView style={styles.resultscontainer}>
      <View
        style={{
          paddingTop: 20,
          paddingRight: 20,
          backgroundColor: 'white',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <Button
          title={isLoggedIn ? 'Profile' : 'Sign In'}
          color="#358600"
          onPress={() =>
            navigation.navigate(isLoggedIn ? 'Profile' : 'Sign In')
          }
        />
      </View>
      <View style={{ backgroundColor: 'white' }}>
        <Text style={styles.header}>Factual</Text>
        <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
          <TouchableOpacity
            onPress={() => {
              alert('Go to the search results page!');
            }}>
            <Image
              source={searchicon}
              style={{ width: 30, height: 32, paddingLeft: 10 }}
            />
          </TouchableOpacity>
          <Text> </Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Enter a statement to verify it"
            onChangeText={(newText) => setText(newText)}
            defaultValue={searchText}
          />
        </View>
        <Text style={styles.sortText}> Sort By: </Text>
        <View style={{ flexDirection: 'row', paddingHorizontal: 5 }}>
          <Icon
            type="feather"
            name={nonParChecked ? 'check-square' : 'square'}
            onPress={() => {
              setNonParChecked(!nonParChecked);
              {
                nonParChecked ? null : setDemChecked(false);
              }
              {
                nonParChecked ? null : setRepChecked(false);
              }
            }}
            color={'#358600'}
          />
          <Text style={styles.sortText}> Impartial </Text>
          <Icon
            type="feather"
            name={demChecked ? 'check-square' : 'square'}
            onPress={() => {
              setDemChecked(!demChecked);
              {
                demChecked ? null : setNonParChecked(false);
              }
              {
                demChecked ? null : setRepChecked(false);
              }
            }}
            color={'#358600'}
          />
          <Text style={styles.sortText}> Liberal </Text>
          <Icon
            type="feather"
            name={repChecked ? 'check-square' : 'square'} 
            onPress={() => {
              setRepChecked(!repChecked);
              {
                repChecked ? null : setDemChecked(false);
              }
              {
                repChecked ? null : setNonParChecked(false);
              }
            }}
            color={'#358600'}
          />
          <Text style={styles.sortText}> Conservative </Text>
        </View>
      </View>
      <Text></Text>
      <ResultsScreenCards></ResultsScreenCards>
      <View
        style={{
          padding: 20,
          backgroundColor: 'white',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Image
          source={rectangle}
          style={{ width: windowWidth - 35, height: 50 }}
        />
      </View>
    </SafeAreaView>
  );
}

function SignInScreen({ navigation }) {
  const [isError, setIsError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Sign In</Text>
        <TextInput
          onChangeText={(username) => setUsername(username)}
          placeholder={'Email Address'}
          style={styles.textInput}
        />
        <TextInput
          onChangeText={(password) => setPassword(password)}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.textInput}
        />
        <Text> </Text>
        <Button
          title={'Sign In'}
          color="#358600"
          onPress={
            // send login info ( {username}  and {password}) to hector get boolean isError back
            isError
              ? () => Alert.alert('Login unsuccessful! Please try again')
              : () => navigation.navigate('Search', { isLoggedIn })
          }
        />
        <Text> </Text>
        <Pressable onPress={() => navigation.navigate('Create Account')}>
          <Text style={styles.underline}>
            Or click here to create a Factual account
          </Text>
        </Pressable>
        <Text> </Text>
      </View>
      <View
        style={{
          padding: 20,
          backgroundColor: 'white',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Image
          source={triangle}
          style={{ width: windowWidth - 125, height: 200 }}
        />
      </View>
    </SafeAreaView>
  );
}

function CreateAccScreen({ navigation }) {
  const [isError, setIsError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Create Account</Text>
        <View style={styles.rowContainer}>
          <TextInput
            onChangeText={(first) => setFirst(first)}
            placeholder={'First Name'}
            style={styles.nameInput}
          />
          <Text> </Text>
          <TextInput
            onChangeText={(last) => setLast(last)}
            placeholder={'Last Name'}
            style={styles.nameInput}
          />
        </View>
        <TextInput
          onChangeText={(username) => setUsername(username)}
          placeholder={'Email Address'}
          style={styles.textInput}
        />
        <TextInput
          onChangeText={(password) => setPassword(password)}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.textInput}
        />
        <Text> </Text>
        <Button
          title={'Create Account'}
          color="#358600"
          onPress={
          // send account info ( {first}, {last}, {username}, {password}) to hector get boolean isError
            isError
              ? () =>
                  Alert.alert('Account creation unsuccessful! Please try again')
              : () => {
                  navigation.navigate('Search', { isLoggedIn });
                }
          }
        />
        <Text> </Text>
        <Pressable onPress={() => navigation.navigate('Sign In')}>
          <Text style={styles.underline}>Or click here to sign in</Text>
        </Pressable>
      </View>
      <View
        style={{
          padding: 20,
          backgroundColor: 'white',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <Image
          source={triangle}
          style={{ width: windowWidth - 150, height: 250 }}
        />
      </View>
    </SafeAreaView>
  );
}

function ProfileScreen({ navigation }) {
  const [firstname] = useState('firstname');
  const [lastname] = useState('lastname');
  const [emailaddress] = useState('email');
  const [password] = useState('password');

  return (
    <SafeAreaView style={styles.resultscontainer}>
      <Image
        source={profiletriangles}
        style={{ width: windowWidth, height: 100 }}
      />
      <Text style={styles.header}>Profile</Text>
      <Text
        style={{
          fontSize: 20,
          fontFamily: 'Avenir-Light',
          paddingLeft: 20,
          paddingVertical: 20,
        }}>
        Hello {firstname} {lastname}!
      </Text>
      <Text
        style={{
          fontSize: 25,
          fontFamily: 'Avenir-Light',
          paddingLeft: 20,
          paddingVertical: 10,
          color: '#358600',
        }}>
        Login Info
      </Text>
      <Text style={styles.normalText}> Email Address: {emailaddress} </Text>
      <Text style={styles.normalText}> Password: {password} </Text>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          paddingVertical: 30,
        }}>
        <Button
          title={'View Saved Articles'}
          color="#358600"
          onPress={() => navigation.navigate('Saved Articles')}
        />
      </View>
    </SafeAreaView>
  );
}

function SavedArticlesScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.resultscontainer}>
      <View style={{ paddingVertical: 20 }}>
        <Text style={styles.header}>Saved Articles</Text>
      </View>
      <SavedArticlesCards></SavedArticlesCards>
      <View
        style={{
          padding: 20,
          backgroundColor: 'white',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <Image
          source={rectangle}
          style={{ width: windowWidth - 35, height: 50 }}
        />
      </View>
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Search"
          options={{ headerShown: false }}
          component={SearchScreen}
        />
        <Stack.Screen name="Sign In" component={SignInScreen} />
        <Stack.Screen name="Create Account" component={CreateAccScreen} />
        <Stack.Screen name="Search Results" component={ResultsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Saved Articles" component={SavedArticlesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  resultscontainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  textInput: {
    width: windowWidth - 80,
    height: 35,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    borderRadius: 15,
  },
  nameInput: {
    width: windowWidth / 2 - 43,
    height: 35,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    borderRadius: 15,
  },
  searchInput: {
    width: windowWidth - 80,
    height: 35,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    borderRadius: 15,
  },
  title: {
    justifyContent: 'center',
    textAlign: 'center',
    padding: 20,
    paddingTop: 40,
    fontSize: 40,
    fontFamily: 'AvenirNext-Regular',
    color: '#358600',
  },
  header: {
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 35,
    fontFamily: 'AvenirNext-Regular',
    color: '#358600',
  },
  underline: {
    justifyContent: 'center',
    textAlign: 'center',
    padding: 20,
    fontSize: 13,
    color: '#358600',
    textDecorationLine: 'underline',
  },
  sortText: {
    fontSize: 15,
    fontFamily: 'Avenir-Light',
    paddingVertical: 3,
  },
  normalText: {
    fontSize: 18,
    fontFamily: 'Avenir-Light',
    paddingLeft: 20,
    paddingVertical: 10,
  },
});

export default App;
