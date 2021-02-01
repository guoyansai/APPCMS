export default {
	inject: [
		'dataLi',
		'dataCo',
		'dataRd',
		'dataSs'
	],
	mouted() {
		console.log(666.123, this.dataLi)
		// console.log(666.123, getApp().globalData)
	}
}
