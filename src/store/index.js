import userstore from "./user_store";
import carstore from "./car_store";
import citystore from "./city_store";
import generalstore from "./general_store";
import tripstore from "./trip_store";
import notificationmanager from "./notificationmanager";

const userStore = new userstore();
const carStore = new carstore();
const cityStore = new citystore();
const tripStore = new tripstore();
const generalStore = new generalstore();
const NotificationManager = new notificationmanager();

export default {
  userStore,
  carStore,
  generalStore,
  tripStore,
  cityStore,
  NotificationManager,
};
