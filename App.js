/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {create} from 'apisauce';

import {Platform, StyleSheet, Text, View,ActivityIndicator,FlatList,Image} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


 

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    const api = create({
      baseURL: 'http://core.ucan.ir/mobile/request.asmx',
      headers: {'Content-Type': 'application/json'}
    })
    api.post('/GetCategoryList', JSON.stringify({request: {}}))
    .then((response)=>{
      //alert(JSON.stringify(response.data.Result.GetCategoryList.length) );
      //alert(response.data.Result.GetCategoryList[1].Title)
      // for (var index = 0; index < response.data.Result.GetCategoryList.length-1; index++) {
      //   alert(response.data.Result.GetCategoryList[index].Title);
      // }
      this.setState({
        isLoading: false,
        dataSource: response.data.Result.GetCategoryList
     });

    })
    .then(console.log)
  }
  
  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
     return(
      
      <FlatList
          data={this.state.dataSource}
          renderItem={(
            {item}) => 
          <View style={styles.row}>
            
            <Image style={styles.rowimage} source={{uri:item.Image}}  ></Image>
            <Text style={styles.rowtext}>{item.Title} </Text>
          </View>
          }
        />
     )
  }
}

const styles = StyleSheet.create({
  row:{
    flex:1,
    
    backgroundColor:'#ECECEC',
    marginBottom:5,
    flexDirection:'row'
  },
  rowtext:{
    fontSize:20,
  },
  rowimage:{
    width:50,
    height:50 ,
    margin:5
  },
});
