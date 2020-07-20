<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style type="text/css">
	#app{
		overflow: hidden;
	}
	#app .main-container .navbar{
		background-color: peachpuff !important;
	}
	#app .main-container:nth-child(2){
		background-color: #eee;
	}
	.app-main{
		background-color: #fff;
	}
	.sidebar-logo-container[data-v-6494804b]{
		background-color: peachpuff !important;
		border-bottom: 1px solid #ddd;
		
	}
	.sidebar-logo-container .sidebar-logo-link .sidebar-title[data-v-6494804b] {
		color: #fda0a9 !important;
	}
	#app .sidebar-container {
		border-right: 1px solid #ddd;
	}
	.el-form-item__content{
		font-size: 20px;
		color: #fda0a9;
		text-align: center;
		font-weight: bold;
	}
	.login-form .el-input__inner{
		background-color: transparent;
		border:1px solid peachpuff;
		color: pink;
	}
	.search_bar .el-input__inner{		
		border:1px solid pink;
	}
	
</style>