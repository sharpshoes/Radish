//v1.02 增加自定义错误custommsg属性，并将匿名参数换成固定参数
//调用方法 
//      $(element).checkform();
//      初始化element下的所有input的blur事件
//      提交按钮调用方式
//      事件中加入
//          $('#loginform').checkform('return_submit');
//          返回为对象
//          {
//              success:true/false
//          }
//      例:
//          var check = $('#loginform').checkform('return_submit');
//          if(!check.success){
//              console.log('失败')
//          }
//          else{
//              console.log('成功')
//          }
//          
//使用方法
//      input中加入属性
//          checkval  验证的方式
//          showerror 显示错误的地方
//			other 自定义验证函数
//参数
//      checkval
//          checkval = "验证方式,最小长度,最大长度" 逗号(,)分隔
//          如参数中包含no_required此字符串，则此项input被视为不是必选，如果有值则验证，如果没有值则忽视
//          例子：
//              text:checkval="text,6,20"，pass:需要给对比项input的ID checkval="pass,checkid"  
//              no_required: checkval="text,6,20,no_required"  不填写内容时将被忽略      
//          验证方式：
//              text:任意文本,num:数字,email:电子邮件,fixtel:固定电话,tel:手机,pass:验证2次密码是否相同
//              chinese:中文,len:位数,nochar:中文数字英文-_
//      showerror
//          showerror = "目标ID或类"
//          例：showerror='.msg',showerror='#msg'   
//		other
//			other = 'function name'
//			例：other = 'checkfunction'
//			验证顺序，优先验证必填与长度，其次判断自定义验证，再次进行checkval类型验证
//      customMsg
//          customMsg = 'string'
//          例：customMsg = '验证的信息不对'
//          customMsg 会替换掉除pass、长度与空 以外的内置错误信息
;(function ($, window, document, undefined) {
    'use strict';
    var myform
    var checkform = function(element,options){
        this.options = options;
        myform = $(element);
        this.init(options);

    }
    checkform.prototype.init = function(options){
        var inputs = myform.find(':input')
        var _this = this;
        var obj = checkform;
        inputs.on(options.EventListener,function(){
              var checkval = $(this).attr("checkval");
              var inputval = $(this).val();
              var showerror = $(this).attr("showerror");
              var customMsg = $(this).attr('customMsg')
              var showblock = ""; //要显示错误的地址
              var msg = "";
              
              if(showerror != undefined && showerror != ""){
                showblock = _this.find_showblock(this,options.showblock)
              }
              if(checkval != undefined && checkval != ""){
            	  var no_required = checkval.indexOf("no_required")//是否包含不是必要选项
            	  var other = $(this).attr('other');
            	 
            		  if(typeof(eval(other)) == 'function'){      
            			  
            			  other = eval(other);
            			  if(no_required > -1){
            				  if(inputval != ""){
            					  msg = _this.input_check(checkval,inputval,showblock,other,customMsg);
            				  }
            				  else{
            					  if(showblock != ""){
            						  $(showblock).html('')
            					  }
            				  }
            			  }
            			  else{
            				  msg = _this.input_check(checkval,inputval,showblock,other,customMsg);
            			  }
            		  }
            		  else{
            			  if(no_required > -1){
            				  if(inputval != ""){
            					  msg = _this.input_check(checkval,inputval,showblock,other,customMsg);
            				  }
            				  else{
            					  if(showblock != ""){
            						  $(showblock).html('')
            					  }
            				  }
            			  }
            			  else{
            				  msg = _this.input_check(checkval,inputval,showblock,other,customMsg);
            			  }
            		  }
            	  
                	              
              }
            if(msg != ""){
            	$(this).addClass('checkformerror')
                $(this).removeClass('checkformsuccess')
            }
            else{
            	$(this).removeClass('checkformerror')
                $(this).addClass('checkformsuccess')
            }
        })
    }
    checkform.prototype.find_showblock = function(dom,classname){
        var blocklen = 0;   
        blocklen = $(dom).siblings(classname).length; //同级查找错误区域
        if(blocklen != 0){
            return $(dom).siblings(classname);
        }
        if(blocklen == 0){// 向上一级查找错误区域
            var type = "div";
            blocklen = $(dom).closest(type).siblings(classname).length;
        }
        if(blocklen == 0){
            var type = "td";
            blocklen = $(dom).closest(type).siblings(classname).length;
        }
        if(blocklen == 0){
            var type = "tr";
            blocklen = $(dom).closest(type).siblings(classname).length;
        }
        if(blocklen == 0){
            var type = "li";
            blocklen = $(dom).closest(type).siblings(classname).length;
        }
        if(blocklen != 0){
            return $(dom).closest(type).siblings(classname).eq(0)
        }
        else{
            return "";
        }
    }
    checkform.prototype.input_check = function(checkval,fromval,showid,other,customMsg){
      var _self = this;
      var showid = showid ? showid : ""; 
      var other = other ? other : "";
      var customMsg = customMsg ? customMsg : "";
      var array = checkval.split(",");
      var checkfunction = "";
      var checkstart = "";
      var checkend = "";
      var checklen = "";
      var checkdouble = ""
      var _thisfromval = fromval;
      var ischeck = "";
      for(var i = 0;i < array.length ; i++){
        if(i == 0){
          checkfunction = array[i];
        }
        if(i == 1){
            if(!isNaN(parseInt(array[i]))){
                
                checkstart = parseInt(array[i]);
                if(checkstart == 0){
                    checkstart = 1;
                }
            }
            else{
                checkdouble = array[i];
            }
        }
        if(i == 2){
            if(!isNaN(parseInt(array[i]))){
                
                checkend = parseInt(array[i]);
                if(checkend < checkstart){
                    checkend = checkstart;
                }

            }

        }
      }
      

      if(_thisfromval == ""){
            ischeck = "请填写此信息";
      }
      else{

          if(checkstart != "" && checkstart > 0 ){ //如果设置了长度就先判断长度是否符合要求，不符合要求就返回提示
                var strlength = _thisfromval.length;
                if(strlength < checkstart){
                    ischeck = "您输入的长度最少为 "+checkstart+" 位";
                }
          }

          if(checkend != "" && checkend > 0 ){
                var strlength = _thisfromval.length;
                if(strlength > checkend){
                    ischeck = "您输入的长度最多为 "+checkend+" 位";
                }
          }

      }

        if(ischeck == ""){ //符合长度要求，就执行正则表达

          // if(checkstart != "" && checkend != ""){ //正则表达式长度条件
          //       checklen = '{'+checkstart+','+checkend+'}';
          // }
          // if(checkstart == "" && checkend != ""){
          //       checklen = '{0,'+checkend+'}';
          // }
          // if(checkstart != "" && checkend == ""){
          //       checklen = '{'+checkstart+',}';
          // }


          
          switch(checkfunction)
            {
            case "text":       
                ischeck = _self.check_text(_thisfromval,other,customMsg);
                break;
            case "email":
                ischeck = _self.check_mail(_thisfromval,other,customMsg);
                break;
            case "tel":        
                ischeck = _self.check_tel(_thisfromval,other,customMsg);
                break;
            case "num":
                ischeck = _self.check_num(_thisfromval,other,customMsg);
                break;
            case "enum":
                ischeck = _self.check_e_num(_thisfromval,other,customMsg);
                break;
            case "chinese":
                ischeck = _self.check_chinese(_thisfromval,other,customMsg);
                break;
            case "password":
            	ischeck = _self.check_password(_thisfromval,other,customMsg)
            	break;
            case "pass":
                ischeck = _self.check_pass(_thisfromval,checkdouble,other,customMsg);
                break;
            case "nochar":
                ischeck = _self.check_nochar(_thisfromval,other,customMsg);
                break;
            case "fixtel":
                ischeck = _self.check_fixtel(_thisfromval,other,customMsg);
                break;
            default:
            	ischeck = _self.check_other(_thisfromval,other,customMsg)
              break;
            }
        }
        if(showid != ""){
            
            
            if(typeof showid == "string"){
                var showblock = $(showid);
                showblock.html(ischeck);
                if(ischeck == ""){
                    showblock.removeClass('checkformerror')
                    showblock.addClass('checkformsuccess')
                }
                else{
                    showblock.addClass('checkformerror')
                    showblock.removeClass('checkformsuccess')
                }
            }
            if(typeof showid == "object"){
                showid.html(ischeck);
                if(ischeck == ""){
                	showid.removeClass('checkformerror')
                    showid.addClass('checkformsuccess')
                }
                else{
                	showid.addClass('checkformerror')
                    showid.removeClass('checkformsuccess')
                }
            }
        }
        return ischeck;
    }
    checkform.prototype.check_other = function(str,other,customMsg){
    	var msg;
        var check_str = str;
        var other = other ? other : "";
        if(other != ""){
        	var checkother = other(str);
        	if(checkother){
        		msg = checkother
        		return msg;
        	}
        }
        return "";
    }
    checkform.prototype.check_nochar = function(str,other,customMsg){
        var msg;
        var check_str = str;
        var checklen = "*"; 
        var other = other ? other : "";
        var customMsg = customMsg ? customMsg : "输入的信息不能含有非法字符";
        if(other != ""){
        	//如果有额外的验证则执行验证，并返回值checkother，验证通过返回false,失败则返回错误信息
        	var checkother = other(str);
        	if(checkother){
        		msg = checkother
        		return msg;
        	}
        }
        var rege = eval('/^[A-Za-z0-9\u4e00-\u9fa5-_]'+checklen+'$/') //字母数字
        if(!rege.test(check_str)){
            msg = customMsg;
            return msg;
        }    
        return "";
    }
    checkform.prototype.check_e_num = function(str,other,customMsg){
        var msg;
        var check_str = str;
        var checklen = "*"; 
        var other = other ? other : "";
        var customMsg = customMsg ? customMsg : "输入的信息只能是英文、数字";
        if(other != ""){
        	//如果有额外的验证则执行验证，并返回值checkother，验证通过返回false,失败则返回错误信息
        	var checkother = other(str);
        	if(checkother){
        		msg = checkother
        		return msg;
        	}
        }
        var rege = eval('/^[A-Za-z0-9]'+checklen+'$/') //字母数字

        if(!rege.test(check_str)){
            msg = customMsg;        
            return msg;
        }

        return "";
    }

    checkform.prototype.check_fixtel = function(str,other,customMsg){
        var msg;
        var check_str = str;
        var checklen = "*"; 
        var other = other ? other : "";
        var customMsg = customMsg ? customMsg : "请输入正确的固定电话";
        if(other != ""){
        	//如果有额外的验证则执行验证，并返回值checkother，验证通过返回false,失败则返回错误信息
        	var checkother = other(str);
        	if(checkother){
        		msg = checkother
        		return msg;
        	}
        }
        var rege = eval(/^0\d{2,3}-\d{7,8}$/) //字母数字
        // /^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/
        if(!rege.test(check_str)){
            msg = customMsg;
            return msg;
        }    
        return "";
    }

    checkform.prototype.check_text = function(str,other,customMsg){
        var msg;
        var check_str = str;
        var checklen = "*"; 
        var other = other ? other : "";
        var customMsg = customMsg ? customMsg : "输入的信息只能是英文、数字";
        if(other != ""){
        	//如果有额外的验证则执行验证，并返回值checkother，验证通过返回false,失败则返回错误信息
        	var checkother = other(str);
        	if(checkother){
        		msg = checkother
        		return msg;
        	}
        }
        var rege = eval('/^[A-Za-z0-9-_|\_|\.]'+checklen+'$/') //字母数字

        if(!rege.test(check_str)){
            msg = customMsg;
            return msg;
        }

        
        return "";
    }
    checkform.prototype.check_mail = function(str,other,customMsg){
        var msg;
        var check_str = str;
        var checklen = "*"; 
        var other = other ? other : "";
        var customMsg = customMsg ? customMsg : "请输入正确的EMAIL";
       
        //var rege = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]?)*\.[a-zA-Z]{2,3}$/; //字母数字
        var rege = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
        if(!rege.test(check_str)){
            msg = customMsg;
            return msg;
        }
        if(other != ""){
        	//如果有额外的验证则执行验证，并返回值checkother，验证通过返回false,失败则返回错误信息
        	var checkother = other(str);
        	if(checkother){
        		msg = checkother
        		return msg;
        	}
        }
        return "";

    }
    checkform.prototype.check_tel = function(str,other,customMsg){
        var msg;
        var check_str = str;
        var checklen = "*"; 
        var other = other ? other : "";
        var customMsg = customMsg ? customMsg : "请输入正确的电话号码";
        if(other != ""){
        	//如果有额外的验证则执行验证，并返回值checkother，验证通过返回false,失败则返回错误信息
        	var checkother = other(str);
        	if(checkother){
        		msg = checkother
        		return msg;
        	}
        }
        var rege = /^1[34578][0-9]\d{8}$/;
        if(!rege.test(check_str)){
            msg = customMsg;
            return msg;
        }  
        return "";
        
    }
    checkform.prototype.check_num = function(str,other,customMsg){
        var msg;
        var check_str = str;
        var checklen = "*"; 
        var other = other ? other : "";
        var customMsg = customMsg ? customMsg : "输入的信息只能是数字";
        if(other != ""){
        	//如果有额外的验证则执行验证，并返回值checkother，验证通过返回false,失败则返回错误信息
        	var checkother = other(str);
        	if(checkother){
        		msg = checkother
        		return msg;
        	}
        }
        var rege = eval('/^[0-9]'+checklen+'$/') 

        if(!rege.test(check_str)){
            msg = customMsg;
            return msg;
        }

        
        return "";
        
    }
    checkform.prototype.check_chinese = function(str,other,customMsg){
        var msg;
        var check_str = str;
        var checklen = "*"; 
        var other = other ? other : "";
        var customMsg = customMsg ? customMsg : "输入的信息只能是汉字";
        if(other != ""){
        	//如果有额外的验证则执行验证，并返回值checkother，验证通过返回false,失败则返回错误信息
        	var checkother = other(str);
        	if(checkother){
        		msg = checkother
        		return msg;
        	}
        }
        var rege = eval('/^[\u4e00-\u9fa5]'+checklen+'$/');
       
        if(!rege.test(check_str)){
            msg = customMsg;
            return msg;
        }
       
        return "";    
    }
    checkform.prototype.check_password = function(str,other,customMsg){
    	var msg;
         var check_str = str;
         var checklen = "*"; 
         var other = other ? other : "";
         var customMsg = customMsg ? customMsg : "需同时包含大小写字母和数字，至少6位";
         if(other != ""){
         	//如果有额外的验证则执行验证，并返回值checkother，验证通过返回false,失败则返回错误信息
         	var checkother = other(str);
         	if(checkother){
         		msg = checkother
         		return msg;
         	}
         }
         
         var ls = 0; 
         if(check_str.match(/([a-z])+/)){  ls++; }  
         if(check_str.match(/([0-9])+/)){  ls++; }  
         if(check_str.match(/([A-Z])+/)){   ls++; }  
         //if(check_str.match(/[^a-zA-Z0-9]+/)){ ls++;}  
         if( ls != 3 ){
        	 msg = customMsg;
             return msg;
         } 
        
         return "";   
    }
    checkform.prototype.check_pass = function(checkstr2,checkstr1,other){
        var msg;
        var inputid = checkstr1;
        var check_str = checkstr2;
        var checklen = "*"; 
        var other = other ? other : "";
        if(other != ""){
        	//如果有额外的验证则执行验证，并返回值checkother，验证通过返回false,失败则返回错误信息
        	var checkother = other(inputid,check_str);
        	if(checkother){
        		msg = checkother
        		return msg;
        	}
        }
        if(inputid == "" || inputid == undefined){
            var msg = "没有要对比的信息";
            return msg;
        }
        var inputval = $("#"+inputid).val();
        if(inputval != check_str){
            var msg = "两次的数据不一致";
            return msg;
        }

        return ""
    }
    checkform.prototype.checkformall = function(){
        var form = myform;
        var _self = this;
        var ischeck = true;
        var showblock = undefined;
       
         
        var inputlist = form.find(":input"); // 获取表单下全部的input
        var i = 0;

        inputlist.each(function(){
            var error = "";
            var checkval = $(this).attr("checkval");
            var no_required = -1;
            var inputval = $(this).val();
            var showerror = $(this).attr("showerror"); 
            var customMsg = $(this).attr("customMsg");
            showblock = undefined;
            var type = "div"; //父级元素标签
            if(showerror != undefined && showerror != ""){
                showblock = _self.find_showblock(this,showerror);
                if(showblock == ""){//没有的话就在全局元素中找

                    showblock = $(showerror);

                    if(showblock.length > 1){//如果有多个显示区域，则在对应个数的显示区域显示
                        showblock = $(this).parents("body").find(showerror).eq(i);
                    }
                }      
            }

            if(checkval != undefined && checkval != ""){
                no_required = checkval.indexOf("no_required")//是否包含不是必要选项
                var other = $(this).attr('other');
	          	
          		if(typeof(eval(other)) == 'function'){
          			other = eval(other);
          		}
	          	
                //如果有显示错误的区域则传入
                if(showblock != undefined){
                    //如果此项不是必要验证，则判断是否有值；有值则进行验证
                    if(no_required > -1){
                        if(inputval != ""){
                        	
                        	if(typeof other == 'function'){
                        		error = _self.input_check(checkval,inputval,showblock,other,customMsg);
                        	}
                        	else{
                        		error = _self.input_check(checkval,inputval,showblock,other,customMsg);
                        	}
                            
                        }
                        else{
      					  if(showblock != ""){
      						  $(showblock).html('')
      					  }
      				  	}
                    }
                    else{
                    	if(typeof other == 'function'){
                    		error = _self.input_check(checkval,inputval,showblock,other,customMsg);
                    	}
                    	else{
                    		error = _self.input_check(checkval,inputval,showblock,other,customMsg);
                    	}
                    }
                }
                else{
                    if(no_required > -1){
                        if(inputval != ""){
                        	if(typeof other == 'function'){
                        		error = _self.input_check(checkval,inputval,other,customMsg);
                        	}
                        	else{
                        		error = _self.input_check(checkval,inputval,other,customMsg);
                        	}
                        }
                        else{
    					  if(showblock != ""){
    						  $(showblock).html('')
    					  }
    				  	}
                    }
                    else{
                    	if(typeof other == 'function'){
                    		error = _self.input_check(checkval,inputval,other,customMsg);
                    	}
                    	else{
                    		error = _self.input_check(checkval,inputval,other,customMsg);
                    	}
                    }
                }
                if(error != ""){
                	 $(this).addClass('checkformerror')
                     $(this).removeClass('checkformsuccess')
                }
            }
            if(ischeck){
                if(error != ""){
                    $(this).focus(); //将焦点定位到第一个触发错误的地方
                    ischeck = false; //如果有错误就返回false
                }
            }
            i++;
        });
        return ischeck;
    }

    checkform.prototype.return_submit = function(){ 
        var returndata = this.checkformall();
        if(returndata){
            return {
                success:true
            };
        }
        else{
            return {
                success:false
            }
        }
    };

    checkform.prototype.clear_error = function(){
        myform.find(this.options.showblock).hide().html('');
    }

    var _default = {};
    _default.settings = {
        showblock:'.msg',//要显示错误的类或id id需带#
        EventListener:'blur'
    }
    var pluginName = 'checkform';
    $.fn[pluginName] = function (options, args) {
        var result;

        this.each(function () {
            var _this = $.data(this, pluginName);
            if (typeof options === 'string') {
                
                if (!(args instanceof Array)) {
                    args = [ args ];
                }
                result = _this[options].apply(_this, args);
                
            }
            else {
                $.data(this, pluginName, new checkform(this, $.extend(true, _default.settings, options)));
            }
        });

        return result || this;
        
    }
})(jQuery, window, document);