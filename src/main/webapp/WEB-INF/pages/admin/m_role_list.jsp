<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="en">
<head>

	<title>角色列表</title>
	<jsp:include page="..//common/baseFile.jsp"></jsp:include>	
	
</head>
<body>
<section class="layui-larry-box">
	<div class="larry-personal">
		<header class="larry-personal-tit">
			<span>角色列表</span>
			<label class="pull-right">
				<a href="javascript:;" @click="addRole" class="layui-btn layui-btn-sm layui-btn-normal">添加角色</a>
			</label>
		</header><!-- /header -->
		<div class="larry-personal-body clearfix changepwd">

			<table class="layui-table">
				<thead>
				<tr>
					<th>角色名称</th>
					<th class="text-center">操作</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for="(role,index) in roleList">
					<td v-text="role.name"></td>
					<td class="text-center">
						<button type="button" class="layui-btn layui-btn-sm layui-btn-normal" @click="openModal(role)">修改</button>
						<button type="button" class="layui-btn layui-btn-sm layui-btn-danger" @click="confirmDel(role,index)">删除</button>
					</td>
				</tr>
				<tr v-if="!loading && roleList.length == 0">
					<td colspan="2" style="text-align: center;">没有数据</td>
				</tr>
				<tr v-if="loading">
					<td colspan="2" style="text-align: center;">加载中...</td>
				</tr>

				</tbody>
			</table>
		</div>
	</div>
	<!--用户模态框-->
	<div class="modal fade" tabindex="-1" role="dialog" id="roleModal">
		<div class="modal-form">
			<div class="modal-title">
				<label>修改用户</label>
				<label class="closeModal" @click="closeModal">&times;</label>
			</div>
			<form class="layui-form" action="">
				<div class="layui-form-item">
					<label class="layui-form-label">姓名</label>
					<div class="layui-input-block">
						<input type="text" name="title" required v-model="modalObj.name"  lay-verify="required" placeholder="请输入姓名" autocomplete="off" class="layui-input">
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
<script src="/static/admin/js/m_role_list.js"></script>
</body>
</html>