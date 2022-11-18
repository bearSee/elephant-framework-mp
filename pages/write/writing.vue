<template>
	<view class="writing">
		<view class="special-content" v-if="taskData">
			<view class="submit-box">
				<view class="title-box">
					<view class="title cut_font">{{ taskData.title }}</view>
					<view class="title-des cut_font">{{ taskData.titleDes }}</view>
				</view>
				<button class="submit" type="primary" @click="handlerSubmit">提交</button>
			</view>
			<view class="des cut_font_2">{{ taskData.des }}</view>
		</view>
		<view class="writing-content">
			<input
				class="title"
				type="text"
				v-model="formData.title"
				placeholder-style="color:#CCCCCC;font-size:36rpx;text-align:center;"
				placeholder="标题（小于40字）"/>
			<textarea
				class="content"
				v-model="formData.content"
				:maxlength="10000"
				placeholder-style="color:#CCCCCC;font-size:28rpx;"
				placeholder="任务模板（最多10000字）"/>
			<uni-file-picker limit="9"></uni-file-picker>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			taskData: null,
			formData: {},
		};
	},
	onLoad({ data }) {
		this.taskData = data ? JSON.parse(decodeURIComponent(data)) : null;
	},
	methods: {
		handlerSubmit() {
			console.log(this.formData);
			uni.showToast({ title: '提交成功' });
			uni.navigateBack();
			uni.navigateTo({
				url: `/pages/write/write-detail?type=share&detailId=${123}`,
			});
		},
	}
};
</script>

<style lang="scss">
	.writing {
		padding: 32rpx;
		font-family: Gen Jyuu Gothic-Regular, Gen Jyuu Gothic;
		font-weight: 400;
		.special-content {
			.submit-box {
				display: flex;
				margin-bottom: 8rpx;
				.title-box {
					width: calc(100% - 140rpx);
					margin-right: 20rpx;
					.title {
						font-size: 32rpx;
						color: #303030;
						line-height: 48rpx;
						margin-bottom: 8rpx;
					}
					.title-des {
						font-size: 28rpx;
						color: #666666;
						line-height: 42rpx;
					}
				}
				.submit {
					width: 120rpx;
					height: 60rpx;
					line-height: 60rpx;
					background: #FF8151;
					border-radius: 20rpx;
					border: 1rpx solid #FF8151;
					text-align: center;
					font-size: 26rpx;
					color: #FFFFFF;
					margin-top: 10rpx;
				}
			}
			.des {
				font-size: 24rpx;
				color: #CCCCCC;
				line-height: 36rpx;
			}
		}
		.writing-content {
			margin-top: 56rpx;
			.title {
				text-align: center;
				font-size: 36rpx;
				padding: 16rpx 0;
				border-bottom: 1px solid #D8D8D8;
			}
			.content {
				padding: 22rpx 0;
				font-size: 28rpx;
				color: #333333;
				line-height: 42rpx;
				height: 460rpx;
			}
		}
	}
</style>
