import UIkit from 'uikit';
import './uikit.min.css';
import './style.css';
import Vue from 'vue';
import host from './host';

Vue.config.productionTip = false;

new Vue({
	el: '#app',
	components: {
		host: host,
	},
	template: '<host></host>'
});
