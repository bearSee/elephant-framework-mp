<template>
	<view class="write-detail">
		<view class="special-content">
			<view class="date-box">
				<view class="week">
					<text class="day">{{ detailData.day }}</text>
					<text class="weekday">{{ detailData.weekday }}</text>
				</view>
				<view class="date">{{ detailData.year }}.{{ detailData.month }}</view>
			</view>
			<view class="title-box">
				<view class="title cut_font">{{ detailData.title }}</view>
				<view class="title-des cut_font">{{ detailData.titleDes }}</view>
			</view>
		</view>
		<view class="write-content">
			<view class="title">{{ detailData.customTitle }}</view>
			<view class="time">{{ detailData.time }}</view>
			<view class="content">{{ detailData.content }}</view>
			<view class="images" v-if="detailData.images && detailData.images.length">
				<image
					class="image"
					v-for="image in detailData.images"
					:src="image"
					mode="widthFix">
				</image>
			</view>
		</view>
		<view class="reply-box" v-if="detailData.reply">
			<image class="avatar" src="../../static/replyer.png" mode=""></image>
			<view class="reply-content">
				<view class="title">咨询师回复</view>
				<view class="content">{{ detailData.reply }}</view>
			</view>
		</view>
		<view class="write-footer">
			<view class="button-list" v-if="detailType === 'view'">
				<image
					src="../../static/share-icon.png"
					mode=""
					@click="detailType = 'share'">
				</image>
				<image
					src="../../static/delete-icon.png"
					mode=""
					@click="handlerDelete">
				</image>
			</view>
			<view class="button-list" v-else-if="detailType === 'share'">
				<button type="primary" @click="handlerShare('share')">分享给朋友</button>
				<button type="primary" @click="handlerShare('save')">保存到相册</button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			detailId: null,
			// 'view' or 'share'
			detailType: 'view',
			detailData: {
				title: '14天走出失恋阴影',
				titleDes: '书写你的训练计划',
				id: 666,
				time: '16:20',
				weekday: '周三',
				year: '2022',
				month: '10',
				day: '08',
				reply: '学而时习之不亦说乎？有朋自远方来不亦君子乎？学而时习之不亦说乎？有朋自远方来不亦君子乎？',
				customTitle: '伦敦的风光让我陶醉',
				content: '王守仁，汉族，幼名云，字伯安，号阳明，封新建伯，谥文成，人称王阳明。明代最著名的思想家、文学家、哲学家和军事家。王阳明不仅是宋明心学的集大成者，一生事功也是赫赫有名，故称之为“真三不朽”其学术思想在中国、日本、朝鲜半岛以及东南亚国家乃至全球都有重要而深远的影响，因此，王守仁和孔子、孟子、朱熹并称为孔、孟、朱、王。',
				images: Array(4).fill().map(() => 'https://alipic.lanhuapp.com/MasterSlicePNG3ed0cd524301292a6a85cff20d88d237.png'),
			},
		};
	},
	onLoad({ type, detailId }) {
		this.detailId = detailId;
		this.detailType = type || 'view';
		this.getDetailData();
	},
	methods: {
		getDetailData() {
			uni.showLoading({
				title: '加载中',
				mask: true,
			});
			uni.$request({
				method: 'GET',
				url: '/',
				data: { id: this.detailId },
			}).then((res) => {
				this.detailData = res?.data?.data || {};
			}).finally(uni.hideLoading);
		},
		handlerDelete() {
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
			uni.showLoading({
				title: '加载中',
				mask: true,
			});
			uni.$request({
				method: 'GET',
				url: '/',
				data: { id: this.detailId },
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
		handlerShare(type) {
			const dom = uni.createSelectorQuery().select('.write-content');
			dom.boundingClientRect((data) => {
				const canvasWidth = data.left + data.right;
				const canvasHeight = data.height;
				uni.navigateTo({
					url: `/pages/write/detail-share?type=${type}&canvasWidth=${canvasWidth}&canvasHeight=${canvasHeight}&data=${encodeURIComponent(JSON.stringify(this.detailData))}`,
				});
			}).exec();
		},
	},
	
};
</script>

<style lang="scss">
	.write-detail {
		padding: 30rpx 54rpx 230rpx 54rpx;
		font-family: Gen Jyuu Gothic-Regular, Gen Jyuu Gothic;
		font-weight: 400;
		.special-content {
			display: flex;
			.date-box {
				width: 140rpx;
				min-width: 140rpx;
				// margin: auto 0;
				color: #303030;
				font-size: 26rpx;
				.week {
					.day {
						font-size: 36rpx;
						margin-right: 10rpx;
					}
					.weekday {
						
					}
				}
				.date {
					margin-top: 10rpx;
				}
			}
			.title-box {
				width: calc(100% - 140rpx);
				margin-top: 3rpx;
				.title {
					font-size: 32rpx;
					color: #303030;
					line-height: 48rpx;
					margin-bottom: 6rpx;
				}
				.title-des {
					font-size: 28rpx;
					color: #666666;
					line-height: 42rpx;
				}
			}
		}
		.write-content {
			margin-top: 52rpx;
			.title {
				font-size: 40rpx;
				color: #333333;
				line-height: 56rpx;
			}
			.time {
				font-size: 24rpx;
				color: #ABB3BB;
				line-height: 40rpx;
			}
			.content {
				margin: 36rpx 0 50rpx 0;
			}
			.images {
				.image {
					width: 100%;
				}
			}
		}
		.reply-box {
			display: flex;
			.avatar {
				width: 100rpx;
				height: 100rpx;
				margin: auto 0;
				margin-right: 60rpx;
			}
			.reply-content {
				width: calc(100% - 154rpx);
				margin-top: 60rpx;
				font-family: HarmonyOS Sans SC-Regular, HarmonyOS Sans SC;
				.title {
					font-size: 32rpx;
					font-weight: 400;
					color: #333333;
					line-height: 36rpx;
				}
				.content {
					margin-top: 30rpx;
					font-size: 28rpx;
					font-weight: 400;
					color: #646464;
					line-height: 36rpx;
				}
			}
		}
		.write-footer {
			width: 100%;
			height: 160rpx;
			box-shadow: 0px -5px 7px 0px rgba(215.7336974143982,215.7336974143982,215.7336974143982,0.5);
			position: fixed;
			bottom: 0;
			left: 0;
			background: #fff;
			.button-list {
				display: flex;
				justify-content: center;
				height: 100%;
				button {
					width: 280rpx;
					height: 68rpx;
					line-height: 68rpx;
					background: #FF8151;
					font-size: 28rpx;
					font-family: Nunito Sans-SemiBold, Nunito Sans;
					font-weight: 600;
					color: #FFFFFF;
					margin: auto 31rpx;
					text-align: center;
					border-radius: 50rpx;
				}
				image {
					width: 39rpx;
					height: 42rpx;
					margin: auto 75rpx;
				}
			}
		}
	}
</style>
