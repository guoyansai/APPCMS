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
		datalocal: {
			get() {
				return this.$global.datalocal;
			},
			set(newVal) {
				Object.assign(this.$global.datalocal, newVal);
			}
		},
		dataweb: {
			get() {
				return this.$global.dataweb;
			},
			set(newVal) {
				Object.assign(this.$global.dataweb, newVal);
			}
		},
		dataexe: {
			get() {
				return this.$global.dataexe;
			},
			set(newVal) {
				Object.assign(this.$global.dataexe, newVal);
			}
		},
		datauser: {
			get() {
				return this.$global.datauser;
			},
			set(newVal) {
				Object.assign(this.$global.datauser, newVal);
			}
		},
		bomb: {
			get() {
				return this.$global.bomb;
			},
			set(newVal) {
				Object.assign(this.$global.bomb, newVal);
			}
		},
	}
}
