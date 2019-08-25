$(function(){
    mui('.mui-scroll-wrapper').scroll({
        scrollY: true, //是否竖向滚动
        scrollX: false, //是否横向滚动
        startX: 0, //初始化时滚动至x
        startY: 0, //初始化时滚动至y
        indicators: false, //是否显示滚动条
        deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
        bounce: true //是否启用回弹
    });
    /*渲染*/
    getAddressData(function(data){
        console.log(data)
        window.data = data;
        $('.mui-scroll').html(template('addressTpl',{model:data}));
    });

    $('body').on('tap','.mui-btn-red',function(){
        deleteAddress($(this).attr('data-id'),function(){
            mui.toast('删除成功！');
            getAddressData(function(data){
                $('.mui-scroll').html(template('addressTpl',{model:data}));
            });
        });
    })
});
var getAddressData = function(callback){
    LT.loginAjax({
        type:'get',
        url:'/address/queryAddress',
        data:{},
        dataType:'json',
        success:function(data){
            callback && callback(data);
        }
    });
};
var deleteAddress = function(id,callback){
    LT.loginAjax({
        type:'post',
        url:'/address/deleteAddress',
        data:{id:id},
        dataType:'json',
        success:function(data){
            callback && callback(data);
        }
    });
};