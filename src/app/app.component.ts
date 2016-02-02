import {Component} from 'angular2/core'
import  "./app.component.scss";
let requirejs = require( './require.js');
let legacy = require('./legacy.js');

let $script = require('scriptjs');

@Component({
	selector: 'my-app',
	template: require('./app.component.html')
})
export  class AppComponent{
	constructor (){
		console.log(requirejs.add(2,1));
		console.log(legacy.hello());
		$script('http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js', ()=> {
			console.log('wxlogin', window['WxLogin']);
		});
	}
}