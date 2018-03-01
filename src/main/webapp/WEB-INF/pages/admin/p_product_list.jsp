<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
	
	<title>产品管理</title>
	<jsp:include page="..//common/baseFile.jsp"></jsp:include>	
	
	<link rel="stylesheet" href="<%=request.getContextPath()%>/static/admin/css/p_product_list.css">

</head>
<body>
<section class="layui-larry-box">
	<div class="larry-personal">
		<header class="larry-personal-tit">
			<span>产品管理</span>
			<label class="pull-right">
				<input @keyup.enter="search" v-model="keyword" placeholder="搜索" type="text" class="layui-icon-search baseSearch">
				<a href="p_product_add.html" class="layui-btn layui-btn-sm layui-btn-normal">添加产品</a>
			</label>
		</header><!-- /header -->
		<div class="larry-personal-body clearfix changepwd">
			<table class="layui-table">
				<thead>
				<tr>
					<th class="text-center"><i class="glyphicon" :class="{'glyphicon-unchecked':!selectAll,'glyphicon-check':selectAll}" @click="selectAll = !selectAll"></i> </th>
					<th class="text-center">商品编号</th>
					<th>商品信息</th>
					<th>库存</th>
					<th>总销量</th>
					<th>价格</th>
					<th>会员价格</th>
					<th>促销价格</th>
					<th>状态</th>
					<th>发布日期</th>
					<th>排序</th>
					<th class="text-center">操作</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for="(product,index) in dataList">
					<td class="text-center"><i class="glyphicon" :class="{'glyphicon-unchecked':!product.is_select,'glyphicon-check':product.is_select}" @click="product.is_select = !product.is_select"></i></td>
					<td class="text-center" v-text="product.productId"></td>
					<td><img class="productThumb" src="" :src="product.productImage"><label v-text="product.productName"></label></td>
					<td v-text="product.inventory"></td>
					<td v-text="product.volumeCount"></td>
					<td v-text="product.price"></td>
					<td v-text="product.discountPrice"></td>
					<td v-text="product.activityPrice"></td>
					<td v-text="product.status"></td>
					<td v-text="product.publishDate"></td>
					<td><input type="text" v-model="product.sort" class="sort"></td>
					<td class="text-center">
						<button type="button" class="layui-btn layui-btn-sm layui-btn-normal" @click="editJump(product)">编辑</button>
						<button type="button" class="layui-btn layui-btn-sm layui-btn-danger" @click="confirmDel(product,index)">删除</button>
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
					<td colspan="11">
						<div class="dropdown">
							<button type="button" class="layui-btn layui-btn-sm layui-btn-primary dropdown-toggle"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">状态修改<span class="caret"></span></button>
							<ul class="dropdown-menu" aria-labelledby="dLabel">
								<li>状态1</li>
								<li>状态2</li>
								<li>状态3</li>
							</ul>
						</div>
						<div class="dropdown">
							<button type="button" class="layui-btn layui-btn-sm layui-btn-primary dropdown-toggle"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">移动<span class="caret"></span></button>
							<ul class="dropdown-menu" aria-labelledby="dLabel">
								<li>产品分类1</li>
								<li>产品分类1</li>
								<li>产品分类1</li>
							</ul>
						</div>
						<div class="dropdown">
							<button type="button" class="layui-btn layui-btn-sm layui-btn-primary dropdown-toggle"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">复制<span class="caret"></span></button>
							<ul class="dropdown-menu" aria-labelledby="dLabel">
								<li>产品分类1</li>
								<li>产品分类1</li>
								<li>产品分类1</li>
							</ul>
						</div>
						<div class="dropdown">
							<button type="button" class="layui-btn layui-btn-sm layui-btn-primary">保存排序</button>
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
</section>
<script src="/static/admin/js/p_product_list.js"></script>
</body>
</html>