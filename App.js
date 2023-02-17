import React, { useEffect } from "react";
import Stack from "./src/navigation/index";
import { AppState } from "react-native";
import { screens } from "./src/screens/index";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import GlobalFont from "react-native-global-font";
import theme from "./src/themes/index";
import { inject, observer } from "mobx-react";
import DeviceInfo from "react-native-device-info";
import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import ConnectivityManager from "react-native-connectivity-status";
import NetInfo from "@react-native-community/netinfo";

export default inject("userStore", "generalStore", "carStore")(observer(App));

function App(props) {
  const RootStack = createStackNavigator();

  const { user, loader } = props.userStore;
  const { cars } = props.carStore;
  const { setLocation, setInternet, setdeviceApi, setappState, isInternet } =
    props.generalStore;

  useEffect(async () => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      setInternet(state.isConnected);
    });

    GlobalFont.applyGlobal(theme.fonts.fontNormal);
    const locationServicesAvailable =
      await ConnectivityManager.areLocationServicesEnabled();
    setLocation(locationServicesAvailable);
    const connectivityStatusSubscription =
      ConnectivityManager.addStatusListener(({ eventType, status }) => {
        switch (eventType) {
          case "location":
            setLocation(status);
            break;
        }
      });

    setappState("active");
    const appStatesubscription = AppState.addEventListener(
      "change",
      (appState) => {
        setappState(appState);
        if (appState === "active") {
          NetInfo.fetch().then((state) => {
            console.log("net state: ", state);
            setInternet(state.isConnected ? true : false);
          });
        }
      }
    );
    DeviceInfo.getApiLevel().then((apiLevel) => {
      setdeviceApi(apiLevel);
    });

    return () => {
      connectivityStatusSubscription.remove();
      unsubscribe();
      appStatesubscription();
    };
  }, []);

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          {loader && (
            <RootStack.Screen name="Splash" component={screens.Splash} />
          )}

          {!loader && !user && (
            <RootStack.Screen name="AuthStack" component={Stack.AuthStack} />
          )}

          {!loader && user && !cars && (
            <RootStack.Screen name="SelectCar" component={screens.SelectCar} />
          )}

          {!loader &&
            user &&
            (user.status != "approved" || cars.status != "approved") && (
              <RootStack.Screen
                name="CaptainStackD"
                component={Stack.CaptainStackD}
              />
            )}

          {!loader &&
            user.status == "approved" &&
            cars.status == "approved" && (
              <RootStack.Screen
                name="CaptainStack"
                component={Stack.CaptainStack}
              />
            )}

          {/* {!loader && user && !user.terms_accepted && (
            <RootStack.Screen name="SelectCar" component={screens.SelectCar} />
          )}

          {!loader && user && user.terms_accepted && (
            <RootStack.Screen
              name="captainStack"
              component={Stack.captainStack}
            />
          )} */}
        </RootStack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
}
