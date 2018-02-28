/*

例子
html
<div id="prenext"></div>


js调用方法
$("#prenext").pagemodel({
    dataModel:data,//总数据列表
    nowpage:1,//可以不填默认为1
    pagesize:10,//可以不填默认为10
    onChecked:gettablelist  //返回数据列表gettablelist的function 需要自己写,初始化的时候就会执行一次
});

function gettablelist(event,data){
    var tablelist = data.tablelist;  //当前页数据列表
}

属性修改方法
$("#prenext").pagemodel('changeoption',options); //合并options 并且重新渲染

 */


;(function ($, window, document, undefined) {


    'use strict';

    var _default = {};

    var pluginName = 'pagemodel';

    _default.settings = {
        dataModel:[],
        tablelist:[],
        nowpage : 1,
        pagesize : 10,
        pagecount : 0,
        page_step: 2,
        onChecked: undefined,
        force:false
    };  

    var page = function(element,options){
        this.$element = $(element);
        this.options = options;
        var _options = options;
        if(_options.dataModel.length > 0 || _options.force == true){

            this.init(_options);     
         
        }
        
    }
    page.prototype.init = function(options){
            
            this.render(options);
        
    }
    page.prototype.render = function(options){

        var pagecount = options.pagecount = Math.ceil(options.dataModel.length / options.pagesize);

        

            this.subscribeEvents();
           
            this.getpagelist(options);

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
        var classList = target.attr('class') ? target.attr('class').split(' ') : [];
        if ((classList.indexOf('myitemright') !== -1 && !target.hasClass("select"))) {
            this.options.nowpage++;
            this.render(this.options)
            
        }
        else if ((classList.indexOf('myitemleft') !== -1 && !target.hasClass("select"))) {
             this.options.nowpage--;
             this.render(this.options)
            
        }
        else if ((classList.indexOf('my_item') !== -1 && !target.hasClass("select"))) {
             this.options.nowpage = id;     
             this.render(this.options)      
            
        }
        
    }
    page.prototype.getpagelist = function(options){

            var tmp = [];
            var start = 1;
            var end = 0;
            var now = parseInt(options.nowpage);
            var page_step = parseInt(options.page_step);
            if(options.pagecount > 1){
                if(isNaN(now)){
                    now = 1;
                }
                var count = options.pagecount;

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
            this.$element.append(this.$wrapper);
            
            if(typeof this.options.onChecked === "function"){ //如果有函数初始要执行一次

                this.gettalbelist(options); //获取数据列表

                var tablelist = this.options.tablelist;
                this.$element.on('onChecked', this.options.onChecked);
                this.$element.trigger('onChecked', $.extend(true, {}, this.options));
                this.$element.off('onChecked');
            }
            

    }
    page.prototype.gettalbelist = function(options){
        var data_start = (options.nowpage-1) * options.pagesize;
        var data_end = options.nowpage * options.pagesize;
        this.options.tablelist = (options.dataModel.slice(data_start,data_end));
    }

    page.prototype.template = {
        list: '<ul class="pagination pagination-sm no-margin pull-right" id="pagelist"></ul>',        
        item: '<li></li>',    
        items:'<span></span>',   
        itema:'<a href="javascript:;"></a>',
    };
    page.prototype.changeoption = function(options){ //传入新的options，合并options并且重新渲染
        if(options.dataModel){
            this.options.dataModel = [];
            this.options.tablelist = [];
        }

        this.options = $.extend(true, {}, this.options,options);
         
        this.render(this.options);
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