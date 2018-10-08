import React, {Component} from 'react';
import {create} from 'apisauce';
import {Text, View,Button,ScrollView,TextInput,Alert} from 'react-native';
import { getKey,saveKey,resetKey,checkAuthentication } from '../Common'

class LoginScreen extends React.Component {
  state = {
    userName: '',
    password: '',
    auth_token: '',
    isAuthenticated:false
  }
  
  async componentWillMount() {
    await checkAuthentication().then((data) => {
      this.setState({
        isAuthenticated: data
      });
    });
  }

  Login(){
      const api = create({
        baseURL: 'https://core.ucan.ir/mobile/request.asmx',
        headers: {'Content-Type': 'application/json'}
      })
      //userName:9124511355
      //password:92061703
      //api.post('/UnifiedLoginCustomer', JSON.stringify({request: {Phone:this.state.userName,Password:this.state.password}}))
      api.post('/UnifiedLoginCustomer', JSON.stringify({request: {Phone:"9124511355",Password:"92061703"}}))
      .then((response)=>{
        if (response.data.Status!=1) {
          Alert.alert("Username or password is incorrect");
          return;
       }
  
        this.setState({
          isLoading: false,
          dataSource: response.data.Result,
          auth_token: response.data.Result.Token
       });
          saveKey("auth_token",response.data.Result.Token);
          this.props.navigation.navigate('Home');
      })
      .then(()=>{
        //alert("Check your internet connection.");
        //console.log
      })
    }
  
    render() {
        if (this.state.isAuthenticated) {
            this.props.navigation.navigate('Home');
          }

          return (
            <ScrollView style={{padding: 20}}>
                <Text 
                    style={{fontSize: 27}}>
                    Login
                </Text>
                <TextInput placeholder='Username' onChangeText={ TextInputValue =>this.setState({userName: TextInputValue })} />
                <TextInput placeholder='Password' onChangeText={ TextInputValue =>this.setState({password: TextInputValue })} />
                <View style={{margin:7}} />
                <Button onPress={this.Login.bind(this)} title="Login" />
            </ScrollView>
            );
    }
  }
  
  export default LoginScreen