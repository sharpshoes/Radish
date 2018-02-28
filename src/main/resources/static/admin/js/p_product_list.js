'use strict';
var responseList = Mock.mock({
    "data|1-100": [
        {
            "productId|+1":1,
            "productName":'@cname()', //产品名称
            "productImage":'../../static/admin/images/product.jpg', //产品缩略图
            "price":'@integer(500, 10000)',       //价格
            "discountPrice":'@integer(500, 10000)',       //会员折扣价格
            "activityPrice":'@integer(500, 10000)',       //促销价格/活动价格
            "inventory":'@integer(500, 10000)',//库存
            "volumeCount":'@integer(500, 10000)',//总销量
            "publishDate":'@cname()',//发布时间
            "status":1,                 //状态
            "sort":'@integer(1, 100)',//排序
        }
    ]
})

layui.use(['laypage','layer'],function(){
    var laypage = layui.laypage;
    var layer = layui.layer;

    var vm = new Vue({
        el:'.layui-larry-box',
        data: {
            dataList:[],
            loading:false,
            selectAll:false,
            keyword:null,
        },
        methods:{
            //读取数据
            loadData:function(){
                var _this = this;
                this.loading = true;
                //执行一个laypage实例
                //增加一个是否选中属性
                responseList.data = base.addProperty(responseList.data,'is_select',false);
                laypage.render({
                    elem: 'pageList' //注意，这里的 test1 是 ID，不用加 # 号
                    ,count: responseList.data.length //数据总数，从服务端得到
                    ,limit:10
                    ,layout:['first','prev', 'page', 'next','last']
                    ,jump:function(obj, first){
                        var dataLength = (obj.curr - 1) * obj.limit;
                        var dataList = responseList.data.slice( dataLength,dataLength+obj.limit )
                        //首次不执行
                        if(!first){
                            //do something
                        }
                        _this.dataList = dataList;
                    }
                });
                this.loading = false;
            },

            //弹出确认弹窗
            confirmDel:function(productObj,delIndex){
                var _this = this;
                layer.open({
                    title:'删除确认',
                    content: '确实要删除此产品吗？'
                    ,btn: ['确定', '取消']
                    ,yes: function(index, layero){
                        //按钮【按钮一】的回调
                        _this.dataList.splice(delIndex,1);
                        layer.closeAll();
                    }
                    ,btn2: function(index, layero){
                        layer.closeAll();
                        //按钮【按钮二】的回调

                        //return false 开启该代码可禁止点击该按钮关闭
                    }
                    ,cancel: function(){
                        layer.closeAll();
                        //右上角关闭回调

                        //return false 开启该代码可禁止点击该按钮关闭
                    }
                });
            },
            //获取被选中的列表,如果type为Id则获取所有的商品Id
            getSelectList:function(type){
                var newArray = []
                for( var i in this.dataList ){
                    if( this.dataList[i].is_select ){
                        if(type == 'id'){
                            newArray.push(this.dataList[i].productId)
                        }
                        else{
                            newArray.push(this.dataList[i])
                        }
                    }
                }
            },
            editJump:function(productObj){
                window.location.href = "p_product_add.html?productId=" + productObj.prodectId;
            },
            search:function(){
                layer.msg('搜索待完成')
            }
        },
        computed:{

        },
        watch:{
            selectAll:function(val){
                for( var i in this.dataList ){
                    this.dataList[i].is_select = val;
                }
            }
        },
        mounted:function(){
            this.loadData()
        }
    })
})