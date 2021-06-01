<template>
	<view class="index-user" v-if="saiCheckObj(dataUser)">
		<quick-menu v-if="quickMenu" @closemenu="closeMenu()"></quick-menu>
		<view class="s-user-edit" v-if="userType === 'edit'">
			<view class="s-user-top">
				<view class="s-user-ic"><img :src="dataUser.ic" /></view>
				<view class="s-user-tt">
					{{ dataUser.tt }}
					<view class="s-user-to">{{ dataUser.to }}</view>
				</view>
			</view>
			<view class="s-user-li">性别：{{ dataUser.sx === 1 ? "男" : "女" }}</view>
			<view class="s-user-li">
				生日：
				<input type="text" v-model="dataUser.cd" />
			</view>
			<view class="s-user-li">
				电话：
				<input type="text" v-model="dataUser.dh" />
			</view>
			<view class="s-user-li">
				现居：
				<input type="text" class="s-user-input" v-model="dataUser.jx" />
				<view class="s-user-lis">
					老家：
					<input type="text" class="s-user-input" v-model="dataUser.jj" />
				</view>
			</view>
			<view class="s-user-li">
				学历：
				<input type="text" class="s-user-input" v-model="dataUser.zl" />
				<view class="s-user-lis">
					学校：
					<input type="text" class="s-user-input" v-model="dataUser.zx" />
				</view>
			</view>
			<view class="s-user-li">
				职业：
				<input type="text" class="s-user-input" v-model="dataUser.zy" />
				<view class="s-user-lis">
					经验：
					<input type="text" class="s-user-input" v-model="dataUser.zj" />
					年
				</view>
			</view>
			<view class="s-user-li">
				公司：
				<input type="text" v-model="dataUser.zg" />
			</view>
			<view class="s-user-li">
				月薪：
				<input type="text" v-model="dataUser.zs" />
				元/月
			</view>
			<view class="s-user-li">
				爱好：
				<input type="text" v-model="dataUser.lv" />
			</view>
			<view class="s-user-lim">
				备注：
				<textarea @blur="bindTextAreaBlur" v-model="dataUser.co" auto-height />
			</view>
			<view class="s-user-button">
				<button class="mini-btn" type="primary" size="mini" @tap="showUser()">
					更新信息
				</button>
				<button class="mini-btn" type="default" size="mini" @tap="resetUser()">
					复位
				</button>
			</view>
		</view>
		<view class="s-user-show" v-else>
			<view class="s-user-top">
				<view class="s-user-ic"><img :src="dataUser.ic" /></view>
				<view class="s-user-tt">
					{{ dataUser.tt }}
					<view class="s-user-to">{{ dataUser.to }}</view>
				</view>
			</view>
			<view class="s-user-li">性别：{{ dataUser.sx === 1 ? "男" : "女" }}</view>
			<view class="s-user-li">生日：{{ dataUser.cd }}</view>
			<view class="s-user-li">电话：{{ dataUser.dh }}</view>
			<view class="s-user-li">
				现居：{{ dataUser.jx }}
				<view class="s-user-lis">老家：{{ dataUser.jj }}</view>
			</view>
			<view class="s-user-li">
				学历：{{ dataUser.zl }}
				<view class="s-user-lis">学校：{{ dataUser.zx }}</view>
			</view>
			<view class="s-user-li">
				职业：{{ dataUser.zy }}
				<view class="s-user-lis">经验：{{ dataUser.zj }}年</view>
			</view>
			<view class="s-user-li">公司：{{ dataUser.zg }}</view>
			<view class="s-user-li">月薪：{{ dataUser.zs }} 元/月</view>
			<view class="s-user-li">爱好：{{ dataUser.lv }}</view>
			<view class="s-user-lim">备注：{{ dataUser.co }}</view>
			<view class="s-user-button"><button class="mini-btn" type="primary" size="mini" @tap="editUser()">
					编辑信息
				</button></view>
		</view>
		<view class="s-user-des"> 注意：以上信息仅限本地使用。 </view>
		<view class="s-user-des">{{ jsonTemp }}App Ver {{ $config.ver }}</view>
		<view class="s-user-des" v-if="hasNewVer" @tap="downNewVer()">点击下载最新版本：{{ $global.G.ver }}</view>
		<view class="s-user-app"><input type="text" v-model="$config.verNewUrl" /></view>
	</view>
</template>

<script>
	import mixinMain from "../../components/base/mixin-main.js";

	export default {
		mixins: [mixinMain],
		data() {
			return {
				hasNewVer: false,
				jsonTemp: "",
				userType: "show",
				dataUser: null,
			};
		},
		onLoad: function(e) {
			this.initUser(0);
			// this.$asaidata.get("/mags/li").then((res) => {
			// 	console.log(666.789789, res);
			// });
			// this.$asaidata.asaiStorageSave("aaaaaaaaaaa", '{"a":"bbbbbb"}');
			// console.log(
			// 	666.9001,
			// 	this.$asaidata,
			// 	this.$asaidata.asaiStorageRead("aaaaaaaaaaa"),
			// 	this.$asaidata.asaiStorageName("aaaaaaaaaaa")
			// );
			if (this.$global.G.ver !== this.$config.ver) {
				this.hasNewVer = true;
			}
			if (e.type) {
				this.userType = e.type;
			}
		},
		methods: {
			initUser(type = 0) {
				this.$asaidata
					.get("/user/li", type)
					.then((res) => {
						this.dataUser = res;
					});
			},
			editUser() {
				this.go("index?type=edit");
			},
			showUser() {
				this.go("index?type=show");
			},
			resetUser() {
				this.initUser(1);
			},
			downNewVer() {
				this.goHttp(this.$config.verNewUrl);
			},
		},
	};
</script>

<style></style>
