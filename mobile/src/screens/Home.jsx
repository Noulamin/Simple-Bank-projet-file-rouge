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
import { useState, useEffect, useRef } from "react"
import VerifyToken from '../components/VerifyToken'

import axios from 'axios'

export default function Home() {
  const drawerLeft = useRef(null)
  const drawerRight = useRef(null)
  const [refreshing, setRefreshing] = useState(false)
  const [UserTransactionsData, setUserTransactionsData] = useState()


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
    { name: '1', amount: 'Item 1', date: 'first item' },
    { name: '2', amount: 'Item 2', date: 'second item' },
    { name: '3', amount: 'Item 3', date: 'third item' },
    { name: '4', amount: 'Item 4', date: 'fourth item' },
    { name: '5', amount: 'Item 5', date: 'fifth item' },
  ]

  const getUserData = async () => {

    await axios.get('http://localhost:8080/transactions/' + Cookies.get('token')).then((res) => {
      if (res.status === 200) {
        setUserTransactionsData(res.data.reverse())
      }
    }
    )
  }

  useEffect(() => {
    // setIsProgress(true)
    // getUserData()
    getUserData()
  }, []);

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
          <View>

          </View>
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
            <View style={styles.ViewContainerEnd}>
              <View style={styles.activitiesContainer} >
                {
                  UserTransactionsData ?
                    (
                      <FlatList
                        data={myDataArray}
                        renderItem={({ item }) => (
                          <View style={styles.itemContainer}>
                            <Text>{item.name}</Text>
                            <Text>{item.amount}</Text>
                            <Text>{item.date}</Text>
                          </View>
                        )}
                      />
                    )
                    :
                    (
                      <Text>
                        No data.
                      </Text>
                    )
                }

              </View>
            </View>
          </ScrollView>
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
    // backgroundColor: 'yellow',
    // marginTop: 34,
  },
  ViewContainerEnd: {
    alignItems: 'center',
    // backgroundColor: 'red'

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
    marginTop: 5
  },
  activitiesLabel: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4
  },
  activitiesContainer: {
    width: Dimensions.get('window').width - 53,
    height: Dimensions.get('window').height - 405,
    // backgroundColor: 'blue',
    borderRadius: 5,
    marginTop: 9,
    borderWidth: 1,
    borderColor: 'black',
  },
  ScrollView: {
    // backgroundColor: 'green',
    // height: 300
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    padding: 12,
  }
})