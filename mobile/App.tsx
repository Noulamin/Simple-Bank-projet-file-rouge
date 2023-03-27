import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
// import Detail from "./src/screens/Detail";
import Home from "./src/screens/Home";

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          {/* <Stack.Screen name="Detail" component={Detail} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}
export default App