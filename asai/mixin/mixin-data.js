export default {
	methods: {
		saiCheckObj(obj) {
			if (typeof(obj) === 'object') {
				for (let key in obj) {
					return true;
				}
			}
			return false;
		},
		saiHtml2Txt(vHtml, len) {
			let vTxt = vHtml;
			vTxt = vTxt.replace(/　/g, "");
			vTxt = vTxt.replace(/<[^>]+>/g, "");
			vTxt = vTxt.replace(/(^\s+)|(\s+$)/g, "");
			if (len > 0) {
				vTxt = vTxt.substr(0, len);
			}
			return vTxt;
		},
		saiXSS(str) {
			return str
				.replace(/&/g, '')
				.replace(/%/g, '')
				.replace(/\*/g, '')
				.replace(/#/g, '')
				.replace(/^/g, '')
				.replace(/ /g, '')
				.replace(/</g, '')
				.replace(/>/g, '')
				.replace(/"/g, '')
				.replace(/'/g, '')
				.replace(/\r{0,}\n/g, '')
		},
		saiToKey(str) {
			return this.saiXSS(this.saiEncode(str));
		},
		saiEncode(str) {
			return encodeURIComponent(str);
		},
		saiDecode(str) {
			return decodeURIComponent(str);
		}
	},
};
