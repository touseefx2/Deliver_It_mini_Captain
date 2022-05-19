import React, { useEffect, useState, useRef } from "react";
import {
  TouchableOpacity,
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  SafeAreaView,
  Modal as MModal,
} from "react-native";

import { Layout } from "@ui-kitten/components";
import styles from "./styles";
import LinearGradient from "react-native-linear-gradient";
import ToggleSwitch from "toggle-switch-react-native";
import { inject, observer } from "mobx-react";

import utils from "../../utils/index";
// import theme from "../../themes/index";
import theme from "../../theme/index";

export default inject(
  "userStore",
  "generalStore",
  "carStore"
)(observer(HomeInActive));

function HomeInActive(props) {
  const { isInternet } = props.generalStore;
  const { user, isGetAllDatainSplash, setisGetAllDatainSplash, getAllData } =
    props.userStore;
  const { cars } = props.carStore;

  const [loader, setloader] = useState(false);

  const [activeChecked, setActiveChecked] = useState(true);
  let internet = isInternet;

  useEffect(() => {
    if (internet && !isGetAllDatainSplash) {
      getAllData();
    }
    if (isGetAllDatainSplash) {
      setTimeout(() => {
        setisGetAllDatainSplash(false);
      }, 3000);
    }
  }, [internet]);

  const renderOptin = () => {
    return (
      <View
        style={{
          marginTop: 15,
          backgroundColor: theme.colors.containerBackground,
          elevation: 5,
          padding: 10,
          borderRadius: 4,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <utils.vectorIcon.FontAwesome5 name="car" color="black" size={35} />

        <View style={{ width: "70%" }}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontSize: 16,
              color: "black",
              fontFamily: "Inter-Bold",
              lineHeight: 20,
            }}
          >
            Opt-in
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontSize: 13,
              color: theme.colors.placeholder,
              lineHeight: 20,
            }}
          >
            Enable to get more bookings
          </Text>
        </View>

        <ToggleSwitch
          isOn={activeChecked}
          onColor="#35cf2d"
          offColor="silver"
          size="small"
          onToggle={(t) => onActiveCheckedChange(t)}
        />
      </View>
    );
  };

  const renderBottonButton = () => {
    let text = "add car";

    return (
      <TouchableOpacity
        onPress={() => onClickButton(text)}
        disabled={loader}
        style={styles.Button}
      >
        <LinearGradient
          colors={[theme.colors.primary, theme.colors.primary_light]}
          style={styles.LinearGradient}
        >
          {loader && <ActivityIndicator color={"white"} size={22} />}
          {!loader && <Text style={styles.ButtonText}>{text}</Text>}
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const onMenuPressed = () => {
    props.navigation.openDrawer();
  };

  const renderShowCar = () => {
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate("Carstack", { source: "home" })
        }
        style={{
          backgroundColor: theme.colors.containerBackground,
          padding: 7,
          borderRadius: 4,
          flexDirection: "row",
          alignItems: "center",
          marginTop: 10,
          elevation: 5,
        }}
      >
        <utils.vectorIcon.Ionicons
          name="ios-car-sport-outline"
          color="black"
          size={85}
        />

        <View style={{ width: "80%", marginLeft: 10 }}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontSize: 17,
              color: "black",
              fontFamily: "Inter-Bold",
              textTransform: "capitalize",
              lineHeight: 20,
            }}
          >
            {cars.company.name} {cars.car_name.name}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontSize: 15,
              color: theme.colors.placeholder,
              textTransform: "uppercase",
              lineHeight: 20,
            }}
          >
            {cars.registration_number}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontSize: 15,
              color: theme.colors.placeholder,
              textTransform: "capitalize",
              lineHeight: 20,
            }}
          >
            {cars.type.type}
          </Text>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                fontSize: 14,
                fontFamily: "Inter-Bold",
                color: theme.colors.textSubtitleColor,
                textTransform: "capitalize",
                lineHeight: 20,
              }}
            >
              Staus:{"  "}
            </Text>

            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                fontSize: 14,
                color: cars.status == "approved" ? "green" : "#ff8d7e",
                textTransform: "capitalize",
                lineHeight: 20,
              }}
            >
              {cars.status}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderWarnMessage = () => {
    return (
      <TouchableOpacity
        style={styles.StickyNote}
        disabled
        // onPress={gotoContactScreen}
      >
        <Text style={styles.DisTitle}>Activate Account</Text>
        <Text style={styles.DisSubTitle}>
          Your account verification is pending.
          {/* Please visit any KarBlock
          service-center for verification. */}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Layout style={styles.container}>
      <theme.StackHeader
        from={"allcars"}
        menuPress={() => {
          onMenuPressed();
        }}
        title={user.fullname}
        screen="home"
      />

      <ScrollView
        contentContainerStyle={{ flex: 1, padding: 15 }}
        showsVerticalScrollIndicator={false}
      >
        {/* <utils.Loader loader={loader} /> */}

        <View style={{ width: "100%" }}>
          <Text style={styles.TitleH}>Hello,</Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.TitleH2}>
            {user.fullname}
          </Text>
        </View>
        {user.status != "approved" && renderWarnMessage()}
        {cars && (
          <>
            {/* {renderOptin()} */}
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Inter-Bold",
                  color: "black",
                  marginTop: 30,
                }}
              >
                Dedicated Car
              </Text>
              {renderShowCar()}
            </View>
          </>
        )}
      </ScrollView>

      {/* {renderBottonButton()} */}
    </Layout>
  );
}
