$(function() {
  $("#submit").on("tap", function() {
    /*获取表单系列化数据*/
    var data = $("form").serialize();
    console.log(data);
    /*数据类型字符串 ==>对象  key1=value1&key2=value2==>{key1:value1,key1:value1}*/
    var dataObj = LT.serialize2object(data);
    console.log(dataObj);
    /*“JSON”未定义 IE67  https://github.com/douglascrockford/JSON-js (josn2.js)*/
    /*检验*/
    if (!dataObj.username) {
      mui.toast("请输入用户名");
      return false;
    }

    if (!dataObj.password) {
      mui.toast("请输入密码");
      return false;
    }

    $.ajax({
      url: "/user/login",
      type: "post",
      data: dataObj,
      /*对象 serialize serializeArray均可*/
      dataType: "json",
      success: function(data) {
        /*如果成功 根据地址跳转*/
        /*如果没有地址 默认跳转个人中心首页*/
        if (data.success == true) {
          /*业务成功*/
          var returnUrl = location.search.replace("?returnUrl=", "");
          if (returnUrl) {
            location.href = returnUrl;
          } else {
            location.href = LT.userUrl;
          }
        } else {
          /*业务不成功*/
          mui.toast(data.message);
        }
      }
    }); // endfor $.ajax
  }); // endfor $('#submit').on
}); // endfor $(function)
