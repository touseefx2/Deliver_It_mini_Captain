import { observable, makeObservable, action } from "mobx";
import { persist } from "mobx-persist";
import db from "../../database/index";

export default class citystore {
  @persist("object") @observable city: []; // at start user data will be empty
  @observable loading = false;
  constructor() {
    makeObservable(this);
  }
  @action.bound
  addCity(val) {
    this.city = val;
  }

  @action.bound
  removeCity() {
    this.city = {};
  }

  @action.bound
  controlLoading() {
    this.loading = !this.loading;
  }
  @action.bound
  attemptToGetCities() {
    // method, path, body, header
    db.api
      .apiCall("get", db.link.GET_CITIES, false, "")
      .then((response) => {
        console.log("getcities response : ", response);

        if (response.data) {
          this.addCity(response.data);
          return;
        }

        return;
      })
      .catch((e) => {
        // utils.AlertMessage("", "Network request failed");
        console.error("getcities catch error : ", e);
        return;
      });
  }
}
