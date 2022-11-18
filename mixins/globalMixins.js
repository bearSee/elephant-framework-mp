import {
	mirroregoImgPath
} from "../utils/config"
export const globalMixins = {
	data() {
		return {
			imageMode: 'widthFix', // 示例：image mode
			mirroregoImgPath: mirroregoImgPath, // 示例：image src 使用图片url
			userInfo: uni.getStorageSync('userInfo'),
			isLogin: uni.getStorageSync('userInfo').constructor === Object ? true : false
		}
	},
	onShow() {
		this.userInfo = uni.getStorageSync('userInfo')
		this.isLogin = uni.getStorageSync('userInfo').constructor === Object ? true : false
	}
}
