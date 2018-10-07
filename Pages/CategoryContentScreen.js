import React, {Component} from 'react';
import {create} from 'apisauce';
import { Text, View,FlatList,TouchableOpacity} from 'react-native';
import { ListItem,Avatar } from 'react-native-elements';

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
    
    renderItem = ({ item }) => (
              <TouchableOpacity onPress={()=>{
                      this.props.navigation.navigate('ContentDetails', {
                        itemId: item.ContentID
                      });
                  }}>
                  <ListItem
                      key={item.CategoryID}
                      avatar={<Avatar
                        large
                        rounded
                        source={{uri: item.ThumbImage}}
                      />}
                      subtitle={
                        <View>
                          <Text style={{fontSize:20}}>{item.Title}</Text>
                        </View>
                      }
                    />
              </TouchableOpacity>
    )
  
    render() {
      const { categories, isRefreshing } = this.state;
      return (
        <View>
          <FlatList
              data={categories}
              renderItem={this.renderItem}
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
  export default CategoryContentScreen