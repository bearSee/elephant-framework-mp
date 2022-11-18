import App from './App'
import messages from './locale/index'
import './utils/request'
import {
	globalMixins
} from './mixins/globalMixins.js'

let i18nConfig = {
	locale: uni.getLocale(),
	messages
}

// #ifndef VUE3
import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
Vue.mixin(globalMixins)
const i18n = new VueI18n(i18nConfig)
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	i18n,
	...App
})
app.$mount()
// #endif
