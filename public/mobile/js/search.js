$(function() {
  $('.lt_search a').on('tap', function() {
    /*跳转去搜索列表页 并且需要带上关键字*/
    var key = $.trim($('input').val())
    /*判断  没有关键字就提示用户“请输入关键字”*/
    if (!key) {
      /*mui 消息提示*/
      mui.toast('请输入关键字')
      return false
    }
    /*如果合法*/
    /*searchList.html?key=xxx*/
    // 静态页面传递参数
    location.href = 'searchList.html?key=' + key
  })
});