import { observable, makeObservable, action } from "mobx";
import { AppState } from "react-native";

export default class generalstore {
  constructor() {
    makeObservable(this);
  }

  @observable isInternet = false;
  @observable isLocation = false;
  @observable apiLevel = "";
  @observable appState = AppState.currentState;

  @action setInternet = (obj) => {
    this.isInternet = obj;
  };

  @action setLocation = (obj) => {
    this.isLocation = obj;
  };

  @action setdeviceApi = (obj) => {};

  @action.bound
  setapiLevel(val) {
    this.apiLevel = val;
  }

  @action setappState = (obj) => {
    this.appState = obj;
  };
}
