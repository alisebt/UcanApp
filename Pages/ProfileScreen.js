import React, {Component} from 'react';
import {create} from 'apisauce';
import {Text, View,Button,ScrollView,TextInput,Alert,AsyncStorage,Image} from 'react-native';
import { getKey,saveKey,resetKey,checkAuthentication } from '../Common'

class ProfileScreen extends React.Component {
    state={
        isLoading:false,
        dataSource:""
    };
  async componentDidMount() {
    await AsyncStorage.getItem("auth_token").then(
        (data)=>{
          var token = data;
          console.log("----------------------------------------------------");
          console.log("ProfileToken:"+token);
          console.log("----------------------------------------------------");
          const api = create({
            baseURL: 'https://core.ucan.ir/mobile/request.asmx',
            headers: {'Content-Type': 'application/json','Token':token}
          })
          api.post('/GetCustomer', JSON.stringify({}))
          .then((response)=>{
            if (response.data.Status!=1) {
              Alert.alert("Error in retreiving profile data.");
              return;
           }
           console.log("response.data.Result:"+ JSON.stringify(response.data.Result));
           console.log("----------------------------------------------------");
            this.setState({
              isLoading: false,
              dataSource: response.data.Result
           });
           
          })
          .then(()=>{
            //alert("Check your internet connection.");
          })
          })
          .then(()=>{
            //alert("Check your internet connection.");
          });
  }
  
  async Logout(){
    await AsyncStorage.removeItem("auth_token").then(()=>
    {
        this.props.navigation.navigate("Login");
    }
    ).then(()=>{
        console.log("error in logout.");
    });
    
  }
  
    render() {
            console.log("Render=>this.state.dataSource:"+ JSON.stringify(this.state.dataSource));
            console.log("----------------------------------------------------");
            console.log("Render=>this.state.dataSource.UserName:"+ JSON.parse(JSON.stringify(this.state.dataSource)).UserName );
          return (
            <ScrollView style={{padding: 20}}>
                <Text 
                    style={{fontSize: 27}}>
                    Profile
                </Text>
                <Image source = {{uri:JSON.parse(JSON.stringify(this.state.dataSource)).AvatarUrl}}
                style = {{ width: 200, height: 200 }}></Image>
                <TextInput placeholder='FirstName' onChangeText={ TextInputValue =>this.setState({firstName: TextInputValue })}>
                {JSON.parse(JSON.stringify(this.state.dataSource)).FirstName}
                </TextInput>
                <TextInput placeholder='LastName' onChangeText={ TextInputValue =>this.setState({lastName: TextInputValue })}>
                {JSON.parse(JSON.stringify(this.state.dataSource)).LastName}
                </TextInput>
                <View style={{margin:7}} />
                <Button title="SignOut" onPress={this.Logout.bind(this)} ></Button>
            </ScrollView>
            );
    }
  }
  
  export default ProfileScreen