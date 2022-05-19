import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import theme from "./index";
import LinearGradient from "react-native-linear-gradient";
import Modal from "react-native-modal";

export default function LogoutMessage(props) {
  const [load, setload] = useState(false);

  const onClick = (c) => {
    if (c == "yes") {
      setload(true);
      setTimeout(() => {
        props.logout();
      }, 1000);
      return;
    }

    if (c == "no") {
      props.setisMessage(false);
      return;
    }
  };

  return (
    <Modal
      isVisible={props.isMessage}
      animationIn="slideInRight"
      animationOut="slideOutLeft"
      backdropOpacity={0.6}
      animationInTiming={600}
      backdropTransitionInTiming={600}
      animationOutTiming={300}
      backdropTransitionOutTiming={300}
      onRequestClose={() => {
        if (!load) {
          props.setisMessage(false);
        }
      }}
    >
      {!load ? (
        <LinearGradient
          colors={[theme.colors.primary, theme.colors.primary_light]}
          style={styles.LinearGradient}
        >
          <Text style={styles.title}>{props.title}</Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 25,
            }}
          >
            <View style={{ width: "70%" }}>
              <TouchableOpacity onPress={() => onClick("no")}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={[styles.buttonText, { textAlign: "right" }]}
                >
                  No
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ width: "20%" }}>
              <TouchableOpacity onPress={() => onClick("yes")}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={[styles.buttonText, { textAlign: "right" }]}
                >
                  Yes
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      ) : (
        <LinearGradient
          colors={[theme.colors.primary, theme.colors.primary_light]}
          style={styles.LinearGradientnl}
        >
          <View style={{ width: "12%" }}>
            <ActivityIndicator size="large" color={"white"} />
          </View>

          <View style={{ width: "82%" }}>
            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.titlenl}>
              {props.title2}
            </Text>
          </View>
        </LinearGradient>
      )}
    </Modal>
  );
}

const styles = StyleSheet.create({
  LinearGradient: {
    width: "90%",
    alignSelf: "center",
    padding: 20,
    borderRadius: 5,
  },
  title: { fontSize: 17, color: "white", lineHeight: 28 },
  buttonText: {
    fontSize: 16,
    color: "white",
    letterSpacing: 0.5,
    lineHeight: 26,
    textTransform: "capitalize",
    fontWeight: "500",
  },
  LinearGradientnl: {
    width: "90%",
    alignSelf: "center",
    padding: 15,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titlenl: { fontSize: 17, color: "white", letterSpacing: 0.5, lineHeight: 20 },
});
