import React from 'react';
import {create} from 'apisauce';
import HTML from 'react-native-render-html';
import {StyleSheet, Text, View,ActivityIndicator,Image,ScrollView,Dimensions,Alert,AsyncStorage,TextInput,Button} from 'react-native';
//import { Button } from 'react-native-elements';

class ContentDetailsScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state ={ isLoading: true}
    }
  
    async componentDidMount(){
      //get user token
      try {
        await AsyncStorage.getItem("auth_token").then(
            (data)=>{
              this.setState({token:data});
              });
      } catch (error) {
          return error;
      }
      //get user token

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
          dataSource: response.data.Result,
          contentId : response.data.Result.ContentID
       });
      })
      .then(()=>{
        //alert("Check your internet connection.");
        //console.log
      })
    }

    IsEmptyString(value){
      return !value;
    }

    AddComment(){
    if (this.IsEmptyString(this.state.comment)) {
        Alert.alert("You must enter comment.");
        return;
     }

      const api = create({
        baseURL: 'https://core.ucan.ir/mobile/request.asmx',
        headers: {'Content-Type': 'application/json','Token':this.state.token}
      })
      api.post('/AddComment', JSON.stringify({request: {ContentID:this.state.contentId,Comment:this.state.comment}}))
      .then((response)=>{
        if (response.data.Status!=1) {
          Alert.alert("System Error");
       }
       else{
          Alert.alert("Comment submited successfully.");
          this.txtMessage.clear();
          this.setState({comment:""});
       }
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
        <ScrollView style={{flex:1,margin:5}} >
            <Image style={styles.landscapeImage} source={{uri:this.state.dataSource.ThumbImage}}  ></Image>
            <Text style={styles.catpion}>{this.state.dataSource.Title}</Text>
            <HTML html={this.state.dataSource.Body} imagesMaxWidth={Dimensions.get('window').width} />
            {/* <Text>Token : {this.state.token}</Text> */}
            <TextInput ref={input => { this.txtMessage = input }}  
                      style={styles.textInput} 
                      placeholder='Enter your comment here.' 
                      onChangeText={ TextInputValue =>this.setState({comment: TextInputValue })} />
            <Button  onPress={this.AddComment.bind(this)} title="Add Comment" />
        </ScrollView>
      );
    }
  }
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
    textInput:{
      flex:1,backgroundColor:"#FFFFFF",fontSize:20,margin:10
    },
    landscapeImage:{
      height:150,resizeMode:'stretch'
    },
    catpion:{
      fontWeight:"bold",fontSize:20,margin:5
    }
  });
  
  export default ContentDetailsScreen