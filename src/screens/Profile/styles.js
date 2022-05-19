import theme from "../../theme";
import { StyleSheet, Dimensions, Platform, StatusBar } from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

const windowHeight = Dimensions.get("window").height;
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: theme.colors.containerBackground,
  },
  Status: {
    backgroundColor: "#E5E5E5",
  },
  Body: {
    flex: 1,
    width: "87%",
    alignSelf: "center",
    paddingVertical: 20,
  },
  Header: {
    height: responsiveHeight(8),
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E5E5E5",
    elevation: 5,
  },
  HeaderText: {
    fontSize: responsiveFontSize(2.5),
    color: theme.colors.primary,
  },
  BackButton: {
    height: 30,
    width: "15%",
    left: 15,
  },
  Profile: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  ProfileImageContainer: {
    width: 100,
    height: 100,
    borderColor: theme.colors.placeholder,
    borderRadius: 50,
    borderWidth: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  ProfileImage: {
    width: 99,
    height: 99,
    borderRadius: 49.5,
  },
  ImageUploadConatiner: {
    height: 30,
    width: 30,
    backgroundColor: "#DBDBDB",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "white",
    position: "absolute",
    bottom: -2,
    right: -2,
    opacity: 0.9,
    elevation: 5,
  },
  fullImageModalCross: {
    backgroundColor: "black",
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: Platform.OS == "ios" ? APPBAR_HEIGHT + 12 : 12,
    left: 12,
  },
  UploadButton: {
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    left: 20,
    padding: 5,
  },
  UploadButtonText: {
    color: "#fff",
    alignSelf: "center",
    fontFamily: "Inter-Regular",
    fontSize: responsiveFontSize(2),
  },
  Form: {
    marginTop: 0,
    width: "100%",
    alignSelf: "center",
  },
  FormTitle: {
    flexDirection: "row",
    marginTop: 15,
    width: "100%",
  },
  FormTitle1: {
    flexDirection: "row",
    marginTop: 7,
    width: "100%",
    justifyContent: "space-between",
  },
  FormTitleGender: {
    flexDirection: "row",
    width: "100%",
    alignSelf: "center",
    top: 35,
  },
  FormTextLeft: {
    fontSize: responsiveFontSize(2),
    lineHeight: 19.36,
    width: "58%",
    fontFamily: "Inter",
    fontWeight: "600",
  },
  FormTextEmail: {
    fontSize: responsiveFontSize(2),
    lineHeight: 19.36,
    fontFamily: "Inter",
    fontWeight: "600",
  },
  FormTextRight: {
    fontSize: responsiveFontSize(2),
    lineHeight: 19.36,
    width: "46%",
    left: -15,
    fontFamily: "Inter",
    fontWeight: "600",
  },
  Input: {
    width: "100%",
    height: responsiveHeight(6),
    borderRadius: 6,
    fontFamily: "Inter-Regular",
    backgroundColor: "rgba(196, 196, 196, 0.2)",
    paddingHorizontal: 5,
  },
  InputT: {
    width: "100%",
    paddingVertical: responsiveHeight(1.7),
    borderRadius: 6,
    fontFamily: "Inter-Regular",
    backgroundColor: "rgba(196, 196, 196, 0.2)",
    paddingHorizontal: 5,
  },
  EmailInput: {
    width: "100%",
    height: responsiveHeight(6),
    borderRadius: 6,
    alignItems: "center",
    flexDirection: "row",
    fontFamily: "Inter-Regular",
    backgroundColor: "rgba(196, 196, 196, 0.2)",
    paddingHorizontal: 5,
  },
  EmailInputT: {
    width: "100%",
    paddingVertical: responsiveHeight(1.7),
    borderRadius: 6,
    alignItems: "center",
    flexDirection: "row",
    fontFamily: "Inter-Regular",
    backgroundColor: "rgba(196, 196, 196, 0.2)",
    paddingHorizontal: 5,
  },
  Box: {
    width: "100%",
    height: responsiveHeight(6),
    borderRadius: 6,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(196, 196, 196, 0.2)",
    paddingHorizontal: 10,
  },
  BoxT: {
    width: "100%",
    paddingVertical: responsiveHeight(1.7),
    borderRadius: 6,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(196, 196, 196, 0.2)",
    paddingHorizontal: 10,
  },
  InputD: {
    width: "100%",
    height: responsiveHeight(6),
    borderRadius: 6,
    fontFamily: "Inter-Regular",
    backgroundColor: "rgba(196, 196, 196, 1)",
    paddingHorizontal: 5,
  },
  InputTD: {
    width: "100%",
    paddingVertical: responsiveHeight(1.7),
    borderRadius: 6,
    fontFamily: "Inter-Regular",
    backgroundColor: "rgba(196, 196, 196, 0.2)",
    paddingHorizontal: 5,
  },
  EmailInputD: {
    width: "100%",
    height: responsiveHeight(6),
    borderRadius: 6,
    alignItems: "center",
    flexDirection: "row",
    fontFamily: "Inter-Regular",
    backgroundColor: "rgba(196, 196, 196, 1)",
    paddingHorizontal: 5,
  },
  EmailInputTD: {
    width: "100%",
    paddingVertical: responsiveHeight(1.7),
    borderRadius: 6,
    alignItems: "center",
    flexDirection: "row",
    fontFamily: "Inter-Regular",
    backgroundColor: "rgba(196, 196, 196, 0.2)",
    paddingHorizontal: 5,
  },
  BoxD: {
    width: "100%",
    height: responsiveHeight(6),
    borderRadius: 6,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(196, 196, 196, 1)",
    paddingHorizontal: 10,
  },
  BoxTD: {
    width: "100%",
    paddingVertical: responsiveHeight(1.7),
    borderRadius: 6,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(196, 196, 196, 0.2)",
    paddingHorizontal: 10,
  },
  Text: {
    color: "#000",
    fontSize: responsiveFontSize(1.9),
  },
  DropDown: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    width: "39.5%",
    height: responsiveHeight(6),
    borderRadius: 4,
    left: 10,
    // alignItems: 'center',
    paddingLeft: responsiveWidth(3),
    justifyContent: "center",
    overflow: "hidden",
  },
  DropDownArrow: {
    backgroundColor: "#E5E5E5",
    height: responsiveHeight(5),
    width: responsiveWidth(5),
    position: "absolute",
    right: 2,
    justifyContent: "center",
  },
  DropDownLogo: {
    height: responsiveHeight(2),
    width: responsiveWidth(2),
    alignSelf: "center",
  },
  CountryLogo: {
    height: 25,
    width: 25,
  },
  MobileInput: {
    left: 20,
    width: "100%",
  },
  TextInput: {
    height: "100%",
    width: "100%",
    color: theme.colors.textColor,
    fontFamily: "Inter-Regular",
    fontSize: responsiveFontSize(1.8),
  },
  GenderButton: {
    height: responsiveHeight(6),
    width: "48%",
    borderRadius: 4,
    borderColor: theme.colors.primary,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  GenderButtonRight: {
    height: responsiveHeight(6),
    width: "48%",
    borderRadius: 4,
    borderColor: theme.colors.primary,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "4%",
  },
  CnicText: {
    left: 20,
    fontSize: responsiveFontSize(2),
    width: "75%",
    fontFamily: "Inter-Regular",
  },
  LinearGradient: {
    justifyContent: "center",
    borderRadius: 6,
    alignItems: "center",
    height: "100%",
  },
  ContinueButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 6,
    height: responsiveHeight(6),
    justifyContent: "center",
    width: "100%",
    alignSelf: "center",
    marginBottom: 20,
  },
  ContinueButtonText: {
    alignSelf: "center",
    color: "#fff",
    lineHeight: 20,
    fontSize: responsiveFontSize(2),
    fontFamily: "Inter-Bold",
  },
  UploadView: {
    height: 200,
    width: "95%",
    alignSelf: "center",
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 30,
  },
  UploadCNICButton: {
    backgroundColor: "#fff",
    borderRadius: 4,
    height: 48,
    justifyContent: "center",
    marginBottom: 30,
    width: "85%",
    alignSelf: "center",
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
  },
  UploadCNICButtonGreen: {
    backgroundColor: "#2AD100",
    borderRadius: 4,
    height: 48,
    justifyContent: "center",
    bottom: 20,
    width: "85%",
    alignSelf: "center",
    position: "absolute",
  },
  Picker: {
    width: 200,
    left: -10,
  },
  ErrorMessage: {
    color: "red",
    marginTop: 1,
    fontSize: responsiveFontSize(1.2),
    fontFamily: "Inter-Regular",
  },
  ErrorMessageCity: {
    color: "red",
    position: "absolute",
    top: 45,
    fontSize: responsiveFontSize(1.2),
    left: 210,
    fontFamily: "Inter-Regular",
  },
  CNICModal: {
    backgroundColor: "#fff",
    width: "95%",
    alignSelf: "center",
  },
  CNICModalHeader: {
    height: 64,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  CNICModalHeaderText: {
    color: "#fff",
    fontSize: 16,
    alignSelf: "center",
    fontFamily: "Inter-Regular",
  },
  ModalCLoseButton: {
    position: "absolute",
    right: 10,
    padding: responsiveWidth(3),
  },
  ModalCNICImage: {
    height: 210,
    justifyContent: "center",
    marginTop: 30,
    width: "100%",
  },
  ConfirmModal: {
    backgroundColor: theme.colors.primary,
    height: 151,
    width: "80%",
    alignSelf: "center",
  },
  ModalHeader: {
    color: "white",
    left: 10,
    top: 20,
  },
  ModalText: {
    color: "white",
    left: 10,
    top: 40,
    fontSize: 16,
    fontFamily: "Inter-Regular",
  },
  ModalBody: {
    flexDirection: "row",
    top: 80,
    alignSelf: "flex-end",
    right: 20,
  },
  ModalEditButton: {
    color: "white",
    fontSize: 16,
    right: 20,
    fontFamily: "Inter-Regular",
  },
  ModalConfirmButton: {
    color: "white",
    fontSize: 16,
    fontFamily: "Inter-Regular",
  },
  Checkbox: {
    backgroundColor: "transparent",
    marginLeft: -10,
    marginTop: -4,
    borderColor: "transparent",
  },
  Terms: {
    fontFamily: "Inter-Regular",
    color: theme.colors.primary,
    fontSize: responsiveFontSize(1.5),
    textDecorationLine: "underline",
  },
  BottomButtonwebview: {
    width: responsiveWidth(30),
    height: responsiveHeight(4),
    position: "absolute",
    bottom: responsiveHeight(2),
    right: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    alignSelf: "center",
    elevation: 5,
  },
  loaderwebview: {
    alignSelf: "center",
    marginTop: "90%",
    position: "absolute",
  },
  LinearGradientwebview: {
    height: "100%",
    width: "100%",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTextBottomwebview: {
    color: "#fff",
    fontSize: responsiveFontSize(2),
    lineHeight: 19.36,
    fontFamily: "Inter-Bold",
  },

  modalselectorCustomListText: {
    color: theme.colors.primary_light,
    textAlign: "center",
    fontFamily: "Inter-Bold",
    textTransform: "capitalize",
  },
  modalselectoroverlayStyle: {
    flex: 1,
    padding: "10%",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  modalselectoroptionContainerStyle: {
    backgroundColor: "white",
  },
  modalselectorselectStyle: {
    width: "100%",
    height: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  modalselectorsectionTextStyle: {
    fontSize: 18,
    fontFamily: "Inter-Bold",
  },
  modalselectorinitValueTextStyle: {
    color: "black",
    fontSize: 15,
    textTransform: "capitalize",
  },
  modalselectorcancelStyle: {
    backgroundColor: theme.colors.primary_light,
  },
  modalselectorcancelTextStyle: {
    color: "white",
    fontFamily: "Inter-Bold",
    fontSize: 18,
  },

  cnicForm: {
    marginTop: 15,
    width: "100%",
    alignSelf: "center",
  },

  cnicImgConatiner: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  cnicImageBoxContainer: {
    width: "100%",
    height: responsiveHeight(18),
  },
  cnicImageTextBox: {
    width: "100%",
    height: "20%",
  },
  cnicImageBox: {
    width: "100%",
    height: "79%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "1%",
    backgroundColor: "rgba(196, 196, 196, 0.2)",
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: theme.colors.placeholder,
  },
  cnicImageBoxx: {
    borderWidth: 0.5,
    borderColor: theme.colors.placeholder,
    width: "100%",
    height: "79%",
    marginTop: "1%",
    backgroundColor: "rgba(196, 196, 196, 0.2)",
    borderRadius: 6,
  },
  cnicImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 6,
  },
  cnicImageBoxText: {
    fontSize: responsiveFontSize(2),
    lineHeight: 19.36,
    width: "100%",
    fontFamily: "Inter",
    fontWeight: "600",
    color: "black",
  },
  cnicCross: {
    backgroundColor: "#38464F",
    width: 18,
    height: 18,
    borderRadius: 9,
    position: "absolute",
    right: -5,
    top: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  cnicErrorMessage: {
    color: "red",
    marginTop: 1,
    fontSize: responsiveFontSize(1.2),
    fontFamily: "Inter-Regular",
  },
  ChargesTextloc: {
    color: "#000",
    fontFamily: "Inter-Regular",
    fontSize: responsiveFontSize(1.8),
    lineHeight: 20,
  },
  ButtonText: {
    alignSelf: "center",
    color: theme.colors.disableTextColor,
    fontSize: responsiveFontSize(2),
    fontFamily: "Inter-Bold",
  },
  Button: {
    backgroundColor: theme.colors.disableColor,
    borderRadius: 10,
    height: responsiveHeight(6),
    justifyContent: "center",
    width: responsiveWidth(90),
    alignSelf: "center",
    fontFamily: "Inter-Regular",
    marginTop: 10,
  },
  pfImageLoader: {
    height: "30%",
    width: "30%",
    resizeMode: "contain",
  },
});

export default styles;
