import React, { useEffect, useState, useRef } from "react";
import {
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  Image,
  BackHandler,
  ActivityIndicator,
  SafeAreaView,
  Modal as MModal,
  TextInput,
  Platform,
  Alert,
  Keyboard,
} from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { Layout } from "@ui-kitten/components";
import styles from "./styles";
import LinearGradient from "react-native-linear-gradient";
import ToggleSwitch from "toggle-switch-react-native";
import { inject, observer } from "mobx-react";
import utils from "../../utils/index";
// import theme from "../../themes/index";
import userStore from "../../store/index";
import theme from "../../theme/index";
import Message from "../../theme/message";
import MultipleImagePicker from "@baronha/react-native-multiple-image-picker";
import DropDown from "../../theme/DropDown";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default inject(
  "userStore",
  "generalStore",
  "carStore"
)(observer(SelectCar));

function SelectCar(props) {
  const { isInternet, apiLevel } = props.generalStore;
  const { user, authToken, Logout, setUser, setonline } = props.userStore;
  const {
    setCars,
    cars,
    brand,
    vType,
    allcarNames,
    UploadeImages,
    loading,
    images_uploaded,
    imgUploadCount,
  } = props.carStore;

  console.log("brnds : ", brand);

  const [loader, setloader] = useState(false);
  const [isaddcarModalVisible, setisaddcarModalVisible] = useState(false);
  const [activeChecked, setActiveChecked] = useState(true);

  let maxCarPhotos = 5;
  let minCarPhotos = 3;
  let maxBookPhotos = 2;
  let minBookPhotos = 1;

  const [isDropDownMake, setisDropDownMake] = useState(false);
  const [isDropDownName, setisDropDownName] = useState(false);
  const [isDropDownModal, setisDropDownModal] = useState(false);
  const [isDropDownType, setisDropDownType] = useState(false);

  const [pvm, setpvm] = useState(false); //show fulll image modal
  const [pv, setpv] = useState(""); //photo view
  const [imgLoadd, setimgLoadd] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [photo, setphoto] = useState([]); //car photos
  const [selectedMake, setSelectedMake] = useState([]);
  const [car, setCar] = useState([]);

  const [type, settype] = useState([]);
  const [color, setcolor] = useState("");
  const [inValidType, setinValidType] = useState(false);
  const [inValidColor, setinValidColor] = useState(false);
  const [model, setModel] = useState([]);
  const [IsEmptyphoto, setIsEmptyphoto] = useState(false);
  const [c, setC] = useState(false); //for rerendering in array update
  const [book, setBook] = useState([]); //book photos
  const [IsEmptyBook, setIsEmptyBook] = useState(false);
  const [inValidCar, setinValidCar] = useState(false);

  const [inValidMake, setInvalidMake] = useState(false);
  const [regNo, setRegNo] = useState("");

  const [isEmptyRegNo, setisEmptyRegNo] = useState(false);
  const [inValidRegNo, setinValidRegNo] = useState(false);
  const [engine, setEngine] = useState("");
  const [seating, setSeating] = useState("");
  const [inValidEngine, setinValidEngine] = useState(false);

  const [inValidSeating, setinValidSeating] = useState(false);
  const [transmission, setTransmission] = useState("auto");
  const [emptyFeature, setEmptyFeature] = useState(false);
  const [featureList, setFeatureList] = useState([]);
  const [brandList, setBrandList] = useState(brand);
  const [carsList, setCarsList] = useState([]);
  const [typeList, settypeList] = useState(vType);

  const [yearList, setYearList] = useState([]);

  useEffect(() => {
    setBrandList(brand);
  }, [brand]);

  useEffect(() => {
    settypeList(vType);
  }, [vType]);

  useEffect(() => {
    if (isaddcarModalVisible) {
      setTimeout(() => {
        const thisYear = new Date().getFullYear();
        let c = [];
        for (let i = 0; i <= 10; i++) {
          const year = thisYear - i;
          const obj = {
            _id: i,
            title: year,
          };
          c.push(obj);
          if (i == 0) {
            setModel(obj);
          }
        }
        setYearList(c);
      }, 150);
    } else {
      setSelectedMake([]);
      setCarsList([]);
      setYearList([]);
      setCar([]);
      settype([]);
      setRegNo("");
      setEngine("");
      setSeating("");
      setTransmission("auto");
      setphoto([]);
      setBook([]);
      clearAll();
    }
  }, [isaddcarModalVisible]);

  const goback = () => {
    setisaddcarModalVisible(false);
  };
  const addCar = () => {
    Keyboard.dismiss();
    closeAllDropDown();

    if (type.length <= 0) {
      setinValidType(true);
      return;
    }

    if (selectedMake.length <= 0) {
      setInvalidMake(true);
      return;
    }
    if (car.length <= 0) {
      setinValidCar(true);
      return;
    }

    if (color == "") {
      setinValidColor(true);
      return;
    }

    if (regNo.trim().length == 0) {
      setisEmptyRegNo(true);
      return;
    }
    console.log("reg : ", regNo);

    if (engine.trim().length == 0) {
      setinValidEngine(true);
      return;
    }
    if (seating.trim().length == 0) {
      setinValidSeating(true);
      return;
    }
    // let f = [];
    // featureList.map(item => {
    //   if (item.added) {
    //     f.push(item.id);
    //   }
    // });
    // if (f.length <= 0) {
    //   setEmptyFeature(true);
    //   return;
    // }

    if (photo.length <= 0 || photo.length < minCarPhotos) {
      setIsEmptyphoto(true);
      return;
    }

    if (book.length <= 0 || book.length < minBookPhotos) {
      setIsEmptyBook(true);
      return;
    }
    let modifiedCarName = `${selectedMake.name} ${car.name} - ${model.title} ( ${regNo} )`;

    UploadeImages(
      type,
      selectedMake,
      car,
      color,
      model,
      regNo,
      engine,
      seating,
      transmission,
      photo,
      book,
      modifiedCarName,
      goback
    );
  };

  const clearAll = () => {
    let c = false;
    setinValidCar(c);
    setinValidEngine(c);
    setinValidRegNo(c);
    setinValidSeating(c);
    setInvalidMake(c);
    setEmptyFeature(c);
    setIsEmptyBook(c);
    setIsEmptyphoto(c);
    setisEmptyRegNo(c);
    setinValidType(c);
    setinValidColor(c);
  };

  const renderFullImage = () => {
    return (
      <MModal
        transparent
        visible={pvm}
        onRequestClose={() => {
          setpvm(false);
          setpv("");
        }}
      >
        <View style={{ flex: 1, backgroundColor: "black" }}>
          <Image
            onLoadStart={() => setimgLoadd(false)}
            onLoad={() => {
              setimgLoadd(true);
            }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
            resizeMode="contain"
            source={{ uri: pv }}
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
      </MModal>
    );
  };

  const MultipleImage = async (chk) => {
    Keyboard.dismiss();
    closeAllDropDown();
    closeFullImageModal();

    let d = chk == "car" ? photo.length : book.length;
    let max = chk == "car" ? maxCarPhotos : maxBookPhotos;
    let msg = "You can upload only " + max + " images";
    if (d == max) {
      Alert.alert("", msg);
      return;
    }

    let maxPhotos = chk == "car" ? 5 - photo.length : 2 - book.length;

    try {
      let options = {
        mediaType: "image",
        isPreview: false,
        maxSelectedAssets: maxPhotos,
      };
      const res = await MultipleImagePicker.openPicker(options);

      if (res) {
        let data = chk == "car" ? photo : book;
        if (data.length > 0) {
          let ar = data;
          res.map((e, i, a) => {
            let uri = e.path;
            if (Platform.OS == "android" && apiLevel < 29) {
              uri = "file://" + uri;
            }
            let isAlreadySelectimage = data.find((x) => x.uri == uri)
              ? true
              : false;

            if (!isAlreadySelectimage) {
              const obj = { name: e.fileName, uri: uri, type: e.mime };
              ar.push(obj);
            }
          });

          chk == "car" ? setphoto(ar) : setBook(ar);
          setC(!c);
          chk == "car" ? setIsEmptyphoto(false) : setIsEmptyBook(false);
        } else {
          let ar = [];
          res.map((e, i, a) => {
            let uri = e.path;

            if (Platform.OS == "android" && apiLevel < 29) {
              uri = "file://" + uri;
            }
            const obj = { name: e.fileName, uri: uri, type: e.mime };
            ar.push(obj);
          });
          chk == "car" ? setphoto(ar) : setBook(ar);
          chk == "car" ? setIsEmptyphoto(false) : setIsEmptyBook(false);
        }
      }
    } catch (error) {
      console.log("multi photo picker error : ", error);
    }
  };

  const closeAllDropDown = () => {
    setisDropDownMake(false);
    setisDropDownName(false);
    setisDropDownModal(false);
    setisDropDownType(false);
  };

  const closeFullImageModal = () => {
    setpvm(false);
    setpv("");
  };

  const onLogout = () => {
    userStore.userStore.Logout();
  };

  const onClickButton = (t) => {
    if (t == "add car") {
      setisaddcarModalVisible(true);
    }
  };

  const removePhoto = (i, chk) => {
    if (i > -1) {
      if (chk == "car") {
        photo.splice(i, 1);
      } else {
        book.splice(i, 1);
      }
      setC(!c);
    }
  };

  const renderShowPhotos = (data, c) => {
    const p = data.map((e, i, a) => {
      return (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 75,
            height: "100%",
            marginHorizontal: 5,
            paddingVertical: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              closeAllDropDown();
              setpv(e.uri);
              setpvm(true);
            }}
            activeOpacity={0.7}
            style={styles.photoBoxImage}
          >
            <Image
              source={{
                uri: e.uri,
              }}
              style={styles.image}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              removePhoto(i, c), closeAllDropDown();
            }}
            style={{ position: "absolute", top: 3, right: 3 }}
            activeOpacity={0.7}
          >
            <Entypo name="circle-with-cross" color={"#38464F"} size={18} />
          </TouchableOpacity>
        </View>
      );
    });
    return p;
  };

  const getCarByBrand = (id) => {
    let carListData = [];
    if (allcarNames.length > 0) {
      allcarNames.map((e) => {
        if (e.company._id == id) {
          carListData.push(e);
        }
      });
    }

    if (carListData.length > 0) {
      var d = [];
      carListData.map((item, i, a) => {
        d.push(item);
        if (i == a.length - 1) {
          setCarsList(d);
        }
      });
    } else {
      setCarsList([]);
    }
  };

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

  const renderAddCarModal = () => {
    return (
      <MModal
        isVisible={isaddcarModalVisible}
        onRequestClose={() => {
          if (!loader) setisaddcarModalVisible(false);
        }}
      >
        <SafeAreaView
          style={{ flex: 1, backgroundColor: theme.colors.containerBackground }}
        >
          {pvm && renderFullImage()}
          <Message
            load={loading}
            fast={false}
            title={
              !images_uploaded
                ? "Uploading images (" +
                  imgUploadCount +
                  "/" +
                  (photo.length + book.length) +
                  ")"
                : "Registering Vehicle"
            }
          />

          <theme.StackHeader
            nav={props.navigation}
            title={"Car Details"}
            screen={"addcar"}
            goback={() => {
              if (!loader) {
                setisaddcarModalVisible(false);
              }
            }}
          />
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.Body}>
              <Text style={[styles.BodyTitle, { marginTop: 20 }]}>Type*</Text>
              <View style={{ width: "100%" }}>
                <TouchableOpacity
                  onPress={() => {
                    closeAllDropDown();
                    setisDropDownType(!isDropDownType);
                    setinValidType(false);
                  }}
                  activeOpacity={0.4}
                  style={styles.InputLoc}
                >
                  <View style={{ width: "90%" }}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={[
                        styles.ChargesTextloc,
                        {
                          color: type.type
                            ? theme.colors.textColor
                            : theme.colors.placeholder,
                        },
                      ]}
                    >
                      {type.type ? type.type : "Select Car Type"}
                    </Text>
                  </View>
                  <AntDesign
                    name="down"
                    color={theme.colors.placeholder}
                    size={12}
                  />
                </TouchableOpacity>
                {isDropDownType && renderDropDown("type")}
              </View>
              {inValidType ? (
                <Text style={styles.ErrorMessage}>Select car type.</Text>
              ) : null}

              <Text style={[styles.BodyTitle, { marginTop: 20 }]}>Make*</Text>
              <View style={{ width: "100%" }}>
                <TouchableOpacity
                  onPress={() => {
                    closeAllDropDown();
                    setisDropDownMake(!isDropDownMake);
                    setInvalidMake(false);
                  }}
                  activeOpacity={0.4}
                  style={styles.InputLoc}
                >
                  <View style={{ width: "90%" }}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={[
                        styles.ChargesTextloc,
                        {
                          color: selectedMake.name
                            ? theme.colors.textColor
                            : theme.colors.placeholder,
                        },
                      ]}
                    >
                      {selectedMake.name
                        ? selectedMake.name
                        : "Select Car Make"}
                    </Text>
                  </View>
                  <AntDesign
                    name="down"
                    color={theme.colors.placeholder}
                    size={12}
                  />
                </TouchableOpacity>
                {isDropDownMake && renderDropDown("make")}
              </View>
              {inValidMake ? (
                <Text style={styles.ErrorMessage}>Select car brand.</Text>
              ) : null}
              {selectedMake.length != 0 && (
                <>
                  <Text style={[styles.BodyTitle, { marginTop: 20 }]}>
                    Car Name*
                  </Text>
                  <View style={{ width: "100%" }}>
                    <TouchableOpacity
                      onPress={() => {
                        closeAllDropDown();
                        setisDropDownName(!isDropDownName);
                        setinValidCar(false);
                      }}
                      activeOpacity={0.4}
                      style={styles.InputLoc}
                    >
                      <View style={{ width: "90%" }}>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={[
                            styles.ChargesTextloc,
                            {
                              color: car.name
                                ? theme.colors.textColor
                                : theme.colors.placeholder,
                            },
                          ]}
                        >
                          {car.name ? car.name : "Select Car Name"}
                        </Text>
                      </View>
                      <AntDesign
                        name="down"
                        color={theme.colors.placeholder}
                        size={12}
                      />
                    </TouchableOpacity>
                    {isDropDownName && renderDropDown("name")}
                  </View>
                </>
              )}
              {inValidCar ? (
                <Text style={styles.ErrorMessage}>Select car name.</Text>
              ) : null}

              <View style={{ flexDirection: "row" }}>
                <Text style={styles.BodyTitleLeft}>Color*</Text>
              </View>
              <View style={styles.DropDownRightt}>
                <TextInput
                  onFocus={() => {
                    closeAllDropDown();
                  }}
                  style={{
                    marginLeft: 5,
                    color: theme.colors.textColor,
                    padding: 5,
                  }}
                  maxLength={10}
                  placeholder="Car color"
                  autoCapitalize="characters"
                  placeholderTextColor="#949494"
                  onChangeText={(val) => {
                    setcolor(val);
                    setinValidColor(false);
                  }}
                />
              </View>
              {inValidColor ? (
                <Text style={[styles.ErrorMessage, { marginVertical: 2 }]}>
                  Car color is required.
                </Text>
              ) : null}

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.BodyTitleLeft}>Model*</Text>
                <Text style={styles.BodyTitleRight}>Registration No*</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",

                  width: "100%",
                  marginTop: 5,
                }}
              >
                <View style={{ width: "48%" }}>
                  <TouchableOpacity
                    onPress={() => {
                      closeAllDropDown();
                      setisDropDownModal(!isDropDownModal);
                    }}
                    activeOpacity={0.4}
                    style={styles.DropDownModal}
                  >
                    <View style={{ width: "90%" }}>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={[
                          styles.ChargesTextloc,
                          {
                            color: model.title ? "black" : theme.colors.primary,
                          },
                        ]}
                      >
                        {model.title ? model.title : "Select"}
                      </Text>
                    </View>
                    <AntDesign
                      name="down"
                      color={theme.colors.placeholder}
                      size={12}
                    />
                  </TouchableOpacity>
                  {isDropDownModal && renderDropDown("modal")}
                </View>

                <View style={styles.DropDownRight}>
                  <TextInput
                    onFocus={() => {
                      closeAllDropDown();
                    }}
                    style={{
                      marginLeft: 5,
                      color: theme.colors.textColor,
                      padding: 5,
                    }}
                    maxLength={10}
                    placeholder=""
                    autoCapitalize="characters"
                    placeholderTextColor="#949494"
                    onChangeText={(val) => {
                      setRegNo(val);
                      setisEmptyRegNo(false);
                      setinValidRegNo(false);
                    }}
                  />
                </View>
                {isEmptyRegNo || inValidRegNo ? (
                  <Text
                    style={[
                      styles.ErrorMessage,
                      { top: 47, left: "52%", position: "absolute" },
                    ]}
                  >
                    {isEmptyRegNo
                      ? "Registration No is required."
                      : inValidRegNo
                      ? "Registration No is invalid."
                      : ""}
                  </Text>
                ) : null}
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.BodyTitleLeft}>Engine Capacity*</Text>
                <Text style={styles.BodyTitleRight}>Seating Capacity*</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  marginTop: 5,
                }}
              >
                <View style={styles.DropDown}>
                  <TextInput
                    onFocus={() => {
                      closeAllDropDown();
                    }}
                    style={{ marginLeft: 5, color: "#000", padding: 5 }}
                    maxLength={5}
                    placeholder=""
                    value={engine}
                    keyboardType="numeric"
                    placeholderTextColor="#949494"
                    onChangeText={(val) => {
                      setEngine(val.replace(/[^0-9]/, ""));
                      setinValidEngine(false);
                    }}
                  />
                </View>
                {inValidEngine ? (
                  <Text
                    style={[
                      styles.ErrorMessage,
                      { top: 45, position: "absolute" },
                    ]}
                  >
                    Engine Capacity is required.
                  </Text>
                ) : null}
                <View style={styles.DropDownRight}>
                  <TextInput
                    onFocus={() => {
                      closeAllDropDown();
                    }}
                    style={{ marginLeft: 5, color: "#000", padding: 5 }}
                    maxLength={5}
                    value={seating}
                    placeholder=""
                    keyboardType="numeric"
                    placeholderTextColor="#949494"
                    onChangeText={(val) => {
                      setSeating(val.replace(/[^0-9]/, ""));
                      setinValidSeating(false);
                    }}
                  />
                </View>
                {inValidSeating ? (
                  <Text
                    style={[
                      styles.ErrorMessage,
                      { top: 45, left: "52%", position: "absolute" },
                    ]}
                  >
                    Seating Capacity is required.
                  </Text>
                ) : null}
              </View>
              <Text style={[styles.BodyTitle, { marginTop: 15 }]}>
                Transmission
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  marginTop: 5,
                }}
              >
                <TouchableOpacity
                  style={
                    transmission == "auto"
                      ? [styles.DropDown, { backgroundColor: "#FDB349" }]
                      : styles.DropDown
                  }
                  onPress={() => {
                    setTransmission("auto");
                    Keyboard.dismiss();
                    closeAllDropDown();
                  }}
                >
                  <Text
                    style={
                      transmission == "auto"
                        ? { marginLeft: 5, alignSelf: "center", color: "#fff" }
                        : { marginLeft: 5, alignSelf: "center", color: "#000" }
                    }
                  >
                    Automatic
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    transmission == "manual"
                      ? [styles.DropDownRight, { backgroundColor: "#FDB349" }]
                      : styles.DropDownRight
                  }
                  onPress={() => {
                    setTransmission("manual");
                    Keyboard.dismiss();
                    closeAllDropDown();
                  }}
                >
                  <Text
                    style={
                      transmission == "manual"
                        ? { marginLeft: 5, alignSelf: "center", color: "#fff" }
                        : { marginLeft: 5, alignSelf: "center", color: "#000" }
                    }
                  >
                    Manual
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  marginTop: 20,
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.BodyTitle}>Car Photos*</Text>

                <Text style={styles.CountText}>
                  {" "}
                  ({photo.length}/{maxCarPhotos})
                </Text>
              </View>

              <View
                style={
                  photo.length == 0
                    ? styles.photoEmptyContainer
                    : styles.photoContainer
                }
              >
                {photo.length == 0 && (
                  <TouchableOpacity
                    onPress={() => MultipleImage("car")}
                    activeOpacity={0.6}
                    style={{
                      width: "100%",
                      height: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "row",
                    }}
                  >
                    <AntDesign
                      name="upload"
                      size={18}
                      color={theme.colors.placeholder}
                    />
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2.2),
                        color: theme.colors.placeholder,
                        marginLeft: 15,
                      }}
                    >
                      Upload Photos
                    </Text>
                  </TouchableOpacity>
                )}

                {photo.length > 0 && (
                  <View style={{ width: "20%", paddingVertical: 10 }}>
                    <TouchableOpacity
                      onPress={() => MultipleImage("car")}
                      activeOpacity={0.6}
                      style={[
                        styles.photoBox,
                        { backgroundColor: "white", elevation: 3 },
                      ]}
                    >
                      <View style={styles.LinearGradient}>
                        <MaterialIcons
                          name="add-photo-alternate"
                          color={"#054E96"}
                          size={32}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                )}

                {photo.length > 0 && (
                  <View
                    style={{
                      width: "3%",
                      alignItems: "center",
                      justifyContent: "center",
                      marginVertical: 10,
                      marginHorizontal: 5,
                    }}
                  >
                    <View style={styles.photoSeparatorLine} />
                  </View>
                )}

                {photo.length > 0 && (
                  <ScrollView
                    style={{
                      width: "76%",
                      height: "100%",
                    }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                  >
                    {renderShowPhotos(photo, "car")}
                  </ScrollView>
                )}
              </View>

              {(photo.length > 0 && photo.length < minCarPhotos) ||
              IsEmptyphoto ? (
                <Text style={styles.ErrorMessage}>
                  Minimum {minCarPhotos} Images is required.
                </Text>
              ) : null}

              <View
                style={{
                  marginTop: 20,
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.BodyTitle}>Registration Book Photos*</Text>

                <Text style={styles.CountText}>
                  {" "}
                  ({book.length}/{maxBookPhotos})
                </Text>
              </View>

              <View
                style={
                  book.length <= 0
                    ? styles.photoEmptyContainer
                    : styles.photoContainer
                }
              >
                {book.length == 0 && (
                  <TouchableOpacity
                    onPress={() => MultipleImage("book")}
                    activeOpacity={0.6}
                    style={{
                      width: "100%",
                      height: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "row",
                    }}
                  >
                    <AntDesign
                      name="upload"
                      size={18}
                      color={theme.colors.placeholder}
                    />
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2.2),
                        color: theme.colors.placeholder,
                        marginLeft: 15,
                      }}
                    >
                      Upload Images
                    </Text>
                  </TouchableOpacity>
                )}

                {book.length > 0 && (
                  <View style={{ width: "20%", paddingVertical: 10 }}>
                    <TouchableOpacity
                      onPress={() => MultipleImage("book")}
                      activeOpacity={0.7}
                      style={[
                        styles.photoBox,
                        { backgroundColor: "white", elevation: 3 },
                      ]}
                    >
                      <View style={styles.LinearGradient}>
                        <MaterialIcons
                          name="add-photo-alternate"
                          color={"#054E96"}
                          size={32}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                )}

                {book.length > 0 && (
                  <View
                    style={{
                      width: "2%",
                      alignItems: "center",
                      justifyContent: "center",
                      marginVertical: 10,
                      marginHorizontal: 3,
                    }}
                  >
                    <View style={styles.photoSeparatorLine} />
                  </View>
                )}

                {book.length > 0 && (
                  <ScrollView
                    style={{
                      width: "76%",
                      height: "100%",
                    }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                  >
                    {renderShowPhotos(book, "book")}
                  </ScrollView>
                )}
              </View>

              {(book.length > 0 && book.length < minBookPhotos) ||
              IsEmptyBook ? (
                <Text style={styles.ErrorMessage}>
                  Minimum {minBookPhotos} Image is required.
                </Text>
              ) : null}

              {renderAddCarModalButton()}
            </View>
          </ScrollView>
        </SafeAreaView>
      </MModal>
    );
  };

  const renderAddCarModalButton = () => {
    let text = "continue";

    return (
      <TouchableOpacity
        onPress={() => {
          addCar();
        }}
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

  const renderHeader = () => {
    return (
      <>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: theme.colors.containerBackground,
            elevation: 5,
            padding: 10,
          }}
        >
          <Text
            style={{
              fontSize: 25,
              fontFamily: "Inter-Bold",
              color: "black",
            }}
          >
            Car
          </Text>

          <TouchableOpacity onPress={() => onLogout()}>
            <Text
              style={{
                fontSize: 14,
                color: "red",
                textDecorationLine: "underline",
              }}
            >
              Sign out
            </Text>
          </TouchableOpacity>
        </View>

        {!isInternet && (
          <View
            style={{
              alignSelf: "center",
              padding: 10,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontFamily: theme.fonts.fontNormal,
                color: "red",
              }}
            >
              Please connect internet
            </Text>
          </View>
        )}
      </>
    );
  };

  const renderDropDown = (c) => {
    let data = [];

    if (c == "make") {
      data = brandList;
    } else if (c == "name") {
      data = carsList;
    } else if (c == "modal") {
      data = yearList;
    } else if (c == "type") {
      data = typeList;
    }

    const onclickSelect = (d) => {
      if (c == "make") {
        setCarsList([]);
        setCar([]);
        getCarByBrand(d._id);
        setSelectedMake(d);
      } else if (c == "name") {
        setCar(d);
      } else if (c == "modal") {
        setModel(d);
      } else if (c == "type") {
        settype(d);
      }
    };

    // let abs = Platform.OS == 'ios' ? false : true;
    console.log("drop down data : ", data);

    return (
      <DropDown
        data={data}
        onSelectItem={(d) => {
          onclickSelect(d);
        }}
        setVisible={(d) => {
          closeAllDropDown();
        }}
        search={c == "modal" ? false : true}
        c={c}
        absolute={false}
      />
    );
  };

  const renderShowCar = () => {
    return (
      <View style={{ marginTop: 20 }}>
        <View
          style={{
            backgroundColor: theme.colors.containerBackground,
            padding: 7,
            borderRadius: 4,
            flexDirection: "row",
            alignItems: "center",
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
              {cars.car_name.name || "-----"}
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
                  color: cars.is_active ? "green" : "orange",
                  textTransform: "capitalize",
                  lineHeight: 20,
                }}
              >
                {cars.is_active ? "Verified" : "not Verified"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <Layout style={styles.container}>
      {isaddcarModalVisible && renderAddCarModal()}
      {renderHeader()}
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.OS == "ios" ? 10 : 0}
        behavior={Platform.OS == "ios" ? "padding" : ""}
        style={{ flex: 1, paddingHorizontal: 10 }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* <utils.Loader loader={loader} /> */}

          {!cars && (
            <View
              style={{
                marginTop: "60%",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../assets/images/car.png")}
                style={{ height: 100, width: 100, resizeMode: "contain" }}
              />

              <Text style={styles.subTitle}>No car is registered yet</Text>
            </View>
          )}

          {cars && (
            <>
              {renderOptin()}
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Inter-Bold",
                    color: "black",
                    marginTop: 20,
                  }}
                >
                  Dedicated Car
                </Text>
                {renderShowCar()}
              </View>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      {renderBottonButton()}
    </Layout>
  );
}
