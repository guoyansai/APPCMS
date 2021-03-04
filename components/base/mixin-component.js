export default {
	methods: {
		viewTit(listItem, showItem) {
			// const dnArr = [
			// 	"id",
			// 	"sn",
			// 	"tt",
			// ];
			// return this.getValArr(listItem, showItem, dnArr, 0);
			return this.getValue(listItem, showItem, 'tt');
		},
		viewTag(listItem, showItem) {
			const dnArr = [
				"us",
				"ur",
				"cd",
				"rd",
				"xy"
			];
			return this.getValArr(listItem, showItem, dnArr, 1);
		},
		viewImg(listItem, showItem) {
			return this.getValue(listItem, showItem, 'ic');
		},
		viewDes(listItem, showItem) {
			return this.getValue(listItem, showItem, 'co');
		},
		getValue(listItem, showItem, vKey) {
			return this.getVal(listItem, showItem, vKey, 0);
		},
		getValArr(listItem, showItem, vArr, vType) {
			let vVal = '';
			vArr.forEach(val => {
				let tempVal = this.getVal(listItem, showItem, val, vType);
				if (tempVal) {
					vVal = vVal + tempVal + ' ';
				}
			});
			return vVal;
		},
		getVal(listItem, showItem, vKey, vType = 0) {
			let vIndex = listItem.db.dn.findIndex(itemVal => itemVal === vKey);
			if (vIndex > -1 && showItem[vIndex]) {
				if (vType === 1) {
					return listItem.db.dc[vIndex] + '：' + showItem[vIndex];
				} else {
					return showItem[vIndex];
				}
			} else {
				return '';
			}
		},
	},
};
