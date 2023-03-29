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
  FlatList,
  ToastAndroid,
} from "react-native";
import { useState, useEffect, useRef } from "react"
import VerifyToken from '../components/VerifyToken'
import { Dialog } from 'react-native-simple-dialogs';
import { SelectList } from 'react-native-dropdown-select-list'



import axios from 'axios'

export default function Home() {
  const drawerLeft = useRef(null)
  const drawerRight = useRef(null)
  const [refreshing, setRefreshing] = useState(false)
  const [UserTransactionsData, setUserTransactionsData] = useState()
  const [UserData, setUserData] = useState()
  const [AllFriendsData, setAllFriendsData] = useState()
  const [AllFriends, setAllFriends] = useState([''])


  const [SendmodalVisible, setSendModalVisible] = useState(false)


  const [SendAmount, setSendAmount] = useState('')
  const [SendTarget, setSendTarget] = useState('')
  const [IsSendDisabled, setIsSendDisabled] = useState(false)


  const onRefresh = () => {
    setRefreshing(true)
    getUserData()
    setTimeout(() => {
      setRefreshing(false)
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

  const getUserData = async () => {

    VerifyToken().then(async (data) => {
      if (data) {
        setUserData(data)

        await axios.get('http://172.16.9.172:8080/dashboard/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTljMTk4YmUxM2U5ZTE0YWU5ODQ0OSIsImlhdCI6MTY4MDAwMDM1NX0.IHeYJILgD3uuux2aSvrZtw0B5OIY0L02d7tzsqqWlRw').then((res) => {
          if (res.status === 200) {
            setAllFriendsData(res.data)
          }
        }).catch((error) => {
          // setIsProgress(false)
          console.log(error)
        })

        await axios.get('http://172.16.9.172:8080/transactions/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTljMTk4YmUxM2U5ZTE0YWU5ODQ0OSIsImlhdCI6MTY4MDAwMDM1NX0.IHeYJILgD3uuux2aSvrZtw0B5OIY0L02d7tzsqqWlRw').then((res) => {
          if (res.status === 200) {
            let data = []
            res.data.map((row) => (
              data.push({
                target: row.target,
                product: row.product,
                amount: row.amount,
                date: row.date,
              })
            ))
            setUserTransactionsData(data.reverse())
          }
        }).catch((error) => {
          console.log(error)
        })
      }
    })
  }

  const SendAmountHandler = async () => {
    setIsSendDisabled(true)
    console.log(SendAmount, SendTarget)

    if (SendAmount == '' || SendTarget == '') {
      ToastAndroid.show('Please fill all fields.', ToastAndroid.SHORT)
      setIsSendDisabled(false)
      return
    }

    if (SendAmount == '0') {
      ToastAndroid.show('You cannot send 0 amount.', ToastAndroid.SHORT)
      setIsSendDisabled(false)
      return
    }

    if (UserData.balance < SendAmount) {
      ToastAndroid.show('insufficient balance.', ToastAndroid.SHORT)
      setIsSendDisabled(false)
      return
    }

    const SendData = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTljMTk4YmUxM2U5ZTE0YWU5ODQ0OSIsImlhdCI6MTY4MDAwMDM1NX0.IHeYJILgD3uuux2aSvrZtw0B5OIY0L02d7tzsqqWlRw',
      target: AllFriendsData.find(user => user.firstName + ' ' + user.lastName === SendTarget)._id,
      amount: SendAmount,
    }

    try {
      const res = await axios.post('http://172.16.9.172:8080/dashboard/SendAmount', SendData, { withCredentials: true });
      if (res.status === 200) {
        setIsSendDisabled(false)
        ToastAndroid.show(res.data, ToastAndroid.SHORT)
        setSendModalVisible(false)
        getUserData()
      }
      else {
        setIsSendDisabled(false)
        ToastAndroid.show(res.data, ToastAndroid.SHORT)
        setSendModalVisible(false)
        getUserData()
      }
    } catch (error) {
      setIsSendDisabled(false)
      ToastAndroid.show(error, ToastAndroid.SHORT)
      setSendModalVisible(false)
    }
  }


  useEffect(() => {
    // setIsProgress(true)
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
              <Text style={styles.userNameText}>
                Welcome back, {UserData? UserData.firstName : 'Mr ...'}
              </Text>
              <ImageBackground
                source={Gif}
                style={styles.AmountImg}
              >
                <Text style={styles.BalanceText}>Your balance</Text>
                <Text style={styles.AmountText}>{UserData ? '$' + UserData.balance : 0}</Text>
              </ImageBackground>

              <View style={styles.ButtonContainer}>
                <TouchableOpacity
                  style={styles.SendButton}
                  onPress={() => {
                    setSendAmount('')
                    setSendTarget('')
                    let Data = []
                    for (let friend in AllFriendsData) {
                      if (UserData._id != AllFriendsData[friend]._id) {
                        Data.push(AllFriendsData[friend].firstName + ' ' + AllFriendsData[friend].lastName)
                      }
                    }
                    setAllFriends(Data)
                    setSendModalVisible(true)
                  }}
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
                        data={UserTransactionsData}
                        renderItem={({ item }) => (
                          <View style={styles.itemContainer}>
                            <Text style={{ color: 'black' }}>{item.target}</Text>
                            {item.product === 'Amount requested' ? <Text style={{ color: 'orange' }}>{item.amount}</Text> : item.amount > 0 ? <Text style={{ color: 'green' }}>{item.amount}</Text> : <Text style={{ color: 'red' }}>{item.amount}</Text>}
                            <Text style={{ color: 'black' }}>{item.date}</Text>
                          </View>
                        )}
                      />
                      // <VirtualizedList
                      //   data={myDataArray}
                      //   renderItem={({ item }) => (
                      //     <View style={styles.itemContainer}>
                      //       <Text>{item.name}</Text>
                      //       <Text>{item.amount}</Text>
                      //       <Text>{item.date}</Text>
                      //     </View>
                      //   )}
                      //   getItemCount={() => { myDataArray.length }}
                      //   initialNumToRender={10}
                      //   windowSize={10}
                      //   maxToRenderPerBatch={10}
                      //   updateCellsBatchingPeriod={50}
                      // />
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

      <Dialog
        visible={SendmodalVisible}
        title="Send Amount to" >
        <View>
          <SelectList
            setSelected={(Value) => setSendTarget(Value)}
            data={AllFriends}
            save="value"
          />
          <TextInput
            style={styles.ModalInput}
            placeholder="Amount"
            keyboardType='number-pad'
            onChangeText={(Value) => { setSendAmount(Value) }}
          />
          <View style={{ marginTop: 8 }}>
            <Button
              title="Send"
              disabled={IsSendDisabled}
              color="black"
              onPress={() => { SendAmountHandler() }}
            />
          </View>

          <View style={{ marginTop: 8 }}>
            <Button
              title="Cancel"
              disabled={IsSendDisabled}
              color="black"
              onPress={() => setSendModalVisible(false)}
            />
          </View>
        </View>
      </Dialog>
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
    height: Dimensions.get('window').height - 425,
    // backgroundColor: 'blue',
    borderRadius: 5,
    marginTop: 9,
    borderWidth: 1,
    borderColor: 'black',
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    padding: 12,
  },
  ModalInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    marginTop: 8,
    height: 49,
    paddingLeft: 22
  },
  ModalButtonContainer: {
    flex: 1,
    marginTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // width: Dimensions.get('window').width - 53,
  },
  modalButtons: {
    margin: 6
  },
  userNameText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 22,
    margin: 5,
    fontFamily: 'Cochin'
  }
})