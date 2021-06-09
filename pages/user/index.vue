<template>
	<view class="s-area">
		<view class="s-index index-user" v-if="saiCheckObj(dataUser)">
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
			<view class="s-user-des" v-if="hasNewVer" @tap="downNewVer()">点击下载最新版本：{{ $global.G.app.ver }}</view>
			<view class="s-user-app"><input type="text" v-model="$global.G.app.app" /></view>
		</view>
	</view>
</template>

<script>
	import mixinMain from "../../components/base/mixin-main.js";
	import mixinMainLoad from '../../components/base/mixin-main-load.js';

	export default {
		mixins: [mixinMain, mixinMainLoad],
		data() {
			return {
				hasNewVer: false,
				jsonTemp: "",
				userType: "show",
				dataUser: {},
			};
		},
		onLoad: function(e) {
			this.initUser(0);
			if (this.$global.G.app.ver !== this.$config.ver) {
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

<style scoped>
	.s-user-top {
		display: flex;
		align-items: center;
		padding-top: 28rpx;
		padding-bottom: 28rpx;
		padding-left: 28rpx;
		padding-right: 28rpx;
		background-color: #F5F5F5;
	}

	.s-user-ic {
		width: 108rpx;
		height: 108rpx;
		padding-right: 28rpx;
	}

	.s-user-ic img {
		width: 108rpx;
		height: 108rpx;
		border-radius: 50%;
	}

	.s-user-tt {
		flex-grow: 1;
	}

	.s-user-to {
		color: #888888;
		font-size: small;
	}

	.s-user-lim,
	.s-user-li {
		color: #666666;
		padding-top: 28rpx;
		padding-bottom: 28rpx;
		padding-left: 28rpx;
		padding-right: 28rpx;
		margin-left: 28rpx;
		margin-right: 28rpx;
		border-color: #D8D8D8;
		border-width: 0;
		border-bottom-width: 1rpx;
		border-style: solid;
	}

	.s-user-show .s-user-li {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.s-user-show .s-user-li::after {
		color: #D8D8D8;
		content: '>';
	}

	.s-user-edit .s-user-li,
	.s-user-edit .s-user-lis {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.s-user-input {
		width: 200rpx;
	}

	.s-user-lis {
		color: #888888;
		font-size: small;
	}

	.s-user-button {
		text-align: center;
		padding-top: 28rpx;
	}

	.s-user-button .mini-btn {
		margin-left: 12rpx;
		margin-right: 12rpx;
	}

	.s-user-des {
		color: #D8D8D8;
		font-size: small;
		text-align: center;
		padding-top: 28rpx;
		padding-bottom: 28rpx;
	}

	.s-user-app {
		text-align: center;
		color: #888888;
	}
</style>
