import { AsyncStorage,Alert} from 'react-native';

export async function getKey(key) {
    try {
      var result ="";
      await AsyncStorage.getItem(key).then(
          (data)=>{
            result = data;
            //Alert.alert("data : " + key +"-"+ result);
              return result;
            });
    } catch (error) {
        return error;
    }
  }

  export async function saveKey(key,value) {
    try {
        await AsyncStorage.setItem(key, value);
        //Alert.alert("SaveKey : " + key +"-"+ value);
    } catch (error) {
        return "";
      //console.log("Error saving data" + error);
    }
  }

  export async function  resetKey(key) {
    try {
        await AsyncStorage.setItem(key, "9999");
      //await AsyncStorage.removeItem(key);
      //await AsyncStorage.removeItem("auth_token");
    } catch (error) {
      console.log("Error resetting data" + error);
    }
  }

  export async function checkAuthentication(){
    var result =false;
    await AsyncStorage.getItem("auth_token").then(
      (data)=>{
        var token = data;
        //Alert.alert("checkAuthentication : token=>"+ token);
        console.log("Token:"+token);

        if (token===null || typeof token === 'undefined' || JSON.stringify(token) ==='undefined') 
              result= false;
            else
              result= true;
        });
        return result;
  }