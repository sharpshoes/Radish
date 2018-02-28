'use strict';
var memberList = Mock.mock({
    "data|1-100": [
        {
            "id|+1":1,
            "userName":'@cname()', //姓名
            "balance":'@integer(1000, 10000)', //姓名
            "phone":/^1[34578][0-9]\d{8}$/,       //电话
            "directlyUserName":'@cname()',//推荐人姓名
            "directlyUserId":'@integer(1, 100)',//推荐人ID
            "parentUserName":'@cname()',//安置人姓名
            "parentUserId":'@integer(1, 100)',//安置人ID
            "storeId":'@integer(1, 100)',     //报单中心ID
            "cardId":/^[0-9]\d{18}$/       //银行卡号
        }
    ]
})

layui.use(['laypage','layer','form'],function(){
    var laypage = layui.laypage;
    var form = layui.form;
    var layer = layui.layer;

    var vm = new Vue({
        el:'.layui-larry-box',
        data: {
            userList:[],
            base:base,
            loading:false,
            tmpObj:null, //展开模态时留存的userObj
            keyword:null,
            //modal用
            userName:null,
            balance:0,
            inputBalance:0
        },
        methods:{
            //读取数据
            loadData:function(){
                var _this = this;
                this.loading = true;
                //执行一个laypage实例
                laypage.render({
                    elem: 'pageList' //注意，这里的 test1 是 ID，不用加 # 号
                    ,count: memberList.data.length //数据总数，从服务端得到
                    ,limit:10
                    ,layout:['first','prev', 'page', 'next','last']
                    ,jump:function(obj, first){
                        var dataLength = (obj.curr - 1) * obj.limit;
                        var dataList = memberList.data.slice( dataLength,dataLength+obj.limit )
                        //首次不执行
                        if(!first){
                            //do something
                        }
                        _this.userList = dataList;
                    }
                });
                this.loading = false;
            },
            //展开用户表单
            openModal:function(obj){
                this.tmpObj = obj;
                this.userName = obj.userName;
                this.balance = obj.balance;
                $('#payModal').modal('show')
                $('#inputBalance').focus()
            },
            closeModal:function(){
                this.inputBalance = 0;
                $('#payModal').modal('hide')
            },
            successModal:function(){
                this.tmpObj.balance = this.balance + this.inputBalance;
                this.closeModal();
            },
            search:function(){
                console.log('搜索待补全')
            }
        },
        computed:{
            modalBalanceAfter:function(){
                return base.stringsplit(Number(this.balance) + Number(this.inputBalance));
            }
        },
        watch:{
            inputBalance:function(val){
                if(isNaN(val)){
                    this.inputBalance = 0;
                }
                else{
                    this.inputBalance = Number(val)
                }
            }
        },
        mounted:function(){
            this.loadData()
        }
    })
})