<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
	
	<title>订单管理</title>
	<jsp:include page=”../common/baseFile.jsp” flush=”true” />
	
	<link rel="stylesheet" type="text/css" href="/static/admin/css/i_indent_detail.css" media="all">
</head>
<body>
<section class="layui-larry-box">
	<div class="larry-personal">
		<header class="larry-personal-tit">
			<span>订单详情</span>
		</header><!-- /header -->
		<div class="larry-personal-body clearfix changepwd">
			<div class="layui-collapse">
				<div class="layui-colla-item">
					<h2 class="layui-colla-title">订单信息</h2>
					<div class="layui-colla-content layui-show">
						<table>
							<tr>
								<th width="100">订单号:</th>
								<th v-text="indentNumber"></th>
							</tr>
							<tr>
								<td>当前状态:</td>
								<td v-text="getStatusValue(status)"></td>
							</tr>
							<tr>
								<td>支付状态:</td>
								<td v-text="applyStatus"></td>
							</tr>
							<tr>
								<td>配送状态:</td>
								<td v-text="deliveryStatus">已发货</td>
							</tr>
							<tr v-if="status == 4">
								<td>货运单号:</td>
								<td>{{ waybillNumber }}<a href="javascript:;" style="margin-left:15px;" @click="openModal">修改单号</a><a style="margin-left:15px;" href="javascript:;" @click="openWaybill">查看物流</a></td>
							</tr>
							<tr>
								<td>备注:</td>
								<td v-text="desc"></td>
							</tr>
						</table>
					</div>
				</div>
				<div class="layui-colla-item">
					<h2 class="layui-colla-title">商品信息</h2>
					<div class="layui-colla-content layui-show">

						<table class="product" v-if="productList.length > 0">
							<thead>
								<tr>
									<th width="50%">商品名称</th>
									<th>商品价格</th>
									<th>实际价格</th>
									<th>商品数量</th>
									<th>小计</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="product in productList">
									<td>{{ product.name }}</td>
									<td>{{ '￥'+product.productPrice }}</td>
									<td>{{ '￥'+product.price }}</td>
									<td>{{ product.count }}</td>
									<td>{{ '￥'+product.price * product.count }}</td>
								</tr>
								<tr>
									<td colspan="5" class="text-right" style="font-weight: 700;">总计：{{'￥'+productPriceCount}}</td>
								</tr>
							</tbody>

						</table>
					</div>
				</div>
				<div class="layui-colla-item">
					<h2 class="layui-colla-title">收货人信息</h2>
					<div class="layui-colla-content layui-show">
						<table>
							<tr>
								<th width="100">下单日期:</th>
								<th v-text="publishTime">2018-02-05 10:48:34</th>
							</tr>
							<tr>
								<td>姓名:</td>
								<td v-text="consignee">郑郑</td>
							</tr>
							<tr>
								<td>电话:</td>
								<td v-text="phone">13520855536	</td>
							</tr>
							<tr>
								<td>地区:</td>
								<td v-text="area">河南省 郑州市 金水区</td>
							</tr>
							<tr>
								<td>地址:</td>
								<td v-text="address">文化路与双铺路交叉口</td>
							</tr>
							<tr>
								<td>邮编:</td>
								<td v-text="postcode">444444</td>
							</tr>
						</table>
					</div>
				</div>
			</div>
			<div class="deliveryBlock">
				<button v-if="status != 4 && status != 1" type="button" class="layui-btn layui-btn-sm layui-btn-danger" @click="openModal">确认发货</button>
			</div>
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
					<div class="layui-input-block" v-text="consignee">

					</div>
				</div>
				<div class="layui-form-item">
					<label class="layui-form-label">电话</label>
					<div class="layui-input-block" v-text="phone">

					</div>
				</div>
				<div class="layui-form-item">
					<label class="layui-form-label">地区</label>
					<div class="layui-input-block" v-text="area">

					</div>
				</div>
				<div class="layui-form-item">
					<label class="layui-form-label">地址</label>
					<div class="layui-input-block" v-text="address">

					</div>
				</div>
				<div class="layui-form-item">
					<label class="layui-form-label">邮编</label>
					<div class="layui-input-block" v-text="postcode">

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
<script src="/static/admin/js/i_indent_detail.js"></script>
</body>
</html>