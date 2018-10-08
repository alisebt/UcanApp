import React, {Component} from 'react';
import {create} from 'apisauce';
import { createStackNavigator } from 'react-navigation';
import {Alert,Text, View,ActivityIndicator,FlatList,TouchableOpacity} from 'react-native';
import { ListItem,Avatar, Button } from 'react-native-elements';
import CategoryContentScreen from './Pages/CategoryContentScreen';
import ContentDetailsScreen from './Pages/ContentDetailsScreen';
import LoginScreen from './Pages/LoginScreen';
import { getKey,saveKey,resetKey } from './Common'

type Props = {};
class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state ={ isLoading: true};
    
  }
  
  async componentDidMount(){
    await getKey("auth_token").then(
      (data)=>
      {
        //Alert.alert(JSON.stringify(data));
        //Alert.alert(data);
      }
    )
    //Alert.alert(JSON.stringify(await getKey("auth_token")));

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
  
  renderItem = ({ item }) => (
    <TouchableOpacity onPress={()=>{
            this.props.navigation.navigate('CategoryContent', {
                    itemId: item.CategoryID,
                    otherParam: 'anything you want here',
                  });
        }}>
        <ListItem
            key={item.CategoryID}
            avatar={<Avatar
              large
              rounded
              source={{uri: item.Image}}
            />}
            subtitle={
              <View>
                <Text style={{fontSize:25}}>{item.Title}</Text>
              </View>
            }
          />
    </TouchableOpacity>
)
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
          renderItem={this.renderItem}
        />
     )
  }
}

export default createStackNavigator({
  Login:{
    screen: LoginScreen
  },
  Home: {
    screen: App
  },
  CategoryContent:{
    screen: CategoryContentScreen
  },
  ContentDetails:{
    screen: ContentDetailsScreen
  }
  
});