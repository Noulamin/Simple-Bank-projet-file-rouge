import notification_img from "../../public/images/notification.png";
import menu_img from "../../public/images/menu.png";
import Gif from "../../public/images/gif.gif";
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
  Dimensions,
  ImageBackground,
  FlatList
} from "react-native";
import { useState, useRef } from "react";

export default function Home() {
  const [refreshing, setRefreshing] = useState(false);
  const drawerLeft = useRef(null);
  const drawerRight = useRef(null);

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
  }

  const right_drawer = () => {
    drawerRight.current.openDrawer();
  }

  const InputTextOnChange = (Value) => {
    // SetShowLyrics(false)
    // setShowedLyrics(false)
    // if (Value === '') {
    //     setShowFirstView(true)
    //     setSearchedSongs(null)
    //     return
    // }
    // else {
    //     SetIsSearching(false)
    //     setShowFirstView(false)
    // }
    // clearTimeout(typingTimeout)
    // typingTimeout = setTimeout(() => {
    //     console.log(Value)
    //     SearchForSongs(Value)
    // }, 2000)
  }

  const myDataArray = [
    { id: '1', title: 'Item 1', description: 'This is the first item' },
    { id: '2', title: 'Item 2', description: 'This is the second item' },
    { id: '3', title: 'Item 3', description: 'This is the third item' },
    { id: '4', title: 'Item 4', description: 'This is the fourth item' },
    { id: '5', title: 'Item 5', description: 'This is the fifth item' }, { id: '1', title: 'Item 1', description: 'This is the first item' },
    { id: '2', title: 'Item 2', description: 'This is the second item' },
    { id: '3', title: 'Item 3', description: 'This is the third item' },
    { id: '4', title: 'Item 4', description: 'This is the fourth item' },
    { id: '5', title: 'Item 5', description: 'This is the fifth item' },
  ];

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
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            style={styles.ScrollView}
          >
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.Home_button}
                onPress={left_drawer}
              >
                <Image source={menu_img} style={styles.menu_img} />
              </TouchableOpacity>
                <Text style={styles.Home_text}>SIMPLE BANK</Text>

              <TouchableOpacity onPress={right_drawer}>
                <Image
                  source={notification_img}
                  style={styles.notification_img}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.ViewContainer}>
              <TextInput
                style={styles.input}
                placeholder="Search"
                onChangeText={InputTextOnChange}
              />

              <ImageBackground
                source={Gif}
                style={styles.AmountImg}
              >
                <Text style={styles.BalanceText}>Your balance</Text>
                <Text style={styles.AmountText}>$238</Text>
              </ImageBackground>

              <View style={styles.ButtonContainer}>
                <TouchableOpacity
                  style={styles.SendButton}
                // onPress={left_drawer}
                >
                  <Text style={styles.ButtonText}>
                    SEND
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.RequestButton}
                // onPress={left_drawer}
                >
                  <Text style={styles.ButtonText}>
                    REQUEST
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.RecentTextContainer}>
                <Text style={styles.activitiesLabel}>
                  Recent activities
                </Text>
              </View>
            </View>
          </ScrollView>
          <View style={styles.ViewContainerEnd}>
            <View style={styles.activitiesContainer}>
              <FlatList
                data={myDataArray}
                renderItem={({ item }) => (
                  <View>
                    <Text>{item.title}</Text>
                    <Text>{item.description}</Text>
                  </View>
                )}
              />
            </View>
          </View>
        </DrawerLayoutAndroid>
      </DrawerLayoutAndroid>
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
    marginTop: 10,
    width: Dimensions.get('window').width - 53,
    height: 47,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    paddingLeft: 18,
    fontSize: 18
  },
  header: {
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
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 4,
    color: 'black'
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
  ViewContainer: {
    alignItems: 'center',
    backgroundColor: 'yellow'
  },
  ViewContainerEnd: {
    alignItems: 'center',
    backgroundColor: 'red'

  },
  AmountImg: {
    height: 120,
    width: Dimensions.get('window').width - 53,
    marginTop: 20,
    borderRadius: 6,
    overflow: 'hidden'
  },
  BalanceText: {
    color: 'white',
    marginTop: 23,
    marginLeft: 30,
    fontSize: 15
  },
  AmountText: {
    color: 'white',
    marginLeft: 80,
    fontSize: 27,
    marginTop: 10
  },
  ButtonContainer: {
    flex: 1,
    marginTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width - 53,
  },
  ButtonText: {
    color: 'white',
    fontSize: 15
  },
  SendButton: {
    width: Dimensions.get('window').width - 270,
    height: 45,
    backgroundColor: 'black',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center'
  },
  RequestButton: {
    width: Dimensions.get('window').width - 270,
    height: 45,
    backgroundColor: 'black',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center'
  },
  RecentTextContainer: {
    width: Dimensions.get('window').width - 53,
  },
  activitiesLabel: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4
  },
  activitiesContainer: {
    width: Dimensions.get('window').width - 53,
    height: Dimensions.get('window').height - 400,
    backgroundColor: 'blue'
  },
  ScrollView: {
    backgroundColor: 'green',
    margin: 0
  }
})