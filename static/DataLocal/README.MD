static/DataLocal文件夹用来存放数据文件  

> asai\config\config-main.json  
baseURL.local由这个值配置文件夹及变量标识

> asai\global\global.js  
DataLocal这个对象中设置全局变量  
- 文件示例
```
export default {
	...GlobalConst,
	...GlobalMain,
	DataLocal: {
		h5: {
			def: require('../../static/DataLocal/h5/li.json')
		},
		tools: {
			README: '通过require()加载数据文件，调用方式DataLocal.tools.README',
		}
	}
}
```