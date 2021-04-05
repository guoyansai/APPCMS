<template>
	<view class="index-user">
		<view class="s-user-edit" v-if="userType === 'edit'">
			<view class="s-user-top">
				<view class="s-user-ic"><img :src="datauser.ic" /></view>
				<view class="s-user-tt">
					{{ datauser.tt }}
					<view class="s-user-to">{{ datauser.to }}</view>
				</view>
			</view>
			<view class="s-user-li">性别：{{ datauser.sx === 1 ? '男' : '女' }}</view>
			<view class="s-user-li">
				生日：
				<input type="text" v-model="datauser.cd" />
			</view>
			<view class="s-user-li">
				电话：
				<input type="text" v-model="datauser.dh" />
			</view>
			<view class="s-user-li">
				现居：
				<input type="text" v-model="datauser.jx" />
				<view class="s-user-lis">
					老家：
					<input type="text" v-model="datauser.jj" />
				</view>
			</view>
			<view class="s-user-li">
				学历：
				<input type="text" v-model="datauser.zl" />
				<view class="s-user-lis">
					学校：
					<input type="text" v-model="datauser.zx" />
				</view>
			</view>
			<view class="s-user-li">
				职业：
				<input type="text" v-model="datauser.zy" />
				<view class="s-user-lis">
					经验：
					<input type="text" v-model="datauser.zj" />
					年
				</view>
			</view>
			<view class="s-user-li">
				公司：
				<input type="text" v-model="datauser.zg" />
			</view>
			<view class="s-user-li">
				月薪：
				<input type="text" v-model="datauser.zs" />
				元/月
			</view>
			<view class="s-user-li">
				爱好：
				<input type="text" v-model="datauser.lv" />
			</view>
			<view class="s-user-lim">
				备注：
				<textarea @blur="bindTextAreaBlur" v-model="datauser.co" auto-height />
			</view>
			<view class="s-user-button">
				<button class="mini-btn" type="primary" size="mini" @tap="showUser()">更新信息</button>
				<button class="mini-btn" type="default" size="mini" @tap="resetUser()">复位</button>
			</view>
		</view>
		<view class="s-user-show" v-else>
			<view class="s-user-top">
				<view class="s-user-ic"><img :src="datauser.ic" /></view>
				<view class="s-user-tt">
					{{ datauser.tt }}
					<view class="s-user-to">{{ datauser.to }}</view>
				</view>
			</view>
			<view class="s-user-li">性别：{{ datauser.sx === 1 ? '男' : '女' }}</view>
			<view class="s-user-li">生日：{{ datauser.cd }}</view>
			<view class="s-user-li">电话：{{ datauser.dh }}</view>
			<view class="s-user-li">
				现居：{{ datauser.jx }}
				<view class="s-user-lis">老家：{{ datauser.jj }}</view>
			</view>
			<view class="s-user-li">
				学历：{{ datauser.zl }}
				<view class="s-user-lis">学校：{{ datauser.zx }}</view>
			</view>
			<view class="s-user-li">
				职业：{{ datauser.zy }}
				<view class="s-user-lis">经验：{{ datauser.zj }}年</view>
			</view>
			<view class="s-user-li">公司：{{ datauser.zg }}</view>
			<view class="s-user-li">月薪：{{ datauser.zs }} 元/月</view>
			<view class="s-user-li">爱好：{{ datauser.lv }}</view>
			<view class="s-user-lim">备注：{{ datauser.co }}</view>
			<view class="s-user-button"><button class="mini-btn" type="primary" size="mini"
					@tap="editUser()">编辑信息</button></view>
		</view>
		<view class="s-user-des">
			注意：以上信息仅限本地使用。
		</view>
		<view class="s-user-des">{{ jsonTemp }}App Ver {{ $config.ver }}(最新：{{ $global.G.ver }})</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				jsonTemp: '',
				userType: 'show',
				user: {
					ic: 'static/img/mo.jpg',
					tt: '我的名字',
					to: '我的签名是什么',
					sx: 1,
					cd: 19840718,
					dh: 18800000000,
					jx: '江苏南京',
					jj: '江苏泗洪',
					zl: '本科',
					zx: '江苏师范大学',
					zy: '自由职业者',
					zj: 9,
					zg: '阿赛工作室',
					zs: 20000,
					lv: '电视,漫画,游戏,写作',
					co: '我的长文本内容编辑中。我的长文本内容编辑中。我的长文本内容编辑中。我的长文本内容编辑中。我的长文本内容编辑中。我的长文本内容编辑中。我的长文本内容编辑中。。。'
				}
			};
		},
		computed: {
			datauser: {
				get() {
					return this.$global.G.datauser;
				},
				set(newVal) {
					Object.assign(this.$global.G.datauser, newVal);
				}
			}
		},
		onLoad(e) {
			this.saiUser(0);
			if (e.type) {
				this.userType = e.type;
			}
		},
		methods: {
			saiUser(type) {
				if (!this.saiCheckObj(this.$global.G.datauser) || type === 1) {
					let tempData = require('../../data/user.json');
					this.$global.G.datauser = {
						...tempData
					};
				}
			},
			editUser() {
				this.go('index?type=edit');
			},
			showUser() {
				this.go('index?type=show');
			},
			resetUser() {
				this.saiUser(1);
			}
		}
	};
</script>

<style></style>
