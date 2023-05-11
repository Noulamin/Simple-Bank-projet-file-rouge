import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  ToastAndroid,
  Modal
} from "react-native";
import { useState, useEffect } from "react";
import logo from '../../public/images/simple.jpg'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {

  const [Ip, setIp] = useState('192.168.1.101')
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [ShowModal, setShowModal] = useState(true)

  useEffect(() => {
  }, [])

  const HandleButton = async () => {
    setIsLoading(true)

    if (Email.length === 0 || Password.length === 0) {
      ToastAndroid.show('Please fill all fields.', ToastAndroid.SHORT)
      setIsLoading(false)
      return
    }

    const LoginData = {
      email: Email,
      password: Password
    }

    try {
      const res = await axios.post('http://' + Ip + ':8080/api/auth/login', LoginData, { withCredentials: true });
      if (res.status === 200) {
        AsyncStorage.setItem('token', res.data)
        global.token = res.data
        
        setTimeout(() => {
          setIsLoading(false)
          navigation.navigate('Home')
        }, 1000)
      }
      else {
        ToastAndroid.show(res.data, ToastAndroid.SHORT)
        setIsLoading(false)
      }
    } catch (error) {
      ToastAndroid.show(error.toJSON().message, ToastAndroid.SHORT)
      setIsLoading(false)
    }
  }

  return (
    <>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          onChangeText={(Value) => { setEmail(Value) }}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(Value) => { setPassword(Value) }}
        />
        <TouchableOpacity
          disabled={isLoading}
          onPress={() => { HandleButton() }}
          style={{
            backgroundColor: isLoading ? '#E0E0E0' : 'black', height: 49,
            width: Dimensions.get('window').width - 51,
            borderRadius: 5,
            marginTop: 23,
            alignItems: "center",
            justifyContent: "center",
          }}>
          {
            isLoading ?
              (
                <ActivityIndicator size="small" color="#AEAEAE" />
              )
              :
              (
                <Text style={styles.HandleButtonText}>
                  SIGN IN
                </Text>
              )
          }
        </TouchableOpacity>
        <View style={styles.optionsContainer}>
          <TouchableOpacity>
            <Text style={styles.forgetText}>
              Forget Password?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    marginTop: 14,
    width: Dimensions.get('window').width - 53,
    height: 47,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    paddingLeft: 18,
    fontSize: 18
  },
  HandleButtonText: {
    color: 'white',
    fontSize: 17
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 23
  },
  optionsContainer: {
    width: Dimensions.get('window').width - 51,
  },
  forgetText: {
    color: '#1976D2',
    marginTop: 6
  }
})