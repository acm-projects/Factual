import * as ReactYea from 'react';
import React, { useState, Component } from 'react';
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
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Card } from 'react-native-paper';

export default class ResultsScreen extends Component {
  constructor(props) {
    super(props);
// this holds the array of all the article objects/items
    (this.state = {
      array: [],
      arrayHolder: [],
      textInput_Holder: '',
    });
    this.checked = [
      { repchecked: false, demchecked: false, nonparchecked: false },
    ];
  }
  
  componentDidMount() {
    fetch('')
      .then((response) => response.json())
      .then((response) => this.setState({ array: [...response]}))
      .then((array) => this.setState({arrayHolder: [...array]}))
      .catch((error) => console.error(error));   
  }

//use this to push the information you get from Daniel onto the array
/*
  joinData = () => {
    this.array.push({
      bias: 'bias',
      website_url: 'website url',
      website_title: 'article title',
      website_description2: 'description',
      compared_claim: 'compared claim',
      checked_name: 'company',
      checked_rating: 'rating',
      saved: false,
    });

    this.setState({ arrayHolder: [...this.array] });
  };
  */

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
        }}
      />
    );
  };

  GetItem(item) {
    Alert.alert(item);
  }

  // this alters the boolean save value so that when the user exits the page, you can just loop through and send the items with saved: true to the data base
  updateSaved = (item) => {
    let arrayHolder = [...this.state.arrayHolder];
    let index = arrayHolder.findIndex(
      (el) => el.website_title === item.website_title
    );
    arrayHolder[index] = { ...arrayHolder[index], saved: !item.saved };
    this.setState({ arrayHolder });
  };

// this is the actual viewing component
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
                borderColor: 'black',
                borderRadius: 20,
                boxShadow: '5px 5px 5px -8px rgba(53, 134, 0, 1)',
              }}>
              <Card.Content>
                <View style={styles.rowContainer}>
                  <Text style={styles.cardtext}>
                    {item.website_description2}
                  </Text>
                  <Icon
                    name={item.saved ? 'bookmark' : 'bookmark-outline'}
                    color="#358600"
                    onPress={() => {
                      this.props.isLoggedIn
                        ? this.updateSaved(item)
                        : alert('Please sign in or create an account!');
                    }}
                  />
                </View>
                <Text style={styles.rating}>Political Bias: {item.bias}</Text>
                <Text
                  style={{
                    color: '#2A5DB0',
                    textDecorationLine: 'underline',
                    fontSize: 15,
                  }}
                  onPress={() => Linking.openURL(item.website_url)}>
                  {item.website_title}
                </Text>
                <Text> </Text>
                <View
                  style={{
                    justifyContent: 'center',
                    borderBottomColor: '#358600',
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
                    fontFamily: 'Avenir-Heavy',
                    paddingBottom: 5,
                  }}>
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
    justifyContent: 'center',
  },
  cardtext: {
    fontSize: 16,
    paddingBottom: 17,
    fontFamily: 'Avenir-Book',
  },
  rating: {
    paddingBottom: 17,
    fontSize: 12,
    fontFamily: 'Avenir-Heavy',
  },
  related: {
    fontSize: 14,
    paddingBottom: 17,
    fontFamily: 'Avenir-Book',
  },
  rowContainer: {
    paddingRight: 10,
    flexDirection: 'row',
  },
});
