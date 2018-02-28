'use strict';
var memberList = Mock.mock({
    "data|1-100": [
        {
            "id|+1":1,
            "userName":'@cname()', //姓名
            "directBonus":'@integer(1000, 10000)', //直推奖
            "directCount":'@integer(1, 10)', //直推人数
            "combinationBonus":'@integer(1000, 10000)', //碰对奖
            "combinationCount":'@integer(1, 10)',  //碰对数量
            "childsBonus":'@integer(1000, 10000)',       //代数奖
            "storeId":'@integer(1, 100)',     //报单中心ID
        }
    ]
})

layui.use(['laypage','table','laydate','layer','form'],function(){
    var laypage = layui.laypage;
    var form = layui.form;
    var layer = layui.layer;
    var laydate = layui.laydate;
    var nowDate = new Date();
    var table = layui.table;
    nowDate = nowDate.Format('yyyy-MM-dd');
    //执行一个laydate实例

    var vm = new Vue({
        el:'.layui-larry-box',
        data: {
            selectDate:nowDate,
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
                _this.userList = memberList.data
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
            auditBonus:function(){
                var _this = this;
                layer.open({
                    title:'奖金审核',
                    content: '确定奖金无误，并发放奖金'
                    ,btn: ['确定', '取消']
                    ,yes: function(index, layero){
                        //按钮【按钮一】的回调

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
            }
        },
        computed:{
            moneyCount:function(){
                var count = 0;
                for(var i in this.userList ){
                    var one = this.userList[i].directBonus + this.userList[i].combinationBonus + this.userList[i].childsBonus
                    count += one;
                }
                return count;
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
            },
            selectDate:function(val){
                layer.msg('日期改变了,重新加载数据')
                console.log(val)

            }
        },
        mounted:function(){
            var _this = this;
            this.loadData();
            laydate.render({
                elem: '#selectDate' //指定元素
                ,type: 'date'
                ,max: nowDate
                ,closeStop: '#selectDate' //这里代表的意思是：点击 test1 所在元素阻止关闭事件冒泡。如果不设定，则无法弹出控件
                ,btns: ['now']
                ,done: function(value, date){ //监听日期被切换
                    _this.selectDate = value;
                }
            });

        }
    })
})