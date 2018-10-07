import { AsyncStorage} from 'react-native';

export async function getKey(key) {
    try {
      await AsyncStorage.getItem(key).then(
          (data)=>{
              //alert(data);
              return data;
            });
    } catch (error) {
        return "";
    }
  }

  export async function saveKey(key,value) {
    try {
        await AsyncStorage.setItem(key, value);
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