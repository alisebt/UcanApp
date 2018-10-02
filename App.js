import React, {Component} from 'react';
import {create} from 'apisauce';
import {Platform, StyleSheet, Text, View,ActivityIndicator,FlatList,Image,TouchableOpacity,ScrollView,Dimensions} from 'react-native';
import HTML from 'react-native-render-html';
import { createStackNavigator } from 'react-navigation';


type Props = {};
class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state ={ isLoading: true}
  }
  
  componentDidMount(){
    const api = create({
      baseURL: 'https://core.ucan.ir/mobile/request.asmx',
      headers: {'Content-Type': 'application/json'}
    })
    api.post('/GetCategoryList', JSON.stringify({request: {}}))
    .then((response)=>{
      this.setState({
        isLoading: false,
        dataSource: response.data.Result.GetCategoryList
     });
    })
    .then(()=>{
      //alert("Check your internet connection.");
      //console.log
    })
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
          keyExtractor={ (item) => item.CategoryID }
          renderItem={(
            {item}) => 
            <TouchableOpacity onPress={()=>{
                  //alert(item.CategoryID);
                    /* 1. Navigate to the Details route with params */
                  this.props.navigation.navigate('Details', {
                    itemId: item.CategoryID,
                    otherParam: 'anything you want here',
                  });
              }}>
              <View style={styles.row}>
                <Image style={styles.rowimage} source={{uri:item.Image}}  ></Image>
                <Text style={styles.rowtext}>{item.Title} </Text>
              </View>
            </TouchableOpacity>
          }
        />
     )
  }
}

class DetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    const api = create({
      baseURL: 'https://core.ucan.ir/mobile/request.asmx',
      headers: {'Content-Type': 'application/json'}
    })
    api.post('/GetContentByCategoryList', JSON.stringify({request: {RequestID:itemId}}))
    .then((response)=>{
      this.setState({
        isLoading: false,
        dataSource: response.data.Result.GetContentByCategoryList
     });
    })
    .then(()=>{
      //alert("Check your internet connection.");
      //console.log
    })
  }

  render() {
   
    //const otherParam = navigation.getParam('otherParam', 'some default value');
    return (
      <FlatList
          data={this.state.dataSource}
          keyExtractor={ (item) => item.CategoryID }
          renderItem={(
            {item}) => 
            <TouchableOpacity onPress={()=>{
                  //alert(item.CategoryID);
                    /* 1. Navigate to the Details route with params */
                  this.props.navigation.navigate('ContentDetails', {
                    itemId: item.ContentID,
                    otherParam: 'anything you want here',
                  });
              }}>
              <View style={styles.row}>
                <Image style={styles.rowimage} source={{uri:item.ThumbImage}}  ></Image>
                <Text style={styles.rowtext}>{item.Title} </Text>
              </View>
            </TouchableOpacity>
          }
        />
    );
  }
}

class ContentDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    const api = create({
      baseURL: 'https://core.ucan.ir/mobile/request.asmx',
      headers: {'Content-Type': 'application/json'}
    })
    api.post('/GetContent', JSON.stringify({request: {RequestID:itemId}}))
    .then((response)=>{
      this.setState({
        isLoading: false,
        dataSource: response.data.Result
     });
    })
    .then(()=>{
      //alert("Check your internet connection.");
      //console.log
    })
  }

  render() {

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return (
      <ScrollView style={{flex:1}} >
          <Image style={styles.landscapeImage} source={{uri:this.state.dataSource.ThumbImage}}  ></Image>
          <HTML html={this.state.dataSource.Body} imagesMaxWidth={Dimensions.get('window').width} />
          
      </ScrollView>
    );
  }
}

export default createStackNavigator({
  Home: {
    screen: App
  },
  Details:{
    screen: DetailsScreen
  },
  ContentDetails:{
    screen: ContentDetailsScreen
  }
});

const styles = StyleSheet.create({
  row:{
    flex:1,backgroundColor:'#ECECEd',marginBottom:5,flexDirection:'row'
  },
  rowtext:{
    fontSize:20,
  },
  rowimage:{
    width:50,height:50 ,margin:5
  },
  landscapeImage:{
    height:150,resizeMode:'stretch'
  },
});