import React from 'react';
import {create} from 'apisauce';
import HTML from 'react-native-render-html';
import {StyleSheet, Text, View,ActivityIndicator,Image,ScrollView,Dimensions,Alert,AsyncStorage,TextInput,Button} from 'react-native';
import Video from 'react-native-video';

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
    onBuffer(){};
    onEnd(){};
    onError(){};
    render() {
      if(this.state.isLoading){
        return(
          <View style={{flex: 1, padding: 20}}>
            <ActivityIndicator/>
          </View>
        )
      }
      
      //VIDEO
      console.log("DataSource:"+JSON.stringify(this.state.dataSource) );
      if (this.state.dataSource.Type==2) {
      
      console.log("DataSource Type:"+this.state.dataSource.Type );
      console.log("DataSource Path:"+this.state.dataSource.AttachmentList[0].Files[0].Path );
        return (
          <ScrollView style={{flex:1,margin:5}} >
            <Video source={{uri: this.state.dataSource.AttachmentList[0].Files[0].Path}}   // Can be a URL or a local file.
              ref={(ref) => {
                this.player = ref
              }}                                      // Store reference
              onBuffer={this.onBuffer}                // Callback when remote video is buffering
              onEnd={this.onEnd}                      // Callback when playback finishes
              onError={this.videoError}               // Callback when video cannot be loaded
              style={styles.backgroundVideo}
              rotateToFullScreen = {true}
              
               />
             <Text style={styles.catpion}>{this.state.dataSource.Title}</Text>
            <HTML html={this.state.dataSource.Body} imagesMaxWidth={Dimensions.get('window').width} />
            <TextInput ref={input => { this.txtMessage = input }}  
                      style={styles.textInput} 
                      placeholder='Enter your comment here.' 
                      onChangeText={ TextInputValue =>this.setState({comment: TextInputValue })} />
            <Button  onPress={this.AddComment.bind(this)} title="Add Comment" />
          </ScrollView>
        );
      }


      //NEWS
      return (
        <ScrollView style={{flex:1,margin:5}} >
            <Image style={styles.landscapeImage} source={{uri:this.state.dataSource.ThumbImage}}  ></Image>
            <Text style={styles.catpion}>{this.state.dataSource.Title}</Text>
            <HTML html={this.state.dataSource.Body} imagesMaxWidth={Dimensions.get('window').width} />
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
    },
    backgroundVideo: {
      height:300,resizeMode:'stretch'
    },
  });
  
  export default ContentDetailsScreen