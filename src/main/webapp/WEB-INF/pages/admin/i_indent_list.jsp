<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
	
	<title>订单管理</title>
	<jsp:include page=”../common/baseFile.jsp” flush=”true” />
	
	<link rel="stylesheet" href="/static/admin/css/i_indent_list.css">
</head>
<body>
<section class="layui-larry-box">
	<div class="larry-personal">
		<header class="larry-personal-tit">
			<span>订单管理</span>
			<label class="pull-right">
				<select class="defaultStyle">
					<option>全部订单</option>
					<option>未处理订单</option>
					<option>已处理订单</option>
				</select>
				<input @keyup.enter="search" v-model="keyword" placeholder="搜索" type="text" class="layui-icon-search baseSearch">
			</label>
		</header><!-- /header -->
		<div class="larry-personal-body clearfix changepwd">
			<table class="layui-table">
				<thead>
				<tr>
					<th class="text-center"><i class="glyphicon" :class="{'glyphicon-unchecked':!selectAll,'glyphicon-check':selectAll}" @click="selectAll = !selectAll"></i> </th>
					<th class="text-center">订单号</th>
					<th>收货人</th>
					<th>联系电话</th>
					<th>订单状态</th>
					<th>用户</th>
					<th>下单时间</th>
					<th>货运单号</th>
					<th>打印</th>
					<th class="text-center">操作</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for="(indent,index) in dataList">
					<td class="text-center"><i class="glyphicon" :class="{'glyphicon-unchecked':!indent.is_select,'glyphicon-check':indent.is_select}" @click="indent.is_select = !indent.is_select"></i></td>
					<td v-text="indent.indentNumber"></td>
					<td v-text="indent.consignee"></td>
					<td v-text="indent.phone"></td>
					<td v-text="getStatusValue(indent.status)"></td>
					<td v-text="indent.userName"></td>
					<td v-text="indent.publishTime"></td>
					<td v-text="indent.waybillNumber"></td>
					<td class="print"><label title="购物清单打印">购</label><label title="配货单打印">配</label><label title="联合打印">合</label><label title="快递单打印">递</label></td>
					<td class="text-center">
						<button type="button" class="layui-btn layui-btn-sm layui-btn-normal" @click="detail(indent)">订单详情</button>
						<button type="button" v-if="indent.status != 4 && indent.status != 1" class="layui-btn layui-btn-sm layui-btn-danger" @click="openModal(indent)">发货</button>
						<button v-if="indent.status == 4" type="button" class="layui-btn layui-btn-sm layui-btn-danger" @click="openWaybill(indent)">查看物流</button>
					</td>
				</tr>
				<tr v-if="!loading && dataList.length == 0">
					<td colspan="11" style="text-align: center;">没有数据</td>
				</tr>
				<tr v-if="loading">
					<td colspan="11" style="text-align: center;">加载中...</td>
				</tr>
				<tr>
					<td class="text-center"><i class="glyphicon" :class="{'glyphicon-unchecked':!selectAll,'glyphicon-check':selectAll}" @click="selectAll = !selectAll"></i></td>
					<td colspan="10">
						<div class="dropdown">
							<button type="button" class="layui-btn layui-btn-sm layui-btn-primary dropdown-toggle"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">状态修改<span class="caret"></span></button>
							<ul class="dropdown-menu" aria-labelledby="dLabel">
								<li>状态1</li>
								<li>状态2</li>
								<li>状态3</li>
							</ul>
						</div>
						<div class="dropdown">
							<button type="button" class="layui-btn layui-btn-sm layui-btn-primary">删除</button>

						</div>

					</td>
				</tr>
				</tbody>
			</table>

			<div id="pageList"></div>
		</div>
	</div>
	<!--发货模态框-->
	<div class="modal fade" tabindex="-1" role="dialog" id="deliveryModal">
		<div class="modal-form">
			<div class="modal-title">
				<label>发货信息</label>
				<label class="closeModal" @click="closeModal">&times;</label>
			</div>
			<form class="layui-form" action="">
				<div class="layui-form-item">
					<label class="layui-form-label">货运单号</label>
					<div class="layui-input-block">
						<input type="text" name="title" required v-model="modalObj.waybillNumber"  lay-verify="required" placeholder="请输入姓名" autocomplete="off" class="layui-input">
					</div>
				</div>
				<div class="layui-form-item">
					<label class="layui-form-label">姓名</label>
					<div class="layui-input-block" v-text="modalObj.consignee">

					</div>
				</div>
				<div class="layui-form-item">
					<label class="layui-form-label">电话</label>
					<div class="layui-input-block" v-text="modalObj.phone">

					</div>
				</div>
				<div class="layui-form-item">
					<label class="layui-form-label">地区</label>
					<div class="layui-input-block" v-text="modalObj.area">

					</div>
				</div>
				<div class="layui-form-item">
					<label class="layui-form-label">地址</label>
					<div class="layui-input-block" v-text="modalObj.address">

					</div>
				</div>
				<div class="layui-form-item">
					<label class="layui-form-label">邮编</label>
					<div class="layui-input-block" v-text="modalObj.postcode">

					</div>
				</div>
				<div class="layui-form-item">
					<div class="layui-input-block">
						<button type="button" class="layui-btn" lay-submit lay-filter="formDemo" @click="successModal">确认</button>
						<button type="button" class="layui-btn layui-btn-primary" @click="closeModal">取消</button>
					</div>
				</div>
			</form>
		</div>
	</div>
	<!--查看物流模态框-->
	<div class="modal fade" tabindex="-1" role="dialog" id="waybillModal">
		<div class="modal-form">
			<div class="modal-title">
				<label>物流信息</label>
				<label class="closeModal" @click="closeWaybill">&times;</label>
			</div>
			<form class="layui-form" action="">
				<div class="layui-form-item">
					<label class="layui-form-label">货运单号</label>
					<div class="layui-input-block">
						<input type="text" name="title" required v-model="modalObj.waybillNumber"  lay-verify="required" placeholder="请输入姓名" autocomplete="off" class="layui-input">
					</div>
				</div>

				<div class="layui-form-item">
					<div class="layui-input-block">
						<button type="button" class="layui-btn layui-btn-primary" @click="closeWaybill">取消</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</section>
<script src="/static/admin/js/i_indent_list.js"></script>
</body>
</html>