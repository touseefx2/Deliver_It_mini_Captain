import { observable, makeObservable, action } from "mobx";
import { persist } from "mobx-persist";
import userStore from "../../store/index";
import db from "../../database/index";
import utils from "../../utils/index";
import store from "../../store/index";

export default class carstore {
  constructor() {
    makeObservable(this);
  }

  @persist("object") @observable cars = false;

  @persist("object") @observable brand = [];
  @persist("object") @observable vType = []; //vehicles type
  @persist("object") @observable allcarNames = [];

  @observable images_uploaded = false; //true if all images upload
  @observable uploaded_failed = false; //true if fail image uploaded
  @observable image_loading = false; //loader for uploader image
  @observable imgUploadCount = 0; //uploaded image counter

  @observable loading = false; //register car  loader

  @observable book = []; //uploaded uri images
  @observable car_img = []; //u[laded uri images

  @action.bound
  controlLoadingTrue() {
    this.loading = true;
  }
  @action.bound
  controlLoadingFalse() {
    this.loading = false;
  }

  @action.bound
  addBook(val) {
    this.book.push(val);
    this.imgUploadCount++;
  }
  @action.bound
  addCarImages(val) {
    this.car_img.push(val);
    this.imgUploadCount++;
  }

  @action.bound
  setCars = (obj) => {
    this.cars = obj;
  };

  @action.bound
  addBrand(val) {
    this.brand = val;
  }
  @action.bound
  addAllCarNames(val) {
    this.allcarNames = val;
  }

  @action.bound
  addvType(val) {
    this.vType = val;
  }

  @action.bound
  attemptToGetCar = () => {
    let uid = userStore.userStore.user._id;
    const bodyData = false;
    const header = userStore.userStore.authToken;

    // method, path, body, header
    db.api
      .apiCall("get", db.link.getCar + uid, bodyData, header)
      .then((response) => {
        console.log("Get car response : ", response);

        if (response.message == "Invalid Token") {
          utils.AlertMessage("", response.message);
          userStore.userStore.Logout();
          return;
        }

        if (response.message == "No records found") {
          this.setCars(false);
          return;
        }

        if (!response.data) {
          return;
        }

        if (response.data) {
          this.setCars(response.data[0]);
          return;
        }

        return;
      })
      .catch((e) => {
        // utilsS.AlertMessage("","Network request failed");
        console.error("Get car catch error : ", e);
        return;
      });
  };

  @action.bound
  attemptToGetCarLogin = (user, token) => {
    let uid = user._id;
    const bodyData = false;
    const header = token;

    console.log("Get car body : ", bodyData);
    console.log("Get car header : ", header);

    // method, path, body, header
    db.api
      .apiCall("get", db.link.getCar + uid, bodyData, header)
      .then((response) => {
        console.log("Get car response : ", response);

        if (response.message == "No records found") {
          this.attemptToGetALLCarNames(token);
          this.attemptToGetBrands(token);
          this.attemptToGetVehicleType(token);

          userStore.userStore.addauthToken(token);
          userStore.userStore.setUser(user);
          this.setCars(false);

          return;
        }

        if (response.data) {
          this.attemptToGetALLCarNames(token);
          this.attemptToGetBrands(token);
          this.attemptToGetVehicleType(token);

          userStore.userStore.addauthToken(token);
          userStore.userStore.setUser(user);
          this.setCars(response.data[0]);
          return;
        }

        if (!response.data) {
          return;
        }

        return;
      })
      .catch((e) => {
        // utilsS.AlertMessage("","Network request failed");
        console.error("Get car catch error : ", e);
        return;
      });
  };

  @action.bound
  attemptToGetVehicleType = (t) => {
    const bodyData = false;
    const header = t;

    // method, path, body, header
    db.api
      .apiCall("get", db.link.GET_VEHICLE_TYPE, bodyData, header)
      .then((response) => {
        console.log("Get vType response : ", response);

        if (response.msg == "No records found") {
          return;
        }

        if (!response.data) {
          return;
        }

        if (response.data) {
          this.addvType(response.data);
          return;
        }

        return;
      })
      .catch((e) => {
        // utilsS.AlertMessage("","Network request failed");
        console.error("Get  vTypes catch error : ", e);
        return;
      });
  };

  @action.bound
  attemptToGetBrands = (t) => {
    const bodyData = false;
    const header = t;

    // method, path, body, header
    db.api
      .apiCall("get", db.link.GET_BRANDS, bodyData, header)
      .then((response) => {
        console.log("Get Brand response : ", response);

        if (response.msg == "No records found") {
          return;
        }

        if (!response.data) {
          return;
        }

        if (response.data) {
          this.addBrand(response.data);
          return;
        }

        return;
      })
      .catch((e) => {
        // utilsS.AlertMessage("","Network request failed");
        console.error("Get  Brands catch error : ", e);
        return;
      });
  };

  @action.bound
  attemptToGetALLCarNames = (t) => {
    const bodyData = false;
    const header = t;

    // method, path, body, header
    db.api
      .apiCall("get", db.link.GET_ALL_CAR_NAMES, bodyData, header)
      .then((response) => {
        console.log("GetALLCarNames response : ", response);

        if (response.msg == "No records found") {
          setCars(false);
          return;
        }

        if (!response.data) {
          return;
        }

        if (response.data) {
          this.addAllCarNames(response.data);
          return;
        }

        return;
      })
      .catch((e) => {
        // utilsS.AlertMessage("","Network request failed");
        console.error("GetALLCarNames catch error : ", e);
        return;
      });
  };

  @action.bound
  async UploadeImages(
    type,
    brand,
    name,
    color,
    model,
    reg_no,
    engine,
    seating,
    trans,
    images,
    reg_book,
    modifiedCarName,
    goback
  ) {
    this.controlLoadingTrue();
    this.imgUploadCount = 0;
    this.uploaded_failed = false;
    this.images_uploaded = false;

    try {
      reg_book.map((item) => {
        const data = new FormData();
        const newFile = {
          uri: item.uri,
          type: item.type,
          name: item.name,
          // base64String: item.base64
        };
        data.append("files", newFile);
        // console.log('new file : ', newFile);
        fetch(db.link.links + db.link.uploadFile, {
          method: "post",
          body: data,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
          .then((response) => response.json())
          .then((responseData) => {
            // console.log('img uplaod done');
            console.log("book img uplaod done : ", responseData);
            this.addBook(responseData.locationArray[0].fileLocation);

            if (this.book.length == reg_book.length) {
              images.map((item) => {
                try {
                  const data = new FormData();
                  const newFile = {
                    uri: item.uri,
                    type: item.type,
                    name: item.name,
                    // base64String: item.base64
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
                      // console.log('img uplaod done');
                      console.log("car img uplaod done : ", responseData);
                      this.addCarImages(
                        responseData.locationArray[0].fileLocation
                      );
                      if (this.car_img.length == images.length) {
                        setTimeout(async () => {
                          this.attemptToAddCar(
                            type,
                            brand,
                            name,
                            color,
                            model,
                            reg_no,
                            engine,
                            seating,
                            trans,
                            this.car_img,
                            this.book,
                            modifiedCarName,
                            goback
                          );
                        }, 1000);
                      }
                    })
                    .catch((err) => {
                      console.log("Error in Upload Image", err);
                      this.controlLoadingFalse();
                      this.images_uploaded = false;
                      this.uploaded_failed = true;
                      this.imgUploadCount = 0;
                      this.car_img = [];
                      this.book = [];
                    });
                } catch (e) {
                  console.log(e);
                  this.controlLoadingFalse();
                  this.images_uploaded = false;
                  this.uploaded_failed = true;
                  this.imgUploadCount = 0;
                  this.car_img = [];
                  this.book = [];
                }
              });
            }
          })
          .catch((err) => {
            console.log("Error in Upload Image", err);
            this.controlLoadingFalse();
            this.uploaded_failed = true;
            this.imgUploadCount = 0;
            this.images_uploaded = false;
            this.car_img = [];
            this.book = [];
          });
      });
    } catch (e) {
      console.log("Error in Upload Image", e);
      this.controlLoadingFalse();
      this.uploaded_failed = true;
      this.imgUploadCount = 0;
      this.images_uploaded = false;
      this.car_img = [];
      this.book = [];
    }
  }

  @action.bound
  async attemptToAddCar(
    type,
    brand,
    name,
    color,
    model,
    reg_no,
    engine,
    seating,
    trans,
    carimages,
    bookimages,
    modifiedCarName,
    goback
  ) {
    this.images_uploaded = true;
    let body = {
      owner: userStore.userStore.user._id,
      type: type._id,
      car_name: name._id,
      company: brand._id,
      registration_number: reg_no,
      registration_book_img: bookimages,
      car_images: carimages,
      seating_capacitiy: seating,
      engine_capacitiy: engine,
      model: model.title,
      fuel: "petrol",
      transmission: trans,
      is_active: false,
      color: color,
    };
    console.log("Add Car Body", body);

    // method, path, body, header;
    db.api
      .apiCall("post", db.link.ADD_CAR, body, userStore.userStore.authToken)
      .then((response) => {
        console.log("car : " + modifiedCarName);
        console.log("Add car resp true", response);
        this.controlLoadingFalse();

        if (!response.success) {
          utils.AlertMessage("", response.message);
          return;
        }

        if (response.success) {
          this.attemptToGetCar();
          // goback();
          utils.ToastAndroid.ToastAndroid_SB("Add car success !");
          return;
        }

        return;
      })
      .catch((e) => {
        this.controlLoadingFalse();
        this.imgUploadCount = 0;
        this.images_uploaded = false;
        this.car_img = [];
        this.book = [];
        console.error("Add car catch error : ", e);
        return;
      });
  }
}
