<template>
  <div id="app">
		<h1>Make Your Favorite Gradient</h1>
    <HelloWorld/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style>
	* {
		margin: 0;
		padding: 0;
		font-family: "微软雅黑";
	}
	
	html,
	body {
		height: 100%;
		overflow: hidden;
	}
	h1{
		color: #fff;
		text-shadow: 2px 3px 0px #898999;
	}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
	margin-top: 60px;
}
#app .m-colorPicker{
	display: block;
}
#app .m-colorPicker .colorBtn{
	position: relative;
	top: 0;
	width: 100px;
	height: 30px;
	border-radius: 30px;
	margin: 0 auto 0;
}
</style>
