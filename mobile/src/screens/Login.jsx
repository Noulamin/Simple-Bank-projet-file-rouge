import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator
} from "react-native";
import { useState } from "react";
import logo from '../../public/images/simple.jpg'

export default function Login() {

  const [isLoading, setIsLoading] = useState(false)

  const HandleButton = () => {
    setIsLoading(true)
  }

  return (
    <>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
        // onChangeText={InputTextOnChange}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
        // onChangeText={InputTextOnChange}
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