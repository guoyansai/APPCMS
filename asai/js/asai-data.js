export default class {
  constructor(config, global) {
    this.$config = config;
    this.$global = global;
  }

  clear(level = 3) {
    if (level === 3) {
      let sArr = (
        uni.getStorageSync(this.asaiStorageName(this.$config.name.app.local)) ||
        ","
      ).split(",");
      if (sArr.length > 0) {
        sArr.forEach((iUrl) => {
          iUrl && this.asaiStorageDel(iUrl);
        });
      }
      this.asaiStorageDel(this.$config.name.app.local);
      this.$global.G = JSON.parse(JSON.stringify(this.$global.IG));
    }
  }

  saiLocalUrl(vUrl) {
    try {
      return require("../../static/DataLocal" + vUrl + ".json");
    } catch (e) {
      return null;
    }
  }

  get(vUrl, type = 0) {
    return new Promise((resolve, reject) => {
      if (vUrl) {
        let objStorage;
        objStorage = this.getGlobalObj(vUrl);
        if (objStorage && objStorage.ver && type < 10) {
          resolve(objStorage);
        } else {
          const valTmp = this.saiLocalUrl(vUrl);
          if (valTmp && type < 10) {
            this.loadShow({
              title: "本地数据加载中",
            });
            this.setGlobalObj(vUrl, valTmp);
            this.loadClose();
            resolve(valTmp);
          } else if (
            vUrl.endsWith("/ver") ||
            this.$config.auto.api ||
            type > 0
          ) {
            this.loadShow({
              title: "获取远程数据中",
            });
            this.asaiApi(vUrl).then((res) => {
              this.setGlobalObj(vUrl, res.data);
              resolve(res.data);
            });
          } else {
            objStorage = this.asaiStorageRead(vUrl);
            if (objStorage && objStorage.ver) {
              if (this.$config.auto.apiVerload && this.getVer()) {
                this.loadShow({
                  title: "本地数据核验中",
                });
                let vUrlArr = vUrl.split("/");
				vUrlArr.pop();
                this.asaiApi(vUrlArr.join('/')+"/ver").then((res) => {
                  if (res.data.ver > objStorage.ver) {
                    objStorage = {};
                    this.loadClose();
                    this.loadShow({
                      title: "更新本地数据中",
                    });
                    this.asaiApi(vUrl).then((res) => {
                      this.setRe(vUrl, res.data);
                      resolve(res.data);
                    });
                  } else {
                    this.setRe(vUrl, objStorage);
                    resolve(objStorage);
                  }
                });
              } else {
                this.setRe(vUrl, objStorage);
                resolve(objStorage);
              }
            } else {
              this.loadShow({
                title: "远程数据本地化",
              });
              this.asaiApi(vUrl).then((res) => {
                this.setRe(vUrl, res.data);
                resolve(res.data);
              });
            }
          }
        }
      } else {
        reject("error:params is null!");
      }
    });
  }

  getVer() {
    return this.$global.G.app.ver;
  }

  setRe(vUrl, vObj) {
    this.setGlobalObj(vUrl, vObj);
    this.asaiStorageSave(vUrl, vObj);
  }

  getGlobalObj(vUrl) {
    let globalObj = {};
    const arrUrl = vUrl.split("/");
    if (arrUrl[2]) {
      if (arrUrl[2] === "co") {
        const obj1 = this.$global.G["data" + arrUrl[1]] || {};
        globalObj = obj1.listObj || {};
        if (globalObj.sn !== arrUrl[arrUrl.length - 2]) {
          globalObj = {};
        }
      } else if (arrUrl[2] === "li") {
        const obj2 = this.$global.G["data" + arrUrl[1]] || {};
        globalObj = obj2.indexObj || {};
        if (globalObj.sn !== arrUrl[1]) {
          globalObj = {};
        }
      }
    }
    return globalObj;
  }

  setGlobalObj(vUrl, vObj) {
    const arrUrl = vUrl.split("/");
    if (arrUrl[2]) {
      if (arrUrl[2] === "co") {
        this.$global.G["data" + arrUrl[1]].listObj = vObj;
      } else if (arrUrl[2] === "li") {
        this.$global.G["data" + arrUrl[1]].indexObj = vObj;
      }
    }
  }

  asaiApi(vUrl, vData = {}, vHead = {}) {
    return new Promise((resolve, reject) => {
      let apiUrl = "";
      if (vUrl === "/app") {
        apiUrl = this.$config.baseURL.asai + vUrl + ".json?" + Date.now();
      } else {
        apiUrl =
          this.$config.baseURL[this.$config.dev] + vUrl + ".json?" + Date.now();
      }
      uni.request({
        url: apiUrl,
        data: vData,
        header: vHead,
        timeout: this.$config.time.api,
        success: (res) => {
          if (res && res.data) {
            resolve({
              ...res,
            });
          } else {
            resolve({
              data: {
                ...res,
              },
            });
          }
        },
        fail: (err) => {
          this.setRe("/app", {
            ver: 0,
            app: "",
          });
          this.msgShow("请检查网络");
          reject(err);
        },
        complete: () => {
          this.loadClose();
        },
      });
    });
  }

  asaiStorageRead(vUrl) {
    try {
      let vVal = uni.getStorageSync(this.asaiStorageName(vUrl));
      if (vVal) {
        if (typeof vVal === "string") {
          return JSON.parse(vVal);
        } else {
          return vVal;
        }
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  }

  asaiStorageSave(vUrl, vVal) {
    try {
      let vStr;
      if (typeof vVal === "string") {
        vStr = vVal;
      } else {
        vStr = JSON.stringify(vVal);
      }
      let localList =
        uni.getStorageSync(this.asaiStorageName(this.$config.name.app.local)) ||
        "";
      localList = localList.replace("," + vUrl, "") + "," + vUrl;
      uni.setStorageSync(
        this.asaiStorageName(this.$config.name.app.local),
        localList
      );
      uni.setStorageSync(this.asaiStorageName(vUrl), vStr);
    } catch (e) {}
  }

  asaiStorageDel(vUrl) {
    try {
      uni.removeStorageSync(this.asaiStorageName(vUrl));
    } catch (e) {}
  }

  getStorageName(vUrl) {
    return vUrl.split("/").join("-");
  }

  asaiStorageName(vUrl) {
    return (
      this.$config.name.app.startsWith +
      this.getStorageName(vUrl) +
      this.$config.name.app.endsWith
    );
  }

  loadShow(obj) {
    uni.showLoading(obj);
  }

  loadClose() {
    uni.hideLoading();
  }

  msgShow(title, duration = 2000) {
    uni.showToast({
      title,
      duration,
    });
  }

  msgClose() {
    uni.hideToast();
  }
}
