import * as ReactYea from 'react';
import React, { useEffect, useState } from 'react';
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
import Modal from 'react-native-modal';

import triangle from './assets/signindesign.png';
import lotsoftri from './assets/searchpagedesign.png';
import searchicon from './assets/searchicon.png';
import rectangle from './assets/bottomofsearch.png';
import profiletriangles from './assets/profiletop.png';

import ResultsScreenCards from './screens/ResultsScreen.js';

import SavedArticlesCards from './screens/SavedArticlesScreen.js';

import axios from 'axios';
import client from './API/client';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


// Goals:
// - Make sure the text in the search results bar stays after signing in or creating an account

// This is the very first screen you see with the title and search bar
function SearchScreen({ route, navigation }) {
  // defaults to false - if it is true the login button becomes a profile button
  const isLoggedIn = route.params;

  // {text} is what you will send to Daniel so he can get the search results
  // it is also sent to the SearchResults screen/function to be displayed
  const [text, setText] = useState('');

    let username = 'empty';
    let password = 'empty'
    if(isLoggedIn){

    username = route.params.username;
    password = route.params.password
    
      console.log('username: ' + username + " password: " + password);
      
    }

  // results(text, isLoggedIn);
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
          onPress={isLoggedIn ? () => navigation.navigate('Profile', {username, password}) : () =>
          navigation.navigate('Sign In', 'Search') 
        }
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Factual</Text>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            onPress={() =>{
            navigation.navigate('Search Results', {text,  isLoggedIn, username, password})
            }
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
          paddingTop: 10,
          backgroundColor: 'white',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Image
          source={lotsoftri}
          style={{ width: windowWidth, height: 230 }}
        />
      </View>
    </SafeAreaView>
  );
}

// Results Page - uses ResultsScreen in screens folder to display the cards
function ResultsScreen({ route, navigation }) {
  // user input received from search screen
  let searchText = route.params.text;
  // sent from the Search screen/function to be displayed
  const isLoggedIn = route.params.isLoggedIn;

  let username = "empty";
  let password = "empty"

  if(isLoggedIn){

     username = route.params.username;
     password = route.params.password
     searchText = route.params.searchText;
  
    console.log('username: ' + username + " password: " + password + "searchText:" + searchText);
  }
  // when the search icon in this screen is used, send {text}.text so Daniel for updated user input (right now its just an alert that displays that text)
  const [text, setText] = useState('');

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <SafeAreaView style={styles.resultscontainer}>
      <View
        style={{
          paddingVertical: 20,
          paddingHorizontal: 20,
          backgroundColor: 'white',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Icon
          type="feather"
          name={'help-circle'}
          onPress={toggleModal}
          color={'#358600'}
        />
        <Button
          title={isLoggedIn ? 'Profile' : 'Sign In'}
          color="#358600"
          onPress={isLoggedIn ? () => navigation.navigate('Profile', {username, password}) : () =>
            navigation.navigate('Sign In', 'Search Results',{searchText}) //changed this
          }
        />
      </View>
      <Modal isVisible={isModalVisible}>
        <View
          style={{ justifyContent: 'center', alignContent: 'center', flex: 1 }}>
          <View style={styles.modalView}>
            <Text style={styles.sortText}>The political bias rating of the websites we display is from a web scraper that analyzes the text and produces a numerical rating. 0 is generally impartial, and the larger the number, the more biased the article is likely to be. The accuracy rating given to the related claims comes from the Google Fact Checker API.</Text>
            <Text> </Text>
            <Pressable
              style={styles.button}
              onPress={() => setModalVisible(!isModalVisible)}>
              <Text style={{color:'white', fontFamily: 'AvenirNext-Regular'}}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={{ backgroundColor: 'white' }}>
        <Text style={styles.header}>Factual</Text>
        <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
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
            onChangeText={(text) => setText(text)}
            defaultValue={searchText}
          />
        </View>
      </View>
      <ResultsScreenCards isLoggedIn={isLoggedIn} text={searchText} username={username} password={password}></ResultsScreenCards>
      <View
        style={{
          padding: 20,
          backgroundColor: 'white',
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 38
  
        }}>
        <Image
          source={rectangle}
          style={{ width: windowWidth, height: 50}}
        />
      </View>
    </SafeAreaView>
  );
}
// OKK I added route to this so it can get the name of the screen it was previously on
//Sign-In Page
function SignInScreen({ route, navigation }) {
  const prevScreen = route.params;
  const searchText = route.params.searchText; ///
  console.log("signin: " + route.params);
  
  // send these to Hector when sign in button is clicked
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // then get isError and isLogged in from Hector
  const [isError, setIsError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

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
            async () =>{
              let res; 
              let status;
              try {
                 res = await client.post('/sign-in', {
                     email: username.toLowerCase(), password: password
                });
  
                status = await res.data.success; 
          
              } catch (error) {
                console.log('error:' + error.message);
              }
              console.log(res.data);
              
              console.log("status: " + status);
              if(!status){Alert.alert('Login unsuccessful! Please try again')}
              else{navigation.navigate(prevScreen, { isLoggedIn, searchText, username, password })}
  
            }
          }
        />
        <Text> </Text>
        <Pressable onPress={() => navigation.navigate('Create Account', prevScreen, {searchText})}>
          <Text style={styles.underline}>
            Or click here to create a Factual account
          </Text>
        </Pressable>
        <Text> </Text>
      </View>
      <View
        style={{
          paddingTop: 15,
          backgroundColor: 'white',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <Image
          source={triangle}
          style={{
            //flex: 1,
            alignContent: 'flex-end',
            width: windowWidth-80,
            height: 380,
            //resizeMode: 'contain',
          }}
        />
      </View>
    </SafeAreaView>
  );
}

// Create Account Screen
function CreateAccScreen({ route, navigation }) {
  const prevScreen = route.params;
  const searchText = route.params.searchText; 
  //same idea as Sign In Screen
  const [isError, setIsError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // send these to database
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
          onPress={async () =>{
            let res; 
            let status;
            try {
               res = await client.post('/create-user', {
                  fname: first, lname: last, email: username, password: password
              });

              status = await res.data.success; 
        
            } catch (error) {
              console.log('error:' + error.message);
            }
            console.log(res.data);
            
            console.log("status: " + status);
            if(!status){Alert.alert('Account creation unsuccessful! Please try again')}
            else{navigation.navigate(prevScreen, { isLoggedIn, searchText, username, password })}

          }
          
        }
       
        />
        <Text> </Text>
        <Pressable onPress={() => navigation.navigate('Sign In', prevScreen, {searchText}) /* changed */}> 
          <Text style={styles.underline}>Or click here to sign in</Text>
        </Pressable>
      </View>
      <View
        style={{
          paddingTop: 15,
          backgroundColor: 'white',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <Image
          source={triangle}
          style={{
            //flex: 1,
            alignContent: 'flex-end',
            width: windowWidth-80,
            height: 300,
            //resizeMode: 'contain',
          }}
        />
      </View>
    </SafeAreaView>
  );
}

// Profile Screen - only accesible when the user has signed-in/created an account
function ProfileScreen({ route, navigation }) {
  // get this information from the database
  const [firstname, setfName] = useState('Larry');
  const [lastname, setlName] = useState('Brin');
  const [articles, setArticles] = useState([]);
  // const [password] = useState('ilovefactual22');

  const {username, password} = route.params;

  console.log("Username: " + username + "\npassword: " + password);

  useEffect(async()=>{
   
    try {
       let res = await client.post('/sign-in', {
           email: username.toLowerCase(), password: password
      });

      let status = await res.data.success; 
      console.log("inside profile screen: " + res.data);
      console.log("status: " + status);

      setfName(res.data.user.fname);
      setlName(res.data.user.lname);
      console.log("in the profile: " + res.data.user.articles);
      setArticles(res.data.user.articles);

    } catch (error) {
      console.log('error:' + error.message);
    }
},[])

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
      <Text style={styles.normalText}> Email Address: {username} </Text>
      <Text style={styles.normalText}> Password: {password} </Text>
      <Pressable onPress={() => navigation.navigate('Search', false)}>
        <Text style={styles.underline}>
          Click here to sign out
        </Text>
      </Pressable>
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
          onPress={() => navigation.navigate('Saved Articles', {articles})}
        />
      </View>
    </SafeAreaView>
  );
}

// Saved Articles - uses SavedArticlesScreen in screens folder to display the cards
function SavedArticlesScreen({ route, navigation }) {
  console.log("in the savedARTICLES:" + route.params.articles);
  return (
    <SafeAreaView style={styles.resultscontainer}>
      <View style={{ paddingVertical: 20 }}>
        <Text style={styles.header}>Saved Articles</Text>
      </View>
      <SavedArticlesCards articles= {route.params.articles}></SavedArticlesCards>
      <View
        style={{
          padding: 20,
          backgroundColor: 'white',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Image
          source={rectangle}
          style={{ width: windowWidth, height: 50 }}
        />
      </View>
    </SafeAreaView>
  );
}

// this is what allows the user to "go back" once they've landed on a page
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
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#358600",
  },
});

export default App;

