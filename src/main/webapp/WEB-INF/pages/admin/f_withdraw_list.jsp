<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
	
	<title>提现管理</title>
<jsp:include page="..//common/baseFile.jsp"></jsp:include>	
	<link rel="stylesheet" href="<%=request.getContextPath()%>/static/admin/css/f_withdraw_list.css">
</head>
<body>
<section class="layui-larry-box">
	<div class="larry-personal">
		<header class="larry-personal-tit">
			<span>提现管理</span>
			<label class="pull-right">
				<select class="defaultStyle">
					<option>全部申请</option>
					<option>未处理申请</option>
					<option>已处理申请</option>
					<option>申请已完成</option>
					<option>退回的申请</option>
					<option>删除的申请</option>
				</select>
				<input @keyup.enter="search" v-model="keyword" placeholder="搜索" type="text" class="layui-icon-search baseSearch">
			</label>
		</header><!-- /header -->
		<div class="larry-personal-body clearfix changepwd">
			<table class="layui-table">
				<thead>
				<tr>
					<th class="text-center"><i class="glyphicon" :class="{'glyphicon-unchecked':!selectAll,'glyphicon-check':selectAll}" @click="selectAll = !selectAll"></i> </th>
					<th>用户名</th>
					<th>当前余额</th>
					<th>申请提现金额</th>
					<th>申请时间</th>
					<th>收款人姓名</th>
					<td>联系电话</td>
					<th class="text-center">状态</th>
					<th class="text-center">操作</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for="(withdraw,index) in dataList">
					<td class="text-center"><i class="glyphicon" :class="{'glyphicon-unchecked':!withdraw.is_select,'glyphicon-check':withdraw.is_select}" @click="withdraw.is_select = !withdraw.is_select"></i></td>
					<td v-text="withdraw.userName"></td>
					<td>{{ base.stringsplit(withdraw.balance) + ' 元' }}</td>
					<td>{{ base.stringsplit(withdraw.money) + ' 元' }}</td>
					<td v-text="withdraw.createTime"></td>
					<td v-text="withdraw.trueName"></td>
					<td v-text="withdraw.phone"></td>
					<td class="text-center" v-text="getStatusValue(withdraw.status)"></td>
					<td class="text-center">
						<button type="button" v-if="withdraw.status == 1" class="layui-btn layui-btn-sm layui-btn-normal" @click="reDispose(withdraw)">确认处理</button>
						<button type="button" v-if="withdraw.status == 0" class="layui-btn layui-btn-sm layui-btn-normal" @click="dispose(withdraw)">处理</button>
						<button type="button" v-if="withdraw.status == 2 || withdraw.status == 3 " class="layui-btn layui-btn-sm layui-btn-normal" @click="detail(withdraw)">查看详情</button>
						<button type="button" class="layui-btn layui-btn-sm layui-btn-danger" @click="confirmDel(withdraw)">删除</button>
					</td>
				</tr>
				<tr v-if="!loading && dataList.length == 0">
					<td colspan="9" style="text-align: center;">没有数据</td>
				</tr>
				<tr v-if="loading">
					<td colspan="9" style="text-align: center;">加载中...</td>
				</tr>
				<tr>
					<td class="text-center"><i class="glyphicon" :class="{'glyphicon-unchecked':!selectAll,'glyphicon-check':selectAll}" @click="selectAll = !selectAll"></i></td>
					<td colspan="8">

						<div class="dropdown">
							<button type="button" class="layui-btn layui-btn-sm layui-btn-primary">全部删除</button>

						</div>

					</td>
				</tr>
				</tbody>
			</table>

			<div id="pageList"></div>
		</div>
	</div>
	<!--提现模态框-->
	<div class="modal fade" tabindex="-1" role="dialog" id="withdrawModal">
		<div class="modal-form">
			<div class="modal-title">
				<label>提现申请</label>
				<label class="closeModal" @click="closeModal">&times;</label>
			</div>
			<form class="layui-form" action="">
				<div class="layui-form-item">
					<label class="layui-form-label">用户</label>
					<div class="layui-input-block" v-text="modalObj.userName">

					</div>
				</div>
				<div class="layui-form-item">
					<label class="layui-form-label">收款人</label>
					<div class="layui-input-block" v-text="modalObj.trueName">

					</div>
				</div>
				<div class="layui-form-item">
					<label class="layui-form-label">联系电话</label>
					<div class="layui-input-block" v-text="modalObj.phone">

					</div>
				</div>
				<div class="layui-form-item">
					<label class="layui-form-label">银行卡号</label>
					<div class="layui-input-block" v-text="modalObj.cardNumber">

					</div>
				</div>
				<div class="layui-form-item">
					<label class="layui-form-label">申请时间</label>
					<div class="layui-input-block" v-text="modalObj.createTime">

					</div>
				</div>
				<div class="layui-form-item">
					<label class="layui-form-label">退回申请理由</label>
					<div class="layui-input-block">
						<textarea v-model="modalObj.remarks" rows="5" v-if="modalObj.add"></textarea>
						{{ !modalObj.add ? modalObj.remarks : '' }}
					</div>
				</div>
				<div class="layui-form-item form-button-block" v-if="modalObj.add">
						<button type="button" class="layui-btn" lay-submit lay-filter="formDemo" @click="successModal">确认完成</button>
						<button type="button" class="layui-btn layui-btn-danger" @click="sendBack">退回申请</button>
				</div>
			</form>
		</div>
	</div>
</section>
<script src="/static/admin/js/f_withdraw_list.js"></script>
</body>
</html>