<template>
	<div>
		<div class="bg" :style="{width:screenWidth,height:clientHeight,background:'linear-gradient('+ place[current].css +','+colors1.hex+','+gracolor(colors1.hex,colors2.hex)+','+colors2.hex+','+gracolor(colors2.hex,colors3.hex)+','+colors3.hex+')'}"></div>
		<div class="hello">
			<!-- 	<colorPicker v-model="color"></colorPicker>
		<span>{{color}}</span> -->
			<div class="btn" @click="changecolor(colors1,0)" :style="{background: colors1.hex}"><input v-model="colors1.hex"
				 :style="{color:(getcolor(colors1.rgba)?'#000':'#fff')}" /></div>
			<div class="btn" @click="changecolor(colors2,1)" :style="{background: colors2.hex}"><input v-model="colors2.hex"
				 :style="{color:(getcolor(colors2.rgba)?'#000':'#fff')}" /></div>
			<div class="btn" @click="changecolor(colors3,2)" :style="{background: colors3.hex}"><input v-model="colors3.hex"
				 :style="{color:(getcolor(colors3.rgba)?'#000':'#fff')}" /></div>
			<ul class="placelist">
				<li v-for="(item,index) in place" :key="index" :class="index == current?'act':''" @click="changebtn(index)" :style="{transform:'rotate(' + item.deg +  ')'}"></li>
			</ul>
			<photoshop-picker :value="color" v-model="color" @input="updateValue()" />
		</div>
	</div>
</template>

<script>
	import {
		Chrome
	} from 'vue-color'
	export default {
		name: 'HelloWorld',
		props: {
			msg: String
		},
		components: {
			'photoshop-picker': Chrome
		},
		data() {
			return {
				place: [{
					'css': 'to right top',
					'deg': '45deg'
				}, {
					'css': 'to right',
					'deg': '90deg'
				}, {
					'css': 'to right bottom',
					'deg': '135deg'
				}, {
					'css': 'to bottom',
					'deg': '180deg'
				}, {
					'css': 'to left bottom',
					'deg': '225deg'
				}, {
					'css': 'to left',
					'deg': '270deg'
				}, {
					'css': 'to left top',
					'deg': '315deg'
				}, {
					'css': 'to top',
					'deg': '360deg'
				}],
				current: 0,
				num: 0,
				color: {},
				colors1: {
					hex: '#fc4a1a',
					hsl: {
						h: 13,
						s: 90,
						l: 59,
						a: 1
					},
					hsv: {
						h: 13,
						s: 90,
						v: 0.30,
						a: 1
					},
					rgba: {
						r: 252,
						g: 74,
						b: 26,
						a: 1
					},
					a: 1
				},
				colors2: {
					hex: '#f9b21e',
					hsl: {
						h: 40,
						s: 88,
						l: 78,
						a: 1
					},
					hsv: {
						h: 40,
						s: 88,
						v: 0.30,
						a: 1
					},
					rgba: {
						r: 249,
						g: 178,
						b: 30,
						a: 1
					},
					a: 1
				},
				colors3: {
					hex: '#f7b733',
					hsl: {
						h: 40,
						s: 79,
						l: 79,
						a: 1
					},
					hsv: {
						h: 40,
						s: 79,
						v: 0.30,
						a: 1
					},
					rgba: {
						r: 247,
						g: 183,
						b: 51,
						a: 1
					},
					a: 1
				},
				show: false,
				screenWidth: '',
				clientHeight: ''
			}
		},
		mounted() {
			this.screenWidth = `${document.documentElement.clientWidth}px`;
			this.clientHeight = `${document.documentElement.clientHeight}px`;
			// 然后监听window的resize事件．在浏览器窗口变化时再设置下背景图高度．
			const that = this;
			window.onresize = function temp() {
				that.screenWidth = `${document.documentElement.clientWidth}px`;
				that.clientHeight = `${document.documentElement.clientHeight}px`;
			};
			this.color = this.colors1;
		},
		methods: {
			getcolor(rgba) {
				return (
					0.213 * rgba.r + 0.715 * rgba.g + 0.072 * rgba.b > 255 / 2
				);
			},
			changecolor(color, num) {
				this.color = color;
				this.num = num;
			},
			updateValue() {
				let i = this.num;
				if (i == 0) {
					this.colors1 = this.color;
				} else if (i == 1) {
					this.colors2 = this.color;
				} else {
					this.colors3 = this.color;
				}
			},
			changebtn(i) {
				this.current = i;
			},
			parseColor(hexStr){
				return hexStr.length === 4 ? hexStr.substr(1).split('').map(function (s) { return 0x11 * parseInt(s, 16); }) : [hexStr.substr(1, 2), hexStr.substr(3, 2), hexStr.substr(5, 2)].map(function (s) { return parseInt(s, 16); })
			},
			pad(s){
				 return (s.length === 1) ? '0' + s : s;
			},
			gracolor(start, end, steps = 100, gamma) {
				var i, j, ms, me, output = [],
					so = [];
				gamma = gamma || 1;
				var normalize = function(channel) {
					return Math.pow(channel / 255, gamma);
				};
				start = this.parseColor(start).map(normalize);
				end = this.parseColor(end).map(normalize);
				for (i = 0; i < steps; i++) {
					ms = i / (steps - 1);
					me = 1 - ms;
					for (j = 0; j < 3; j++) {
						so[j] = this.pad(Math.round(Math.pow(start[j] * me + end[j] * ms, 1 / gamma) * 255).toString(16));
					}
					output.push('#' + so.join(''));
				}
				return output[50];
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	h3 {
		margin: 40px 0 0;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		display: inline-block;
		margin: 0 10px;
	}

	a {
		color: #42b983;
	}

	#app input {
		line-height: 2;
		background: transparent;
		width: 60px;
		height: 100%;
		border: none;
		margin: 0 auto 0;
		font-family: 'Montserrat', sans-serif;
	}

	#app input::-webkit-input-placeholder {
		font-family: 'Montserrat', sans-serif;
	}

	#app .btn {
		width: 225px;
		height: 30px;
		border-radius: 30px;
		margin: 40px auto;
		transition: all .2s;
		box-shadow: 0 0 20px #000;
	}

	.vc-chrome {
		margin: 10px auto 0;
	}

	#app .btn:hover {
		transform: scale(1.1);
	}

	.bg {
		position: fixed;
		top: 0;
		left: 0;
		z-index: -1;
		transition: all .2s;
	}

	.placelist {
		width: 470px;
		margin: 0 auto 40px;
	}

	.placelist li {
		list-style: none;
		float: left;
		width: 36px;
		height: 36px;
		border-radius: 50%;
		border: 1px solid #fff;
		transition: all .2s;
		cursor: pointer;
		background: url(../assets/jiant.png) no-repeat center center/70% 70%;
	}

	.placelist li.act {
		transform: scale(1.01);
		box-shadow: 0 0 20px #000;
	}

	.placelist::after {
		content: '';
		display: block;
		clear: both;
	}
</style>
