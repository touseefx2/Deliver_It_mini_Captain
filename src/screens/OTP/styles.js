import theme from "../../theme";
import { StyleSheet } from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.containerBackground,
  },
  logo: {
    height: responsiveHeight(12),
    width: responsiveWidth(60),
    resizeMode: "contain",
  },
  title: {
    color: theme.colors.textColor,
    fontSize: responsiveFontSize(3),
    marginTop: 10,
    fontFamily: "Inter",
    fontWeight: "500",
  },
  subtitle: {
    color: theme.colors.textSubtitleColor,
    fontSize: responsiveFontSize(1.9),
    marginTop: 10,
    fontFamily: "Inter-Regular",
    width: "100%",
    alignSelf: "center",
    lineHeight: 20,
  },
  BottomButton: {
    backgroundColor: theme.colors.disableColor,
    borderRadius: 10,
    height: responsiveHeight(6),
    justifyContent: "center",
    width: responsiveWidth(90),
    alignSelf: "center",
    fontFamily: "Inter-Regular",
    marginVertical: responsiveHeight(3),
  },
  ButtonLeft: {
    backgroundColor: "#fff",
    width: 160,
    borderRadius: 4,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  ButtonRight: {
    backgroundColor: "#fff",
    width: 160,
    borderRadius: 4,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  buttonText: {
    color: theme.colors.primary,
    fontSize: 16,
    lineHeight: 19.36,
    fontFamily: "Inter-Bold",
  },
  status: {
    backgroundColor: theme.colors.background,
  },
  Header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",

    padding: 15,
  },
  ArrowBack: {
    height: 24,
    width: 24,
  },
  BackButton: {
    height: 30,
    width: 30,
  },
  ConfirmButton: {
    backgroundColor: "#fff",
    borderRadius: 4,
    height: 48,
    justifyContent: "center",
    top: 80,
    width: "85%",
    alignSelf: "center",
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
    marginVertical: responsiveHeight(3),
    alignItems: "center",
  },
  LinearGradient: {
    height: "100%",
    width: "100%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    alignSelf: "center",
    justifyContent: "center",
    marginVertical: 30,
  },
  Timer: {
    alignSelf: "center",
    marginVertical: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  TimerTextr: {
    fontSize: responsiveFontSize(1.8),
    color: theme.colors.titletextColor,
  },
  TimerText: {
    fontSize: responsiveFontSize(1.8),
    color: theme.colors.titletextColor,
    fontFamily: "Inter-Bold",
    fontWeight: "600",
  },
  TimerTextdisable: {
    fontSize: responsiveFontSize(1.8),
    color: theme.colors.textSubtitleColor,
    fontFamily: "Inter-Regular",
    fontWeight: "500",
  },
  root: {
    flex: 1,
    padding: 10,
  },
  codeContainer: {
    width: "95%",
    alignSelf: "center",
    marginTop: responsiveHeight(5),
  },
  codeFieldRoot: {},
  cell: {
    width: responsiveWidth(12),
    height: responsiveHeight(7),
    lineHeight: responsiveHeight(8),
    fontSize: responsiveFontSize(5),
    borderBottomWidth: 1,
    borderBottomColor: "black",
    textAlign: "center",
    color: "black",
    fontFamily: "Inter-Regular",
  },
  focusCell: {
    borderColor: "#fff",
  },
});

export default styles;