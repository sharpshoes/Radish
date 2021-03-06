<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="en">
<head>

	<title>会员网络图</title>
	<jsp:include page="..//common/baseFile.jsp"></jsp:include>	
	
</head>
<body>
<section class="layui-larry-box">
	<div class="larry-personal">
		<header class="larry-personal-tit">
			<span>会员网络图</span>
			<label class="pull-right">
				<input @keyup.enter="search" v-model="keyword" placeholder="搜索" type="text" class="layui-icon-search baseSearch">
				<a href="m_member_add.html" class="layui-btn layui-btn-sm layui-btn-normal">添加会员</a>
			</label>
		</header><!-- /header -->
		<div class="larry-personal-body clearfix changepwd">
			<table class="layui-table">
				<thead>
				<tr>
					<th class="text-center">ID</th>
					<th>姓名</th>
					<th>电话</th>
					<th>推荐人</th>
					<th>安置人</th>
					<th>报单中心编号</th>
					<th class="text-center">操作</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for="(user,index) in userList">
					<td class="text-center" v-text="user.id"></td>
					<td v-text="user.userName"></td>
					<td v-text="user.phone"></td>
					<td v-text="user.directlyUserName"></td>
					<td v-text="user.parentUserName"></td>
					<td v-text="user.storeId"></td>
					<td class="text-center">
						<button type="button" class="layui-btn layui-btn-sm layui-btn-normal" @click="openModal(user)">修改</button>
						<button type="button" class="layui-btn layui-btn-sm layui-btn-danger" @click="confirmDel(user,index)">删除</button>
					</td>
				</tr>
				<tr v-if="!loading && userList.length == 0">
					<td colspan="7" style="text-align: center;">没有数据</td>
				</tr>
				<tr v-if="loading">
					<td colspan="7" style="text-align: center;">加载中...</td>
				</tr>

				</tbody>
			</table>

			<div id="pageList"></div>
		</div>
	</div>
	<!--用户模态框-->
	<div class="modal fade" tabindex="-1" role="dialog" id="userModal">
		<div class="modal-form">
			<div class="modal-title">
				<label>修改用户</label>
				<label class="closeModal" @click="closeModal">&times;</label>
			</div>
			<form class="layui-form" action="">
				<div class="layui-form-item">
					<label class="layui-form-label">姓名</label>
					<div class="layui-input-block">
						<input type="text" name="title" required v-model="modalObj.userName"  lay-verify="required" placeholder="请输入姓名" autocomplete="off" class="layui-input">
					</div>
				</div>
				<div class="layui-form-item">
					<label class="layui-form-label">电话</label>
					<div class="layui-input-block">
						<input type="text" name="title" required v-model="modalObj.phone"  lay-verify="required" placeholder="请输入电话" autocomplete="off" class="layui-input">
					</div>
				</div>

				<div class="layui-form-item">
					<label class="layui-form-label">安置人</label>
					<div class="layui-input-block">
						<input type="text" name="title" required v-model="modalObj.parentUserName"  lay-verify="required" placeholder="请输入安置人" autocomplete="off" class="layui-input">
					</div>
				</div>

				<div class="layui-form-item">
					<label class="layui-form-label">银行卡号</label>
					<div class="layui-input-block">
						<input type="text" name="title" v-model="modalObj.cardId" required  lay-verify="required" placeholder="请输入银行卡号" autocomplete="off" class="layui-input">
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
<script src="/static/admin/js/m_member_list.js"></script>

</body>
</html>