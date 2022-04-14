import * as ReactYea from "react";
import React, { useState, useEffect, useContext } from "react";
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
  FlatList,
  StatusBar,
} from "react-native";
import { Icon } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Modal from "react-native-modal";

import triangle from "./assets/signindesign.png";
import lotsoftri from "./assets/searchpagedesign.png";
import searchicon from "./assets/searchicon.png";
import rectangle from "./assets/bottomofsearch.png";
import profiletriangles from "./assets/profiletop.png";

import ResultsScreenCards from "./screens/ResultsScreen.js";
import SavedArticlesCards from "./screens/SavedArticlesScreen.js";
import { AuthProvider } from "./providers/AuthProvider.js";

const windowWidth = Dimensions.get("window").width;

// Goals:
// - card template so it can populate as a list DONEEEE
// - separate screens into files DONEE
// - unsave articles? - technically possible - when the user clicks a button to leave the page, send all
// the articles with saved = true to hector's database
// - only save articles DONEEE

// This is the very first screen you see with the title and search bar
function SearchScreen({ route, navigation }) {
  // defaults to false - if it is true the login button becomes a profile button
  const isLoggedIn = route.params;

  // {text} is what you will send to Daniel so he can get the search results
  // it is also sent to the SearchResults screen/function to be displayed
  const [text, setText] = useState("");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          padding: 20,
          backgroundColor: "white",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Button
          title={isLoggedIn ? "Profile" : "Sign In"}
          color="#358600"
          onPress={() =>
            navigation.navigate(isLoggedIn ? "Profile" : "Sign In")
          }
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Factual</Text>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Search Results", { text, isLoggedIn })
            }
          >
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
            textAlign: "center",
            fontFamily: "Avenir-Book",
          }}
        >
          Questioning whether that one rumor you heard is true? Need to verify a
          quick fact?
          {"\n"}
          {"\n"}
          Factual is the app that can help you answer all your questions and
          give a reliability rating for each source too!
        </Text>
      </View>
      <View
        style={{
          padding: 20,
          backgroundColor: "white",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Image
          source={lotsoftri}
          style={{ width: windowWidth - 40, height: 210 }}
        />
      </View>
    </SafeAreaView>
  );
}

// Results Page - uses ResultsScreen in screens folder to display the cards
function ResultsScreen({ route, navigation }) {
  // user input received from search screen
  const searchText = route.params.text;
  // sent from the Search screen/function to be displayed
  const isLoggedIn = route.params.isLoggedIn;

  // when the search icon in this screen is used, send {text}.text so Daniel for updated user input (right now its just an alert that displays that text)
  const [text, setText] = useState("");

  // variables for the checkboxes
  const [demChecked, setDemChecked] = React.useState(false);
  const [repChecked, setRepChecked] = React.useState(false);
  const [nonParChecked, setNonParChecked] = React.useState(false);

  //  send {demChecked}, {repChecked}, {nonParChecked} to Daniel for sorting - refresh search results list
  // for the pop-up window
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
          backgroundColor: "white",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Icon
          type="feather"
          name={"help-circle"}
          onPress={toggleModal}
          color={"#358600"}
        />
        <Button
          title={isLoggedIn ? "Profile" : "Sign In"}
          color="#358600"
          onPress={() =>
            navigation.navigate(isLoggedIn ? "Profile" : "Sign In")
          }
        />
      </View>
      <Modal isVisible={isModalVisible}>
        <View
          style={{ justifyContent: "center", alignContent: "center", flex: 1 }}
        >
          <View style={styles.modalView}>
            <Text style={styles.sortText}>
              The political bias rating of the websites we display come from a
              webscraper that analyzes the text and produces a rating. The
              accuracy rating given to the related claims come from the Google
              Fact Checker API
            </Text>
            <Text> </Text>
            <Pressable
              style={styles.button}
              onPress={() => setModalVisible(!isModalVisible)}
            >
              <Text
                style={{ color: "white", fontFamily: "AvenirNext-Regular" }}
              >
                Close
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={{ backgroundColor: "white" }}>
        <Text style={styles.header}>Factual</Text>
        <View style={{ flexDirection: "row", paddingLeft: 10 }}>
          <TouchableOpacity
            onPress={() => {
              alert({ text }.text);
            }}
          >
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
        <Text style={styles.sortText}> Sort By: </Text>
        <View style={{ flexDirection: "row", paddingHorizontal: 5 }}>
          <Icon
            type="feather"
            name={nonParChecked ? "check-square" : "square"}
            onPress={() => {
              setNonParChecked(!nonParChecked);
              {
                nonParChecked ? null : setDemChecked(false);
              }
              {
                nonParChecked ? null : setRepChecked(false);
              }
            }}
            color={"#358600"}
          />
          <Text style={styles.sortText}> Impartial </Text>
          <Icon
            type="feather"
            name={demChecked ? "check-square" : "square"}
            onPress={() => {
              setDemChecked(!demChecked);
              {
                demChecked ? null : setNonParChecked(false);
              }
              {
                demChecked ? null : setRepChecked(false);
              }
            }}
            color={"#358600"}
          />
          <Text style={styles.sortText}> Liberal </Text>
          <Icon
            type="feather"
            name={repChecked ? "check-square" : "square"}
            onPress={() => {
              setRepChecked(!repChecked);
              {
                repChecked ? null : setDemChecked(false);
              }
              {
                repChecked ? null : setNonParChecked(false);
              }
            }}
            color={"#358600"}
          />
          <Text style={styles.sortText}> Conservative </Text>
        </View>
      </View>
      <Text></Text>
      <ResultsScreenCards isLoggedIn={isLoggedIn}></ResultsScreenCards>
      <View
        style={{
          padding: 20,
          backgroundColor: "white",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Image
          source={rectangle}
          style={{ width: windowWidth - 35, height: 50 }}
        />
      </View>
    </SafeAreaView>
  );
}

//Sign-In Page
function SignInScreen({ navigation }) {
  // send these to Hector when sign in button is clicked
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();

  // then get isError and isLogged in from Hector
  const [isError, setIsError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onPressSignIn = async () => {
    console.log("Trying sign in with user: " + username);
    try {
      await signIn(username, password);
    } catch (error) {
      const errorMessage = `Failed to sign in: ${error.message}`;
      console.error(errorMessage);
      Alert.alert(errorMessage);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Sign In</Text>
        <TextInput
          onChangeText={(username) => setUsername(username)}
          placeholder={"Email Address"}
          style={styles.textInput}
        />
        <TextInput
          onChangeText={(password) => setPassword(password)}
          placeholder={"Password"}
          secureTextEntry={true}
          style={styles.textInput}
        />
        <Text> </Text>
        <Button
          title={"Sign In"}
          color="#358600"
          errorMessage={state.errorMessage}
          onPress={onPressSignIn}
        />
        <Text> </Text>
        <Pressable onPress={() => navigation.navigate("Create Account")}>
          <Text style={styles.underline}>
            Or click here to create a Factual account
          </Text>
        </Pressable>
        <Text> </Text>
      </View>
      <View
        style={{
          padding: 15,
          backgroundColor: "white",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Image
          source={triangle}
          style={{
            flex: 1,
            alignContent: "flex-end",
            width: 200,
            height: 300,
            resizeMode: "contain",
          }}
        />
      </View>
    </SafeAreaView>
  );
}

// Create Account Screen
function CreateAccScreen({ navigation }) {
  //same idea as Sign In Screen
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // send these to database
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signUp, signIn } = useAuth();

  const onPressSignUp = async () => {
    console.log("Trying signup with user: " + email);
    try {
      await signUp(username, password);
      signIn(username, password);
    } catch (error) {
      const errorMessage = `Failed to sign up: ${error.message}`;
      console.error(errorMessage);
      Alert.alert(errorMessage);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Create Account</Text>
        <View style={styles.rowContainer}>
          <TextInput
            onChangeText={(first) => setFirst(first)}
            placeholder={"First Name"}
            style={styles.nameInput}
          />
          <Text> </Text>
          <TextInput
            onChangeText={(last) => setLast(last)}
            placeholder={"Last Name"}
            style={styles.nameInput}
          />
        </View>
        <TextInput
          onChangeText={(username) => setUsername(username)}
          placeholder={"Email Address"}
          style={styles.textInput}
        />
        <TextInput
          onChangeText={(password) => setPassword(password)}
          placeholder={"Password"}
          secureTextEntry={true}
          style={styles.textInput}
        />
        <Text> </Text>
        <Button
          title={"Create Account"}
          color="#358600"
          errorMessage={state.errorMessage}
          onPress={onPressSignUp}
        />
        <Text> </Text>
        <Pressable onPress={() => navigation.navigate("Sign In")}>
          <Text style={styles.underline}>Or click here to sign in</Text>
        </Pressable>
      </View>
      <View
        style={{
          padding: 15,
          backgroundColor: "white",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Image
          source={triangle}
          style={{
            flex: 1,
            alignContent: "flex-end",
            width: 200,
            height: 300,
            resizeMode: "contain",
          }}
        />
      </View>
    </SafeAreaView>
  );
}

// Profile Screen - only accessible when the user has signed-in/created an account
function ProfileScreen({ navigation }) {
  // get this information from the database
  const [firstname, setFirst] = useState("");
  const [lastname, setLast] = useState("");
  const [emailaddress, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          fontFamily: "Avenir-Light",
          paddingLeft: 20,
          paddingVertical: 20,
        }}
      >
        Hello {firstname} {lastname}!
      </Text>
      <Text
        style={{
          fontSize: 25,
          fontFamily: "Avenir-Light",
          paddingLeft: 20,
          paddingVertical: 10,
          color: "#358600",
        }}
      >
        Login Info
      </Text>
      <Text style={styles.normalText}> Email Address: {emailaddress} </Text>
      <Text style={styles.normalText}> Password: {password} </Text>
      <Pressable onPress={() => navigation.navigate("Search", false)}>
        <Text style={styles.underline}>Click here to sign out</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("Sign In")}>
        <Text style={styles.underline}>
          Or click here to sign in to another account
        </Text>
      </Pressable>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          paddingVertical: 30,
        }}
      >
        <Button
          title={"View Saved Articles"}
          color="#358600"
          onPress={() => navigation.navigate("Saved Articles")}
        />
      </View>
    </SafeAreaView>
  );
}

// Saved Articles - uses SavedArticlesScreen in screens folder to display the cards
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
          backgroundColor: "white",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Image
          source={rectangle}
          style={{ width: windowWidth - 35, height: 50 }}
        />
      </View>
    </SafeAreaView>
  );
}

// this is what allows the user to "go back" once they've landed on a page
const Stack = createNativeStackNavigator();

function App() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  resultscontainer: {
    flex: 1,
    backgroundColor: "white",
  },
  rowContainer: {
    flexDirection: "row",
  },
  textInput: {
    width: windowWidth - 80,
    height: 35,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
    borderRadius: 15,
  },
  nameInput: {
    width: windowWidth / 2 - 43,
    height: 35,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
    borderRadius: 15,
  },
  searchInput: {
    width: windowWidth - 80,
    height: 35,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
    borderRadius: 15,
  },
  title: {
    justifyContent: "center",
    textAlign: "center",
    padding: 20,
    paddingTop: 40,
    fontSize: 40,
    fontFamily: "AvenirNext-Regular",
    color: "#358600",
  },
  header: {
    justifyContent: "center",
    textAlign: "center",
    fontSize: 35,
    fontFamily: "AvenirNext-Regular",
    color: "#358600",
  },
  underline: {
    justifyContent: "center",
    textAlign: "center",
    padding: 20,
    fontSize: 13,
    color: "#358600",
    textDecorationLine: "underline",
  },
  sortText: {
    fontSize: 15,
    fontFamily: "Avenir-Light",
    paddingVertical: 3,
  },
  normalText: {
    fontSize: 18,
    fontFamily: "Avenir-Light",
    paddingLeft: 20,
    paddingVertical: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
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
