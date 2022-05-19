import React, { useEffect } from "react";
import { View, Text, SafeAreaView, Image } from "react-native";
import { styles } from "./styles";
import { inject, observer } from "mobx-react";
import theme from "../../themes/index";
import PushNotification from "react-native-push-notification";
import messaging from "@react-native-firebase/messaging";
import DeviceInfo from "react-native-device-info";
import userStore from "../../store/index";
import NetInfo from "@react-native-community/netinfo";

const getToken = async () => {
  let tok = await messaging().getToken();
  console.log("Token found to update");
  console.log(tok);
  userStore.userStore.addnotificationToken(tok);
};

Platform.OS === "android"
  ? PushNotification.configure({
      onRegister: function (token) {
        console.log("Token found to update");
        userStore.userStore.addnotificationToken(token.token);
      },
    })
  : getToken();

export default inject(
  "userStore",
  "generalStore",
  "carStore",
  "tripStore"
)(observer(Splash));

function Splash(props) {
  const { setLoader, getAllData, user } = props.userStore;
  const {
    request,
    changerequest,
    setrequest,
    accept,
    setaccept,
    atime,
    setatime,
    arrive,
    setarrive,
    startride,
    setstartride,
    endride,
    setendride,
    setwaitTime,
    waitTime,
    arvtime,
    setarvtime,
    ar,
    setar,
    ridemodal,
    setridemodal,
    tcp,
    dpd,
    tpd,
    settcp,
    setdpd,
    settpd,
    normalPay,
    setnormalPay,
    normalPaycash,
    setnormalPaycash,
  } = props.tripStore;
  const { setapiLevel } = props.generalStore;

  useEffect(() => {
    checkApiLevel();

    setTimeout(() => {
      setLoader(false);
    }, 1500);
  }, []);

  useEffect(() => {
    if (user) {
      NetInfo.fetch().then((state) => {
        if (state.isConnected) {
          console.log("user true Get all data once");
          getAllData();
        }
      });
    }
  }, [user]);

  const checkApiLevel = () => {
    DeviceInfo.getApiLevel().then((apiLevel) => {
      setapiLevel(apiLevel);
    });
  };

  console.log("request : ", request);
  console.log("accept : ", accept);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("../../assets/Splash_Logo/animatedtruck.gif")} />
      <View>
        <theme.Text
          style={{
            fontSize: 30,
            fontFamily: theme.fonts.fontBold,
            color: "#0e47a1",
            alignSelf: "center",
          }}
        >
          Deliver iT
        </theme.Text>
      </View>
    </SafeAreaView>
  );
}
