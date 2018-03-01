<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>LarryCMS后台登录</title>
	<meta name="renderer" content="webkit">	
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">	
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">	
	<meta name="apple-mobile-web-app-capable" content="yes">	
	<meta name="format-detection" content="telephone=no">	
	<!-- load css -->
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/libs/layui/css/layui.css" media="all">
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/admin/css/login.css" media="all">
</head>
<body>
<div class="layui-canvs"></div>
<form method="post" action="">
	<div class="layui-layout layui-layout-login">
		<h1>
			 <strong>LarryCMS管理系统后台</strong>
			 <em>Management System</em>
		</h1>
		<div class="layui-user-icon larry-login">
			 <input type="text" placeholder="账号" class="login_txtbx" name="logon_name"/>
		</div>
		<div class="layui-pwd-icon larry-login">
			 <input type="password" placeholder="密码" class="login_txtbx" name="password"/>
		</div>
	    <div class="layui-val-icon larry-login">
	    	<div class="layui-code-box">
	    		<input type="text" id="code" name="code" placeholder="验证码" maxlength="4" class="login_txtbx">
	            <img src="images/verifyimg.png" alt="" class="verifyImg" id="verifyImg" onclick="javascript:this.src='xxx'+Math.random();">
	    	</div>
	    </div>
	    <div class="layui-submit larry-login">
	    	<input type="submit" value="立即登陆" class="submit_btn"/>
	    </div>
	    <div class="layui-login-text">
	    	<p>© 2016-2017 Larry 版权所有</p>
	        <p>鄂xxxxxx <a href="http://www.qinshouwei.com" title="">qinshouwei.com</a></p>
	    </div>
	</div>
</form>
<script type="text/javascript" src="/static/libs/layui/layui.all.js"></script>
<script type="text/javascript" src="/static/admin/js/login.js"></script>
<script type="text/javascript" src="/static/libs/jparticle.jquery.js"></script>
<script type="text/javascript">
$(function(){
	$(".layui-canvs").jParticle({
		background: "#141414",
		color: "#E6E6E6"
	});
	//登录链接测试，使用时可删除
// 	$(".submit_btn").click(function(){
// 	  location.href="index.html";
// 	});
});
</script>
</body>
</html>