<template>
	<view class="write-index">
		<view class="tab-box">
			<view
				v-for="(tab, index) in tabs"
				:class="['tab-item', currentTab === tab.code && 'is-active']"
				:key="index"
				@click="handlerChangeTab(tab)">
				<text>{{ tab.label }}</text>
				<image v-if="currentTab === tab.code" src="/static/active-tab.png" mode=""></image>
			</view>
		</view>
		<view class="container">
			<mirrorego-task-list v-if="currentTab === 'task'" />
			<mirrorego-history-list v-else-if="currentTab === 'history'" />
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tabs: [
				{
					label: '我的书写任务',
					code: 'task',
				},
				{
					label: '我的书写记录',
					code: 'history',
				},
			],
			currentTab: 'task',
		};
	},
	methods: {
		handlerChangeTab(tab) {
			this.currentTab = tab.code;
		},
	}
};
</script>

<style lang="scss">
.write-index {
	height: calc(100vh - 44px);
	overflow: hidden;
	background-color: #FAF8F7;
	.tab-box {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 36rpx;
		display: flex;
		padding-bottom: 20rpx;
		.tab-item {
			width: 50%;
			height: 60rpx;
			line-height: 60rpx;
			box-sizing: border-box;
			text-align: center;
			position: relative;
			&:nth-child(1) {
				border-right: 2rpx solid #FFEDDC;
			}
			image {
				width: 130rpx;
				height: 26rpx;
				position: absolute;
				bottom: -18rpx;
				left: 40%;
				transform: translateX(-50%);
			}
			&.is-active {
				font-size: 32rpx;
				color: #000000;
			}
		}
	}
	.container {
		height: calc(100% - 82rpx);
		overflow-y: auto;
	}
}
</style>
