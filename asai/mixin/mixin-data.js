export default {
	methods: {
		saiUser(type) {
			if (!this.checkObj(this.datauser || type === 1)) {
				let tempData = require('../../data/template/user.json');
				this.datauser = { ...tempData
				};
				console.log(666.666, this.datauser)
			}
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
