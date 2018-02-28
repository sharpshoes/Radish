'use strict';
var roleList = Mock.mock({
    "data": [
        {
            "roleId":1,
            "name":'普通会员', //姓名
        },
        {
            "roleId":2,
            "name":'报单中心', //姓名
        }
    ]
})

layui.use(['layer','form'],function(){
    var form = layui.form;
    var layer = layui.layer;

    var vm = new Vue({
        el:'.layui-larry-box',
        data: {
            roleList:[],
            loading:false,
            tmpObj:null, //展开模态时留存的userObj
            isAdd:false,
            modalObj:{
                name:null,
                roleId:null
            }
        },
        methods:{
            //读取数据
            loadData:function(){
                var _this = this;
                this.loading = true;
                this.roleList = roleList.data;
                this.loading = false;
            },
            //添加一个角色
            addRole:function(){
                this.isAdd = true;
                this.openModal(null)
            },
            //展开用户表单
            openModal:function(obj){
                if( !this.isAdd ){
                    this.tmpObj = obj;
                    this.modalObj.name = obj.name;
                    this.modalObj.roleId = obj.roleId;
                }
                else{
                    this.modalObj.name = null;
                    this.modalObj.roleId = null;
                }
                $('#roleModal').modal('show')
            },
            closeModal:function(){
                this.isAdd = false;
                $('#roleModal').modal('hide')
            },
            successModal:function(){
                if( !this.isAdd ){
                    this.tmpObj.roleId = this.modalObj.roleId;
                    this.tmpObj.name = this.modalObj.name;
                }
                else{
                    var newObj = {
                        roleId:this.modalObj.roleId,
                        name:this.modalObj.name
                    }
                    this.roleList.push(newObj)
                }

                this.closeModal();
            },
            //弹出确认弹窗
            confirmDel:function(userObj,delIndex){
                var _this = this;
                layer.open({
                    title:'删除确认',
                    content: '确实要删除此用户吗？'
                    ,btn: ['确定', '取消']
                    ,yes: function(index, layero){
                        //按钮【按钮一】的回调
                        _this.roleList.splice(delIndex,1);
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

        },
        mounted:function(){
            this.loadData()
        }
    })
})