<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>奖金审核</title>
	<jsp:include page=”../common/baseFile.jsp” flush=”true” />
</head>
<body>
<section class="layui-larry-box">
	<div class="larry-personal">
		<header class="larry-personal-tit">
			<span>奖金审核</span>
			<label class="pull-right">
				<button id="selectDate" type="button" class="layui-btn layui-btn-sm layui-btn-primary" v-text="selectDate"></button><span style="margin-left:6px;" class="caret"></span>
			</label>
		</header><!-- /header -->
		<div class="larry-personal-body clearfix changepwd">
			<table class="layui-table" id="layTable" lay-filter="layTable">
				<thead>
				<tr>
					<th class="text-center">编号</th>
					<th>用户名</th>
					<th>直推奖金</th>
					<th>代数奖</th>
					<th>碰对奖</th>
					<th lay-data="{sort:true}">报单中心</th>
					<th>总计</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for="(user,index) in userList" v-if="!loading && userList.length > 0">
					<td class="text-center" v-text="user.id"></td>
					<td v-text="user.userName"></td>
					<td>{{ base.stringsplit(user.directBonus) }}</td>
					<td>{{ base.stringsplit(user.combinationBonus) }}</td>
					<td>{{ base.stringsplit(user.childsBonus) }}</td>
					<td v-text="user.storeId"></td>
					<td>{{ base.stringsplit( user.directBonus + user.combinationBonus + user.childsBonus) }}</td>
				</tr>
				<tr v-if="!loading && userList.length > 0">
					<td colspan="7" class="text-right">
						<label style="margin-right:10px;">总计：{{ base.stringsplit(moneyCount) }}</label>
						<button type="button" class="layui-btn layui-btn-normal" @click="auditBonus">审核并发放奖金</button>
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
</section>
<script src="/static/admin/js/f_bonus.js"></script>
</body>
</html>