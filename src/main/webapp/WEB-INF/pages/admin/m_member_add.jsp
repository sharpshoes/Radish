<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="en">
<head>

	<title>添加会员</title>
	<jsp:include page=”../common/baseFile.jsp” flush=”true” />
	
</head>
<body>
<section class="layui-larry-box">
	<div class="larry-personal">
		<header class="larry-personal-tit">
			<span>添加会员</span>
		</header><!-- /header -->
		<div class="larry-personal-body clearfix changepwd">
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
<script src="/static/admin/js/m_member_add.js"></script>

</body>
</html>