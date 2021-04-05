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
			vTxt = vTxt.replace(/<[^>]+>/g, "");
			vTxt = vTxt.replace(/(^\s+)|(\s+$)/g, "");
			if (len > 0) {
				vTxt = vTxt.substr(0, len);
			}
			return vTxt;
		},
	},
};
