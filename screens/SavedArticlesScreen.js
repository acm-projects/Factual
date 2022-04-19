import * as ReactYea from "react";
import React, { useState, Component } from "react";
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
import { Card } from "react-native-paper";

// push articles that have save: true to the database

export default class SavedArticlesScreen extends Component {
  constructor(props) {
    super(props);

    (this.array = [
      {
        bias: "ONE",
        website_url:
          "https://www.wmur.com/article/nh-primary-source-leavitt-says-trump-won-2020-election-but-biden-is-legitimately-president/37117521",
        website_title:
          "NH Primary Source: Leavitt says Trump won 2020 election but says she recognizes Biden is president",
        website_description2:
          "Four days after announcing her candidacy for the state\u2019s 1st Congressional District U.S. House seat, Republican Karoline Leavitt said Friday she believes her former boss, Donald Trump, won the 2020 presidential election.",
        compared_claim:
          "Biden passed a $1.5 trillion bill at 1 a.m. without notifying Republicans",
        checked_name: "USA Today",
        checked_rating: "False",
        saved: true,
      },
      {
        bias: "TWO",
        website_url:
          "https://www.washingtonpost.com/opinions/2021/11/10/why-do-some-still-deny-bidens-2020-victory-heres-what-data-says/",
        website_title:
          "Opinion | Why do some still deny Biden\u2019s 2020 victory? Here\u2019s what the data says. - The Washington Post",
        website_description2:
          "Biden clearly won the presidential election, but millions of Americans still doubt his victory. Here's why.",
        compared_claim: "The fight is here; I need ammunition, not a ride.",
        checked_name: "The Washington Post",
        checked_rating: "Unconfirmed",
        saved: true,
      },
    ]),
      (this.state = {
        arrayHolder: [],
        textInput_Holder: "",
      });
    this.checked = [
      { repchecked: false, demchecked: false, nonparchecked: false },
    ];
  }

  componentDidMount() {
    this.setState({ arrayHolder: [...this.array] });
  }

  joinData = () => {
    this.array.push({
      bias: "bias",
      website_url: "website url",
      website_title: "article title",
      website_description2: "description",
      compared_claim: "compared claim",
      checked_name: "company",
      checked_rating: "rating",
      saved: true,
    });

    this.setState({ arrayHolder: [...this.array] });
  };

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
        }}
      />
    );
  };

  GetItem(item) {
    Alert.alert(item);
  }

  // send in the item!!!
  updateSaved = (item) => {
    let arrayHolder = [...this.state.arrayHolder];
    let index = arrayHolder.findIndex(
      (el) => el.website_title === item.website_title
    );
    arrayHolder[index] = { ...arrayHolder[index], saved: !item.saved };
    this.setState({ arrayHolder });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.arrayHolder}
          width="95%"
          extraData={this.state.arrayHolder}
          keyExtractor={(index) => index.toString()}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          //item is the name of the object so item.___ accesses the info in it
          renderItem={({ item }) => (
            <Card
              style={{
                paddingVertical: 10,
                borderColor: "black",
                borderRadius: 20,
                boxShadow: "5px 5px 5px -8px rgba(53, 134, 0, 1)",
              }}
            >
              <Card.Content>
                <View style={styles.rowContainer}>
                  <Text style={styles.cardtext}>
                    {item.website_description2}
                  </Text>
                  <Icon
                    name={item.saved ? "bookmark" : "bookmark-outline"}
                    color="#358600"
                    onPress={() => this.updateSaved(item)}
                  />
                </View>
                <Text style={styles.rating}>Political Bias: {item.bias}</Text>
                <Text
                  style={{
                    color: "#2A5DB0",
                    textDecorationLine: "underline",
                    fontSize: 15,
                  }}
                  onPress={() => Linking.openURL(item.website_url)}
                >
                  {item.website_title}
                </Text>
                <Text> </Text>
                <View
                  style={{
                    justifyContent: "center",
                    borderBottomColor: "#358600",
                    borderBottomWidth: 1,
                  }}
                />
                <Text> </Text>
                <Text style={styles.related}>
                  Related Claim: {item.compared_claim}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "Avenir-Heavy",
                    paddingBottom: 5,
                  }}
                >
                  {item.checked_name} rates this is {item.checked_rating}
                </Text>
              </Card.Content>
            </Card>
          )}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    justifyContent: "center",
  },
  cardtext: {
    fontSize: 16,
    paddingBottom: 17,
    fontFamily: "Avenir-Book",
  },
  rating: {
    paddingBottom: 17,
    fontSize: 12,
    fontFamily: "Avenir-Heavy",
  },
  related: {
    fontSize: 14,
    paddingBottom: 17,
    fontFamily: "Avenir-Book",
  },
  rowContainer: {
    paddingRight: 10,
    flexDirection: "row",
  },
});
