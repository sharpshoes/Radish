'use strict';
var responseList = Mock.mock({
    "data|1-100": [
        {
            "indentId|+1":1,
            "indentNumber":'@id(100000000000)', //产品名称
            "consignee":'@cname()', //收货人
            "phone":/^1[34578][0-9]\d{8}$/,       //电话
            "status":'@natural(1,4)',                 //状态
            "userName":'@cname()',
            "publishTime":'@datetime("yyyy-MM-dd HH:mm")',
            "waybillNumber":'@id(100000000000)',    //货运单号
            "address":'文化路与双铺路交叉口',  //地址
            "area":'河南省 郑州市 金水区',       //地区
            "postcode":'10010',                 //邮编

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
            tmpObj:null,
            modalObj:{
                waybillNumber:null,
                freightCompany:null,
                consignee:null, //收货人
                address:null,  //地址
                area:null,       //地区
                postcode:null,                 //邮编
                phone:null
            },
            statusList:[
                {
                    key:1,
                    value:'未付款'
                },
                {
                    key:2,
                    value:'已付款'
                },
                {
                    key:3,
                    value:'未发货'
                },
                {
                    key:4,
                    value:'已发货'
                }
            ]
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
            //获取被选中的列表,如果type为Id则获取所有的Id
            getSelectList:function(type){
                var newArray = []
                for( var i in this.dataList ){
                    if( this.dataList[i].is_select ){
                        if(type == 'id'){
                            newArray.push(this.dataList[i].indentId)
                        }
                        else{
                            newArray.push(this.dataList[i])
                        }
                    }
                }
            },
            //获取状态名称
            getStatusValue:function(key){
                for( var i in this.statusList ){
                    if(this.statusList[i].key == key){
                        return this.statusList[i].value
                    }
                }
            },
            detail:function(indentObj){
                window.location.href = "i_indent_detail.html?indentId=" + indentObj.indentId;
            },
            search:function(){
                console.log('搜索待完成')
            },
            //展开发货表单模态
            openModal:function(indentObj){
                this.tmpObj = indentObj;
                this.modalObj.waybillNumber = indentObj.waybillNumber;
                this.modalObj.postcode = indentObj.postcode;
                this.modalObj.area = indentObj.area;
                this.modalObj.address = indentObj.address;
                this.modalObj.consignee = indentObj.consignee;
                $('#deliveryModal').modal('show')
            },
            closeModal:function(){
                $('#deliveryModal').modal('hide')
            },
            successModal:function(){
                this.tmpObj.waybillNumber = this.modalObj.waybillNumber;
                this.closeModal();
            },
            //查看物流信息
            openWaybill:function(indentObj){
                $('#waybillModal').modal('show');
            },
            closeWaybill:function(){
                $('#waybillModal').modal('hide');
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