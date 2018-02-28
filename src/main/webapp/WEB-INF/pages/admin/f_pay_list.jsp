<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
	
	<title>充值列表</title>
	<jsp:include page=”../common/baseFile.jsp” flush=”true” />
	
	<link rel="stylesheet" type="text/css" href="/static/admin/css/f_pay_list.css" media="all">
</head>
<body>
<section class="layui-larry-box">
	<div class="larry-personal">
		<header class="larry-personal-tit">
			<span>充值管理</span>
			<label class="pull-right">
				<input @keyup.enter="search" v-model="keyword" placeholder="搜索" type="text" class="layui-icon-search baseSearch">

			</label>
		</header><!-- /header -->
		<div class="larry-personal-body clearfix changepwd">
			<table class="layui-table">
				<thead>
				<tr>
					<th class="text-center">ID</th>
					<th>姓名</th>
					<th>当前余额</th>
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
					<td>{{ base.stringsplit(user.balance) }}</td>
					<td v-text="user.phone"></td>
					<td v-text="user.directlyUserName"></td>
					<td v-text="user.parentUserName"></td>
					<td v-text="user.storeId"></td>
					<td class="text-center">
						<button type="button" class="layui-btn layui-btn-sm layui-btn-normal" @click="openModal(user)">充值</button>
					</td>
				</tr>
				<tr v-if="!loading && userList.length == 0">
					<td colspan="8" style="text-align: center;">没有数据</td>
				</tr>
				<tr v-if="loading">
					<td colspan="8" style="text-align: center;">加载中...</td>
				</tr>

				</tbody>
			</table>

			<div id="pageList"></div>
		</div>
	</div>
	<!--用户模态框-->
	<div class="modal fade" tabindex="-1" role="dialog" id="payModal">
		<div class="modal-form">
			<div class="modal-title">
				<label>用户充值</label>
				<label class="closeModal" @click="closeModal">&times;</label>
			</div>
			<form class="layui-form" action="">
				<div class="layui-form-item">
					<label class="layui-form-label">用户</label>
					<div class="layui-input-block">
						{{userName}}
					</div>
				</div>
				<div class="layui-form-item">
					<label class="layui-form-label" style="line-height: 36px;">充值金额</label>
					<div class="layui-input-block">
						<input id="inputBalance" type="text" name="title" required v-model="inputBalance"  lay-verify="required" placeholder="请输入电话" autocomplete="off" class="layui-input">
					</div>
				</div>

				<div class="layui-form-item">
					<label class="layui-form-label">充值后金额</label>
					<div class="layui-input-block">
						{{ modalBalanceAfter }}
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
<script src="/static/admin/js/f_pay_list.js"></script>
</body>
</html>