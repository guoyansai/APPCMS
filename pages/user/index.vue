<template>
	<view class="index-user">
		<view class="s-user-edit" v-if="userType === 'edit'">
			<view class="s-user-top">
				<view class="s-user-ic"><img :src="dataUser.ic" /></view>
				<view class="s-user-tt">
					{{ dataUser.tt }}
					<view class="s-user-to">{{ dataUser.to }}</view>
				</view>
			</view>
			<view class="s-user-li">性别：{{ dataUser.sx === 1 ? '男' : '女' }}</view>
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
				<input type="text" v-model="dataUser.jx" />
				<view class="s-user-lis">
					老家：
					<input type="text" v-model="dataUser.jj" />
				</view>
			</view>
			<view class="s-user-li">
				学历：
				<input type="text" v-model="dataUser.zl" />
				<view class="s-user-lis">
					学校：
					<input type="text" v-model="dataUser.zx" />
				</view>
			</view>
			<view class="s-user-li">
				职业：
				<input type="text" v-model="dataUser.zy" />
				<view class="s-user-lis">
					经验：
					<input type="text" v-model="dataUser.zj" />
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
				<button class="mini-btn" type="primary" size="mini" @tap="showUser()">更新信息</button>
				<button class="mini-btn" type="default" size="mini" @tap="resetUser()">复位</button>
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
			<view class="s-user-li">性别：{{ dataUser.sx === 1 ? '男' : '女' }}</view>
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
			<view class="s-user-button"><button class="mini-btn" type="primary" size="mini" @tap="editUser()">编辑信息</button></view>
		</view>
		<view class="s-user-des">注意：以上信息仅限本地使用。</view>
		<view class="s-user-des">App Ver {{ $config.ver }} & Data Ver {{ dataIndex.ver }}</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
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
	onLoad(e) {
		this.saiUser(0);
		if (e.type) {
			this.userType = e.type;
		}
	},
	methods: {
		editUser() {
			this.go('?type=edit');
		},
		showUser() {
			this.go('?type=show');
		},
		resetUser() {
			this.saiUser(1);
		}
	}
};
</script>

<style></style>
