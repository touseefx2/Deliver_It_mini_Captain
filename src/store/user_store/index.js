import { observable, makeObservable, action } from "mobx";
import { persist } from "mobx-persist";
import carStore from "../index";
import NotificationManager from "../index";
import db from "../../database/index";
import utils from "../../utils";
import store from "../index";
import auth from "@react-native-firebase/auth";

export default class userstore {
  constructor() {
    makeObservable(this);
  }

  @observable profile = "";
  @observable cnicback = "";
  @observable cnicfront = "";
  @observable licneseback = "";
  @observable licnesefront = "";

  @observable loader = true;

  @observable cl = "";

  @persist("object") @observable user = false;

  @persist("object") @observable online = false;

  @persist @observable notificationToken = "";
  @persist @observable authToken = "";

  @observable loading = false;

  @observable regloading = false;
  @observable isGetAllDatainSplash = false;
  @observable total = 0; //total uploaded image length
  @observable done = 0; //done uloaded image counter
  @observable isAllImageUploadDone = false;

  @action setLoader = (obj) => {
    this.loader = obj;
  };

  @action setonline = (obj) => {
    this.online = obj;
  };

  @action setcl = (obj) => {
    this.cl = obj;
  };

  @action.bound
  setLoadingTrue() {
    this.loading = true;
  }
  @action.bound
  setLoadingFalse() {
    this.loading = false;
  }
  @action.bound
  setisAllImageUploadDone(c) {
    this.isAllImageUploadDone = c;
  }

  @action.bound
  setRegLoading(v) {
    this.regloading = v;
  }

  @action.bound
  settotal(t) {
    this.total = t;
  }

  @action.bound
  setdone(t) {
    this.done = t;
  }

  @action.bound
  setisGetAllDatainSplash(val) {
    this.isGetAllDatainSplash = val;
  }

  @action.bound
  setUser(val) {
    this.user = val;
  }

  @action.bound
  addnotificationToken(n) {
    this.notificationToken = n;
  }

  addUser(token, user) {
    carStore.carStore.attemptToGetCarLogin(user, token);
    return;
  }

  @action.bound
  addauthToken(n) {
    this.authToken = n;
  }

  @action.bound
  Logout() {
    // this.notificationToken = "";
    this.authToken = "";
    this.isterms_accepted = false;
    this.user = false;
    carStore.carStore.setCars(false);
    store.NotificationManager.removeNotification();
  }

  @action.bound
  attemptToLogin(mobile, nav) {
    auth().onAuthStateChanged(async (user) => {
      if (user) {
        auth().currentUser?.delete();
        auth().signOut();
      }
    });

    let body = {
      mobile_number: mobile,
      registration_token: this.notificationToken,
    };
    console.log("atmpt to login : ", body);

    // method, path, body, header
    db.api
      .apiCall("post", db.link.login, body, "")
      .then((response) => {
        this.setLoadingFalse();
        console.log("checkIsUserRegister response : ", response);

        if (!response.token) {
          store.cityStore.attemptToGetCities();
          nav.navigate("RegisterProfile", { phone: mobile });
          return;
        }

        if (response.token) {
          this.addUser(response.token, response.data);
          return;
        }

        return;
      })
      .catch((e) => {
        this.setLoadingFalse();
        utils.AlertMessage("", "Network request failed");
        console.error("checkIsUserRegister catch error : ", e);
        return;
      });
  }

  @action.bound
  attemptToRegister(
    name,
    city,
    email,
    address,
    cnic,
    image,
    cf,
    cb,
    lf,
    lb,
    mobile
  ) {
    cf.chk = "cnicF";
    cb.chk = "cnicB";
    lf.chk = "licenseF";
    lb.chk = "licenseB";

    let imgArr = [];
    if (image != "") {
      image.chk = "profile";
      imgArr.push(image);
    }
    imgArr.push(cf);
    imgArr.push(cb);
    imgArr.push(lf);
    imgArr.push(lb);

    this.regloading = true;
    this.settotal(imgArr.length);
    this.setdone(0);
    this.setisAllImageUploadDone(false);

    try {
      imgArr.map((e, i, a) => {
        console.log("img   : ", e.chk || "", "uri : ", e);
        const data = new FormData();
        const newFile = {
          uri: e.uri,
          type: e.type,
          name: e.fileName,
        };
        data.append("files", newFile);
        fetch(db.link.links + db.link.uploadFile, {
          method: "post",
          body: data,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
          .then((response) => response.json())
          .then((responseData) => {
            this.setdone(this.done + 1);
            if (e.chk == "profile") {
              image.uri = responseData.locationArray[0].fileLocation;
            } else if (e.chk == "cnicF") {
              cf.uri = responseData.locationArray[0].fileLocation;
            } else if (e.chk == "cnicB") {
              cb.uri = responseData.locationArray[0].fileLocation;
            } else if (e.chk == "licenseF") {
              lf.uri = responseData.locationArray[0].fileLocation;
            } else if (e.chk == "licenseB") {
              lb.uri = responseData.locationArray[0].fileLocation;
            }
            if (i == a.length - 1) {
              setTimeout(() => {
                this.setisAllImageUploadDone(true);
                let body = {
                  fullname: name,
                  cnic: cnic,
                  mobile_number: mobile,
                  email: email,
                  city: city,
                  cnic_front_image: cf.uri,
                  cnic_back_image: cb.uri,
                  profile_image: image.uri,
                  address: address,
                  license_front_image: lf.uri,
                  license_back_image: lb.uri,
                  is_online: false,
                  registration_token: this.notificationToken,
                };

                this.registerUser(body);
                return;
              }, 1000);
            }
          })
          .catch((err) => {
            console.log("Error in Upload Images arr", err);
            this.regloading = false;
          });
      });
    } catch (e) {
      console.log("add user catch error : ", e);
      this.regloading = false;
    }
  }

  @action.bound
  registerUser(body) {
    console.log("register user body : ", body);
    db.api
      .apiCall("post", db.link.OWNER_REG_EP, body, "")
      ?.then((response) => {
        console.log("register user resp : ", response);
        this.setRegLoading(false);

        if (response.token) {
          this.addUser(response.token, response.data);
          return;
        }

        if (response.message) {
          utils.AlertMessage("", response.message);
          return;
        }
      })
      .catch((e) => {
        console.error("register user catch error : ", e);
        this.setdone(0);
        this.setisAllImageUploadDone(false);
        this.settotal(0);
        this.setRegLoading(false);
      });
  }

  @action.bound
  updateUser(
    name,
    city,
    email,
    address,
    cnic,
    image,
    cf,
    cb,
    lf,
    lb,
    mobile,
    toast
  ) {
    let body = {
      fullname: name,
      cnic: cnic,
      mobile_number: mobile,
      email: email,
      city: city,
      cnic_front_image: cf,
      cnic_back_image: cb,
      profile_image: image,
      address: address,
      license_front_image: lf,
      license_back_image: lb,
    };

    console.log("update user   body : ", body);
    let uid = this.user._id;

    db.api
      .apiCall("put", db.link.UPDATE_USER + uid, body, this.authToken)
      ?.then((response) => {
        console.log("update user resp : ", response);
        this.setRegLoading(false);
        this.setLoadingFalse();
        this.setdone(0);
        if (response.success) {
          this.setUser(response.data);
          // toast?.show("Success!");
          return;
        }
      })
      .catch((e) => {
        console.error("update user catch error : ", e);
        this.setRegLoading(false);
        this.setLoadingFalse();
      });
  }

  @action.bound
  attemptToGetUser = () => {
    const header = this.authToken;
    const uid = this.user._id;

    // method, path, body, header
    db.api
      .apiCall("get", db.link.getUserById + uid, false, header)
      .then((response) => {
        console.log("getuser response : ", response);

        if (response.message == "No records found") {
          this.Logout();
          return;
        }

        if (response.data) {
          this.setUser(response.data[0]);
          this.setonline(response.data[0].is_online);
          return;
        }

        return;
      })
      .catch((e) => {
        console.error("getuser catch error : ", e);
        return;
      });
  };

  @action.bound
  getAllData = () => {
    this.setisGetAllDatainSplash(true);
    this.attemptToGetUser();
    carStore.carStore.attemptToGetCar();
    NotificationManager.NotificationManager.attemptToGetNotifications();
    carStore.carStore.attemptToGetALLCarNames(this.authToken);
    carStore.carStore.attemptToGetBrands(this.authToken);
    carStore.carStore.attemptToGetVehicleType(this.authToken);
  };
}
