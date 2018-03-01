<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="en">
<head>

	<title>登录日志</title>
	<jsp:include page="..//common/baseFile.jsp"></jsp:include>	
	
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/admin/css/personal.css" media="all">
</head>
<body>
<section class="layui-larry-box">
	<div class="larry-personal">
	    <div class="layui-tab">
            <blockquote class="layui-elem-quote mylog-info-tit">
                <ul class="layui-tab-title">
		    	          <li class="layui-btn layui-this"><i class="layui-icon">&#xe60a;</i>我的操作日志</li>
		    	          <li class="layui-btn "><i class="layui-icon">&#xe63c;</i>我的登录日志</li>
		    	          <a class="layui-btn layui-btn-small larry-log-del"><i class="iconfont icon-huishouzhan1"></i>清空日志</a>
		            </ul>
            </blockquote>
            <div class="larry-separate"></div>
		    <div class="layui-tab-content larry-personal-body clearfix mylog-info-box">
		         <!-- 操作日志 -->
                <div class="layui-tab-item layui-field-box layui-show">
                     <table class="layui-table table-hover" lay-even="" lay-skin="nob">
                          <thead>
                              <tr>
                                  <th><input type="checkbox" id="selected-all"></th>
                                  <th>ID</th>
                                  <th>操作人</th>
                                  <th>操作时间</th>
                                  <th>文件</th>
                                  <th>模块</th>
                                  <th>控制器</th>
                                  <th>方法</th>
                                  <th>详细参数</th>
                                  <th>操作IP</th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr>
                                <td><input type="checkbox"></td>
                                <td>110</td>
                                <td>admin</td>
                                <td>2016-12-19</td>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                                <td>127.0.0.1</td>
                              </tr>
                              <tr>
                                <td><input type="checkbox"></td>
                                <td>109</td>
                                <td>admin</td>
                                <td>2016-12-19</td>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                                <td>127.0.0.1</td>
                              </tr>
                              <tr>
                                <td><input type="checkbox"></td>
                                <td>108</td>
                                <td>admin</td>
                                <td>2016-12-19</td>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                                <td>127.0.0.1</td>
                              </tr>
                              <tr>
                                <td><input type="checkbox"></td>
                                <td>107</td>
                                <td>admin</td>
                                <td>2016-12-19</td>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                                <td>127.0.0.1</td>
                              </tr>
                              <tr>
                                <td><input type="checkbox"></td>
                                <td>106</td>
                                <td>admin</td>
                                <td>2016-12-19</td>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                                <td>127.0.0.1</td>
                              </tr>
                              <tr>
                                <td><input type="checkbox"></td>
                                <td>105</td>
                                <td>admin</td>
                                <td>2016-12-19</td>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                                <td>127.0.0.1</td>
                              </tr>
                              <tr>
                                <td><input type="checkbox"></td>
                                <td>104</td>
                                <td>admin</td>
                                <td>2016-12-19</td>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                                <td>127.0.0.1</td>
                              </tr>
                              <tr>
                                <td><input type="checkbox"></td>
                                <td>103</td>
                                <td>admin</td>
                                <td>2016-12-19</td>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                                <td>127.0.0.1</td>
                              </tr>
                              <tr>
                                <td><input type="checkbox"></td>
                                <td>102</td>
                                <td>admin</td>
                                <td>2016-12-19</td>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                                <td>127.0.0.1</td>
                              </tr>
                              <tr>
                                <td><input type="checkbox"></td>
                                <td>101</td>
                                <td>admin</td>
                                <td>2016-12-19</td>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                                <td>127.0.0.1</td>
                              </tr>
                              <tr>
                                <td><input type="checkbox"></td>
                                <td>100</td>
                                <td>admin</td>
                                <td>2016-12-19</td>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                                <td>127.0.0.1</td>
                              </tr>
                          </tbody>
                     </table>
                     <div class="larry-table-page clearfix">
                          <a href="javascript:;" class="layui-btn layui-btn-small"><i class="iconfont icon-shanchu1"></i>删除</a>
				          <div id="page" class="page"></div>
			         </div>
			    </div>
			     <!-- 登录日志 -->
			    <div class="layui-tab-item layui-field-box">
			          <table class="layui-table table-hover" lay-even="" lay-skin="nob">
                           <thead>
                              <tr>
                                  <th><input type="checkbox" id="selected-all"></th>
                                  <th>ID</th>
                                  <th>管理员账号</th>
                                  <th>状态</th>
                                  <th>最后登录时间</th>
                                  <th>上次登录IP</th>
                                  <th>登录IP</th>
                                  <th>IP所在位置</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td><input type="checkbox"></td>
                                <td>110</td>
                                <td>admin</td>
                                <td>后台登录成功</td>
                                <td>2016-12-19 14:26:03</td>
                                <td>127.0.0.1</td>
                                <td>127.0.0.1</td>
                                <td>Unknown</td>
                              </tr>
                            </tbody>
			          </table>
			          <div class="larry-table-page clearfix">
                          <a href="javascript:;" class="layui-btn layui-btn-small"><i class="iconfont icon-shanchu1"></i>删除</a>
				          <div id="page2" class="page"></div>
			         </div>
			    </div>
		    </div>
		</div>
	</div>
</section>
</body>
</html>