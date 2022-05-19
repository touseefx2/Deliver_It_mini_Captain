import "react-native-gesture-handler";
import React from "react";
import { AppRegistry, LogBox, StatusBar } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import { configure } from "mobx";
import messaging from "@react-native-firebase/messaging";
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { showNotification } from "./src/services/Notification/showNotification";
import store from "./src/store/index";
import { Provider } from "mobx-react";
import { create } from "mobx-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

configure({ useProxies: "never" });
LogBox.ignoreAllLogs(true);

messaging().onMessage(async (notification) => {
  console.log("onNOTIFICATION in foregorund  :", notification);
  store.NotificationManager.attemptToGetNotifications();
  let data = notification.data ? notification.data : null;
  let topic = data.topic || "";
  let title = notification.data.trip
    ? "New Trip Request"
    : notification.notification.title;
  let msg = notification.notification.body || "";
  console.log("topic : ", topic);

  PushNotification.localNotification({
    message: msg,
    title: title,
    // bigPictureUrl: remoteMessage.notification.android.imageUrl,
    // smallIcon: remoteMessage.notification.android.imageUrl,
  });

  if (notification.userInteraction == false) {
  }

  if (notification.userInteraction == true) {
    console.log("ntfctn click");
  }

  if (topic == "user") {
    store.userStore.attemptToGetUser();
  }

  if (topic == "car") {
    store.carStore.attemptToGetCar();
  }

  if (title == "New Trip Request") {
    if (data && store.tripStore.request == false) {
      store.tripStore.getReqById(data.trip, "");
    }
  }

  if ((title = "Trip has been canceled.")) {
    if (store.tripStore.request != false) {
      store.tripStore.getReqById(store.tripStore.request._id, "check");
    }
  }
});

messaging().setBackgroundMessageHandler(async (notification) => {
  console.log("onNOTIFICATION in Background  :", notification);
  store.NotificationManager.attemptToGetNotifications();
  let data = notification.data ? notification.data : null;
  let topic = data.topic || "";
  let title = notification.data.trip
    ? "New Trip Request"
    : notification.notification.title;
  let msg = notification.notification.body || "";
  console.log("topic : ", topic);

  if (notification.userInteraction == false) {
  }

  if (notification.userInteraction == true) {
    console.log("ntfctn click");
  }

  if (topic == "user") {
    store.userStore.attemptToGetUser();
  }

  if (topic == "car") {
    store.carStore.attemptToGetCar();
  }

  if (title == "New Trip Request") {
    if (data && store.tripStore.request == false) {
      store.tripStore.getReqById(data.trip, "");
    }
  }

  if ((title = "Trip has been canceled.")) {
    if (store.tripStore.request != false) {
      store.tripStore.getReqById(store.tripStore.request._id, "check");
    }
  }
});

const hydrateStores = async () => {
  const hydrate = create({ storage: AsyncStorage });
  await hydrate("userstore", store.userStore);
  await hydrate("tripstore", store.tripStore);
  await hydrate("carstore", store.carStore);
  await hydrate("citystore", store.cityStore);
  await hydrate("notificationmanager", store.NotificationManager);
};

function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }
  // {MainApp()}
}

function MainApp() {
  hydrateStores();
  return (
    <Provider {...store}>
      <App />
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => MainApp);
