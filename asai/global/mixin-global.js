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
		dataLi: {
			get() {
				return this.$global.dataLi;
			},
			set(newVal) {
				Object.assign(this.$global.dataLi, newVal);
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
