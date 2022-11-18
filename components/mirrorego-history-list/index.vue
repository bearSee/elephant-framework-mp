<template>
	<view class="history-list">
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
		<view class="list-box" v-if="historyList.length">
			<view
				class="list-item"
				v-for="(item, index) in historyList"
				:key="index">
				<view class="date-box">
					<view class="week">
						<text class="day">{{ item.day }}</text>
						<text class="weekday">{{ item.weekday }}</text>
					</view>
					<view class="date">{{ item.year }}.{{ item.month }}</view>
				</view>
				<view
					class="item-container"
					@click="handlerClick('view', item)">
					<view class="special-info">
						<view class="content-box">
							<view class="title cut_font">{{ item.title }}</view>
							<view class="des cut_font">{{ item.des }}</view>
							<view class="time">{{ item.time }}</view>
						</view>
						<image v-if="item.image" :src="item.image" mode=""></image>
					</view>
					<view class="operate-box">
						<view class="custom-title cut_font_2">{{ item.customTitle }}</view>
						<view class="operate">
							<image
								src="../../static/delete-icon.png"
								mode=""
								@click.stop="handlerDelete(item)">
							</image>
							<image
								src="../../static/share-icon.png"
								mode=""
								@click.stop="handlerClick('share', item)">
							</image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else class="empty-box">
			<image src="../../static/no_data.png" mode=""></image>
			<text class="text">暂无书写记录</text>
		</view>
		<!-- <uni-popup ref="popup" type="dialog">
			<view class="popup-content">
				<text>确定要删除本条书写记录？</text>
				<text>删除后将无法找回</text>
			</view>
			<view class="popup-operate-box">
				<button type="default" @click="handlerConfirm">确定</button>
				<button class="cancel" type="default" @click="$refs.popup.close()">取消</button>
			</view>
		</uni-popup> -->
	</view>
</template>

<script>
const testData = Array(3).fill().map((_, i) => ({
	id: i,
	time: '16:20',
	weekday: '周三',
	year: '2022',
	month: '10',
	day: i % 30 + 1,
	image: (i + 1) % 2 ? 'https://gimg3.baidu.com/search/src=http%3A%2F%2Fpics7.baidu.com%2Ffeed%2Fb8389b504fc2d562677cc1d0d807d1e476c66cbc.jpeg%40f_auto%3Ftoken%3D14d58352b90947a62837e64c9043051c&refer=http%3A%2F%2Fwww.baidu.com&app=2021&size=f360,240&n=0&g=0n&q=75&fmt=auto?sec=1668531600&t=ca708f3fb087cf05052c81f0c62bf321' : '',
	title: `${i + 10}天走出失恋阴影`,
	des: '书写你的训练计划',
	customTitle: '用户自定义标题',
}));

export default {
	name: 'mirroregoHistoryList',
	data () {
		return {
			historyList: testData,
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
			currentData: {},
		};
	},
	computed: {
		taskTypeName() {
			return (this.taskTypeData.find(({ code }) => code === this.taskType)  || {}).label || '';
		},
	},
	methods: {
		getHistoryList() {
			// uni.showLoading({
			// 	title: '加载中',
			// 	mask: true,
			// });
			// this.historyList = [];
			// uni.$request({
			// 	method: 'GET',
			// 	url: '/',
			// 	data: { taskType: this.taskType },
			// }).then((res) => {
			// 	this.historyList = res?.data?.data || [];
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
			this.getHistoryList();
		},
		handlerClick(type, data) {
			uni.navigateTo({
				url: `/pages/write/write-detail?type=${type}&detailId=${data.id}`,
			});
		},
		handlerDelete(data) {
			this.currentData = data;
			// this.$refs.popup.open();
			uni.showModal({
				title: '提示',
				content: '确定要删除本条书写记录?\n删除后将无法找回',
				cancelColor: '#FF8F1F',
				confirmColor: '#000000',
				success: ({ confirm }) => {
					if (confirm) this.handlerConfirm();
				},
			});
		},
		handlerConfirm() {
			// this.$refs.popup.close();
			uni.showLoading({
				title: '加载中',
				mask: true,
			});
			uni.$request({
				method: 'GET',
				url: '/',
				data: { id: this.currentData.id },
			}).then(() => {
				this.getHistoryList();
				uni.showToast({
					duration: 2000,
					title: '删除成功',
				});
			}).catch(() => {
				uni.showToast({
					duration: 2000,
					title: '删除失败',
					icon: 'none',
				});
			}).finally(uni.hideLoading);
		},
	},
	mounted() {
		this.getHistoryList();
	},
	
};
</script>

<style lang="scss">
.history-list {
	height: 100%;
	position: relative;
	font-family: PingFang SC;
	font-weight: 400;
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
		padding-top: 10rpx;
		padding-bottom: 50rpx;
		.list-item {
			box-sizing: border-box;
			width: 100%;
			margin: 32rpx 0;
			display: flex;
			.date-box {
				width: 130rpx;
				min-width: 130rpx;
				margin: auto 0;
				color: #303030;
				font-size: 24rpx;
				.week {
					.day {
						font-size: 32rpx;
						margin-right: 10rpx;
					}
					.weekday {
						
					}
				}
				.date {
					margin-top: 10rpx;
				}
			}
			.item-container {
				width: calc(100% - 130rpx);
				border-radius: 16rpx;
				background: #fff;
				padding: 17rpx;
				padding-bottom: 20rpx;
				box-sizing: border-box;
				.special-info {
					display: flex;
					.content-box {
						flex: 1 1 auto;
						max-width: 100%;
						width: calc(100% - 136rpx);
						.title {
							font-size: 32rpx;
							color: #303030;
							line-height: 48rpx
						}
						.des {
							font-size: 26rpx;
							color: #666;
							line-height: 42rpx;
							margin: 8rpx 0 4rpx 0;
						}
						.time {
							font-size: 24rpx;
							color: #ABB3BB;
							line-height: 40rpx;
						}
					}
					image {
						width: 136rpx;
						height: 136rpx;
						margin-left: 15rpx;
						border-radius: 16rpx;
					}
				}
				.operate-box {
					margin-top: 20rpx;
					.custom-title {
						font-size: 24rpx;
						color: #666666;
						line-height: 36rpx
					}
					.operate {
						display: flex;
						justify-content: flex-end;
						image {
							width: 32rpx;
							height: 32rpx;
							margin: auto 18rpx;
							margin-right: 0;
						}
					}
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
	.popup-content {
		background: #fff;
		width: 560rpx;
		height: 192rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		border-radius: 21rpx 21rpx 0 0;
		text {
			margin: 5rpx auto;
		}
	}
	.popup-operate-box {
		display: flex;
		button {
			width: 50%;
			border: 0;
			border-radius: 0;
			font-size: 32rpx;
			border-radius: 0 0 0 21rpx;
			background: #fff;
			border-top: 1px solid #eee;
			&::after {
				display: none;
			}
			&.cancel {
				color: #FF8F1F;
				border-radius: 0 0 21rpx 0;
				border-left: 1px solid #eee;
			}
		}
	}
}
</style>
