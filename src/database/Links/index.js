//local link
// const links = "http://10.7.148.97:3001/";
// const socket = "http://10.7.148.97:3001";

//online link heroko
// const links = "https://deliveritbackend.herokuapp.com/";
// const socket = "https://deliveritbackend.herokuapp.com";

//online link  ec2
const links = "http://ec2-13-233-155-200.ap-south-1.compute.amazonaws.com/";
// const socket = "http://ec2-13-233-155-200.ap-south-1.compute.amazonaws.com";

const login = "user/loginCaptain";
const OWNER_REG_EP = "user/addCaptain";
const GET_CITIES = "city";
const updateUser = "user/updateUser/";
const updateTerms = "user/termsAccepted/";
const uploadFile = "upload/uploadFile";
const getCar = "vehicle?owner=";
const getUserById = "user?_id=";
const getTripsbyId = "trip/getTrips?_id=";
const acceptTrip = "trip/acceptTrip/";
const skipTrip = "user/skipTrip/";
const arriveTrip = "trip/arriveTrip/";
const startTrip = "trip/startTrip/";
const endTrip = "trip/endTrip/";
const getAvgRating = "user/getAverageRating?user=";
const cancelTrip = "trip/cancelTrip/";
const addTripRating = "trip/rateCustomer/";
const paycashEqual = "trip/paybill/";
const paycashExtra = "trip/paybill/addtodebit/";
const paycashLess = "trip/paybill/addtocredit/";

const getcustomerWalletinfo = "transaction_history/getHistoryByUser?user=";

const gettripbyUserwithDate = "user/tripbyuser?user=";
const getportalwithDate = "user/captainPortal?user=";
const gettotaltripCalculationwithDate = "user/getTripRecord?user=";

const getTripDispute = "dispute?trip=";
const addTripDispute = "dispute/add";

const getTripTransctionHistory = "transaction_history/getHistoryByTrip?trip=";

const GET_BRANDS = "company?is_active=true";
const GET_ALL_CAR_NAMES = "car_name?is_active=true";
const GET_VEHICLE_TYPE = "vehicle_type";
const ADD_CAR = "vehicle/add";
const UPDATE_CAR = "vehicle/";
const UPDATE_USER = "user/updateUser/";
const GET_NOTIFICATION = "notification/getNotification/";
const UPDATE_NOTIFICATION = "notification/readNotification/";

export default link = {
  links,
  login,
  GET_BRANDS,
  updateUser,
  uploadFile,
  getCar,
  updateTerms,
  getUserById,
  getTripsbyId,
  acceptTrip,
  arriveTrip,
  startTrip,
  endTrip,
  // socket,
  addTripDispute,
  skipTrip,
  cancelTrip,
  getAvgRating,
  gettotaltripCalculationwithDate,
  getTripDispute,
  getTripTransctionHistory,
  paycashEqual,
  paycashExtra,
  paycashLess,
  addTripRating,
  getcustomerWalletinfo,
  gettripbyUserwithDate,
  getportalwithDate,
  GET_CITIES,
  OWNER_REG_EP,
  GET_VEHICLE_TYPE,
  GET_ALL_CAR_NAMES,
  ADD_CAR,
  UPDATE_CAR,
  UPDATE_USER,
  GET_NOTIFICATION,
  UPDATE_NOTIFICATION,
};
