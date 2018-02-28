'use strict';
var responseData = Mock.mock({
    "data":
        {
            "indentId|+1":1,
            "indentNumber":'@id(100000000000)', //产品名称
            "consignee":'@cname()', //收货人
            "phone":/^1[34578][0-9]\d{8}$/,       //电话
            "status":'@natural(1,4)',                 //状态
            "userName":'@cname()',
            "publishTime":'@datetime("yyyy-MM-dd HH:mm")',
            "waybillNumber":'@id(100000000000)',   //货运单号
            "desc":'备注信息', //备注
            "address":'文化路与双铺路交叉口',  //地址
            "area":'河南省 郑州市 金水区',       //地区
            "postcode":'10010',                 //邮编
            "productList|1-5":[
                {
                    "name":'诺奥nowfoods薰衣草单方精油护肤美体助睡眠30ml 30ml SD149402883028-1',
                    "price":'198.00',
                    "productPrice":'598.00',
                    "count":"@integer(10, 100)"
                }
            ]
        }

})

layui.use(['element','layer'],function(){
    var layer = layui.layer;
    var element = layui.element;
})
var vm = new Vue({
    el:'.layui-larry-box',
    data: {
        status:2,
        indentId:null,
        indentNumber:null,
        waybillNumber:null,
        address:null,
        area:null,
        postcode:null,
        consignee:'',
        phone:null,
        userName:null,
        publishTime:null,
        desc:null,
        productList:[],
        modalObj:{
            waybillNumber:null,
            freightCompany:null
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
        //查看货运信息
        openWaybill:function(){

        },
        //读取数据
        loadData:function(){
            this.indentId = responseData.data.indentId;
            this.indentNumber = responseData.data.indentNumber;
            this.status = responseData.data.status;
            this.waybillNumber = responseData.data.waybillNumber;
            this.productList = responseData.data.productList;
            this.consignee = responseData.data.consignee;
            this.phone = responseData.data.phone;
            this.userName = responseData.data.userName;
            this.publishTime = responseData.data.publishTime;
            this.desc = responseData.data.desc;
            this.address = responseData.data.address;
            this.area = responseData.data.area;
            this.postcode = responseData.data.postcode;
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
        //展开发货表单
        openModal:function(){
            this.modalObj.waybillNumber = this.waybillNumber;
            $('#deliveryModal').modal('show')
        },
        //关闭发货表单
        closeModal:function(){
            $('#deliveryModal').modal('hide')
        },
        successModal:function(){
            if( !base.isEmpty(this.modalObj.waybillNumber) ){
                this.waybillNumber = this.modalObj.waybillNumber;
                this.status = 4;
            }
            else{
                return false;
            }
            this.closeModal()
        },
        //获取状态名称
        getStatusValue:function(key){
            for( var i in this.statusList ){
                if(this.statusList[i].key == key){
                    return this.statusList[i].value
                }
            }
        },

    },
    computed:{
        productPriceCount:function(){
            if( this.productList.length > 0 ){
                var count = 0;
                for( var i in this.productList ){
                    count += this.productList[i].count * this.productList[i].price;
                }
                return count;
            }
            else{
                return 0;
            }

        },
        applyStatus:function(){
            return this.status == 1 ? '未付款' : '已付款'
        },
        deliveryStatus:function(){
            return this.status == 4 ? '已发货' : '未发货'
        }

    },
    watch:{

    },
    mounted:function(){
        this.loadData()
    }
})