'use strict';
var memberList = Mock.mock({
    "data|1-100": [
        {
            "id|+1":1,
            "userName":'@cname()', //姓名
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
            loading:false,
            tmpObj:null, //展开模态时留存的userObj
            modalObj:{
                userName:null,
                phone:null,
                parentUserName:null,
                parentUserId:null,
                cardId:null,
                id:null
            }
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
                this.modalObj.id = obj.id;
                this.modalObj.userName = obj.userName;
                this.modalObj.phone = obj.phone;
                this.modalObj.parentUserName = obj.parentUserName;
                this.modalObj.parentUserId = obj.parentUserId;
                this.modalObj.cardId = obj.cardId;

                $('#userModal').modal('show')
            },
            closeModal:function(){
                $('#userModal').modal('hide')
            },
            successModal:function(){
                this.tmpObj.id = this.modalObj.id;
                this.tmpObj.userName = this.modalObj.userName;
                this.tmpObj.phone = this.modalObj.phone;
                this.tmpObj.parentUserName = this.modalObj.parentUserName;
                this.tmpObj.parentUserId = this.modalObj.parentUserId;
                this.tmpObj.cardId = this.modalObj.cardId;
                this.closeModal();
            },
            //弹出确认弹窗
            confirmDel:function(userObj,delIndex){
                var _this = this;
                this.tmpObj = userObj;
                layer.open({
                    title:'删除确认',
                    content: '确实要删除此用户吗？'
                    ,btn: ['确定', '取消']
                    ,yes: function(index, layero){
                        //按钮【按钮一】的回调
                        _this.userList.splice(delIndex,1);
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

        },
        watch:{
            userList:function(val){
            }
        },
        mounted:function(){
            this.loadData()
        }
    })
})