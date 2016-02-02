import {Component} from 'angular2/core'
import  "./app.component.scss";
let requirejs = require( './require.js');
let legacy = require('./legacy.js');

//let $script = require('scriptjs');

let bmap = require('BMap');

@Component({
	selector: 'my-app',
	template: require('./app.component.html')
})
export  class AppComponent{
	constructor (){
		console.log(requirejs.add(2,1));
		console.log(legacy.hello());
		//$script('http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js', ()=> {
		//	console.log('wxlogin', window['WxLogin']);
		//});
	}

	loadMap = () => {
		console.log('about to load map');
		let map = new bmap.Map("container");          // 创建地图实例
		let point = new bmap.Point(116.404, 39.915);  // 创建点坐标
		map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别
	}
}