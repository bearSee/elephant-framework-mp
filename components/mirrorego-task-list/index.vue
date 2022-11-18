<!-- 仅为实例 -->
<template>
	<view class="task-list">
		<view class="filter-box" @click="handlerClickFilter">
			<text>{{ taskTypeName }}</text>
			<image src="/static/filter.png" mode=""></image>
		</view>
		<!-- <uni-transition
			custom-class="transition task-type-selection"
			:mode-class="['fade', 'zoom-out']"
			:show="visible">
			<view
				v-for="(item,index) in taskTypeData"
				:key="index"
				:class="['type-item', item.code === taskType && 'is-active']"
				@click="handlerChangeFilter(item.code)">{{ item.label }}
			</view>
		</uni-transition> -->
		<view class="list-box" v-if="taskList.length">
			<view
				class="list-item"
				v-for="(item, index) in taskList"
				:key="index"
				@click="handlerClick(item)">
				<image class="image-cover" :src="item.image" alt="" srcset="">
				<view class="title-box">
					<view class="title cut_font">{{ item.title }}</view>
					<view class="des cut_font">{{ item.des }}</view>
				</view>
			</view>
		</view>
		<view v-else class="empty-box">
			<image src="../../static/no_data.png" mode=""></image>
			<text class="text">暂无书写任务</text>
		</view>
	</view>
</template>

<script>
const testData = Array(5).fill().map((_, i) => ({
	id: i,
	image: 'https://gimg3.baidu.com/search/src=http%3A%2F%2Fpics7.baidu.com%2Ffeed%2Fb8389b504fc2d562677cc1d0d807d1e476c66cbc.jpeg%40f_auto%3Ftoken%3D14d58352b90947a62837e64c9043051c&refer=http%3A%2F%2Fwww.baidu.com&app=2021&size=f360,240&n=0&g=0n&q=75&fmt=auto?sec=1668531600&t=ca708f3fb087cf05052c81f0c62bf321',
	title: `${i + 10}天走出失恋阴影`,
	titleDes: '书写你的训练计划天走出失恋阴影天走出失恋阴影天走出失恋阴影',
	des: '书写你的训练计',
}));

export default {
	name: 'mirroregoTaskList',
	data () {
		return {
			taskList: testData,
			taskTypeData: [
				{
					label: "全部任务",
					code: "1",
				},
				{
					label: "今日任务",
					code: "2",
				},
				{
					label: "一周内任务",
					code: "23",
				},
				{
					label: "一个月任务",
					code: "22",
				},
			],
			taskType: '1',
			visible: false,
		};
	},
	computed: {
		taskTypeName() {
			return (this.taskTypeData.find(({ code }) => code === this.taskType)  || {}).label || '';
		},
	},
	methods: {
		getTaskList() {
			// uni.showLoading({
			// 	title: '加载中',
			// 	mask: true,
			// });
			// this.taskList = [];
			// uni.$request({
			// 	method: 'GET',
			// 	url: '/',
			// 	data: { taskType: this.taskType },
			// }).then((res) => {
			// 	this.taskList = res?.data?.data || [];
			// }).finally(uni.hideLoading);
		},
		handlerClickFilter() {
			this.visible = true;
			uni.showActionSheet({
				itemList: this.taskTypeData.map(({ label }) => label),
				success: ({ tapIndex }) => {
					this.handlerChangeFilter(this.taskTypeData[tapIndex].code);
				},
				fail: () => {},
			});
		},
		handlerChangeFilter(code) {
			this.visible = false;
			this.taskType = code;
			this.getTaskList();
		},
		handlerClick(data) {
			uni.navigateTo({
				url: `/pages/write/writing?data=${encodeURIComponent(JSON.stringify(data))}`,
			});
		},
	},
	mounted() {
		this.getTaskList();
	},
};
</script>

<style lang="scss">
.task-list {
	height: 100%;
	position: relative;
	font-family: PingFang SC;
	overflow-y: auto;
	.filter-box {
		font-size: 28rpx;
		font-weight: 400;
		color: #FE8151;
		line-height: 36rpx;
		display: flex;
		margin-bottom: 14rpx;
		text {
			margin-right: 10rpx;
		}
		image {
			width: 32rpx;
			height: 32rpx;
			margin: auto 0;
		}
	}
	.task-type-selection {
		position: absolute;
		top: 48rpx;
		left: 0;
		z-index: 2;
		background: #fff;
		padding: 20rpx 30rpx;
		box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5);
		.type-item {
			border-bottom: 1rpx solid #e6e6e6;
			padding: 20rpx 0;
			color: #333;
			font-size: 26rpx;
			&.is-active {
				color: #FE8151;
				border-color: #FE8151;
			}
			&:nth-last-child(1) {
				border-bottom: 0;
			}
		}
	}
	.list-box {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding-bottom: 50rpx;
		.list-item {
			box-sizing: border-box;
			width: calc(50% - 10rpx);
			margin: 24rpx 0;
			.image-cover {
				width: 336rpx;
				height: 190rpx;
			}
			.title-box {
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 36rpx;
				.title {
					margin: 20rpx 0 12rpx 0;
					font-size: 32rpx;
					color: #333333;
				}
				.des {
					font-size: 24rpx;
					color: #B3B3B3;
				}
			}
		}
	}
	.empty-box {
		display: flex;
		flex-direction: column;
		image {
			width: 170rpx;
			height: 167rpx;
			margin: 270rpx auto 0 auto;
		}
		.text {
			font-size: 30rpx;
			font-weight: 300;
			color: #666666;
			margin: 50rpx auto;
		}
	}
}
</style>
