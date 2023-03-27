import { StatusBar } from "expo-status-bar";
import notification_img from "../../public/images/notification.png";
import menu_img from "../../public/images/menu.png";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ScrollView,
  RefreshControl,
  DrawerLayoutAndroid,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Favirets from "../components/interface/Favorites"
import { useState, useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Pharmaciera from "./interface/Pharmacier";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/Entypo";
import Favorite from "react-native-vector-icons/MaterialIcons";
import Map from "./interface/Map";

export default function Home() {
  const [refreshing, setRefreshing] = useState(false);
  const drawerLeft = useRef(null);
  const drawerRight = useRef(null);

  const Tab = createBottomTabNavigator();

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const navigationViewLeft = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <Text style={styles.Home_text}>Hello there!</Text>
      <Button
        title="Close Now"
        onPress={() => drawerLeft.current.closeDrawer()}
      />
    </View>
  );

  const navigationViewRight = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <Text style={styles.Home_text}>Check Notifications here!</Text>
      <Button
        title="Close Now"
        onPress={() => drawerRight.current.closeDrawer()}
      />
    </View>
  );

  const left_drawer = () => {
    drawerLeft.current.openDrawer();
  };

  const right_drawer = () => {
    drawerRight.current.openDrawer();
  };

  function Favourites() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Favirets/>
      </View>
    );
  }

  return (
    <>
      <DrawerLayoutAndroid
        style={styles.drawer}
        drawerPosition={"left"}
        ref={drawerLeft}
        drawerWidth={300}
        renderNavigationView={navigationViewLeft}
      >
        <DrawerLayoutAndroid
          style={styles.drawer}
          ref={drawerRight}
          drawerPosition={"right"}
          drawerWidth={300}
          renderNavigationView={navigationViewRight}
        >
          <View style={styles.color}>
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              style={styles.reload}
            >
              <View style={styles.header}>
                <TouchableOpacity
                  style={styles.Home_button}
                  onPress={left_drawer}
                >
                  <Image source={menu_img} style={styles.menu_img} />
                  <Text style={styles.Home_text}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={right_drawer}>
                  <Image
                    source={notification_img}
                    style={styles.notification_img}
                  />
                </TouchableOpacity>
              </View>

              {/* <SearchBar /> */}
            </ScrollView>
          </View>
          <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
              name="Pharmacys"
              component={Pharmaciera}
              options={{
                tabBarLabel: "",
                tabBarIcon: ({ focused }) => (
                  <>
                    <Image style={{ height: 14 }} />
                    <Icon
                      name="home"
                      size={30}
                      style={focused ? styles.focused : styles.TextButton}
                    />
                  </>
                ),
              }}
            />

            <Tab.Screen
              name="Favourites"
              component={Favourites}
              options={{
                tabBarLabel: "",
                tabBarIcon: ({ focused }) => (
                  <>
                    <Image style={{ height: 14 }} />
                    <Text style={focused ? styles.focused : styles.TextButton}>
                      <Favorite name="favorite" size={30} />
                    </Text>
                  </>
                ),
              }}
            />
             <Tab.Screen
              name="map"
              component={Map}
              options={{
                tabBarLabel: "",
                tabBarIcon: ({ focused }) => (
                  <>
                    <Image style={{ height: 14 }} />
                    <Text style={focused ? styles.focused : styles.TextButton}>
                      <Favorite name="map" size={30} />
                    </Text>
                  </>
                ),
              }}
            />
          </Tab.Navigator>
        </DrawerLayoutAndroid>
      </DrawerLayoutAndroid>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    marginTop: 10,
    margin: 27,
    height: 48,
    borderWidth: 1,
    borderRadius: 34,
    padding: 10,
    paddingLeft: 18,
    fontSize: 18,
  },
  header: {
    marginTop: 58,
    marginBottom: 12,
    margin: 21,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  notification_img: {
    height: 27,
    width: 27,
  },
  menu_img: {
    height: 30,
    width: 30,
  },
  Home_button: {
    flexDirection: "row",
  },
  Home_text: {
    fontSize: 21,
    fontWeight: "bold",
    marginLeft: 4,
  },
  TextButton: {
    fontWeight: "bold",
  },
  color: {
    backgroundColor: "white",
  },
  focused: {
    color: "#87E1C7",
  },
});