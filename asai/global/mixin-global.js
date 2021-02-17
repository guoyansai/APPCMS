export default {
	computed: {
		netWork: {
			get() {
				return this.$global.netWork;
			},
			set(newVal) {
				this.$global.netWork = newVal;
			}
		},
		dataSn: {
			get() {
				return this.$global.dataSn;
			},
			set(newVal) {
				this.$global.dataSn = newVal;
			}
		},
		dataList: {
			get() {
				return this.$global.dataList;
			},
			set(newVal) {
				Object.assign(this.$global.dataList, newVal);
			}
		},
		dataLi: {
			get() {
				return this.$global.dataLi;
			},
			set(newVal) {
				this.$global.dataLi = newVal;
			}
		},
		dataIndex: {
			get() {
				return this.$global.dataIndex;
			},
			set(newVal) {
				Object.assign(this.$global.dataIndex, newVal);
			}
		},
		dataBar: {
			get() {
				return this.$global.dataBar;
			},
			set(newVal) {
				Object.assign(this.$global.dataBar, newVal);
			}
		},
		listPage: {
			get() {
				return this.$global.listPage;
			},
			set(newVal) {
				Object.assign(this.$global.listPage, newVal);
			}
		},
		listSearch: {
			get() {
				return this.$global.listSearch;
			},
			set(newVal) {
				Object.assign(this.$global.listSearch, newVal);
			}
		},
		dataUser: {
			get() {
				return this.$global.dataUser;
			},
			set(newVal) {
				Object.assign(this.$global.dataUser, newVal);
			}
		},
	}
}
