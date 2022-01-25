1. static/DataLocal文件夹用来存放数据文件
2. 调用方法在\asai\js\asai-data.js文件中
```
  saiLocalUrl(vUrl) {
    try {
      return require("../../static/DataLocal" + vUrl + ".json");
    } catch (e) {
      return null;
    }
  }
```