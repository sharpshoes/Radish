//请求
//var contextPath = "/BaseJApp"; 
var base = {
    call_service:function(options){
        var _this = this;
        //ajax访问
        var _default = {
            url : '',//地址
            httpMethod : 'get',//访问模式
            data : "",//包含的数据
            successFunc : function(data){
                console.log(data)//成功返回值后执行
            },
            failureFunc : function(data){
                var t = _this.msgbox({
                    type : 'alert',
                    title : '错误提示',
                    content : 'code:' + data.code + '<br> message:' + data.message,
                })
                t.show()
            },
            async : true,//同步
            cache : false,//缓存
            dataType:'text',
            contentType:'text/html; Charset=utf-8'
        }

        if(this.getClass(options) == 'Object'){
            var option = $.extend(true, {}, _default,options);
            //如果有发送的数据将method类型修改成post
            if( !_this.isEmpty(option.data) ){
                option.httpMethod = 'POST';
            }
            option.url = encodeURI(option.url);
            $.ajax({
                url: contextPath + option.url,
                type: option.httpMethod,
                dataType:option.dataType,
                contentType:option.contentType,
                data: option.data,
                async:option.async,
                cache:option.cache,
                httpMethod:option.httpMethod,
                success: function(data){
                    var dict = JSON.parse(data)
                    if(dict.code !== undefined){
                        var Jsondata = dict.data;
                        if(dict.code == 0){
                            option.successFunc(Jsondata);
                        }
                        else{
                            option.failureFunc(dict)
                        }
                    }
                    else{
                        option.successFunc(data);
                    }
                },
                error:function(){
                    option.failureFunc('网络异常！')
                }
            })
        }
        if(this.getClass(options) == 'String'){

            var option = _default;
            option.url = encodeURI(options);
            option.successFunc = typeof arguments[1] == 'function' ? arguments[1] : _default.successFunc;
            option.failureFunc = typeof arguments[2] == 'function' ? arguments[2] : _default.failureFunc;
            $.ajax({
                url: contextPath + option.url,
                type: option.httpMethod,
                dataType:option.dataType,
                contentType:option.contentType,
                data: option.data,
                async:option.async,
                cache:option.cache,
                httpMethod:option.httpMethod,
                success: function(data){
                    var dict = JSON.parse(data)
                    if(dict.code !== undefined){
                        var Jsondata = dict.data;
                        if(dict.code == 0){
                            option.successFunc(Jsondata);
                        }
                        else{
                            option.failureFunc(dict)
                        }
                    }
                    else{
                        option.successFunc(data);
                    }
                },
                error:function(){
                    option.failureFunc('网络异常！')
                }
            })
        }
    },
    //获取类型
    getClass:function(object){

    //  __getClass(5); // => "Number"
    //  __getClass({}); // => "Object"
    //  __getClass(/foo/); // => "RegExp"
    //  __getClass(''); // => "String"
    //  __getClass(true); // => "Boolean"
    //  __getClass([]); // => "Array"
    //  __getClass(undefined); // => "Window"
    //  __getClass(Element); // => "Constructor"
        return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
    },
    get_substr:function(str){

        //为显示需要中文为双字符，英文数字为单字符，标点为单字符
        var len = arguments[1] ? parseInt(arguments[1]) : 0;
        var is_omit = arguments[2] ? 1 : 0;
        var strlen = str.length;
        var i = 0;
        var y = 0;

        var returnstr = "";

        if(isNaN(len)){
            len = 0;
        }
        if(len == 0){

            return str;
        }
        else{

            var rege = /^[\u4e00-\u9fa5]$/;
            while(i < len){
                var sub_str = str.substr(y,1);
                //取不到值则跳出循环
                if(sub_str != ""){
                    //因字体原因（目前微软雅黑）中文按照2个字符，其他按照1.1字符计算，
                    if(rege.test(sub_str)){
                        i = i+2;
                    }
                    else{
                        i = i+1.1;
                    }
                    if(i <= len){
                        returnstr += sub_str;
                    }
                    y++;

                }
                else{
                    break;
                }

            }
            if(is_omit == 0 && i > len){
                returnstr += "...";

            }

            return returnstr

        }

    },
    //拆分转换时间，当天则返回时间，否则返回日期
    split_time:function(data){

    var array = data.split(" ")
    var myDate = new Date();
    var returndata = data;
    var nowdata = myDate.toLocaleDateString().replace(/\//g,"-"); //获取当前日期 并将/转换成-

    if(array.length == 2){
        // console.log(array[0])
        var checkdata = array[0];
        checkdata = checkdata.replace(/-0/g,'-')//去掉月份中的0

        if(checkdata == nowdata){ //如果是当天就返回时间，如果不是就返回日期

            returndata = array[1];

        }
        else{

            returndata = array[0];

        }

    }
    return returndata
},
    //重命名对象属性，主要用于前后台数据属性不统一
    render_data:function(obj,property_old,property_new){

    //参数obj【对象】 obj = obj or array
    //参数property_old【要改名的属性】 property_old = string or array
    //参数property_new【要改成的属性名】 property_new = string or array
    if(obj instanceof Array){
        for(v in obj){
            if(property_new instanceof Array){
                for(k in property_new){
                    var property_old_one = property_old[k];
                    var property_old_new = property_new[k];
                    if(property_old_one != undefined){
                        obj[v][property_old_new] = obj[v][property_old_one];
                        delete obj[v][property_old_one];
                    }
                }
            }
            else{
                obj[v][property_new] = obj[v][property_old];
                delete obj[v][property_old];
            }
        }
    }
    else{
        obj[property_new] = obj[property_old];
        delete obj[property_old];
    }
    return obj;
},
    //获取随机数
    getRandom:function(len){
        len = len || 32;
        var is_timestamp = arguments[1] ? false : true;
        var randomData = "";
        var _chars="QWERTYIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsazxcvbnm";
        var maxPos = _chars.length;
        var tmp = "";
        for(var  i=0;i< len;i++)  {
            tmp  +=  _chars.charAt(Math.floor(Math.random() * maxPos));
        }
        randomData = tmp
        if(is_timestamp){
            var timestamp = new Date().getTime();
            randomData += timestamp
        }
        return randomData;
    },
    //获取url的get参数
    getkey:function(name){
        //获取页面参数
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var url =  decodeURI(window.location.search)
        var r = url.substr(1).match(reg);
        if ( r != null ){
            return unescape(r[2]);
        }else{
            return undefined;
        }
    },
    //判断是否为空
    isEmpty:function (obj) {
        return (typeof(obj) === 'undefined' || obj === null || obj.toString() === '');
    },
    //上传文件,待修改，参数中应该传入接口url地址
    uploadFile:function(options){
    //ajax上传访问
    var _default = {
        form:'myform',
        successFunc:function(data){
            console.log(data);
        },
        failureFunc:function(data){
            console.log('上传失败');
        },
        filename:'file', //要验证后缀的文件域名称
        extarray:[]  		//要验证的后缀数组格式

    }

    if(this.getClass(options) == 'Object' || options == undefined){
        var option = $.extend(true, {}, _default,options)

        //获取文件域的值
        var filepath=$("input[name='" + option.filename + "']").val();
        //拆分并转换成统一大写
        var extStart=filepath.lastIndexOf(".");
        var ext=filepath.substring(extStart,filepath.length).toUpperCase();
        var checkext = false;
        if(option.extarray.length > 0){
            //进行对比，有则返回true
            checkext = option.extarray.some(function(item,index,array){
                //统一大写转换
                return '.' + item.toUpperCase() == ext
            })
        }
        else{
            checkext = true;
        }

        if(checkext){
            var formData = new FormData($("#"+option.form)[0]);
            $.ajax({
                type: "POST",
                url: "/file/upload",
                data: formData ,
                processData : false,
                //必须false才会自动加上正确的Content-Type
                contentType : false,
                success:function(rdata){
                    if(rdata.code == 0){
                        var Jsondata = JSON.parse(rdata.data);
                        option.successFunc(Jsondata)
                    }
                    else{
                        option.failureFunc(rdata)
                    }
                },
                error:function(rdata){
                    option.failureFunc(rdata)
                },
                /* xhr: function(){
                  var xhr = $.ajaxSettings.xhr();
                      if(onprogress && xhr.upload) {
                          xhr.upload.addEventListener("progress" , onprogress, false);
                          return xhr;
                      }
                  }, */
            });
        }
        else{
            var t = this.msgbox({
                title:'错误提示',
                content:'上传文件格式为　'+ option.extarray.toString()
            })
            t.show();
            option.failureFunc('格式错误')
        }
    }
},
    //分割字符串，按照位数用指定字符分割字符串
    stringsplit:function(str,len,Symbol){
    /*
    *@parem str  string
    *@parem len  int
    *@parem Symbol  string
    */
    if(base.isEmpty(str)){
        return str;
    }
    else{
        var Symbol = base.isEmpty(Symbol) ? ',' : Symbol;
        var len  = !isNaN(len) && !base.isEmpty(len) ? len : 3;
        var str = str.toString();
        var strlen = str.length;
        var yu = strlen % len;
        var digit = parseInt(strlen / len);
        var newstring = "";
        var start = 0;
        newstring += str.substr(start,yu);
        for(var i = 0;i<digit;i++){
            if(yu != 0){
                if(i != digit){
                    newstring += Symbol;
                }
                start = yu + len * i;
                newstring += str.substr(start,len);
            }
            else{
                start = yu + len * i;
                newstring += str.substr(start,len);
                if(i != (digit-1)){
                    newstring += Symbol;
                }
            }
        }
        return newstring;
    }
},
    //删除HTML标记
    removeHTMLTag:function(str) {
        str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
        str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
        //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
        str=str.replace(/&nbsp;/ig,'');//去掉&nbsp;
        return str;
    },
    addProperty:function(obj,propertyName,propertyValue){
        if( this.getClass(obj) === "Object" ){
            obj[propertyName] = propertyValue;
        }
        else if( this.getClass(obj) === "Array" ){
            for( var i in obj ){
                obj[i][propertyName] = propertyValue;
            }
        }
        return obj;
    }
}

//jquery扩展格式化表单并转换成json格式
$.fn.serializeObject = function()
{
	//JSON格式化表单
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name] !== undefined) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};

//Date扩展格式化
Date.prototype.Format = function(fmt)   
{    
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}  



