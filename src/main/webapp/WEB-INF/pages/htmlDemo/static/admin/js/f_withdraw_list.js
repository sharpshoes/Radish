'use strict';
var responseList = Mock.mock({
    "data|1-100": [
        {
            "withdrawId|+1":1,
            "balance":'@natural(1000,100000)', //余额
            "money":'@natural(1000,100000)', //申请提现金额
            "phone":/^1[3578][0-9]\d{8}$/,       //电话
            "status":'@natural(0,3)',                 //状态
            "userName":'@cname()',                      //用户名
            "trueName":'@cname()',                      //收款人姓名
            "createTime":'@datetime("yyyy-MM-dd HH:mm")', //申请时间，
            "remarks":null, //备注,
            "cardNumber":'@id(10000000000000)' //卡号
        }
    ]
})

layui.use(['laypage','layer'],function(){
    var laypage = layui.laypage;
    var layer = layui.layer;
    var vm = new Vue({
        el:'.layui-larry-box',
        data: {
            base:base, //将base变量放入vue中
            dataList:[],
            loading:false,
            selectAll:false,
            keyword:null,
            tmpObj:null,
            modalObj:{
                balance:null,
                money:null,
                phone:null, //收货人
                status:null,  //地址
                trueName:null,
                userName:null,       //地区
                remarks:null,                 //邮编
                createTime:null,
                cardNumber:null,
                add:false,
            },
            statusList:[
                {
                    key:0,
                    value:'未处理'
                },
                {
                    key:1,
                    value:'已处理'
                },
                {
                    key:2,
                    value:'退回申请'
                },
                {
                    key:3,
                    value:'已发放'
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
                    elem: 'pageList' //注意，这里的 pageList 是 ID，不用加 # 号
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
                            newArray.push(this.dataList[i].withdrawId)
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
            //查看详情
            detail:function(withdrawObj){
                this.modalObj.add = false;
                this.openModal(withdrawObj)
            },
            //处理
            dispose:function(withdrawObj){
                var _this = this;
                /*layer.open({
                    title:'处理确认',
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
                });*/
                withdrawObj.status = 1;
            },
            //再次处理
            reDispose:function(withdrawObj){
                this.modalObj.add = true;
                this.openModal(withdrawObj)
            },
            openModal:function(withdrawObj){
                this.tmpObj = withdrawObj;
                this.modalObj.money = withdrawObj.money;
                this.modalObj.phone = withdrawObj.phone;
                this.modalObj.status = withdrawObj.status;
                this.modalObj.trueName = withdrawObj.trueName;
                this.modalObj.userName = withdrawObj.userName;
                this.modalObj.remarks = withdrawObj.remarks;
                this.modalObj.createTime = withdrawObj.createTime;
                this.modalObj.cardNumber = withdrawObj.cardNumber;
                $('#withdrawModal').modal('show')
            },
            search:function(){
                console.log('搜索待完成')
            },
            closeModal:function(){
                $('#withdrawModal').modal('hide')
            },
            successModal:function(){
                this.tmpObj.status = 3;
                this.closeModal();
            },
            closeWaybill:function(){
                $('#waybillModal').modal('hide');
            },
            sendBack:function(){
                if( base.isEmpty(this.modalObj.remarks) ){
                    return false;
                }
                else{
                    this.tmpObj.remarks = this.modalObj.remarks;
                    this.tmpObj.status = 2;
                    this.closeModal();
                }

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