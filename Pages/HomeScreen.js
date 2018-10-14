import React, {Component} from 'react';
import {create} from 'apisauce';
//import { createStackNavigator } from 'react-navigation';
import {Text, View,ActivityIndicator,FlatList,TouchableOpacity,Dimensions} from 'react-native';
import { ListItem,Avatar } from 'react-native-elements';
// import CategoryContentScreen from './CategoryContentScreen';
// import ContentDetailsScreen from './ContentDetailsScreen';
// import LoginScreen from './LoginScreen';
import { checkAuthentication,getKey,saveKey,resetKey } from '../Common'

type Props = {};
class HomeScreen extends Component<Props> {
  state = {
    isAuthenticated:false
  }
  constructor(props) {
    super(props);
    this.state ={ isLoading: true};
    
  }

  async componentWillMount(){
    await checkAuthentication().then((data) => {
      var result= data;
      this.setState({
        isAuthenticated: result
      });
      console.log("checkAuthentication:"+result);
    });

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
  if (this.state.isAuthenticated==false) {
        this.props.navigation.navigate('Login');
      }

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

export default HomeScreen
// export default createStackNavigator({
//   Home: {
//     screen: HomeScreen
//   },
//   Login:{
//     screen: LoginScreen
//   },
//   CategoryContent:{
//     screen: CategoryContentScreen
//   },
//   ContentDetails:{
//     screen: ContentDetailsScreen
//   }
// });