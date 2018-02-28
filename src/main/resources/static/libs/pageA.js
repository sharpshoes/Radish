/*

例子
html
<div id="prenext"></div>


js调用方法
$("#prenext").ajaxpagemodel({
    api_url:'',//必填，数据调用地址
    args:'',//选填，调用条件
    nowpage:1,//选填，默认为1，当前页码
    pagesize:10,//选填，默认为10，显示条数
    page_step: 2, //选填，默认为2，步长 当前页码左右显示的页码数量
    onChecked:gettablelist  //返回数据列表gettablelist的function 需要自己写,初始化的时候就会执行一次
});

function gettablelist(event,data){
    var tablelist = data.tablelist;  //当前页数据列表
}

属性修改方法
$("#prenext").ajaxpagemodel('changeoption',options); //合并options 并且重新渲染

 */


;(function ($, window, document, undefined) {


    'use strict';

    var _default = {};


    var pluginName = 'ajaxpagemodel';

    _default.settings = {
        dataModel:[],
        tablelist:[],
        args:'',
        api_url:'',
        total:0,
        nowpage : 1,
        pagesize : 10,
        pagecount : 0,
        page_step:2,
        onChecked: undefined,
        tmpid:"",
        allData:"",

    };  

    var page = function(element,options){
        this.$element = $(element);
        this.options = options;

        if(this.options.api_url != ''){

            this.init(this.options);     
         
        }
        
    }
    page.prototype.init = function(options){
           
                this.ajaxdata(options);
        
    }
    page.prototype.ajaxdata = function(options){
        var query_args = '';
        
        query_args += 'page='+ (options.nowpage - 1);
        if (options.pagesize > 0) {
            query_args += '&pagesize='+ options.pagesize;
        }
        if (options.total > 0) {
            query_args += '&total=' + options.total;
        }
        if (options.args != '') {
            query_args += '&' + options.args;
        }
        var url = options.api_url + '?' + query_args;
        if(typeof base.call_service === "function"){

            var _this = this;
            base.call_service(
            		{
            			url:url,
            			httpMethod:'GET',
            			successFunc:function(data){
            				
                            //如果有获取到的数据
                            if(data.data.length > 0){
                            	_this.options.allData = data;
                                //如果获取到总条数则直接调用，没有的话就计算获取的数据长度赋值给总条数
                                if(data['total']){
                                    _this.options.total = data['total'];

                                }
                                else{
                                    _this.options.total = data.data.length

                                }
                                
                                //如果获取的数据长度大于设置的pagesize长度，则截取需要显示的长度
                                if(data.data.length > _this.options.pagesize){
                                    var data_start = (_this.options.nowpage-1) * _this.options.pagesize;
                                    var data_end = _this.options.nowpage * _this.options.pagesize;
                                    _this.options.tablelist = (data.data.slice(data_start,data_end));
                                    
                                }
                                else{
                                    if(data.data != ""){

                                    	_this.options.tablelist = data.data

                                    }
                                    else{
                                        _this.options.tablelist = [];
                                    }
                                }
                               
                            }
                            else{
                                //如果没有查询到数据，清空列表，执行一次回调方法
                                _this.options.tablelist = [];
                                if(typeof _this.options.onChecked === "function"){
                                    _this.$element.on('onChecked', _this.options.onChecked);
                                    _this.$element.trigger('onChecked', $.extend(true, {}, _this.options));
                                    _this.$element.off('onChecked');
                                }
                            }
                            _this.render(_this.options);

                        }
            		});
        }
    }
    page.prototype.render = function(options){

      

        var pagecount = options.pagecount = Math.ceil(options.total / options.pagesize);

        //如果当前页大于总页，则当前页等于总页后重新渲染，应对删除数据后可能发生的问题
        if( (options.nowpage - 1) > pagecount ){
            options.nowpage = pagecount;
            this.ajaxdata(options)
        }
        // if(pagecount > 0){

            this.subscribeEvents();

            this.getpagelist(options);
        // }

    }
    page.prototype.subscribeEvents = function () {

        this.unsubscribeEvents();

        this.$element.on('click', $.proxy(this.clickHandler, this));

        
    };
    page.prototype.unsubscribeEvents = function(){
        this.$element.off('click');
    }
    page.prototype.clickHandler = function(event){
        var target = $(event.target);
        var id = target.attr("myid");
        
        if(this.options.tmpid != id || this.options.tmpid == 'pageleft' || this.options.tmpid == 'pageright'){
            this.options.tmpid = id;
            var classList = target.attr('class') ? target.attr('class').split(' ') : [];
            if ((classList.indexOf('myitemright') !== -1 && !target.hasClass("select"))) {
                this.options.nowpage++;
                this.ajaxdata(this.options)
                
            }
            else if ((classList.indexOf('myitemleft') !== -1 && !target.hasClass("select"))) {
                 this.options.nowpage--;
                 this.ajaxdata(this.options)
                
            }
            else if ((classList.indexOf('my_item') !== -1 && !target.hasClass("select"))) {
                 this.options.nowpage = id;     
                 this.ajaxdata(this.options)      
                
            }
        }
    }
    page.prototype.getpagelist = function(options){
            var tmp = [];
            var start = 1;
            var end = 0;
            var now = parseInt(options.nowpage);
            var page_step = parseInt(options.page_step);

            if(isNaN(now)){
                now = 1;
            }
            var count = options.pagecount;
            if(count > 1){
                //循环开始值
                if((now - (page_step + 1)) > 1){            
                    
                    start = now - page_step;
                    
                }
                //循环结束值
                if((now + page_step) < count){
                    end = now + page_step;                
                }
                else{
                    end = count;                
                }

                //不是第一页添加上一页按钮
                if(now != 1){
                    tmp.push({
                        pagenum:"&laquo;",
                        pageid:'pageleft'
                    })
                }


                if(start != 1){               
                    tmp.push({
                        pagenum : 1,
                        pageid : 1,
                       
                    });
                }
                if(start >= page_step){
                    tmp.push({
                        pagenum:'...',
                        pageid:'false',
                        
                    })
                }

                
                
                
                for(var i = start; i <= end; i++){
                    tmp.push({
                        pagenum : i,
                        pageid : i,
                        
                    });
                }
                if((now + (page_step + 1)) < count){
                    tmp.push({
                        pagenum:'...',
                        pageid:'false',
                        
                    })
                }

                if(end < count){
                    
                    tmp.push({
                        pagenum : count,
                        pageid : count,
                        
                    });                
                }
                if(now != count){
                    tmp.push({
                        pagenum:"&raquo;",
                        pageid:'pageright'
                    })
                }
            }

            this.build(tmp,options);
            
    }
    page.prototype.build = function(node,options){
            this.$wrapper = $(this.template.list);
            var _this = this;
            $.each(node,function(){
                var treeItem = $(_this.template.item)              
                
                var tmp = $(_this.template.itema);
                tmp.append(this.pagenum);
                var lispan = $(_this.template.items);
                if(this.pagenum == "&raquo;"){
                    lispan.addClass("myitemright");
                    tmp.addClass("myitemright");
                }
                
                if(this.pagenum == "&laquo;"){
                    lispan.addClass("myitemleft");
                    tmp.addClass("myitemleft");
                }
                if(parseInt(this.pagenum) > 0){
                    lispan.addClass("my_item");
                    tmp.addClass("my_item");
                }
                if(this.pagenum == _this.options.nowpage){
                    lispan.addClass("select");
                    tmp.addClass("select");
                }
                lispan.attr("myid",this.pageid);
                tmp.attr("myid",this.pageid);
                lispan.append(tmp);
                treeItem.append(lispan); 
                _this.$wrapper.append(treeItem);                 
               
            });
            
            this.$element.empty(); // 清空html
            if(options.pagecount > 0){
                this.$element.append(this.$wrapper);
            }
            
            if(typeof this.options.onChecked === "function"){ //如果有函数初始要执行一次

                // this.gettalbelist(options); //获取数据列表

                var tablelist = this.options.tablelist;
                this.$element.on('onChecked', this.options.onChecked);
                this.$element.trigger('onChecked', $.extend(true, {}, this.options));
                this.$element.off('onChecked');
            }
            

    }


    page.prototype.template = {
        list: '<ul class="pagination pagination-sm no-margin pull-right" id="pagelist"></ul>',        
        item: '<li></li>',    
        items:'<span></span>',   
        itema:'<a href="javascript:;"></a>',
    };
    page.prototype.changeoption = function(options){ //传入新的options，合并options并且重新渲染
        if(options.api_url != ""){
            if(options.api_url != this.options.api_url || options.args != this.options.args){
                this.options.nowpage = 1;
                this.options.total = 0;
                
            }
        }
        this.options = $.extend(true, {}, this.options,options);
        this.ajaxdata(this.options);
    }
    page.prototype.getOption = function(){
    	return this.options;
    }
    
    page.prototype.page_reload = function(){
        this.options.total = 0;
        this.ajaxdata(this.options);
    }

    $.fn[pluginName] = function (options, args) {

            var result;

            this.each(function () {
                var _this = $.data(this, pluginName);
                if (typeof options === 'string') {
                    if (!_this) {
                        logError('Not initialized, can not call method : ' + options);
                    }
                    else if (!$.isFunction(_this[options]) || options.charAt(0) === '_') {
                        logError('No such method : ' + options);
                    }
                    else {
                        if (!(args instanceof Array)) {
                            args = [ args ];
                        }
                        result = _this[options].apply(_this, args);
                    }
                }
                else if (typeof options === 'boolean') {
                    result = _this;
                }
                else {
                    $.data(this, pluginName, new page(this, $.extend(true, {}, _default.settings,options)));
                }
            });

            return result || this;
    };

})(jQuery, window, document);