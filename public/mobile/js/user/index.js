$(function() {
  getUserIndexData(function(data) {
    var mobile = data.mobile || '暂无';
    $('.mui-media-body').html(data.username + '<p class="mui-ellipsis">绑定手机:' + data.mobile + '</p>');
  });

  $('body').on('tap', '.btn_outLogin', function() {
    getLoginOutData(function(data) {
      if (data.success) {
        location.href = LT.loginUrl
      }
    });
  });
});

var getUserIndexData = function(callback) {
  LT.loginAjax({
    type: 'get',
    url: '/user/queryUserMessage',
    data: '',
    dataType: 'json',
    success: function(data) {
      callback && callback(data);
    }
  });
};

var getLoginOutData = function(callback) {
  LT.loginAjax({
    type: 'get',
    url: '/user/logout',
    data: '',
    dataType: 'json',
    beforeSend: function() {
      $('.btn_login').html('正在退出...');
    },
    success: function(data) {
      callback && callback(data);
    }
  });
};