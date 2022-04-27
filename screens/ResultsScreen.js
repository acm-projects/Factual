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

import LottieView from 'lottie-react-native'
import axios from 'axios';
import client from '../API/client';
import { Link } from '@react-navigation/native';

export default class ResultsScreen extends Component {
  constructor(props) {
    super(props);
// this holds the array of all the article objects/items
  this.state = {
    array: [],
    arrayHolder: [],
    textInput_Holder: "",
    dataReturned: false,
    checked: false
      };
    }




    async getArticles() {

      const claim = this.props.text
      console.log("didmount: " + claim);
      let finalarray=[]
  
      try {
        //send request to daniels API using the provided claim
        let res = await client.post('/search', {claim:claim});
        
        if (res.data) {
          // the API returns a JSON object with 5 nested objects (Website0, Website1..)
          let articles = await res.data;
          
          
          const a0 =  articles.Website0;
          const a1 =  articles.Website1;
          const a2 =  articles.Website2;
          const a3 =  articles.Website3;
          const a4 =  articles.Website4;
          
          //wait until all json objects have been stored in the variables
          Promise.all([a0, a1, a2, a3, a4]).then(async (values) => {
            for await (obj of values){//for each json object check wether title, compared claim or website description is empty (equal to 'none')
              if( !(obj.website_title.includes('none') || obj.website_title.includes('403') 
              || obj.compared_claim.includes('none') || obj.website_description2.includes('none'))){
                
                //if the objects atributes aren't empty add it to a temp array
                finalarray.push(obj);
                
              }
              
            }
          }).then(()=>{ //after the filtered objects have all been added to temp array set this.state.array = finalArray
            this.setState({dataReturned: true});//since data has been returned and filtered set dataReturned flag to true
            this.setState({array: finalarray});
          })
        }
  
     } catch (error) {
        console.log('error results js:' + error.message);
     }

    } 
  componentDidMount() {

     this.getArticles()
    
  }

  componentDidUpdate(prevProp){
    if(!(prevProp.text == this.props.text||this.props.isLoggedIn)){

      this.getArticles()
      this.setState({dataReturned: false})
    }

  }

  // componentWillUnmount(){
  //   let empty = []

  //   this.setState({array: empty })
  //   this.setState({dataReturned: false})

  // }

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

  updateSaved = async (item) => {
    // console.log('this user wants to save an article: ' + this.props.username + "\n password: " + this.props.password);
    let response = await client.post('/save-article', {email: this.props.username, article: item});
    item.saved = true;
    this.setState({checked: true});
  };
  
  // this is the actual viewing component
  render()  {
    //while dataResturned is false keep rendering "Loading..."
    if(!this.state.dataReturned){
      return(
        
        <SafeAreaView style={styles.container}>
          <View style={{ justifyContent: 'center', alignItems: 'center'}}>
          <LottieView source={require('../assets/loading.json')} autoPlay loop style={{width: 200, height: 200}}/> 
          </View>
        </SafeAreaView>
          //        <View style = {{
          //         justifyContent: 'center',
          //         alignContent: 'center',
          //         flexDirection: 'row',
          //         paddingTop: 20
          //       }}>
          //         <Text style = {{ color: '#358600', fontSize: 30, fontFamily: 'Avenir-Light',}}> Loading...</Text>
          //       </View> 


      
        
        )
      }  
      return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.array}
          width="95%"
          extraData={this.state.checked}
          keyExtractor={(item, index) => index.toString()}
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
                      // console.log(this.props.text);

                      if(this.props.isLoggedIn){
                        this.updateSaved(item);
                        this.setState({checked: false});
                      }
                      else{
                        alert("Please sign in or create an account!")
                      }

                      // this.props.isLoggedIn
                      //   ? this.updateSaved(item)
                      //   : alert('Please sign in or create an account!');
                    }}
                  />
                </View>
                <Text style={styles.rating}>Political Bias: {item.website_polaratiy}</Text>
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
                <Text style={styles.related} >
                  Related Claim: {item.compared_claim}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'Avenir-Heavy',
                    paddingBottom: 5,
                    textDecorationLine: 'underline'
                  }} onPress={() => Linking.openURL(item.checked_link)}>
                  {item.checked_name} rates this {item.checked_rating}
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
    justifyContent: 'space-between',
  },
});
