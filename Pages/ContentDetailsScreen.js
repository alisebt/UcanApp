import React from 'react';
import {create} from 'apisauce';
import HTML from 'react-native-render-html';
import {StyleSheet, Text, View,ActivityIndicator,Image,ScrollView,Dimensions} from 'react-native';

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
            <Text style={styles.catpion}>{this.state.dataSource.Title}</Text>
            <HTML html={this.state.dataSource.Body} imagesMaxWidth={Dimensions.get('window').width} />
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
    landscapeImage:{
      height:150,resizeMode:'stretch'
    },
    catpion:{
      fontWeight:"bold",fontSize:20,margin:5
    }
  });
  
  export default ContentDetailsScreen