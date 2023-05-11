import { useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Check({ navigation }) {

  useEffect(() => {
    AsyncStorage.getItem('token')
      .then(value => {
        if (value != null) {
          global.token = value
          navigation.navigate('Home')
        }
        else {
          navigation.navigate('Login')
        }
      })
      .catch(error => {
        console.log(error)
      })
  }, []);
}