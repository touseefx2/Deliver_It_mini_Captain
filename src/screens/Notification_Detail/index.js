import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  Linking,
  Image,
  StatusBar,
  Animated,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { observer, inject } from "mobx-react";
import styles from "./styles";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ScrollView } from "react-native-gesture-handler";
import moment from "moment";
import theme from "../../theme";
import db from "../../database/index";

export default inject(
  "userStore",
  "generalStore",
  "carStore",
  "tripStore",
  "NotificationManager"
)(observer(Notification_Detail));

function Notification_Detail(props) {
  const { message } = props.route.params;

  const { authToken } = props.userStore;
  const { isInternet } = props.generalStore;
  const { notifications, attemptToGetNotifications } =
    props.NotificationManager;
  let internet = isInternet;

  const goBack = () => {
    props.navigation.goBack();
  };
  const formateDate = (d) => {
    var tt = moment(d).format("hh:mm a");
    var dd = moment(d).format("DD-MM-Y");
    return dd + ", " + tt;
  };

  useEffect(() => {
    if (internet) {
      if (message.is_read) {
      } else {
        // method, path, body, header;
        db.api
          .apiCall(
            "put",
            db.link.UPDATE_NOTIFICATION + message._id,
            false,
            authToken
          )
          .then((response) => {
            console.log("Update notifction resp ", response);

            if (response.data) {
              attemptToGetNotifications();
              return;
            }

            return;
          })
          .catch((e) => {
            console.error("Update notifction catch error : ", e);
            return;
          });
      }
    }
  }, [internet]);
  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar
        backgroundColor={theme.colors.containerBackground}
        barStyle="dark-content"
      />
      <View style={styles.Header}>
        <TouchableOpacity onPress={goBack} style={styles.MenuButton}>
          <Icon
            name={"arrow-back-ios"}
            size={16}
            color={"#000"}
            style={{ marginTop: 9, marginLeft: 10 }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.Body}>
          <Text
            style={{
              width: "90%",
              fontFamily: "Inter-Bold",
              alignSelf: "center",
              marginTop: 40,
              fontSize: 24,
            }}
          >
            {message.title}
          </Text>
          <Text style={styles.Message}>{message.message}</Text>
          <Text style={styles.Date}>{formateDate(new Date(message.date))}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
