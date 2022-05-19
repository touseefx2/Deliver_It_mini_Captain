import React, { useState, useRef } from "react";
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  TouchableHighlight,
  ActivityIndicator,
  Modal,
  Image,
  Alert,
} from "react-native";
import { observer, inject } from "mobx-react";
import styles from "./styles";
import AntDesgin from "react-native-vector-icons/AntDesign";
import { ScrollView } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import theme from "../../theme";
import ImageSlider from "react-native-image-slider";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import FastImage from "react-native-fast-image";
import NetInfo from "@react-native-community/netinfo";

export default inject(
  "userStore",
  "generalStore",
  "carStore",
  "tripStore"
)(observer(Car));

function Car(props) {
  // const {
  //   user,
  //   setuser,
  //   setcl,
  //   cl,
  //   isl,
  //   setisl,
  //   setrequest,
  //   request,
  //   trip,
  //   settrip,
  //   cars,
  // } = props.store;

  const { user } = props.userStore;
  const { cars, setCars } = props.carStore;
  const { isInternet, apiLevel } = props.generalStore;
  let car = cars;
  // const { source } = props.route.params;
  let img = car.car_images || [];

  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  const [pvm, setpvm] = useState(false); //show fulll image modal
  const [pv, setpv] = useState(""); //photo view
  const [imgLoadd, setimgLoadd] = useState(false);

  console.log("cid : ", car._id);

  const gotoEditCar = (item) => {
    props.navigation.navigate("CarDetail", { data: cars });
  };

  const renderFullImage = () => {
    return (
      <Modal
        transparent
        visible={pvm}
        onRequestClose={() => {
          setpvm(false);
          setpv("");
        }}
      >
        <View style={{ flex: 1, backgroundColor: "black" }}>
          <FastImage
            onLoadStart={() => setimgLoadd(false)}
            onLoad={() => {
              setimgLoadd(true);
            }}
            resizeMode={FastImage.resizeMode.contain}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
            source={{
              uri: pv,
              priority: FastImage.priority.normal,
            }}
          />

          {!imgLoadd && (
            <ActivityIndicator
              size={40}
              color={"blue"}
              style={{
                top: "50%",
                left: "50%",
                right: "50%",
                bottom: "50%",
                position: "absolute",
              }}
            />
          )}

          <TouchableOpacity
            onPress={() => {
              setpvm(!pvm);
              setpv("");
            }}
            style={styles.fullImageModalCross}
          >
            <Entypo name="cross" color="white" size={35} />
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  const renderImageSliderBox = () => {
    return (
      <ImageSlider
        loopBothSides
        loop
        images={img}
        style={{
          backgroundColor: theme.colors.containerBackground,
        }}
        customSlide={({ index, item, style, width }) => (
          <TouchableOpacity
            style={style}
            activeOpacity={0.7}
            onPress={() => {
              setpv(item);
              setpvm(true);
            }}
            key={index}
          >
            <FastImage
              style={{
                height: responsiveHeight(28),
                width: responsiveWidth(90),
                borderRadius: 10,
                alignSelf: "center",
                borderWidth: 0.5,
                borderColor: theme.colors.textSubtitleColor,
              }}
              source={{
                uri: item,
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </TouchableOpacity>
        )}
        customButtons={(position, move) => (
          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
            }}
          >
            {img.map((image, index) => {
              return (
                <TouchableHighlight
                  key={index}
                  underlayColor="#ccc"
                  onPress={() => move(index)}
                  style={{ marginLeft: 12, marginVertical: 5 }}
                >
                  <FontAwesome
                    name="circle"
                    color={position === index ? "#768A92" : "#E7E8E9"}
                    size={12}
                  />
                </TouchableHighlight>
              );
            })}
          </View>
        )}
      />
    );
  };

  const renderDescriptionBox = () => {
    return (
      <View style={styles.DescriptionBox}>
        <View style={styles.dcontainer1}>
          <View style={styles.dbox}>
            <Image
              style={styles.dboxImg}
              source={require("../../assets/images/cdcar.png")}
            />
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.dboxText}
            >
              {brand}
            </Text>
          </View>

          <View style={styles.dbox}>
            <Image
              style={styles.dboxImg}
              source={require("../../assets/images/cdmodel.png")}
            />
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.dboxText}
            >
              {model}
            </Text>
          </View>

          <View style={styles.dbox}>
            <Image
              style={styles.dboxImg}
              source={require("../../assets/images/cdengine.png")}
            />
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[styles.dboxText, { textTransform: "none" }]}
            >
              {engine} cc
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.dcontainer2,
            {
              justifyContent: "space-between",
            },
          ]}
        >
          <View style={styles.dbox}>
            <Image
              style={styles.dboxImg}
              source={require("../../assets/images/cdperson.png")}
            />
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.dboxText}
            >
              {seat}
            </Text>
          </View>

          <View style={styles.dbox}>
            <MaterialCommunityIcons size={35} name="fuel" color="#F05123" />
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.dboxText}
            >
              {fuel}
            </Text>
          </View>

          <View style={styles.dbox}>
            <AntDesgin name="setting" color={"#F05123"} size={25} />
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.dboxText}
            >
              {transmission}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderBottomButton = () => {
    return (
      <View style={styles.bottom}>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            marginBottom: 7,
          }}
        >
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.bottomText}
          >
            *Verification Pending
          </Text>
        </View>

        <TouchableOpacity onPress={gotoEditCar} style={styles.BottomButton}>
          <LinearGradient
            colors={[theme.colors.primary, theme.colors.primary_light]}
            style={styles.LinearGradient}
          >
            <Text style={styles.ButtonText}>Edit Details</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  };

  let brand = car.company ? car.company.name : "";
  let name = car.car_name ? car.car_name.name : "";
  let model = car.model;
  let engine = car.engine_capacitiy;
  let seat = car.seating_capacitiy;
  let fuel = car.fuel;
  let transmission = car.transmission;
  let regNum = car.registration_number;
  let type = car.type.type;
  // let title = brand + ' ' + name + ' ' + model;
  // let title = brand + ' ' + model;
  let title = name;
  let status = car.status;

  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar
        animated={true}
        barStyle="dark-content"
        backgroundColor={theme.colors.containerBackground}
      />

      <theme.StackHeader title={title} nav={props.navigation} screen={"car"} />

      <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingVertical: 20,
          }}
        >
          {renderImageSliderBox()}
          {car !== false && (
            <>
              <View style={styles.Body}>
                {renderDescriptionBox()}

                <View style={styles.Input}>
                  <Text style={styles.BodyTitle}>registration</Text>
                  <Text style={styles.BodyTitle2}>{regNum}</Text>
                </View>

                <View style={[styles.Input, { marginTop: 0 }]}>
                  <Text style={styles.BodyTitle}>{type}</Text>
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>

      {status != "approved" && renderBottomButton()}

      {renderFullImage()}
    </SafeAreaView>
  );
}
