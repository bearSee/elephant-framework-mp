// const baseUrl = 'https://2c.mirrorego.com/'
import {
	baseRequestDomain
} from './config.js'

const request = ({
	method = 'GET',
	url,
	data = {},
	header = {}
}) => {
	header.token = uni.getStorageSync('larsonToken')
	header.appId = "wxe9bbb7c761b5e0af"
	header.orgId = '1483693765398867968'
	header['Accept-Language'] = "zh_CN"
	return new Promise((resolve, reject) => {
		uni.request({
			url: url.includes('http') ? url : `${baseRequestDomain}${url}`, //仅为示例，并非真实接口地址。,
			method,
			data,
			header,
			success: res => {
				if (res.data?.status === 200) {
					resolve(res.data);
					return;
				}
				reject(res);
			},
			fail: err => {
				reject(err)
			},
			complete: () => {}
		})
	})
}

uni.$request = request;
export default request;