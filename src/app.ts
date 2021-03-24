import UIkit from 'uikit';
import './uikit.min.css';
import './style.css';
import Vue from 'vue';
import Host from './Host';

Vue.config.productionTip = false;

new Vue({
	el: '#app',
	components: {
		Host
	},
	template: '<Host/>'
});
