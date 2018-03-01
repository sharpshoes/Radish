<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
	
	<title>layout 后台大布局 - Layui</title>
	<!-- 公用部分 start-->
<%-- 	<link rel="stylesheet" href="<%=request.getContextPath()%>/static/libs/layui/css/layui.css"> --%>
<%-- 	<link rel="stylesheet" href="<%=request.getContextPath()%>/static/admin/css/global.css"> --%>
<%-- 	<script src="<%=request.getContextPath()%>/static/libs/jquery-1.12.0.min.js"></script> --%>
<%-- 	<script src="<%=request.getContextPath()%>/static/libs/vue.js"></script> --%>
<%-- 	<script src="<%=request.getContextPath()%>/static/libs/base.js"></script> --%>
	<jsp:include page="..//common/baseFile.jsp"></jsp:include>
	<!-- 公用部分 end-->
	
	<link rel="stylesheet" href="/static/admin/css/adminstyle.css">
</head>
<body class="layui-layout-body">
<div class="layui-layout layui-layout-admin">
	<div class="layui-header">
		<div class="layui-logo">LOGO区域</div>
		<!-- 头部区域（可配合layui已有的水平导航） -->
		<!--
		<ul class="layui-nav layui-layout-left">
			<li class="layui-nav-item"><a href="">控制台</a></li>
			<li class="layui-nav-item"><a href="">商品管理</a></li>
			<li class="layui-nav-item"><a href="">用户</a></li>
			<li class="layui-nav-item">
				<a href="javascript:;">其它系统</a>
				<dl class="layui-nav-child">
					<dd><a href="">邮件管理</a></dd>
					<dd><a href="">消息管理</a></dd>
					<dd><a href="">授权管理</a></dd>
				</dl>
			</li>
		</ul>
		-->
		<ul class="layui-nav layui-layout-right">
			<li class="layui-nav-item">
				<a href="javascript:;">
					<img src="http://t.cn/RCzsdCq" class="layui-nav-img">
					贤心
				</a>
				<dl class="layui-nav-child">
					<dd><a href="javascript:;" data-url="<%=request.getContextPath()%>/admin/personInfo">基本资料</a></dd>
					<dd><a href="javascript:;" data-url="<%=request.getContextPath()%>/admin/personInfo">安全设置</a></dd>
				</dl>
			</li>
			<li class="layui-nav-item"><a href="">退了</a></li>
		</ul>
	</div>

	<!-- 左侧侧边导航开始 -->
	<div class="layui-side layui-side-bg layui-larry-side" id="larry-side">
		<div class="layui-side-scroll" id="larry-nav-side" lay-filter="side">
			<!-- 左侧菜单 -->
			<ul class="layui-nav layui-nav-tree">
				<li class="layui-nav-item layui-this">
					<a href="javascript:;" data-url="<%=request.getContextPath()%>/admin/my_main">
						<i class="iconfont icon-home1" data-icon='icon-home1'></i>
						<span>后台首页</span>
					</a>
				</li>
				<!-- 个人信息 -->
				<li class="layui-nav-item">
					<a href="javascript:;">
						<i class="iconfont icon-jiaoseguanli" ></i>
						<span>我的面板</span>
						<em class="layui-nav-more"></em>
					</a>
					<dl class="layui-nav-child">
						<dd>
							<a href="javascript:;" data-url="<%=request.getContextPath()%>/admin/my_personInfo">
								<i class="iconfont icon-geren1" data-icon='icon-geren1'></i>
								<span>个人信息</span>
							</a>
						</dd>
						<dd>
							<a href="javascript:;" data-url="<%=request.getContextPath()%>/admin/my_changepwd">
								<i class="iconfont icon-iconfuzhi01" data-icon='icon-iconfuzhi01'></i>
								<span>修改密码</span>
							</a>
						</dd>
						<dd>
							<a href="javascript:;" data-url="<%=request.getContextPath()%>/admin/my_loginfo">
								<i class="iconfont icon-piliangicon" data-icon='icon-piliangicon'></i>
								<span>日志信息</span>
							</a>
						</dd>
					</dl>
				</li>
				<!-- 用户管理 -->
				<li class="layui-nav-item">
					<a href="javascript:;">
						<i class="iconfont icon-jiaoseguanli2" ></i>
						<span>用户管理</span>
						<em class="layui-nav-more"></em>
					</a>
					<dl class="layui-nav-child">
						<dd>
							<a href="javascript:;" data-url="<%=request.getContextPath()%>/admin/m_member_list">
								<i class="iconfont icon-yonghu1" data-icon='icon-yonghu1'></i>
								<span>会员列表</span>
							</a>
						</dd>
						<dd>
							<a href="javascript:;" data-url="<%=request.getContextPath()%>/admin/m_role_list">
								<i class="iconfont icon-jiaoseguanli4" data-icon='icon-jiaoseguanli4'></i>
								<span>角色列表</span>
							</a>

						<dd>
							<a href="javascript:;" data-url="<%=request.getContextPath()%>/admin/m_member_relation">
								<i class="iconfont icon-jiaoseguanli4" data-icon='icon-jiaoseguanli4'></i>
								<span>会员关系图</span>
							</a>
						</dd>
					</dl>
				</li>
				<!-- 产品管理 -->
				<li class="layui-nav-item">
					<a href="javascript:;">
						<i class="iconfont icon-diannao" ></i>
						<span>产品管理</span>
						<em class="layui-nav-more"></em>
					</a>
					<dl class="layui-nav-child">
						<dd>
							<a href="javascript:;" data-url="<%=request.getContextPath()%>/admin/p_product_channel">
								<i class="iconfont icon-tags" data-icon='icon-tags'></i>
								<span>产品分类</span>
							</a>
						</dd>
						<dd>
							<a href="javascript:;" data-url="<%=request.getContextPath()%>/admin/p_product_list">
								<i class="iconfont icon-tags" data-icon='icon-tags'></i>
								<span>产品列表</span>
							</a>
						</dd>
						<dd>
							<a href="javascript:;" data-url="<%=request.getContextPath()%>/admin/p_product_add">
								<i class="iconfont icon-tianjia" data-icon='icon-tianjia'></i>
								<span>添加产品</span>
							</a>
						</dd>
					</dl>
				</li>

				<!-- 订单管理 -->
				<li class="layui-nav-item">
					<a href="javascript:;">
						<i class="iconfont icon-shengchengbaogao" ></i>
						<span>订单管理</span>
						<em class="layui-nav-more"></em>
					</a>
					<dl class="layui-nav-child">
						<dd>
							<a href="javascript:;" data-url="<%=request.getContextPath()%>/admin/i_indent_list">
								<i class="iconfont icon-shenhe" data-icon='icon-shenhe'></i>
								<span>全部订单</span>
							</a>
						</dd>
						<dd>
							<a href="javascript:;" data-url="<%=request.getContextPath()%>/admin/i_indent_list?status=0">
								<i class="iconfont icon-daishenhe" data-icon='icon-daishenhe'></i>
								<span>未处理订单</span>
							</a>
						</dd>
						<dd>
							<a href="javascript:;" data-url="<%=request.getContextPath()%>/admin/i_indent_list?status=1">
								<i class="iconfont icon-wenzhang2" data-icon='icon-wenzhang2'></i>
								<span>已处理订单</span>
							</a>
						</dd>
					</dl>
				</li>

				<!-- 财务管理 -->
				<li class="layui-nav-item">
					<a href="javascript:;">
						<i class="iconfont icon-zhifu2" ></i>
						<span>财务管理</span>
						<em class="layui-nav-more"></em>
					</a>
					<dl class="layui-nav-child">
						<dd>
							<a href="javascript:;" data-url="<%=request.getContextPath()%>/admin/f_pay_list">
								<i class="iconfont icon-zhifu" data-icon='icon-zhifu'></i>
								<span>充值列表</span>
							</a>
						</dd>
						<dd>
							<a href="javascript:;" data-url="<%=request.getContextPath()%>/admin/f_withdraw_list">
								<i class="iconfont icon-shujuquanxian" data-icon='icon-shujuquanxian'></i>
								<span>提现管理</span>
							</a>
						</dd>
						<dd>
							<a href="javascript:;" data-url="<%=request.getContextPath()%>/admin/f_bonus">
								<i class="iconfont icon-kuozhan" data-icon='icon-kuozhan'></i>
								<span>奖金审核</span>
							</a>
						</dd>
					</dl>
				</li>
				<!-- 系统设置 -->
				<li class="layui-nav-item">
					<a href="javascript:;">
						<i class="iconfont icon-xitong" ></i>
						<span>系统设置</span>
						<em class="layui-nav-more"></em>
					</a>
					<dl class="layui-nav-child">
						<dd>
							<a href="javascript:;" data-url="<%=request.getContextPath()%>/admin/s_system_set">
								<i class="iconfont icon-zhandianpeizhi" data-icon='icon-zhandianpeizhi'></i>
								<span>基本参数设置</span>
							</a>
						</dd>
						<dd>
							<a href="javascript:;" data-url="<%=request.getContextPath()%>/admin/s_system_log">
								<i class="iconfont icon-iconfuzhi01" data-icon='icon-iconfuzhi01'></i>
								<span>系统日志管理</span>
							</a>
						</dd>
					</dl>
				</li>

			</ul>
		</div>
	</div>

	<!-- 左侧侧边导航结束 -->

	<div class="layui-body" id="larry-body" style="bottom: 0;border-left: solid 2px #1AA094;">
		<div class="layui-tab layui-tab-card larry-tab-box" id="larry-tab" lay-filter="demo" lay-allowclose="true">
			<ul class="layui-tab-title">
				<li class="layui-this" id="admin-home"><i class="iconfont icon-diannao1"></i><em>后台首页</em><i class="layui-icon layui-unselect layui-tab-close">ဆ</i></li>
			</ul>
			<div class="layui-tab-content" style="min-height: 150px; height: 123px;">
				<div class="layui-tab-item layui-show">
					<iframe class="larry-iframe" data-id="0" src="<%=request.getContextPath()%>/admin/f_bonus" style="height: 150px;"></iframe>
				</div>
			</div>
		</div>


	</div>

	<div class="layui-footer">
		<!-- 底部固定区域 -->
		© layui.com - 底部固定区域
	</div>
</div>
<script src="/static/libs/layui/layui.js"></script>
<script src="/static/admin/js/larry.js"></script>
<script src="/static/admin/js/index.js"></script>
<script>
    //JavaScript代码区域
    layui.use('element', function(){
        var element = layui.element;

    });
</script>
</body>
</html>