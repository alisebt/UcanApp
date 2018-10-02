import React, {Component} from 'react';
import {create} from 'apisauce';
import HTML from 'react-native-render-html';
import { createStackNavigator } from 'react-navigation';
import {StyleSheet, Text, View,ActivityIndicator,FlatList,Image,TouchableOpacity,ScrollView,Dimensions} from 'react-native';
import { ListItem } from 'react-native-elements';

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
                  this.props.navigation.navigate('CategoryContent', {
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

class CategoryContentScreen extends React.Component {
  state = {
    seed: 1,
    page: 0,
    categories: [],
    isLoading: false,
    isRefreshing: false,
  };

  loadCategoryList =()=>{
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    const { page } = this.state;
    this.setState({ isLoading: true });
    const api = create({
      baseURL: 'https://core.ucan.ir/mobile/request.asmx',
      headers: {'Content-Type': 'application/json'}
    })
    api.post('/GetContentByCategoryList', JSON.stringify({request: {RequestID:itemId,PageIndex:page,PageSize:15}}))
    .then((response)=>{
      const arrayData = [...this.state.categories, ...response.data.Result.GetContentByCategoryList]
      this.setState({
        categories: page === 0 ? response.data.Result.GetContentByCategoryList : arrayData,
        isRefreshing: false
     });
    })
    .then(()=>{
      //alert("Check your internet connection.");
      //console.log
    })
  }

  handleRefresh = () => {
    this.setState({
      seed: this.state.seed + 1,
      isRefreshing: true,
    }, () => {
      this.loadCategoryList();
    });
  };

  handleLoadMore = () => {
    this.setState({
      page: this.state.page + 1
    }, () => {
      this.loadCategoryList();
    });
  };
  
  componentDidMount(){
    this.loadCategoryList();
  }
  
  render() {
    const { categories, isRefreshing } = this.state;
    return (
      <View>
        <FlatList
            data={categories}
            renderItem={(
              {item}) => 
              <TouchableOpacity onPress={()=>{
                    this.props.navigation.navigate('ContentDetails', {
                      itemId: item.ContentID
                    });
                }}>
                <ListItem
                    roundAvatar
                    title={item.Title}
                    avatar={{uri: item.ThumbImage}}
                  />
              </TouchableOpacity>
            }
            keyExtractor={ (item) => item.ContentID }
            refreshing={isRefreshing}
            onRefresh={this.handleRefresh}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={0.001}
          />
        </View>
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
  CategoryContent:{
    screen: CategoryContentScreen
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