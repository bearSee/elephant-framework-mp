<template>
	<view class="">
		<canvas class="canvas" canvas-id="canvas" :style="{ height: canvasHeight + 'px' }" />
		<image style="border: 1px solid #000;" :src="tempFilePath" mode="widthFix"></image>
	</view>
</template>

<script>
export default {
	data() {
		return {
			shareType: 'save',
			defaultImages: [],
			tempFilePath: null,
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
			canvasWidth: 350,
			canvasHeight: 350,
		};
	},
	onLoad({ type, canvasWidth, canvasHeight, data }) {
		this.shareType = type || 'save';
		this.canvasWidth = canvasWidth || 350;
		this.canvasHeight = canvasHeight || 350;
		// this.detailData = data ? JSON.parse(decodeURIComponent(data)) : null;
	},
	onReady() {
		Promise.all((this.detailData?.images || []).map(url => uni.downloadFile({ url }))).then((resArr) => {
			this.defaultImages = resArr.flat(2).filter(d => d).map(({ tempFilePath }) => tempFilePath);
			this.drawImageToTempFilePath();
		});
	},
	methods: {
		drawImageToTempFilePath() {
			const _this = this;
			uni.showLoading({ title: '图片绘制中...', mask: true });
			const ctx = uni.createCanvasContext('canvas');
			
			ctx.font = '20px HarmonyOS Sans SC-Regular, HarmonyOS Sans SC';
			ctx.setFillStyle('#333333');
			ctx.fillText(this.detailData.customTitle || '主标题', 28, 49);
			
			ctx.setFontSize(12);
			ctx.setFillStyle('#ABB3BB');
			ctx.fillText(this.detailData.time || '时间', 29, 75);
			
			ctx.setFontSize(14);
			ctx.setFillStyle('#333333');
			let currentY = this.canvasTextAutoLine(ctx, this.detailData.content || '正文', 28, 103, this.canvasWidth - 56, 23);
			
			this.defaultImages.forEach((image) => {
				const imageHeight = 300;
				ctx.drawImage(image, 28, currentY, this.canvasWidth - 56, imageHeight);
				currentY += (imageHeight + 4);
			});
			
			ctx.fill();
			
			ctx.draw(true, () => {
				setTimeout(() => {
					uni.canvasToTempFilePath({
						fileType: 'png',
						canvasId: 'canvas',
						success(res) {
							_this.tempFilePath = res.tempFilePath;
							_this[({
								share: 'shareImage',
								save: 'saveImageToPhotosAlbum',
							})[_this.shareType]]();
						},
						fail() {
							uni.showModal({
								title: '提示',
								content: '图片绘制失败，请稍后重试！',
								confirmText: '好的',
								showCancel: false,
							});
						},
						complete: uni.hideLoading,
					}, _this);
				}, 300);
			});
		},
		canvasTextAutoLine(ctx, text, x, y, maxWidth, lineHeight) {
			let lineWidth = 0;
			let lastSubStrIndex = 0;
			for (let i = 0; i < text.length; i++) {
				lineWidth += ctx.measureText(text[i]).width;
				if (lineWidth > maxWidth) {
					ctx.fillText(text.substring(lastSubStrIndex, i), x, y);
					y += lineHeight;
					lineWidth = 0;
					lastSubStrIndex = i;
				}
				if (i === text.length - 1) {
					ctx.fillText(text.substring(lastSubStrIndex, text.length), x, y);
				}
			}
			return y + lineHeight;
		},
		saveImage() {
			uni.saveImageToPhotosAlbum({
				filePath: this.tempFilePath,
				success() {
					uni.showToast({ title: '已保存至相册' });
				},
				fail(err) {
					uni.showToast({ title: '图片保存失败', icon: 'none' });
				},
			});
		},
		// 保存到相册
		saveImageToPhotosAlbum() {
			const _this = this;
			uni.getSetting({
				success(res) {
					if (res.authSetting['scope.writePhotosAlbum']) {
						_this.saveImage();
						return;
					}
					uni.authorize({
						scope: 'scope.writePhotosAlbum',
						success() {
							_this.saveImage();
						},
						fail() {
							uni.showModal({
								title: '提示',
								content: '未授权，保存失败！',
								confirmText: '好的',
								showCancel: false,
							});
						},
					});
				},
			});
		},
		// 分享给朋友
		shareImage() {
			if (wx && wx.showShareImageMenu) {
				wx.showShareImageMenu({ path: this.tempFilePath });
			}
		},
	}
};
</script>

<style lang="scss">
	.canvas {
		width: 100vw;
		min-height: 100vh;
	}
</style>
