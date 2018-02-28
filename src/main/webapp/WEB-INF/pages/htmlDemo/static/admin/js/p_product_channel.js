'use strict';
var dataList = Mock.mock({
    "data": [
        {
            "channelId":1,
            "name":'父分类1',
            "parentId":0,
            "child":[
                {
                    "channelId":3,
                    "name":'子分类1',
                    "parentId":1,
                    "child":[
                        {
                            "channelId":5,
                            "name":'子子分类1',
                            "parentId":3,
                            "child":[]
                        }

                    ]
                },
                {
                    "channelId":4,
                    "name":'子分类2',
                    "parentId":1,
                    "child":[
                        {
                            "channelId":6,
                            "name":'子子分类2',
                            "parentId":4,
                            "child":[]
                        }
                    ]
                }
            ]
        },
        {
            "channelId":2,
            "name":'父分类2',
            "parentId":0,
            "child":[]
        }
    ]
})

layui.use(['layer','form'],function(){
    var form = layui.form;
    var layer = layui.layer;

    Vue.component('tree', {
        template: '#tree',
        props: ['list','parentIndex'],
        data: function () {
            return {

            }
        },
        methods: {
            add:function(channelObj){
                this.$emit('add-channel',channelObj)
                console.log(this)
            },
            edit:function(channelObj){
                this.$emit('edit-channel',channelObj)
            },
            confirmDel:function(channelObj){
                var _this = this;
                if(channelObj.child){
                    var content = '确实要删除\" '+ channelObj.name +' \"与其所有子栏目吗？'
                }
                else{
                    var content = '确实要删除\" '+ channelObj.name +' \"栏目吗？'
                }

                layer.open({
                    title:'删除确认',
                    content: content
                    ,btn: ['确定', '取消']
                    ,yes: function(index, layero){
                        _this.$emit('confirm-del',channelObj)
                        layer.closeAll();
                    }
                    ,btn2: function(index, layero){
                        layer.closeAll();
                    }
                    ,cancel: function(){
                        layer.closeAll();
                    }
                });
            }
        }
    })

    var vm = new Vue({
        el:'.layui-larry-box',
        data: {
            dataList:[],
            loading:false,
            tmpObj:null, //展开模态时留存的userObj
            isAdd:false,
            modalObj:{
                name:null,
                channelId:null,
                parentId:null,
                child:null
            }
        },
        methods:{
            //读取数据
            loadData:function(){
                var _this = this;
                this.loading = true;
                this.dataList = dataList.data;
                this.loading = false;
            },
            //添加一个分类
            addChannel:function(channelObj){
                this.isAdd = true;
                if(channelObj){
                    this.modalObj.parentId = channelObj.channelId;
                    this.modalObj.child = channelObj.child;
                }
                else{
                    this.modalObj.parentId = 0;
                    this.modalObj.child = null;
                }
                this.openModal(channelObj)
            },
            editChannel:function(channelObj){

                this.openModal(channelObj)
            },
            //展开用户表单
            openModal:function(obj){
                this.tmpObj = obj;
                if( !this.isAdd ){
                    this.modalObj.name = obj.name;
                    this.modalObj.channelId = obj.channelId;
                }
                else{
                    this.modalObj.name = null;
                    this.modalObj.channelId = null;
                }
                $('#channelModal').modal('show')
            },
            closeModal:function(){
                this.isAdd = false;
                $('#channelModal').modal('hide')
            },
            successModal:function(){
                if( !this.isAdd ){
                    this.tmpObj.channelId = this.modalObj.channelId;
                    this.tmpObj.name = this.modalObj.name;
                }
                else{
                    var newObj = {
                        channelId:this.modalObj.channelId,
                        name:this.modalObj.name,
                        parentId:this.modalObj.parentId,
                        child:[]
                    }
                    if( this.modalObj.parentId !== 0 ){
                        this.tmpObj.child.push(newObj);
                    }
                    else{
                        this.dataList.push(newObj)
                        console.log(this.dataList)
                    }

                }

                this.closeModal();
            },
            delChannel:function(channelObj){
                console.log(channelObj)
                this.findAndDelChannel(channelObj.channelId,this.dataList)
            },
            findAndDelChannel:function(channelId,channelList){
                for( var i in channelList ){
                    if(channelList[i].channelId == channelId){
                        channelList.splice(i,1);
                    }
                    else{
                        this.findAndDelChannel(channelId,channelList[i].child)
                    }
                }
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