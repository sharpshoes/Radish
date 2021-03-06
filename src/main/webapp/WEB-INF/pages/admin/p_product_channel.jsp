<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
	
	<title>产品分类</title>
	<jsp:include page="..//common/baseFile.jsp"></jsp:include>	
	
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/admin/css/p_product_channel.css" media="all">

</head>
<body>
<section class="layui-larry-box">
	<div class="larry-personal">
		<header class="larry-personal-tit">
			<span>产品分类</span>
			<label for="" class="pull-right">
				<a href="javascript:;" @click="addChannel(null)" class="layui-btn layui-btn-sm layui-btn-normal">添加顶级分类</a>
			</label>
		</header><!-- /header -->
		<div class="larry-personal-body clearfix changepwd">
			<div class="larry-personal-body clearfix changepwd">
				<tree :list="obj" v-for="obj in dataList" :key="obj.channelId"  :parent-index="0" @add-channel="addChannel" @edit-channel="editChannel" @confirm-del="delChannel"></tree>
			</div>
		</div>
	</div>
	<!--产品分类模态框-->
	<div class="modal fade" tabindex="-1" role="dialog" id="channelModal">
		<div class="modal-form">
			<div class="modal-title">
				<label v-text="!isAdd ? '修改分类' : '添加分类'"></label>
				<label class="closeModal" @click="closeModal">&times;</label>
			</div>
			<form class="layui-form" action="">
				<div class="layui-form-item">
					<label class="layui-form-label">分类名称</label>
					<div class="layui-input-block">
						<input type="text" name="title" required v-model="modalObj.name"  lay-verify="required" placeholder="请输入分类名称" autocomplete="off" class="layui-input">
					</div>
				</div>
				<div class="layui-form-item">
					<div class="layui-input-block">
						<button type="button" class="layui-btn" lay-submit lay-filter="formDemo" @click="successModal">确认修改</button>
						<button type="button" class="layui-btn layui-btn-primary" @click="closeModal">取消</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</section>
<script src="/static/admin/js/p_product_channel.js"></script>


<script type="text/x-template" id="tree">

	<ul :class="{'parent':list.parentId != 0}">
		<li>
			<span v-for="n in parentIndex" class="span"></span>
			<label v-text="list.name"></label>
			<label class="pull-right">
				<button type="button" class="layui-btn layui-btn-xs layui-btn-normal" @click="add(list)">添加子类</button>
				<button type="button" class="layui-btn layui-btn-xs layui-btn-normal" @click="edit(list)">编辑</button>
				<button type="button" class="layui-btn layui-btn-xs layui-btn-danger" @click="confirmDel(list)">删除</button>
			</label>
		</li>
		<tree v-for="obj in list.child" :key="obj.channelId" :list="obj" :parent-index="Number(parentIndex+1)" @add-channel="$root.addChannel" @edit-channel="$root.editChannel" @confirm-del="$root.delChannel"></tree>
	</ul>

</script>
</body>
</html>